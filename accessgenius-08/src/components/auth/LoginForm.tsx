import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {jwtDecode} from "jwt-decode"; 
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom"; // Add this import to use Link for routing
import axios from 'axios';
// Extend schema to include role in the login form as well
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  
});

type LoginData = z.infer<typeof loginSchema>;
  

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const res=await axios.post("http://127.0.0.1:5000/login",data,{
      headers: { "Content-Type": "application/json" },
      })
      
      
      
      const { token, success, message } = res.data;
      if (success && token) {
        const decoded: any = jwtDecode(token);
        const userId = decoded.sub.user_id; 
        localStorage.setItem("user_id", userId);
        /* console.log("Decoded user_id:", userId);*/
        window.location.href = "/dashboard";
    }
    }catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: "Invalid credentials or role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        {/*<FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {["student", "class-faculty", "placement-faculty", "admin"].map((r) => (
                    <FormItem key={r} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value={r} id={r} />
                      </FormControl>
                      <FormLabel htmlFor={r}>
                        {r.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />*/}

<div className="flex items-center justify-between">
  <Button type="submit" disabled={!isValid || isLoading}>
    {isLoading ? "Logging in..." : "Login"}
  </Button>
  <Link
    to="/forgot-password"
    className="text-sm text-blue-500 hover:underline ml-4"
  >
    Forgot password?
  </Link>
</div>

      </form>
    </Form>
  );
}