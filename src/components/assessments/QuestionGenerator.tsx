
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, Sparkles, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const schema = z.object({
  subject: z.string().min(1, "Subject is required"),
  topic: z.string().min(1, "Topic is required"),
  difficultyLevel: z.string().min(1, "Difficulty level is required"),
  questionCount: z.coerce.number().int().min(1).max(100).default(10),
  instructions: z.string().optional(),
  syllabus: z.any().optional(),
});

const QuestionGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      topic: "",
      difficultyLevel: "medium",
      questionCount: 10,
      instructions: "",
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };
  
  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedQuestions(null);
    
    // Simulate AI generation process with progress
    const totalSteps = 5;
    const updateProgress = (step: number) => {
      setGenerationProgress(Math.round((step / totalSteps) * 100));
    };
    
    try {
      // Simulating AI processing steps
      await new Promise(resolve => setTimeout(() => {
        updateProgress(1);
        resolve(null);
      }, 1000));
      
      await new Promise(resolve => setTimeout(() => {
        updateProgress(2);
        resolve(null);
      }, 1000));
      
      await new Promise(resolve => setTimeout(() => {
        updateProgress(3);
        resolve(null);
      }, 1000));
      
      await new Promise(resolve => setTimeout(() => {
        updateProgress(4);
        resolve(null);
      }, 1000));
      
      await new Promise(resolve => setTimeout(() => {
        updateProgress(5);
        
        // Mock generated questions
        const mockQuestions = `
## Physics Assessment - ${data.topic}
### Difficulty: ${data.difficultyLevel}

1. What is the relationship between force, mass, and acceleration according to Newton's Second Law?
   a) F = ma
   b) F = m/a
   c) F = a/m
   d) F = m²a

2. Which of the following is a vector quantity?
   a) Mass
   b) Temperature
   c) Velocity
   d) Energy

3. What is the SI unit of electric current?
   a) Volt
   b) Watt
   c) Ohm
   d) Ampere

4. Which scientist formulated the theory of general relativity?
   a) Isaac Newton
   b) Albert Einstein
   c) Niels Bohr
   d) Max Planck

5. What is the principle of conservation of energy?
   a) Energy can be created but not destroyed
   b) Energy can be destroyed but not created
   c) Energy cannot be created or destroyed, only transformed
   d) Energy is constantly being created and destroyed
`;
        
        setGeneratedQuestions(mockQuestions);
        toast.success("Questions generated successfully!");
        resolve(null);
      }, 1000));
      
    } catch (error) {
      toast.error("Failed to generate questions. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Question Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {generatedQuestions ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Generated Questions</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setGeneratedQuestions(null)}
              >
                Generate Again
              </Button>
            </div>
            
            <div className="border rounded-md p-4 bg-muted/30">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedQuestions}</pre>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(generatedQuestions);
                toast.success("Questions copied to clipboard");
              }}>
                Copy to Clipboard
              </Button>
              <Button onClick={() => {
                toast.success("Questions saved to assessment", {
                  description: "The questions have been added to your assessment."
                });
              }}>
                Save to Assessment
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Physics" {...field} />
                      </FormControl>
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
                        <Input placeholder="e.g. Mechanics, Thermodynamics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="difficultyLevel"
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
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
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
                          min={1} 
                          max={100} 
                          placeholder="10" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Choose between 1-100 questions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add specific instructions for question generation" 
                        className="min-h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Upload Syllabus (Optional)</FormLabel>
                <div className="border border-dashed rounded-md p-6 text-center space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    {uploadedFile ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>{uploadedFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop a file here, or click to browse
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="syllabus-upload"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => document.getElementById('syllabus-upload')?.click()}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: PDF, DOC, DOCX, TXT
                  </p>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      <span>Generating Questions...</span>
                    </div>
                    <Progress value={generationProgress} className="h-1" />
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionGenerator;
