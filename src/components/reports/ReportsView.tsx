"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export function ReportsView() {
  const [timeRange, setTimeRange] = useState("30d");
  const [reportType, setReportType] = useState("overview");

  // Mock data for reports
  const reportHistory = [
    {
      id: 1,
      title: "Q3 2024 Company-wide Bias Assessment",
      type: "Comprehensive",
      date: "2024-09-15",
      score: 87,
      documents: 247,
      issues: 23,
      status: "completed"
    },
    {
      id: 2,
      title: "HR Job Postings Audit - September",
      type: "HR Focus",
      date: "2024-09-01", 
      score: 92,
      documents: 45,
      issues: 8,
      status: "completed"
    },
    {
      id: 3,
      title: "Marketing Campaign Review",
      type: "Marketing",
      date: "2024-08-28",
      score: 78,
      documents: 156,
      issues: 34,
      status: "completed"
    },
    {
      id: 4,
      title: "Legal Document Compliance Check",
      type: "Legal",
      date: "2024-08-15",
      score: 94,
      documents: 89,
      issues: 12,
      status: "completed"
    }
  ];

  const trendData = [
    { month: 'Apr', score: 82, issues: 45 },
    { month: 'May', score: 85, issues: 38 },
    { month: 'Jun', score: 88, issues: 32 },
    { month: 'Jul', score: 86, issues: 29 },
    { month: 'Aug', score: 89, issues: 25 },
    { month: 'Sep', score: 91, issues: 18 }
  ];

  const biasTypeData = [
    { name: 'Gender', value: 35, color: '#EF4444' },
    { name: 'Racial/Ethnic', value: 28, color: '#F59E0B' },
    { name: 'Age', value: 18, color: '#10B981' },
    { name: 'Disability', value: 12, color: '#3B82F6' },
    { name: 'Cultural', value: 7, color: '#8B5CF6' }
  ];

  const departmentData = [
    { department: 'HR', score: 92, issues: 8 },
    { department: 'Marketing', score: 78, issues: 34 },
    { department: 'Legal', score: 94, issues: 12 },
    { department: 'Engineering', score: 88, issues: 15 },
    { department: 'Sales', score: 83, issues: 22 },
    { department: 'Operations', score: 91, issues: 9 }
  ];

  // const generateReport = async (type: string) => {
  //   // Simulate report generation
  //   console.log(`Generating ${type} report...`);
  // };

  // const exportReport = (format: string, reportId: number) => {
  //   // Simulate report export
  //   console.log(`Exporting report ${reportId} as ${format}`);
  // };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Processing</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Ethics Audit Reports</h1>
          <p className="text-slate-400 mt-1">Comprehensive bias detection reports and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-slate-800/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Generate New Report
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
          <TabsTrigger value="detailed" className="text-white">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="trends" className="text-white">Trends</TabsTrigger>
          <TabsTrigger value="export" className="text-white">Export & Share</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-200 text-sm">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{reportHistory.length}</div>
                <p className="text-xs text-green-400 mt-1">+2 this month</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-200 text-sm">Avg. Bias Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">88.5</div>
                <p className="text-xs text-green-400 mt-1">↗ +3.2 improvement</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-200 text-sm">Documents Analyzed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">537</div>
                <p className="text-xs text-blue-400 mt-1">Last 30 days</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-200 text-sm">Issues Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">94%</div>
                <p className="text-xs text-green-400 mt-1">Resolution rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Report History */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Reports</CardTitle>
              <CardDescription className="text-gray-300">
                Latest bias detection reports and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportHistory.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{report.title}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-400">
                        <span>Type: {report.type}</span>
                        <span>Date: {report.date}</span>
                        <span>{report.documents} documents</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Score</p>
                        <p className={`font-semibold ${getScoreColor(report.score)}`}>{report.score}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Issues</p>
                        <p className="font-semibold text-white">{report.issues}</p>
                      </div>
                      {getStatusBadge(report.status)}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-slate-600 hover:bg-slate-700">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-slate-600 hover:bg-slate-700">
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed Analysis Tab */}
        <TabsContent value="detailed" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Department Breakdown */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Department Analysis</CardTitle>
                <CardDescription className="text-gray-300">
                  Bias scores by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="department" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                      <Bar dataKey="score" fill="#10B981" name="Bias Score" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bias Type Distribution */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Bias Type Distribution</CardTitle>
                <CardDescription className="text-gray-300">
                  Types of bias detected across all reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={biasTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {biasTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Issues Table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Top Issues Across Reports</CardTitle>
              <CardDescription className="text-gray-300">
                Most common bias patterns detected in recent analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { issue: "Gendered language in job descriptions", frequency: 23, severity: "medium" },
                  { issue: "Age-related assumptions in requirements", frequency: 18, severity: "high" },
                  { issue: "Cultural bias in marketing copy", frequency: 15, severity: "medium" },
                  { issue: "Ableist language in policies", frequency: 12, severity: "high" },
                  { issue: "Socioeconomic assumptions", frequency: 9, severity: "low" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded bg-slate-900/50">
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.issue}</p>
                      <p className="text-sm text-gray-400">Found {item.frequency} times</p>
                    </div>
                    <Badge className={
                      item.severity === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                      item.severity === 'medium' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                      'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }>
                      {item.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Bias Score Trends</CardTitle>
              <CardDescription className="text-gray-300">
                Track improvement in bias detection scores over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      name="Bias-Free Score"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="issues" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                      name="Issues Detected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Export Options</CardTitle>
                <CardDescription className="text-gray-300">
                  Download reports in various formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    📄 Export as PDF
                  </Button>
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    📊 Export as Excel
                  </Button>
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    📋 Export as CSV
                  </Button>
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    🔗 Generate Shareable Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Scheduled Reports</CardTitle>
                <CardDescription className="text-gray-300">
                  Set up automated report generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded bg-slate-900/50">
                    <div>
                      <p className="text-white font-medium">Weekly Summary</p>
                      <p className="text-sm text-gray-400">Every Monday at 9:00 AM</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-slate-900/50">
                    <div>
                      <p className="text-white font-medium">Monthly Report</p>
                      <p className="text-sm text-gray-400">First day of each month</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Add New Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}