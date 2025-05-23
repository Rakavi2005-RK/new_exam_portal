from flask import Blueprint, request, jsonify,send_file,Response,current_app
from models import User,feedback,db,bcrypt,Question,Score
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS,cross_origin
from flask_mail import Message
from datetime import datetime
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
from docx import Document



routes = Blueprint("routes", __name__)
CORS(routes)

otp_storage = {}


@routes.route("/Signup", methods=["POST"])
def Signup():
    data = request.get_json()
    username, email, password = data["username"], data["email"], data["password"]

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
    user = User.query.filter_by(email=data["email"]).first()

    if user and user.check_password(data["password"]):
        token = create_access_token(identity={"user_id":user.id})
        return jsonify({"success": True, "message": "Login successful", "token": token})

    return jsonify({"success": False, "error": "Invalid credentials"}), 401

# sending mail for otp
@routes.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get("email")
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not registered!"}), 400

    otp = str(random.randint(100000, 999999))
    otp_storage[email] = otp
    msg = Message("Password Reset OTP", sender=current_app.config["MAIL_USERNAME"], recipients=[email])
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

# reset and update the password
@routes.route('/reset-password', methods=['POST'])
def reset_password():
    data=request.json 
    details=data["data"] 
    new_password = details["newPassword"]
    # reset-password
    if data["actions"]=="reset_password":
        email = data["email"]
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"message": "User not found!"}), 400
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password_hash= hashed_password
        db.session.commit()
    # update-password
    elif  data["actions"]=="update_password":
        id=data["user_id"]
        user=User.query.filter_by(id=id).first()
        old_password=details["currentPassword"]
        if not bcrypt.check_password_hash(user.password_hash,old_password):
            return("password does not match")
    
        hashed=bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password_hash=hashed
        db.session.commit()
        return("successful")
    else:
        return("something went wrong!!!")


    return jsonify({"message": "Password reset successful!"}),200

    
@routes.route("/Pdffile", methods=["POST"])

