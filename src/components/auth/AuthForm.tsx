
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { useSearchParams } from 'react-router-dom';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["admin", "placement-faculty", "class-faculty", "student"]),
})

type FormData = z.infer<typeof FormSchema>

export function AuthForm({ defaultTab = "login" }) {
  const [isRegister, setIsRegister] = useState(defaultTab === "register")
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isLoginPage = searchParams.get('mode') === 'login';

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
    mode: "onChange",
  })

  const { isValid, isValidating } = form.formState;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (isRegister) {
        // Call register API
        console.log("Register data", data);
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        setIsRegister(false);
      } else {
        // Call login API
        console.log("Login data", data);
        
        // Simulate login and redirect based on role
        if (data.role === "admin") {
          // Redirect to admin dashboard
          window.location.href = "/dashboard";
        } else if (data.role === "placement-faculty") {
          // Redirect to placement faculty dashboard
          window.location.href = "/dashboard";
        } else if (data.role === "class-faculty") {
          // Redirect to class faculty dashboard
          window.location.href = "/dashboard";
        } else if (data.role === "student") {
          // Redirect to student dashboard
          window.location.href = "/student/assessments";
        } else {
          // Default redirect
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-sm items-center gap-4"
      >
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
        {!isLoginPage && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="student" id="student" />
                    </FormControl>
                    <FormLabel htmlFor="student">Student</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="class-faculty" id="class-faculty" />
                    </FormControl>
                    <FormLabel htmlFor="class-faculty">Class Faculty</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="placement-faculty" id="placement-faculty" />
                    </FormControl>
                    <FormLabel htmlFor="placement-faculty">
                      Placement Faculty
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin" id="admin" />
                    </FormControl>
                    <FormLabel htmlFor="admin">Admin</FormLabel>
                  </FormItem>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={isLoading || !isValid}>
          {isLoading ? "Loading" : isRegister ? "Create Account" : "Login"}
        </Button>
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Button>
      </form>
    </Form>
  )
}
