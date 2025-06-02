from flask import Blueprint, request, jsonify,send_file,Response
from models import User,db,bcrypt
from flask_jwt_extended import create_access_token
from flask_cors import CORS
from flask_mail import Message
import random
import json,re
from extensions import mail 
from config import Config
from pypdf import PdfReader
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
import google.generativeai as genai
from reportlab.platypus import  SimpleDocTemplate,Paragraph,PageBreak,Spacer,Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from io import BytesIO



routes = Blueprint("routes", __name__)
CORS(routes)

otp_storage = {}


@routes.route("/Signup", methods=["POST"])
def Signup():
    data = request.get_json()
    username, email, password = data["fullname"], data["email"], data["password"]

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "message": "User registered successfully"}), 201


@routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data["username"]).first()

    if user and user.check_password(data["password"]):
        token = create_access_token(identity=user.id)
        return jsonify({"success": True, "message": "Login successful", "token": token})

    return jsonify({"success": False, "error": "Invalid credentials"}), 401


@routes.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get("email")
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not registered!"}), 400

    otp = str(random.randint(100000, 999999))
    otp_storage[email] = otp
    msg = Message("Password Reset OTP", sender="tthaaimadi@gmail.com", recipients=[email])
    msg.body = f"Your OTP for password reset is: {otp}"
    
    try:
        mail.send(msg)  
    except Exception as e:
        return jsonify({"error": "Failed to send email", "details": str(e)}), 500

    return jsonify({"message": "OTP sent successfully!"})

@routes.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")

    if email not in otp_storage or otp_storage[email] != otp:
        return jsonify({"message": "Invalid OTP"}), 400

    del otp_storage[email]  
    return jsonify({"message": "OTP verified successfully"}), 200


@routes.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found!"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password_hash= hashed_password
    db.session.commit()

    return jsonify({"message": "Password reset successful!"}),200

    
@routes.route("/Pdffile", methods=["POST"])

def pdf_file():
    q_type={}
    if "pdfFile" not in request.files:
        return Response(f"No file uploaded",status=400,mimetype="text/plain")
    

    userpdf = request.files["pdfFile"]
    user_filename = request.form.get("fileName")
    difficulty=request.form.get("difficulty")
    newItems_json=request.form.get("newItems","{}")
    newItems= json.loads(newItems_json) 
    print(newItems)
    print(type(newItems))
   

    try:
        reader = PdfReader(userpdf)
        num_pages = len(reader.pages)
        if(num_pages==0):
             return Response(f"the file is empty",status=400,mimetype="text/plain")
        all_text = ""
        for i in range(num_pages): 
            page_text = reader.pages[i].extract_text()
            if page_text:
                all_text += f"Page {i+1}:\n{page_text}\n\n"

        api_key = Config.API_KEY
        if not api_key:
            return Response(f"Error : API key is missing",status=401,mimetype="text/plain")
        try:
            # generating question using ai
            genai.configure(api_key=api_key)
            model=genai.GenerativeModel("gemini-2.0-flash")
            model_response = model.generate_content(contents = (
                f"""
                Generate questions strictly based on the syllabus content provided below with {difficulty} to the syllabus
                Each question should be categorized by its corresponding mark allocation. 
                give the number of question give in the object for each marks  {newItems}. 
                f"Ensure all questions are relevant to the syllabus and do not include any additional information. 
                Syllabus Content:{all_text}
                ### Response Format:
                Your response **must be** a valid JSON dictionary.
                Do **not** include any explanations, extra text, or formatting outside of JSON.
                Strictly follow those keys only:
                include the title also
                {{
                    "Questions":[{{"title":"Ai robotics"}}
                   {{ 
                    "marks":"2 mark",
                    "questions":[
                        " 1.what is robotics ?",
                         "2.what are recent innovation?"
                    ]
                    }},
                    {{
                    "marks":"2 mark",
                    "questions":[
                        " 1.what is ai ?",
                         "2.what is machine learning?"
                    ]
                    }}
                    ] 
                }}
                """
                ))

            response_text = model_response.candidates[0].content.parts[0].text
            #print(response_text)
            #print(type(response_text))
            print("______________________________")
            clean_response = re.sub(r"```json\n|\n```", "", response_text).strip()
            try:
                model_output = json.loads(clean_response)
                #print("Parsed Dictionary:", model_output)
            except json.JSONDecodeError as e:
                print("JSON Decode Error:", e)
                #print("Raw Response:", clean_response)

            
            #print(model_output)
            
            

            if not model_output :
                return Response("AI model did not generate any content", status=500, mimetype="text/plain")
        except Exception as e:
                return Response(f"Google AI Error: {str(e)}", status=500, mimetype="text/plain")

        # converting the text to document
        try:   
            buffer = BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=A4)
            styles = getSampleStyleSheet()

            elements = []

            # Title
            title = model_output["Questions"][0].get("title", "No Title")
            elements.append(Paragraph(f"<b>{title}</b>", styles["Title"]))
            elements.append(Spacer(1, 10))  
            left_style = ParagraphStyle(name="LeftAlign", parent=styles["Heading2"], alignment=TA_LEFT)
            right_style = ParagraphStyle(name="RightAlign", parent=styles["Heading2"], alignment=TA_RIGHT)

            for item, i in zip(model_output["Questions"][1:], newItems):
                data = [[
                Paragraph(f"<b>{i['marks']} marks</b>", left_style),  
                Paragraph(f"<b>{i['marks']} x {i['questions']} = {i['totalMarks']}</b>", right_style)  
            ]]

            # Create a table with two columns
                table = Table(data, colWidths=[200, 200])  # Adjust widths as needed
                table.setStyle(TableStyle([
                    ('ALIGN', (0, 0), (0, 0), 'LEFT'),    
                    ('ALIGN', (1, 0), (1, 0), 'RIGHT'),  
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),  # Reduce spacing
                ]))


                elements.append(table)
                elements.append(Spacer(1, 10))
                if "questions" in item:
                    for question in item["questions"]:
                        elements.append(Paragraph(f"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{question}", styles["Normal"]))
                        elements.append(Spacer(1, 13))

                elements.append(Spacer(1, 12))  

            # Build PDF
            doc.build(elements)

            buffer.seek(0)
            return send_file(buffer, mimetype="application/pdf")

        except Exception as e:
            print(f"error:{e}")

    except Exception as e:
        print(f"Error: {e}") 
        return Response(f"Error {str(e)}",status=500 ,mimetype="text/plain") 
    """
    const [recentActivities, setrecentActivities] = useState<any[]>([]);
const [totalAssessments, setTotalAssessments] = useState<any[]>([]);
useEffect(() => {
  
  const fetchRecentActivities = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const res=await axios.post('http://127.0.0.1:5000/recent_activity',{user_id})
      setrecentActivities(res.data);
    } 
    catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  };
   
  const total_assessments= async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const res=await axios.post('http://127.0.0.1:5000/total_assessment',{user_id})
      setTotalAssessments(res.data);
    }
    catch (error) {
      console.error('Error fetching total assessments:', error);
    }}
    fetchRecentActivities();
    total_assessments();
},[]);"""
