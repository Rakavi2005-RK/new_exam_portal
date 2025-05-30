
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssessmentTaker from "@/components/assessments/AssessmentTaker";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"

const TakeAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();
  const { user_id, score_id } = location.state || {};
  useEffect(() => {
  axios
    .post("http://localhost:5000/start", {
      user_id: user_id,        
      score_id: score_id, 
    })
    .then((res) => {
      setQuestions(res.data);
      console.log(questions)
    })
    .catch((err) => {
      console.error("Failed to load questions:", err);
    });
}, [user_id,score_id]);

  
  // Mock assessment data - in a real app this would be fetched from an API
  
  const assessmentData = questions;

  const handleComplete = (answers: Record<number, string>, score: number) => {
    setIsCompleted(true);
    // In a real application, you would submit this to your backend
    console.log("Assessment completed with answers:", answers);
    console.log("Score:", score);
    
    // Navigate back to student dashboard after a delay
    setTimeout(() => {
      navigate("/student-assessments");
    }, 3000);
  };

  const handleCancel = () => {
    toast.warning("Assessment canceled", {
      description: "Your progress will not be saved."
    });
    navigate("/student-assessments");
  };

  if (isCompleted) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="space-y-6">
              <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Assessment Completed!</h2>
              <p className="text-muted-foreground">
                Thank you for completing the assessment. You will be redirected to the dashboard shortly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AssessmentTaker 
      assessmentId={assessmentData.assessmentId}
      title={assessmentData.title}
      subject={assessmentData.subject}
      timeLimit={assessmentData.timeLimit}
      questions={assessmentData.questions}
      onComplete={handleComplete}
      onCancel={handleCancel}
    />
  );
};

export default TakeAssessment;
