import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    if (content.length > 10000) {
      return NextResponse.json(
        { error: 'Content exceeds maximum length of 10,000 characters for quick scan' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    
    // Simple bias patterns for quick scanning
    const quickPatterns = {
      gender: [
        /\b(he|she|him|her|his|hers|guys?|girls?|ladies|gentlemen)\b/gi,
        /\b(manpower|manhole|mankind)\b/gi
      ],
      racial: [
        /\b(articulate|well-spoken|urban|ghetto|exotic)\b/gi,
        /\b(you people|your kind|all \w+ are)\b/gi
      ],
      age: [
        /\b(too old|too young|digital native|boomer|millennial)\b/gi,
        /\b(young blood|old guard|senior moment)\b/gi
      ],
      disability: [
        /\b(crazy|insane|lame|retarded|psycho|dumb|stupid)\b/gi,
        /\b(normal person|handicapped|suffers from)\b/gi
      ]
    };

    const results: any = {
      overallRisk: 'low',
      biasScore: 0,
      detectedIssues: [],
      quickStats: {
        genderTerms: 0,
        racialTerms: 0,
        ageTerms: 0,
        disabilityTerms: 0
      }
    };

    let totalMatches = 0;

    // Quick pattern matching
    Object.entries(quickPatterns).forEach(([type, patterns]) => {
      patterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          const matchCount = matches.length;
          totalMatches += matchCount;
          results.quickStats[`${type}Terms` as keyof typeof results.quickStats] += matchCount;
          
          matches.forEach(match => {
            results.detectedIssues.push({
              type,
              term: match,
              severity: 'medium'
            });
          });
        }
      });
    });

    // Calculate quick risk assessment
    const wordCount = content.split(/\s+/).length;
    const riskRatio = totalMatches / Math.max(wordCount, 1) * 100;
    
    results.biasScore = Math.min(riskRatio * 10, 100);
    
    if (riskRatio > 5) {
      results.overallRisk = 'high';
    } else if (riskRatio > 2) {
      results.overallRisk = 'medium';
    } else {
      results.overallRisk = 'low';
    }

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      ...results,
      metadata: {
        contentLength: content.length,
        wordCount,
        processingTimeMs: processingTime,
        timestamp: new Date().toISOString(),
        scanType: 'quick',
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Quick scan error:', error);
    return NextResponse.json(
      { error: 'Internal server error during quick scan' },
      { status: 500 }
    );
  }
}