
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register: React.FC = () => {
  return (
    <MainLayout>
      <div className="container max-w-lg mx-auto py-8">
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Sign up for your AccessPro account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm defaultTab="register" />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
