export interface BiasResult {
  type: BiasType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  location: {
    start: number;
    end: number;
    text: string;
  };
  explanation: string;
  suggestions: string[];
  category: BiasCategory;
}

export interface BiasAnalysisResult {
  overallScore: number;
  biasResults: BiasResult[];
  summary: {
    totalBiasesDetected: number;
    severityBreakdown: Record<string, number>;
    categoryBreakdown: Record<string, number>;
  };
  recommendations: string[];
}

export enum BiasType {
  GENDER = 'gender',
  RACIAL = 'racial',
  AGE = 'age',
  RELIGIOUS = 'religious',
  SOCIOECONOMIC = 'socioeconomic',
  DISABILITY = 'disability',
  SEXUAL_ORIENTATION = 'sexual_orientation',
  CULTURAL = 'cultural',
  POLITICAL = 'political',
  APPEARANCE = 'appearance'
}

export enum BiasCategory {
  LANGUAGE = 'language',
  REPRESENTATION = 'representation',
  ALGORITHMIC = 'algorithmic',
  VISUAL = 'visual',
  STATISTICAL = 'statistical'
}

class BiasDetectionEngine {
  private genderBiasPatterns: RegExp[] = [
    /\b(he|she|him|her|his|hers)\b(?=.*\b(leader|manager|engineer|doctor|nurse|teacher)\b)/gi,
    /\b(man|woman|male|female|boy|girl|guy|gal)\b(?=.*\b(should|must|always|never)\b)/gi,
    /\b(manpower|manhole|mankind|man-made|man up|throw like a girl|boys will be boys)\b/gi,
    /\b(femal[ae] doctor|male nurse|woman driver|lady boss)\b/gi
  ];

  private racialBiasPatterns: RegExp[] = [
    /\b(articulate|well-spoken|clean|exotic|urban|ghetto|thug|primitive|savage)\b/gi,
    /\b(you people|your kind|one of the good ones|not like other)\b/gi,
    /\b(Oriental|colored|negro|tribe|clan)\b/gi,
    /\b(all \w+ are|typical \w+|so \w+|very \w+)\b/gi
  ];

  private ageismPatterns: RegExp[] = [
    /\b(too old|too young|over the hill|past prime|digital native|boomer|millennial snowflake)\b/gi,
    /\b(young blood|fresh blood|old guard|dinosaur|fossil)\b/gi,
    /\b(retirement age|senior moment|kiddo|sweetie|honey)\b/gi
  ];

  private ableismPatterns: RegExp[] = [
    /\b(crazy|insane|psycho|retarded|lame|blind to|deaf to|dumb|stupid)\b/gi,
    /\b(normal person|able-bodied|handicapped|wheelchair-bound|suffers from|victim of)\b/gi,
    /\b(special needs|differently abled|invalid|crippled)\b/gi
  ];

  private socioeconomicPatterns: RegExp[] = [
    /\b(trailer trash|ghetto|hood|low class|high class|white trash|redneck)\b/gi,
    /\b(privileged|entitled|silver spoon|welfare|food stamps|handout)\b/gi,
    /\b(homeless|vagrant|bum|deadbeat|white collar|blue collar)\b/gi
  ];

  private religiousBiasPatterns: RegExp[] = [
    /\b(radical|extremist|fanatic|cult|sect|infidel|heathen)\b/gi,
    /\b(Christmas person|real American|God-fearing|biblical values|moral majority)\b/gi,
    /\b(holy war|crusade|jihad|chosen people|promised land)\b/gi
  ];

  public async analyzeText(text: string): Promise<BiasAnalysisResult> {
    const biasResults: BiasResult[] = [];

    // Gender bias detection
    biasResults.push(...this.detectGenderBias(text));
    
    // Racial bias detection
    biasResults.push(...this.detectRacialBias(text));
    
    // Age bias detection
    biasResults.push(...this.detectAgeism(text));
    
    // Disability bias detection
    biasResults.push(...this.detectAbleism(text));
    
    // Socioeconomic bias detection
    biasResults.push(...this.detectSocioeconomicBias(text));
    
    // Religious bias detection
    biasResults.push(...this.detectReligiousBias(text));

    // Calculate overall score (0-100, where 100 is completely unbiased)
    const overallScore = this.calculateOverallScore(biasResults, text.length);

    // Generate summary
    const summary = this.generateSummary(biasResults);

    // Generate recommendations
    const recommendations = this.generateRecommendations(biasResults);

    return {
      overallScore,
      biasResults,
      summary,
      recommendations
    };
  }

  private detectGenderBias(text: string): BiasResult[] {
    return this.detectPatterns(text, this.genderBiasPatterns, BiasType.GENDER, BiasCategory.LANGUAGE);
  }

  private detectRacialBias(text: string): BiasResult[] {
    return this.detectPatterns(text, this.racialBiasPatterns, BiasType.RACIAL, BiasCategory.LANGUAGE);
  }

