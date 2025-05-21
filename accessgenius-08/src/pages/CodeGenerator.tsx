
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Lightbulb } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { toast } from "sonner";
import axios from 'axios';


const CodeGenerator: React.FC = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const languages = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Ruby", "PHP", "C#", "Swift"
  ];

  const handleGenerate = async () => {
    if (!query.trim()) {
      toast.error("Please enter a problem statement");
      return;
    }
    
    if (!language) {
      toast.error("Please select a programming language");
      return;
    }

    setIsGenerating(true);

    try{
      const res=await axios.post(
        ' http://127.0.0.1:5000/code_generator',
         {query,language},
         {
        headers:{"content-type":"application/json",}
         },
       
      )

      setGeneratedCode(res.data.code);
      setExplanation(res.data.explanation);
      setIsGenerating(false);
      toast.success("Code generated successfully!");
    }
    catch(error)
    {
        toast.error(error.response?.data?.message || "Something went wrong");
    }
   
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Code className="h-8 w-8" /> Code Generator
        </h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate Code</CardTitle>
            <CardDescription>
              Enter your problem statement and select a programming language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="query" className="font-medium mb-2 block">Problem Statement</label>
                  <Textarea
                    id="query"
                    placeholder="Describe what you want the code to do..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="language" className="font-medium mb-2 block">Programming Language</label>
                  <Select onValueChange={setLanguage} value={language}>
                    <SelectTrigger id="language" className="mb-auto">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="mt-4"
                  >
                    {isGenerating ? "Generating..." : "Generate Code"}
                    <Lightbulb className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {generatedCode && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Solution</CardTitle>
              <CardDescription>
                View the code with detailed explanation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResizablePanelGroup direction="horizontal" className="min-h-[400px] border rounded-md">
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="h-full p-4 overflow-auto">
                    <h2 className="text-lg font-semibold mb-2">Code</h2>
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto">
                      <code>{generatedCode}</code>
                    </pre>
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="h-full p-4 overflow-auto">
                    <h2 className="text-lg font-semibold mb-2">Explanation</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      {explanation.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line.startsWith("##") ? (
                            <h2>{line.replace("##", "").trim()}</h2>
                          ) : line.startsWith("###") ? (
                            <h3>{line.replace("###", "").trim()}</h3>
                          ) : line.startsWith("-") || line.startsWith("*") ? (
                            <li>{line.replace(/^[*-]\s/, "")}</li>
                          ) : line.trim() === "" ? (
                            <br />
                          ) : line.includes(":") && !line.includes(":") ? (
                            <p>
                              <strong>{line.split(":")[0]}:</strong>
                              {line.split(":").slice(1).join(":")}
                            </p>
                          ) : (
                            <p>{line}</p>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default CodeGenerator;


import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Lightbulb } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { toast } from "sonner";

const CodeGenerator: React.FC = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const languages = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Ruby", "PHP", "C#", "Swift"
  ];

  const handleGenerate = () => {
    if (!query.trim()) {
      toast.error("Please enter a problem statement");
      return;
    }
    
    if (!language) {
      toast.error("Please select a programming language");
      return;
    }

    setIsGenerating(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Example generated content
      const codeExample = language === "JavaScript" 
        ? `function sortArray(arr) {
  // Quick sort implementation
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let val of arr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }
  
  return [
    ...sortArray(left),
    ...equal,
    ...sortArray(right)
  ];
}

// Example usage
const unsortedArray = [5, 3, 7, 1, 8, 2, 9, 4, 6];
const sortedArray = sortArray(unsortedArray);
console.log(sortedArray); // [1, 2, 3, 4, 5, 6, 7, 8, 9]`
        : language === "Python" 
        ? `def sort_array(arr):
    # Quick sort implementation
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = []
    right = []
    equal = []
    
    for val in arr:
        if val < pivot:
            left.append(val)
        elif val > pivot:
            right.append(val)
        else:
            equal.append(val)
    
    return sort_array(left) + equal + sort_array(right)

# Example usage
unsorted_array = [5, 3, 7, 1, 8, 2, 9, 4, 6]
sorted_array = sort_array(unsorted_array)
print(sorted_array)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`
        : `// Example code would be generated for ${language}`;

      const explanationText = `## Quick Sort Algorithm Explanation

This implementation uses the **quick sort** algorithm, which is a divide-and-conquer sorting method.

### How It Works:
1. **Base Case**: If the array has 0 or 1 elements, it's already sorted.
2. **Pivot Selection**: Choose a pivot element (using the middle element in this implementation).
3. **Partitioning**: 
   - Create three arrays: left (elements < pivot), equal (elements = pivot), and right (elements > pivot).
   - Iterate through the array, placing each element in the appropriate partition.
4. **Recursion**: Sort the left and right partitions using the same method.
5. **Combine**: Join the sorted left partition, equal elements, and sorted right partition.

### Time Complexity:
- **Average Case**: O(n log n)
- **Worst Case**: O(n²) - occurs when the pivot is always the smallest or largest element
- **Best Case**: O(n log n)

### Space Complexity:
- O(n) for the auxiliary arrays and recursion stack

### Sample Output:
Input: [5, 3, 7, 1, 8, 2, 9, 4, 6]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]`;

      setGeneratedCode(codeExample);
      setExplanation(explanationText);
      setIsGenerating(false);
      toast.success("Code generated successfully!");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Code className="h-8 w-8" /> Code Generator
        </h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate Code</CardTitle>
            <CardDescription>
              Enter your problem statement and select a programming language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="query" className="font-medium mb-2 block">Problem Statement</label>
                  <Textarea
                    id="query"
                    placeholder="Describe what you want the code to do..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="language" className="font-medium mb-2 block">Programming Language</label>
                  <Select onValueChange={setLanguage} value={language}>
                    <SelectTrigger id="language" className="mb-auto">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="mt-4"
                  >
                    {isGenerating ? "Generating..." : "Generate Code"}
                    <Lightbulb className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {generatedCode && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Solution</CardTitle>
              <CardDescription>
                View the code with detailed explanation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResizablePanelGroup direction="horizontal" className="min-h-[400px] border rounded-md">
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="h-full p-4 overflow-auto">
                    <h2 className="text-lg font-semibold mb-2">Code</h2>
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto">
                      <code>{generatedCode}</code>
                    </pre>
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="h-full p-4 overflow-auto">
                    <h2 className="text-lg font-semibold mb-2">Explanation</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      {explanation.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line.startsWith("##") ? (
                            <h2>{line.replace("##", "").trim()}</h2>
                          ) : line.startsWith("###") ? (
                            <h3>{line.replace("###", "").trim()}</h3>
                          ) : line.startsWith("-") || line.startsWith("*") ? (
                            <li>{line.replace(/^[*-]\s/, "")}</li>
                          ) : line.trim() === "" ? (
                            <br />
                          ) : line.includes(":") && !line.includes(":") ? (
                            <p>
                              <strong>{line.split(":")[0]}:</strong>
                              {line.split(":").slice(1).join(":")}
                            </p>
                          ) : (
                            <p>{line}</p>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default CodeGenerator;
