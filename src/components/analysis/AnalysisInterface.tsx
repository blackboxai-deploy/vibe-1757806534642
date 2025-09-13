"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { biasDetectionEngine, BiasAnalysisResult, BiasResult } from "@/lib/bias-detection/BiasDetectionEngine";

export function AnalysisInterface() {
  const [content, setContent] = useState("");
  const [analysisType, setAnalysisType] = useState("comprehensive");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<BiasAnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleAnalysis = async () => {
    if (!content.trim() && !file) return;
    
    setIsAnalyzing(true);
    try {
      let textToAnalyze = content;
      
      if (file) {
        textToAnalyze = await readFileContent(file);
      }
      
      const analysisResults = await biasDetectionEngine.analyzeText(textToAnalyze);
      setResults(analysisResults);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-200 border-red-600/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Bias Analysis Interface</h1>
        <p className="text-slate-400 mt-1">Analyze content for potential bias using advanced AI algorithms</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Content Input</CardTitle>
              <CardDescription className="text-gray-300">
                Enter text or upload a document for bias analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                  <TabsTrigger value="text" className="text-white">Text Input</TabsTrigger>
                  <TabsTrigger value="file" className="text-white">File Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label htmlFor="content" className="text-white">Content to Analyze</Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your text here for bias analysis..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[200px] bg-slate-900/50 border-slate-600 text-white placeholder-gray-400 mt-2"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      {content.length} characters • {Math.ceil(content.length / 5)} words
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="file" className="space-y-4">
                  <div>
                    <Label htmlFor="file" className="text-white">Upload Document</Label>
                    <input
                      id="file"
                      type="file"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full mt-2 text-white bg-slate-900/50 border border-slate-600 rounded p-2"
                    />
                    {file && (
                      <p className="text-sm text-green-400 mt-2">
                        File selected: {file.name} ({Math.round(file.size / 1024)}KB)
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div>
                <Label htmlFor="analysis-type" className="text-white">Analysis Type</Label>
                <select 
                  id="analysis-type"
                  value={analysisType} 
                  onChange={(e) => setAnalysisType(e.target.value)}
                  className="w-full mt-2 bg-slate-900/50 border border-slate-600 rounded px-3 py-2 text-white"
                >
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="hiring">HR/Recruitment Focus</option>
                  <option value="marketing">Marketing Content</option>
                  <option value="legal">Legal Documents</option>
                  <option value="academic">Academic Content</option>
                  <option value="quick">Quick Scan</option>
                </select>
              </div>

              <Button 
                onClick={handleAnalysis} 
                disabled={(!content.trim() && !file) || isAnalyzing}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Content"}
              </Button>
            </CardContent>
          </Card>

          {/* Sample Texts */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Test Samples</CardTitle>
              <CardDescription className="text-gray-300">
                Try these sample texts to see the bias detection in action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-left justify-start text-white border-slate-600 hover:bg-slate-700"
                onClick={() => setContent("We are looking for a young, energetic individual who can think outside the box. The ideal candidate should be a digital native who can hit the ground running. Must be able to work long hours and handle pressure like a rockstar.")}
              >
                Job Posting Example
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-left justify-start text-white border-slate-600 hover:bg-slate-700"
                onClick={() => setContent("That's crazy! The new policy is completely insane and lame. We need normal people to review this, not someone having a senior moment. This is retarded thinking that only a psycho would approve.")}
              >
                Problematic Language
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-left justify-start text-white border-slate-600 hover:bg-slate-700"
                onClick={() => setContent("Our diverse team includes professionals from all backgrounds who bring unique perspectives to our inclusive workplace. We value equity, accessibility, and respect for all individuals regardless of their identity or circumstances.")}
              >
                Inclusive Example
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* Overall Score */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Analysis Results</CardTitle>
                  <CardDescription className="text-gray-300">
                    Overall bias detection score and summary
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getScoreColor(results.overallScore)}`}>
                        {Math.round(results.overallScore)}
                      </div>
                      <p className="text-gray-300 mt-2">Bias-Free Score</p>
                      <Progress 
                        value={results.overallScore} 
                        className="mt-4 bg-slate-700"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">{results.summary.totalBiasesDetected}</div>
                        <p className="text-sm text-gray-400">Issues Found</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-400">{results.summary.severityBreakdown.critical || 0}</div>
                        <p className="text-sm text-gray-400">Critical Issues</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Severity Breakdown */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Severity Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(results.summary.severityBreakdown).map(([severity, count]) => (
                      <div key={severity} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(severity)}>
                            {severity}
                          </Badge>
                        </div>
                        <span className="text-white font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Detailed Issues</CardTitle>
                  <CardDescription className="text-gray-300">
                    Specific bias instances found in the content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {results.biasResults.length > 0 ? (
                      results.biasResults.map((bias: BiasResult, index: number) => (
                        <div key={index} className="border border-slate-600 rounded-lg p-4 bg-slate-900/30">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={getSeverityColor(bias.severity)}>
                                {bias.severity}
                              </Badge>
                              <Badge variant="outline" className="text-gray-300 border-gray-600">
                                {bias.type}
                              </Badge>
                            </div>
                            <span className="text-sm text-gray-400">
                              {Math.round(bias.confidence * 100)}% confidence
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-white font-medium mb-1">Found: "{bias.location.text}"</p>
                            <p className="text-gray-300 text-sm">{bias.explanation}</p>
                          </div>
                          
                          {bias.suggestions.length > 0 && (
                            <div>
                              <p className="text-gray-400 text-xs mb-1">Suggestions:</p>
                              <div className="flex flex-wrap gap-1">
                                {bias.suggestions.slice(0, 3).map((suggestion, i) => (
                                  <Badge key={i} variant="outline" className="text-green-400 border-green-600 text-xs">
                                    {suggestion}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-green-400 text-lg font-medium">🎉 No bias detected!</p>
                        <p className="text-gray-400 text-sm mt-1">This content appears to be bias-free</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              {results.recommendations.length > 0 && (
                <Alert className="bg-blue-900/30 border-blue-600">
                  <AlertDescription className="text-blue-300">
                    <strong>Recommendations:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      {results.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="flex flex-col items-center justify-center h-64">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-medium mb-2">Ready for Analysis</h3>
                  <p className="text-sm">Enter text or upload a file to begin bias detection</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}