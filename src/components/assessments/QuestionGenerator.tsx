
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
import { FileText, Upload, Sparkles, CheckCircle, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const schema = z.object({
  subject: z.string().min(1, "Subject is required"),
  topic: z.string().min(1, "Topic is required"),
  difficultyLevel: z.string().min(1, "Difficulty level is required"),
  questionCount: z.coerce.number().int().min(1).max(100).default(10),
  instructions: z.string().optional(),
  category: z.string().optional(),
  distribution: z.string().default("random"),
  syllabus: z.any().optional(),
});

const QuestionGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState<string | null>(null);
  const [markCategories, setMarkCategories] = useState<string[]>(["1 mark", "5 marks", "10 marks"]);
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      topic: "",
      difficultyLevel: "medium",
      questionCount: 10,
      instructions: "",
      category: "",
      distribution: "random",
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };
  
  const addNewCategory = () => {
    if (newCategoryValue.trim()) {
      setMarkCategories([...markCategories, newCategoryValue.trim()]);
      setNewCategoryValue("");
      setShowNewCategoryInput(false);
      toast.success(`Added new category: ${newCategoryValue}`);
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
        
        // Mock generated questions with the new category and distribution info
        const mockQuestions = `
## Physics Assessment - ${data.topic}
### Difficulty: ${data.difficultyLevel}
### Category: ${data.category || "General"}
### Distribution: ${data.distribution === "equally" ? "Questions equally distributed across units" : "Randomly generated questions"}

1. What is the relationship between force, mass, and acceleration according to Newton's Second Law? [${data.category || "5 marks"}]
   a) F = ma
   b) F = m/a
   c) F = a/m
   d) F = m²a

2. Which of the following is a vector quantity? [${data.category || "5 marks"}]
   a) Mass
   b) Temperature
   c) Velocity
   d) Energy

3. What is the SI unit of electric current? [${data.category || "5 marks"}]
   a) Volt
   b) Watt
   c) Ohm
   d) Ampere

4. Which scientist formulated the theory of general relativity? [${data.category || "5 marks"}]
   a) Isaac Newton
   b) Albert Einstein
   c) Niels Bohr
   d) Max Planck

5. What is the principle of conservation of energy? [${data.category || "5 marks"}]
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mark Category</FormLabel>
                      <div className="relative">
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mark category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {markCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                            <SelectItem value="_new" className="text-primary font-medium">
                              <div className="flex items-center gap-1.5" onClick={(e) => {
                                e.preventDefault();
                                setShowNewCategoryInput(true);
                              }}>
                                <Plus className="h-3.5 w-3.5" />
                                <span>New item</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {showNewCategoryInput && (
                        <div className="mt-2 flex items-center gap-2">
                          <Input
                            placeholder="e.g. 3 marks"
                            value={newCategoryValue}
                            onChange={(e) => setNewCategoryValue(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={addNewCategory}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={() => setShowNewCategoryInput(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="distribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Distribution</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select distribution method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="random">Random - any units</SelectItem>
                          <SelectItem value="equally">Equally - across all units</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How questions should be distributed across syllabus units
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