  private detectAgeism(text: string): BiasResult[] {
    return this.detectPatterns(text, this.ageismPatterns, BiasType.AGE, BiasCategory.LANGUAGE);
  }

  private detectAbleism(text: string): BiasResult[] {
    return this.detectPatterns(text, this.ableismPatterns, BiasType.DISABILITY, BiasCategory.LANGUAGE);
  }

  private detectSocioeconomicBias(text: string): BiasResult[] {
    return this.detectPatterns(text, this.socioeconomicPatterns, BiasType.SOCIOECONOMIC, BiasCategory.LANGUAGE);
  }

  private detectReligiousBias(text: string): BiasResult[] {
    return this.detectPatterns(text, this.religiousBiasPatterns, BiasType.RELIGIOUS, BiasCategory.LANGUAGE);
  }

  private detectPatterns(text: string, patterns: RegExp[], type: BiasType, category: BiasCategory): BiasResult[] {
    const results: BiasResult[] = [];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const matchText = match[0];
        const severity = this.calculateSeverity(matchText, type);
        const confidence = this.calculateConfidence(matchText, match.index, text);
        
        results.push({
          type,
          severity,
          confidence,
          location: {
            start: match.index,
            end: match.index + matchText.length,
            text: matchText
          },
          explanation: this.getExplanation(matchText, type),
          suggestions: this.getSuggestions(matchText, type),
          category
        });
      }
    });

    return results;
  }

  private calculateSeverity(matchText: string, type: BiasType): 'low' | 'medium' | 'high' | 'critical' {
    // High severity terms
    const highSeverityTerms = [
      'retarded', 'psycho', 'crazy', 'insane', 'savage', 'primitive', 
      'thug', 'ghetto', 'trailer trash', 'white trash'
    ];
    
    // Critical severity terms
    const criticalSeverityTerms = [
      'negro', 'colored', 'oriental', 'mankind', 'manhole'
    ];

    const lowerText = matchText.toLowerCase();
    
    if (criticalSeverityTerms.some(term => lowerText.includes(term))) {
      return 'critical';
    }
    
    if (highSeverityTerms.some(term => lowerText.includes(term))) {
      return 'high';
    }
    
    // Context-based severity calculation
    if (type === BiasType.GENDER && (lowerText.includes('should') || lowerText.includes('must'))) {
      return 'high';
    }
    
    return Math.random() > 0.5 ? 'medium' : 'low';
  }

  private calculateConfidence(matchText: string, position: number, fullText: string): number {
    // Base confidence
    let confidence = 0.7;
    
    // Increase confidence for exact matches
    const exactMatches = ['mankind', 'manhole', 'manpower', 'retarded', 'psycho'];
    if (exactMatches.includes(matchText.toLowerCase())) {
      confidence = 0.95;
    }
    
    // Context analysis
    const contextWindow = 50;
    const start = Math.max(0, position - contextWindow);
    const end = Math.min(fullText.length, position + matchText.length + contextWindow);
    const context = fullText.slice(start, end).toLowerCase();
    
    // Increase confidence if surrounded by relevant context
    if (context.includes('hire') || context.includes('employ') || context.includes('job')) {
      confidence += 0.1;
    }
    
    return Math.min(0.99, confidence);
  }

  private getExplanation(matchText: string, type: BiasType): string {
    const explanations: Record<BiasType, Record<string, string>> = {
      [BiasType.GENDER]: {
        default: `The term "${matchText}" may reinforce gender stereotypes or exclude certain genders from consideration.`,
        'mankind': 'The term "mankind" excludes women and non-binary individuals. Consider using "humanity" or "humankind" instead.',
        'manhole': 'The term "manhole" is gendered. Consider using "maintenance hole" or "utility access" instead.'
      },
      [BiasType.RACIAL]: {
        default: `The term "${matchText}" may perpetuate racial stereotypes or carry historical discriminatory connotations.`,
        'articulate': 'Describing someone as "articulate" can imply surprise that they speak well, often used inappropriately for people of color.',
        'urban': 'The term "urban" is often used as a coded reference to race, particularly Black communities.'
      },
      [BiasType.AGE]: {
        default: `The term "${matchText}" may perpetuate age-based stereotypes or discrimination.`,
        'digital native': 'This term creates an artificial divide between age groups regarding technology comfort.',
        'senior moment': 'This phrase stereotypes older adults as forgetful or less capable.'
      },
      [BiasType.DISABILITY]: {
        default: `The term "${matchText}" may be offensive to people with disabilities or perpetuate harmful stereotypes.`,
        'crazy': 'Using "crazy" to mean bad or unreasonable stigmatizes mental health conditions.',
        'lame': 'Using "lame" as a negative descriptor is offensive to people with mobility disabilities.'
      },
      [BiasType.SOCIOECONOMIC]: {
        default: `The term "${matchText}" may reinforce class-based stereotypes or economic discrimination.`
      },
      [BiasType.RELIGIOUS]: {
        default: `The term "${matchText}" may promote religious intolerance or stereotyping.`
      },
      [BiasType.SEXUAL_ORIENTATION]: {
        default: `The term "${matchText}" may perpetuate stereotypes about sexual orientation.`
      },
      [BiasType.CULTURAL]: {
        default: `The term "${matchText}" may promote cultural stereotypes or ethnocentrism.`
      },
      [BiasType.POLITICAL]: {
        default: `The term "${matchText}" may show political bias or partisanship.`
      },
      [BiasType.APPEARANCE]: {
        default: `The term "${matchText}" may promote appearance-based discrimination.`
      }
    };

    const typeExplanations = explanations[type];
    return typeExplanations[matchText.toLowerCase()] || typeExplanations.default;
  }

  private getSuggestions(matchText: string, type: BiasType): string[] {
    const suggestions: Record<string, string[]> = {
      'mankind': ['humanity', 'humankind', 'people', 'human beings'],
      'manhole': ['maintenance hole', 'utility access', 'access hole'],
      'manpower': ['workforce', 'personnel', 'human resources', 'staff'],
      'crazy': ['unreasonable', 'illogical', 'problematic', 'concerning'],
      'lame': ['ineffective', 'weak', 'poor', 'inadequate'],
      'articulate': ['well-spoken', 'eloquent', 'clear communicator'],
      'urban': ['city-based', 'metropolitan', 'inner-city (if geographic)'],
      'digital native': ['tech-savvy', 'comfortable with technology'],
      'senior moment': ['momentary lapse', 'brief forgetfulness'],
      'retarded': ['delayed', 'slow', 'behind schedule'],
      'psycho': ['erratic', 'unpredictable', 'concerning behavior']
    };

    return suggestions[matchText.toLowerCase()] || [
      `Consider rephrasing "${matchText}"`,
      'Use more inclusive language',
      'Consider the impact of this word choice'
    ];
  }

  private calculateOverallScore(biasResults: BiasResult[], textLength: number): number {
    if (biasResults.length === 0) return 100;

    let totalPenalty = 0;
    biasResults.forEach(result => {
      const severityWeight = {
        'low': 1,
        'medium': 3,
        'high': 7,
        'critical': 15
      };
      totalPenalty += severityWeight[result.severity] * result.confidence;
    });

    // Normalize by text length (per 100 words)
    const wordsCount = textLength / 5; // Rough word count estimation
    const normalizedPenalty = (totalPenalty / wordsCount) * 100;
    
    return Math.max(0, 100 - normalizedPenalty);
  }

  private generateSummary(biasResults: BiasResult[]) {
    const severityBreakdown: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };

    const categoryBreakdown: Record<string, number> = {};

    biasResults.forEach(result => {
      severityBreakdown[result.severity]++;
      categoryBreakdown[result.category] = (categoryBreakdown[result.category] || 0) + 1;
    });

    return {
      totalBiasesDetected: biasResults.length,
      severityBreakdown,
      categoryBreakdown
    };
  }

  private generateRecommendations(biasResults: BiasResult[]): string[] {
    const recommendations = new Set<string>();

    if (biasResults.length === 0) {
      recommendations.add('Great job! No significant bias detected in this content.');
      return Array.from(recommendations);
    }

    // General recommendations based on bias types found
    const biasTypes = new Set(biasResults.map(r => r.type));
    
    if (biasTypes.has(BiasType.GENDER)) {
      recommendations.add('Consider using gender-neutral language and avoiding assumptions about gender roles.');
    }
    
    if (biasTypes.has(BiasType.RACIAL)) {
      recommendations.add('Review content for racial stereotypes and coded language that may exclude or marginalize racial groups.');
    }
    
    if (biasTypes.has(BiasType.AGE)) {
      recommendations.add('Ensure content does not discriminate based on age or perpetuate ageist stereotypes.');
    }
    
    if (biasTypes.has(BiasType.DISABILITY)) {
      recommendations.add('Use person-first language and avoid terms that stigmatize disabilities or mental health conditions.');
    }

    // Severity-based recommendations
    const hasCritical = biasResults.some(r => r.severity === 'critical');
    const hasHigh = biasResults.some(r => r.severity === 'high');

    if (hasCritical) {
      recommendations.add('URGENT: Critical bias issues detected. Immediate revision required before publication.');
    } else if (hasHigh) {
      recommendations.add('High-priority bias issues found. Strong recommendation to revise before proceeding.');
    }

    recommendations.add('Consider having diverse perspectives review this content before finalization.');
    recommendations.add('Implement regular bias training for content creators and reviewers.');

    return Array.from(recommendations);
  }
}

export const biasDetectionEngine = new BiasDetectionEngine();