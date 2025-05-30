import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { X, Eye, EyeOff } from "lucide-react";
import axios from 'axios';

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [emailForReset, setEmailForReset] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(true); // Initially, it's possible to resend OTP

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    // verify  the email pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailForReset)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Start the resend timer
    setResendTimer(30);
    setCanResend(false);
    let timer = 30;
    const interval = setInterval(() => {
      timer--;
      setResendTimer(timer);
      if (timer <= 0) {
        clearInterval(interval);
        setCanResend(true);
      }
    }, 1000);
    const data={
      emailForReset
    }
    try{
    const res=await axios.post('http://127.0.0.1:5000/send-otp',data)
    // on successful verfication
    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${emailForReset}`,
    });
    setStep("otp");
    }
    catch(error){
      toast({
        title:"Error",
        description: error.response?.data?.message || "Something went wrong.",
      })
    }
  };

const handleVerifyOtp = async () => {
  if (!otp) {
    toast({
      title: "Error",
      description: "Please enter the OTP.",
      variant: "destructive",
    });
    return;
  }

  if (otp.length !== 6 || isNaN(Number(otp))) {
    toast({
      title: "Error",
      description: "OTP must be a 6-digit number.",
      variant: "destructive",
    });
    return;
  }

  const data = { emailForReset, otp };
  // request to verify otp
  try {
    const res = await axios.post('http://127.0.0.1:5000/verify-otp', data);

    // Only on successful verification
    toast({
      title: "Success",
      description: res.data.message,
    });
    setStep("reset");

  } catch (error) {
   
    // Extract message from backend if available
    const message = error?.response?.data?.message || "Something went wrong.";
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  }
};


  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in both password fields.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    const actions="reset_password"
    const data={
      actions,emailForReset,newPassword,confirmPassword
    }
    // request to reset password
    try{
      const res=await axios.post(
        'http://127.0.0.1:5000/reset-password',
        data
      );

    toast({
      title: "Password Reset Success",
      description: res.data.message,
    });
    setIsDialogOpen(false);
    setTimeout(() => {
      navigate("/login");
    }, 1000);  
  }
  catch(error)
{
      toast({
      title: "Error",
      description: error.response?.data?.message || "Something went wrong.",
    });

}};

  const handleDialogClose = () => {
    if (step === "reset") {
      setStep("otp");
    } else if (step === "otp") {
      setStep("email");
    } else {
      setIsDialogOpen(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    // Reset the resend timer if the dialog is closed or email step is opened
    if (step === "email") {
      setResendTimer(30);
      setCanResend(true);
    }
  }, [step]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Verify OTP"}
            {step === "reset" && "Reset Password"}
          </DialogTitle>
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={handleDialogClose}
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {step === "email" && (
          <div className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
            />
            <Button
              onClick={handleSendOtp}
              disabled={!emailForReset}
              className="w-full"
            >
              Send OTP
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4 mt-4">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={!otp}
              className="w-full"
            >
              Verify OTP
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleSendOtp}
              disabled={!canResend}
            >
              {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
            </Button>
          </div>
        )}

        {step === "reset" && (
          <div className="space-y-4 mt-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button
              onClick={handleResetPassword}
              disabled={
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              className="w-full"
            >
              Reset Password
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
