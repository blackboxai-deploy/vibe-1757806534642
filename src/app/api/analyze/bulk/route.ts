import { NextRequest, NextResponse } from 'next/server';
import { biasDetectionEngine } from '@/lib/bias-detection/BiasDetectionEngine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contents, analysisType = 'comprehensive' } = body;

    if (!Array.isArray(contents)) {
      return NextResponse.json(
        { error: 'Contents must be an array of strings' },
        { status: 400 }
      );
    }

    if (contents.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 documents per bulk request' },
        { status: 400 }
      );
    }

    // Validate each content item
    for (let i = 0; i < contents.length; i++) {
      if (typeof contents[i] !== 'string') {
        return NextResponse.json(
          { error: `Content at index ${i} must be a string` },
          { status: 400 }
        );
      }
      if (contents[i].length > 50000) {
        return NextResponse.json(
          { error: `Content at index ${i} exceeds maximum length of 50,000 characters` },
          { status: 400 }
        );
      }
    }

    const startTime = Date.now();
    
    // Process all documents in parallel
    const results = await Promise.all(
      contents.map(async (content: string, index: number) => {
        try {
          const analysis = await biasDetectionEngine.analyzeText(content);
          return {
            index,
            success: true,
            result: analysis
          };
        } catch (error) {
          return {
            index,
            success: false,
            error: `Analysis failed for document ${index}: ${error}`
          };
        }
      })
    );

    const processingTime = Date.now() - startTime;
    const successfulResults = results.filter(r => r.success);
    const failedResults = results.filter(r => !r.success);

    // Calculate aggregate statistics
    const aggregateStats = {
      totalDocuments: contents.length,
      successful: successfulResults.length,
      failed: failedResults.length,
      averageBiasScore: successfulResults.length > 0 
        ? successfulResults.reduce((sum, r) => sum + (r.result?.overallScore || 0), 0) / successfulResults.length
        : 0,
      totalBiasesFound: successfulResults.reduce((sum, r) => 
        sum + (r.result?.summary?.totalBiasesDetected || 0), 0
      ),
      processingTimeMs: processingTime
    };

    return NextResponse.json({
      results,
      aggregateStats,
      metadata: {
        analysisType,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Bulk analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error during bulk analysis' },
      { status: 500 }
    );
  }
}