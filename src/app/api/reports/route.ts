import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    const reportType = searchParams.get('type') || 'overview';

    // Mock data for demonstration - in production, this would come from a database
    const mockReports = [
      {
        id: 1,
        title: "Q4 2024 Company-wide Bias Assessment",
        type: "Comprehensive",
        date: "2024-10-15",
        score: 91,
        documents: 312,
        issues: 18,
        status: "completed",
        departments: ["HR", "Marketing", "Legal", "Engineering"],
        criticalIssues: 2,
        resolvedIssues: 16
      },
      {
        id: 2,
        title: "HR Job Postings Audit - October",
        type: "HR Focus",
        date: "2024-10-01", 
        score: 94,
        documents: 67,
        issues: 5,
        status: "completed",
        departments: ["HR"],
        criticalIssues: 0,
        resolvedIssues: 5
      },
      {
        id: 3,
        title: "Marketing Campaign Review - Fall 2024",
        type: "Marketing",
        date: "2024-09-28",
        score: 82,
        documents: 189,
        issues: 28,
        status: "completed",
        departments: ["Marketing"],
        criticalIssues: 3,
        resolvedIssues: 25
      }
    ];

    const mockTrends = [
      { month: 'May', score: 85, issues: 45, documents: 156 },
      { month: 'Jun', score: 87, issues: 38, documents: 178 },
      { month: 'Jul', score: 89, issues: 32, documents: 203 },
      { month: 'Aug', score: 88, issues: 29, documents: 189 },
      { month: 'Sep', score: 91, issues: 25, documents: 234 },
      { month: 'Oct', score: 93, issues: 18, documents: 268 }
    ];

    const mockDepartmentStats = {
      "HR": { score: 94, issues: 5, documents: 67 },
      "Marketing": { score: 82, issues: 28, documents: 189 },
      "Legal": { score: 96, issues: 8, documents: 45 },
      "Engineering": { score: 90, issues: 12, documents: 78 },
      "Sales": { score: 86, issues: 19, documents: 95 },
      "Operations": { score: 92, issues: 7, documents: 52 }
    };

    const mockBiasTypeDistribution = {
      "Gender": 35,
      "Racial/Ethnic": 28,
      "Age": 18,
      "Disability": 12,
      "Cultural": 7
    };

    // Filter reports based on time range
    const filteredReports = mockReports.filter(report => {
      const reportDate = new Date(report.date);
      const now = new Date();
      const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      return reportDate >= cutoffDate;
    });

    // Calculate summary statistics
    const summary = {
      totalReports: filteredReports.length,
      averageScore: filteredReports.reduce((sum, r) => sum + r.score, 0) / filteredReports.length || 0,
      totalDocuments: filteredReports.reduce((sum, r) => sum + r.documents, 0),
      totalIssues: filteredReports.reduce((sum, r) => sum + r.issues, 0),
      criticalIssues: filteredReports.reduce((sum, r) => sum + r.criticalIssues, 0),
      resolvedIssues: filteredReports.reduce((sum, r) => sum + r.resolvedIssues, 0),
      resolutionRate: filteredReports.length > 0 ? 
        (filteredReports.reduce((sum, r) => sum + r.resolvedIssues, 0) / 
         filteredReports.reduce((sum, r) => sum + r.issues, 0)) * 100 : 0
    };

    return NextResponse.json({
      reports: filteredReports,
      trends: mockTrends,
      departmentStats: mockDepartmentStats,
      biasTypeDistribution: mockBiasTypeDistribution,
      summary,
      metadata: {
        timeRange,
        reportType,
        generatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Reports API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      type, 
      departments = [], 
      timeRange = '30d' 
    } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      );
    }

    // Generate report based on provided analysis results
    const newReport = {
      id: Date.now(), // In production, use proper ID generation
      title,
      type,
      date: new Date().toISOString().split('T')[0],
      departments,
      timeRange,
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    // In production, save to database and trigger report generation
    
    return NextResponse.json({
      message: 'Report generation initiated',
      report: newReport,
      estimatedCompletionTime: '5-10 minutes'
    }, { status: 201 });

  } catch (error) {
    console.error('Report creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error during report creation' },
      { status: 500 }
    );
  }
}