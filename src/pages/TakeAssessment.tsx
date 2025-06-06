
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssessmentTaker from "@/components/assessments/AssessmentTaker";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"; 

const TakeAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Mock assessment data - in a real app this would be fetched from an API
  const assessmentData = {
    assessmentId: Number(id) || 1,
    title: "Physics Midterm Assessment",
    subject: "Physics",
    timeLimit: 60, // in minutes
    questions: [
      {
        id: 1,
        text: "What is the formula for Newton's Second Law of Motion?",
        options: [
          { id: "a", text: "F = ma" },
          { id: "b", text: "E = mc²" },
          { id: "c", text: "F = G(m₁m₂)/r²" },
          { id: "d", text: "p = mv" }
        ],
        correctAnswer: "a"
      },
      {
        id: 2,
        text: "Which of the following is a vector quantity?",
        options: [
          { id: "a", text: "Mass" },
          { id: "b", text: "Temperature" },
          { id: "c", text: "Velocity" },
          { id: "d", text: "Energy" }
        ],
        correctAnswer: "c"
      },
      {
        id: 3,
        text: "What is the SI unit of electric current?",
        options: [
          { id: "a", text: "Volt" },
          { id: "b", text: "Watt" },
          { id: "c", text: "Ohm" },
          { id: "d", text: "Ampere" }
        ],
        correctAnswer: "d"
      },
      {
        id: 4,
        text: "Which of these scientists formulated the law of universal gravitation?",
        options: [
          { id: "a", text: "Albert Einstein" },
          { id: "b", text: "Isaac Newton" },
          { id: "c", text: "Galileo Galilei" },
          { id: "d", text: "Niels Bohr" }
        ],
        correctAnswer: "b"
      },
      {
        id: 5,
        text: "What is the principle of conservation of energy?",
        options: [
          { id: "a", text: "Energy can be created but not destroyed" },
          { id: "b", text: "Energy can be destroyed but not created" },
          { id: "c", text: "Energy cannot be created or destroyed, only transformed" },
          { id: "d", text: "Energy is constantly being created and destroyed" }
        ],
        correctAnswer: "c"
      }
    ]
  };

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
