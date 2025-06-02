
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Loader2, FileUp, Brain, Sparkles, FileText } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  difficulty: z.string().min(1, { message: "Difficulty level is required" }),
  questionCount: z.coerce.number().int().min(1).max(50),
  content: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AssessmentGeneratorProps {
  className?: string;
}

const AssessmentGenerator: React.FC<AssessmentGeneratorProps> = ({ className }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'upload'>('input');
  const [uploadFileName, setUploadFileName] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      topic: "",
      difficulty: "medium",
      questionCount: 30,
      content: "",
    },
  });
  
  const subjects = [
    "Mathematics", 
    "Physics", 
    "Chemistry", 
    "Biology", 
    "Computer Science", 
    "English Literature", 
    "History", 
    "Geography", 
    "Economics", 
    "Business Studies"
  ];
  
  const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
    { value: "expert", label: "Expert" },
  ];
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      // In a real application, you would process the file here
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };
  
  const handleSubmit = async (values: FormValues) => {
  setIsGenerating(true);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    console.log('Assessment generation submitted:', values);
    toast.success('Assessment generated successfully!');
    
    // Show popup after 5 seconds
    setTimeout(() => {
      setShowPopup(true);
    }, 5000);
  } catch (error) {
    toast.error('Failed to generate assessment. Please try again.');
    console.error('Error generating assessment:', error);
  } finally {
    setIsGenerating(false);
  }
};

  
  return (
    <Card className={className} >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle>Access Pro Assessment Generator</CardTitle>
        </div>
        <CardDescription>
          Create custom assessments using Access Pro technology
        </CardDescription>
      </CardHeader>
      
      <CardContent >
        <Tabs 
         defaultValue="manual" className="w-full"
        >
          <div className="flex justify-center mb-4">
    <TabsList className="bg-muted w-fit">
      <TabsTrigger value="manual">📋 Manual Input</TabsTrigger>
    </TabsList>
  </div>
  
          
          <TabsContent value="manual" className="space-y-4 animate-fade-in-up">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject.toLowerCase()}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Trigonometry, Cell Biology" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {difficulties.map((difficulty) => (
                              <SelectItem key={difficulty.value} value={difficulty.value}>
                                {difficulty.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="questionCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Questions</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="30" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
           
                <Button 
                  type="submit" 
                  className="mx-auto w-1/4 flex items-center justify-center" 
                  size="lg"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Assessment...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Assessment
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4 animate-fade-in-up">
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                
                <div className="flex items-center gap-2">
                  <Input
                    id="syllabus"
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('syllabus')?.click()}
                    className="w-full h-24 flex flex-col gap-2 justify-center border-dashed"
                  >
                    <FileUp className="h-6 w-6" />
                    <span>Drag & drop or click to upload</span>
                    <span className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, DOC, TXT
                    </span>
                  </Button>
                </div>
                {uploadFileName && (
                  <p className="text-sm text-muted-foreground">
                    Uploaded: {uploadFileName}
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="questionCount">Number of Questions</Label>
                    <Input 
                      id="questionCount" 
                      type="number" 
                      min={1} 
                      max={50} 
                      defaultValue={30} 
                      placeholder="30" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Choose between 1-50 questions
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!uploadFileName || isGenerating}
                  onClick={() => {
                    setIsGenerating(true);
                    setTimeout(() => {
                      toast.success('Assessment generated from uploaded syllabus!');
                      setIsGenerating(false);
                    }, 2500);
                  }}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating from Syllabus...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate from Syllabus
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Brain className="h-4 w-4" />
          <span>Powered by Access Pro</span>
        </div>
        
        {isGenerating && <span>This may take a few moments...</span>}
      </CardFooter>

      {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-lg font-semibold mb-2">Assessment Ready</h2>
      <p className="text-sm text-gray-700 mb-4">
        Your custom assessment is ready. You can now download or review it.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setShowPopup(false)}>
          Close
        </Button>
        <Button onClick={() => setShowPopup(false)}>
          Proceed
        </Button>
      </div>
    </div>
  </div>
    )};
    </Card>

    

  );

};

export default AssessmentGenerator;