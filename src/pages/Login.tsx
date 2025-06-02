import React from "react"
import MainLayout from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container max-w-lg mx-auto py-8">
        <Card className="glass-card">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Log in to your AccessPro account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}