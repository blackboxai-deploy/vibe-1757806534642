"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export function Dashboard() {
  const biasStatsData = [
    { name: 'Gender', detected: 23, resolved: 20 },
    { name: 'Racial', detected: 15, resolved: 12 },
    { name: 'Age', detected: 8, resolved: 7 },
    { name: 'Disability', detected: 12, resolved: 10 },
    { name: 'Religious', detected: 5, resolved: 4 },
    { name: 'Socioeconomic', detected: 9, resolved: 8 }
  ];

  const severityData = [
    { name: 'Low', value: 45, color: '#10B981' },
    { name: 'Medium', value: 28, color: '#F59E0B' },
    { name: 'High', value: 18, color: '#EF4444' },
    { name: 'Critical', value: 9, color: '#DC2626' }
  ];

  const trendData = [
    { month: 'Jan', biasScore: 85 },
    { month: 'Feb', biasScore: 87 },
    { month: 'Mar', biasScore: 82 },
    { month: 'Apr', biasScore: 91 },
    { month: 'May', biasScore: 94 },
    { month: 'Jun', biasScore: 96 }
  ];

  const recentAnalyses = [
    {
      id: 1,
      title: "HR Job Posting - Senior Developer",
      score: 92,
      biasesFound: 2,
      severity: "low",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Marketing Campaign - Product Launch",
      score: 76,
      biasesFound: 5,
      severity: "medium",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      title: "Company Policy Document",
      score: 58,
      biasesFound: 12,
      severity: "high",
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      title: "Website Content - About Us",
      score: 94,
      biasesFound: 1,
      severity: "low",
      timestamp: "1 day ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-200 border-red-600/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Ethics Dashboard</h1>
          <p className="text-slate-400 mt-1">Monitor bias detection and ethics compliance across your organization</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-slate-400">Overall Ethics Score</p>
            <p className="text-2xl font-bold text-green-400">94.3%</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A+</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-200 text-sm">Total Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,247</div>
            <p className="text-xs text-green-400 mt-1">↗ +12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-200 text-sm">Biases Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">89</div>
            <p className="text-xs text-red-400 mt-1">↗ +8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-200 text-sm">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">96.8%</div>
            <p className="text-xs text-green-400 mt-1">↗ +3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-200 text-sm">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">2.3s</div>
            <p className="text-xs text-green-400 mt-1">↘ -15% faster</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bias Types Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Bias Detection by Category</CardTitle>
            <CardDescription className="text-slate-400">
              Detected vs Resolved biases across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biasStatsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }} 
                  />
                  <Bar dataKey="detected" fill="#EF4444" name="Detected" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="#10B981" name="Resolved" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Bias Severity Distribution</CardTitle>
            <CardDescription className="text-slate-400">
              Breakdown of bias severity levels detected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
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

      {/* Trend Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Ethics Score Trend</CardTitle>
          <CardDescription className="text-slate-400">
            Overall bias detection score improvement over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
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
                  dataKey="biasScore" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Analyses */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Recent Analyses</CardTitle>
          <CardDescription className="text-slate-400">
            Latest bias detection scans and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-600">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{analysis.title}</h4>
                  <p className="text-sm text-slate-400 mt-1">{analysis.timestamp}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Score</p>
                    <p className="font-semibold text-white">{analysis.score}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Biases</p>
                    <p className="font-semibold text-white">{analysis.biasesFound}</p>
                  </div>
                  <Badge className={getSeverityColor(analysis.severity)}>
                    {analysis.severity}
                  </Badge>
                  <Progress 
                    value={analysis.score} 
                    className="w-24"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}