def pdf_file():
    q_type={}
    if "pdfFile" not in request.files:
        return Response(f"No file uploaded",status=400,mimetype="text/plain")
    

    userfile = request.files["pdfFile"]
    user_filename = request.form.get("filename").lower
    difficulty=request.form.get("difficulty")
    questionCount=request.form.get("questionCount")

   

    try:
        all_text = ""
        if user_filename.endswith(".pdf"):
            readerpdf = PdfReader(userfile)
            if len(readerpdf.pages)==0:
                return Response(f"the file is empty",status=400,mimetype="text/plain")
            else:
                for i in range(len(readerpdf.pages)): 
                    page_text = readerpdf.pages[i].extract_text()
                    if page_text:
                        all_text += f"Page {i+1}:\n{page_text}\n\n"

        elif user_filename.endswith(".docx"):
            readerdocx=Document(userfile)
            if len(readerdocx.paragraphs)==0:
                return Response(f"the file is empty",status=400,mimetype="text/plain")
            else:
                for i in range(len(readerdocx.paragraphs)):
                    page_text=readerdocx.paragraphs[i].text


            


        # generating question using ai
        api_key = Config.API_KEY
        if not api_key:
            return Response(f"Error : API key is missing",status=401,mimetype="text/plain")
        try:
            
            genai.configure(api_key=api_key)
            model=genai.GenerativeModel("gemini-2.0-flash")
            model_response = model.generate_content(contents = (
                f"""
                Generate questions strictly based on the syllabus content provided below with {difficulty} to the syllabus
                Each question should be categorized by its corresponding mark allocation. 
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
           # print(response_text)
            #print(type(response_text))
            clean_response = re.sub(r"```json\n|\n```", "", response_text).strip()
           # print(type(clean_response))
            try:
                model_output = json.loads(clean_response)
                print("Parsed Dictionary:", model_output)
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
    
# feedback
@routes.route("/feedback",methods=["POST"])
def feedBack():
    data=request.json
    user_id=data['user_id']
    feedbacktype=data['feedbackType']
    feedback_message=data['feedbackText']
    current_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    user=User.query.filter_by(id=user_id).first()
    email_id=user.email
    username=user.username

    body=(f"NEW FEEDBACK RECEIVED \n"
          f"From:{email_id}\n"
          f"Time:{current_time}\n\n"
          f"feedback Type:{feedbacktype}\n\n"
          f"feedback from user:\n{feedback_message}"
          )
    # sending email
    msg=Message(subject=f"feedback from the {email_id}",
                sender=current_app.config["MAIL_USERNAME"],
                recipients=[current_app.config["MAIL_USERNAME"]],
                body=body)
    msg.reply_to=email_id
    print(current_app.config["MAIL_USERNAME"])
    print(mail.send(msg))
    try:
        mail.send(msg)
    except Exception as e:
        return jsonify({"message":f"{e} try back after some time"}),400
    
    # inserting the values in feedback table
    new_feedback=feedback(username=username,email=email_id,feedback_message=feedback_message)
    db.session.add(new_feedback)
    db.session.commit()
    
    #reply to the user
    return jsonify({"message": "Feedback sent successfully!"}), 200

@routes.route("/generate_assessment",methods=["POST"])
def generate_assessment():
    data=request.json
    user_id=data.get("user_id")
    collection=data.get("values")
    subject=collection.get("subject")
    topic=collection.get("topic")
    difficulty=collection.get("difficulty")
    num_of_quest=int(collection.get("questionCount"))
    api_key=Config.API_KEY
    print(subject)
    print(topic)
    print(num_of_quest)
    if not api_key:
        return Response(f"Error : API key is missing",status=401,mimetype="text/plain")
    
    try:
        genai.configure(api_key=api_key)
        model=genai.GenerativeModel("gemini-2.0-flash")
        model_res=model.generate_content(contents=(
            f"""
            generate multiple choice question based on {subject}
            the topic related to the {topic} 
            generate question based on the level {difficulty}
            generate {num_of_quest} questions in given {subject}
            ### Response Format:
            Your response **must be** a valid JSON dictionary.
            Do **not** include any explanations, extra text, or formatting outside of JSON.
            Strictly follow those keys only:
            {{{{
                "question_text": "What is the capital of France?",
                "topic": "Geography",
                "choices": [
                {{"id":"a","text": "Paris"}},
                {{"id":"b","text": "Berlin"}},
                {{"id":"c","text": "London"}},
                {{"id":"d","text": "Madrid"}}
                ],
                "is_correct":"a" 
            }},
            {{
                "question_text": "Who invented Python?",
                "topic": "Programming",
                "choices": [
                {{"id":"a",text": "Guido van Rossum"}},
                {{"id":"b",text": "James Gosling"}},
                {{"id":"c","text": "Bjarne Stroustrup"}},
                {{"id":"d","text": "Dennis Ritchie"}}
                ],
                "is_correct": "a"
            }}}}
            """
        ))
        response_text = model_res.candidates[0].content.parts[0].text
        
        clean_response = re.sub(r"```json\n|\n```", "", response_text).strip()
        
        model_output = None
        try:
            model_output = json.loads(clean_response)
        except json.JSONDecodeError as e:
            print("JSON Decode Error:", e)
        print(model_output)
        
        if not model_output :
                return Response("AI model did not generate any content", status=500, mimetype="text/plain")
        try:
            score=Score(subject=subject,topic=topic,user_id=user_id)
            db.session.add(score)
            db.session.flush()
            
            score_id = score.id
            for i in model_output:
                question=Question(score_id=score_id,quest_text=i["question_text"],choices=i["choices"],is_correct=i["is_correct"])
                db.session.add(question)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            return Response(f"An error occurred: {str(e)}", status=500, mimetype="text/plain")   
        
        return jsonify({
            "message": "Questions addded successfully!" 
        }), 200
    except Exception as e:
                return Response(f"Google AI Error: {str(e)}", status=500, mimetype="text/plain")
    

@routes.route("/start",methods=["POST"])
def start():
    data=request.json
    user_id=data.get("user_id")
    id=data.get("score_id")

    #storing result
    score=Score.query.filter_by(user_id=user_id,id=id).first()
    if score is None:
        return jsonify({"error": "Assessment not found"}), 404
    result={"id":id,"subject":score.subject,"title":score.topic,"questions":[]}
    question=Question.query.filter_by(score_id=id)
    for q in question:
        options = []
        for c in q.choices:
            options.append({"id":c["id"],"option":c["text"]})
        question_data = {
            "id":q.id,
            "text": q.quest_text,
            "options": options
        }
        result["questions"].append(question_data)
    print(result)
    return jsonify(result)
    
#for pending requests
@routes.route("/pending",methods=["POST"])
def pending():
    data=request.json
    user_id=data["user_id"]
    #status=data["status"]
    user=User.query.filter_by(id=user_id).first()
    res=Score.query.filter_by(user_id=user_id).all()
    response={"user_name":user.username,"assessments":[{"id":r.id,"subject":r.subject,"topic":r.topic,"status":r.status.value,"created_at":r.time,"due_date":r.due_date} for r in res]}
    return jsonify(response)

# deleting the account
@routes.route("/delete",methods=["POST"])
def delete():
    details=request.json
    user_id=details["user_id"]
    user=User.query.filter_by(id=user_id).first()
    if  user:
        db.session.delete(user)
        db.session.commit()
    return("successful")

#submitted answers
@routes.route("/submitting",methods=["POST"])
#@cross_origin(origin='http://localhost:8080')
def submitting():
    data=request.json
    user_id=data["user_id"]
    score_id=data["score_id"]
    questions=data["answers"]
    score=Score.query.filter_by(user_id=user_id,id=score_id).first()
    print(type(questions))
    for qid_str , choice in questions.items():
        qid=int(qid_str)
        rec=Question.query.get(qid)
        rec.user_choice=choice
    score.status="completed"
    db.session.commit()
    return jsonify({"message":"choices added successfully"})

# code generator
@routes.route("/code_generator",methods=["POST"])
def code_generator():
    data=request.json
    query=data["query"]
    language=data["language"]
    api_key=Config.API_KEY1
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        generation_config={
        "temperature": 0.2,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
        })
        code_prompt = f"""
                    Generate the code in {language} for the following task: {query}.
                     Include in-line comments in the code (explain key steps briefly).
                     Do NOT use Markdown formatting.
                     Return a proper explanation of the code in plain text (no markdown).
                     Respond strictly in JSON format like this:
                     {{
                     "code":"print(\\"hello\\"),
                     "explanation":""print is a built-in Python function. It's used to send output to the standard output device, usually the console or terminal. 
                     \\"hello\\" is a string literal, i.e., a sequence of characters surrounded by quotes (\\\" \\\" or '\\' '). 
                     Here, it's the argument to the print() function. Python passes \\"hello\\" into the print() function to be displayed.""
                     }} 
                     Only return a valid JSON object. Do not include anything outside the JSON."""
        code_response = model.generate_content(code_prompt)
        code = re.sub(r"```json\n|\n```", "",code_response.text).strip()
        code_json=json.loads(code)
        
    except Exception as e:
        return jsonify({"message":"{e},something went wrong"}),400
    return jsonify({"code":code_json["code"],"explanation":code_json["explanation"]}),200
    


    



    



    

    