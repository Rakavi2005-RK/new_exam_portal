
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import CustomCard from '@/components/ui/CustomCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart3, Users, Lock, Check, ArrowRight } from 'lucide-react';

const Features = [
  {
    title: "AI-Generated Assessments",
    description: "Create MCQ assessments instantly with AI, based on any topic or syllabus content.",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: "Comprehensive Analytics",
    description: "Track student progress with detailed performance analytics and visual reports.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Role-Based Access",
    description: "Dedicated dashboards for Admin, Faculty, and Students with tailored features.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Secure Institution Management",
    description: "Complete administrative control with user and group management features.",
    icon: <Lock className="h-5 w-5" />,
  },
];

const Index: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-enter');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pb-20 pt-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center p-2 px-4 bg-muted rounded-full mb-4 backdrop-blur-sm border border-border animate-fade-in-down">
              <span className="text-sm font-medium">Revolutionizing educational assessments</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
              AI-Powered Assessment Platform for Educational Excellence
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Create, manage, and analyze assessments with the power of AI. Streamline your educational processes and enhance student learning.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Button asChild size="lg" className="rounded-full h-12 px-6">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-20 relative animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-32 bottom-0 pointer-events-none"></div>
            <div className="relative z-0 rounded-xl overflow-hidden shadow-xl bg-card">
              <img 
                src="https://placehold.co/1920x1080/eef/white?text=Dashboard+Preview" 
                alt="AccessPro Dashboard" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Educational Success</h2>
            <p className="text-muted-foreground">
              AccessPro combines innovative AI technology with intuitive design to transform assessment management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Features.map((feature, index) => (
              <CustomCard
                key={index}
                className="animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                glassEffect
                hoverEffect
              >
                <div className="p-6 space-y-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Roles Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Tailored for Every Role</h2>
            <p className="text-muted-foreground">
              Dedicated dashboards and features designed for each user's unique needs
            </p>
          </div>
          
          <Tabs defaultValue="admin" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="animate-fade-in">
              <CustomCard className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-semibold">Admin Dashboard</h3>
                    <p className="text-muted-foreground">Complete control over institution management</p>
                    
                    <ul className="space-y-2 mt-6">
                      {[
                        "Create and manage all users",
                        "Bulk upload users via Excel",
                        "Organize students into groups",
                        "Track assessment data",
                        "Monitor student progress",
                        "Generate institutional reports"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild className="mt-6">
                      <Link to="/register">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800">
                    <img 
                      src="https://placehold.co/800x800/e9f0fd/4f46e5?text=Admin+Dashboard" 
                      alt="Admin Dashboard" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CustomCard>
            </TabsContent>
            
            <TabsContent value="faculty" className="animate-fade-in">
              <CustomCard className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-semibold">Faculty Dashboard</h3>
                    <p className="text-muted-foreground">Streamline assessment creation and management</p>
                    
                    <ul className="space-y-2 mt-6">
                      {[
                        "Generate AI-powered question papers",
                        "Assign assessments to students or groups",
                        "Monitor student performance",
                        "Class and placement-specific features",
                        "Custom assessment settings",
                        "Detailed student analytics"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild className="mt-6">
                      <Link to="/register">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800">
                    <img 
                      src="https://placehold.co/800x800/e9f0fd/10b981?text=Faculty+Dashboard" 
                      alt="Faculty Dashboard" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CustomCard>
            </TabsContent>
            
            <TabsContent value="student" className="animate-fade-in">
              <CustomCard className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-semibold">Student Dashboard</h3>
                    <p className="text-muted-foreground">Seamless assessment experience and progress tracking</p>
                    
                    <ul className="space-y-2 mt-6">
                      {[
                        "Take self-assessments on any topic",
                        "Complete faculty-assigned assessments",
                        "Track performance with visual charts",
                        "View progress across all subjects",
                        "Generate practice assessments",
                        "Review past assessment results"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild className="mt-6">
                      <Link to="/register">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800">
                    <img 
                      src="https://placehold.co/800x800/e9f0fd/f59e0b?text=Student+Dashboard" 
                      alt="Student Dashboard" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CustomCard>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold">Transform Your Educational Assessment Process Today</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of educational institutions using AccessPro to enhance learning experiences through AI-powered assessments.
            </p>
            
            <div className="pt-6">
              <Button asChild size="lg" variant="secondary" className="rounded-full h-12 px-8">
                <Link to="/register">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground">
                Revolutionizing educational assessments with AI-powered technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Case Studies", "Testimonials"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Documentation", "Help Center", "API Reference", "Blog"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Contact", "Careers", "Privacy Policy"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AccessPro. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
