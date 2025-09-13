import { NextRequest, NextResponse } from 'next/server';
import { biasDetectionEngine } from '@/lib/bias-detection/BiasDetectionEngine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, analysisType = 'comprehensive' } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    if (content.length > 50000) {
      return NextResponse.json(
        { error: 'Content exceeds maximum length of 50,000 characters' },
        { status: 400 }
      );
    }

    // Perform bias analysis
    const startTime = Date.now();
    const results = await biasDetectionEngine.analyzeText(content);
    const processingTime = Date.now() - startTime;

    // Add metadata
    const response = {
      ...results,
      metadata: {
        contentLength: content.length,
        wordCount: content.split(/\s+/).length,
        analysisType,
        processingTimeMs: processingTime,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error during analysis' },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'Bias Detection API is running',
    version: '1.0.0',
    endpoints: {
      analyze: 'POST /api/analyze',
      bulk: 'POST /api/analyze/bulk',
      quick: 'POST /api/analyze/quick'
    },
    supportedAnalysisTypes: [
      'comprehensive',
      'hiring',
      'marketing', 
      'legal',
      'academic',
      'quick'
    ]
  });
}