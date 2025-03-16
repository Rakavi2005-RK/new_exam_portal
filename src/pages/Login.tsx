
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login: React.FC = () => {
  return (
    <MainLayout>
      <div className="container max-w-lg mx-auto py-8">
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Log in to your AccessPro account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm defaultTab="login" />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
