
import React from 'react';
import ResultsHeader from '../features/results/ResultsHeader';
import PromptUsed from '../features/results/PromptUsed';
import ModelOutputTable from '../features/results/ModelOutputTable';
import CriteriaScores from '../features/results/CriteriaScores';

// New type definitions matching backend response
export interface CriteriaScore {
  criteria: string;
  score: number;
  pros: string;
  cons: string;
}

export interface ModelResult {
  model: string;
  response?: string;
  error?: string;
  scores?: CriteriaScore[];
}

export interface ComparisonData {
  title: string;
  runDate: string;
  userPrompt: string;
  systemPrompt?: string;
  results: ModelResult[];
}

interface ComparisonResultsProps {
  onBack: () => void;
  comparisonData?: ComparisonData | null;
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ onBack, comparisonData: propComparisonData }) => {
  // Use provided data or fallback to mock data
  const comparisonData: ComparisonData = propComparisonData || {
    title: 'E-commerce Product Descriptions',
    runDate: 'Run on July 26, 2024 at 10:45 AM',
    userPrompt: 'Write a product description for a smart coffee mug.',
    systemPrompt: 'You are a creative copywriter who writes engaging product descriptions.',
    results: [
      {
        model: 'GPT-4o',
        response: "Meet the Ember Mug²: Your coffee's new best friend. Say goodbye to lukewarm letdowns and microwave do-overs. This mug keeps your brew at the perfect temperature from the first sip to the last drop. Too hot? Too cold? Just right. Every. Single. Time. Control it with your phone, and never suffer a bad sip again. Welcome to the future of coffee. It's hot.",
        scores: [
          {
            criteria: 'Creativity',
            score: 9.2,
            pros: 'Witty and engaging tone, memorable phrases',
            cons: 'Could be slightly more informative'
          },
          {
            criteria: 'Clarity',
            score: 8.8,
            pros: 'Clear benefits, easy to understand',
            cons: 'Some features are implied rather than explicit'
          },
          {
            criteria: 'Relevance',
            score: 9.5,
            pros: 'Directly addresses product benefits',
            cons: 'None noted'
          }
        ]
      },
      {
        model: 'Claude 3 Sonnet',
        response: 'The SmartTemp Coffee Mug is an intelligent beverage container engineered for optimal temperature maintenance. It features a durable ceramic-coated stainless steel construction and an integrated heating element. Users can set a precise drinking temperature between 120°F (50°C) and 145°F (62.5°C) via the companion smartphone application. The onboard battery provides up to 1.5 hours of continuous heating, or all-day use with the included charging coaster. An LED indicator displays the current temperature status and battery level.',
        scores: [
          {
            criteria: 'Creativity',
            score: 7.5,
            pros: 'Professional and detailed',
            cons: 'Lacks engaging language'
          },
          {
            criteria: 'Clarity',
            score: 9.0,
            pros: 'Very clear and specific details',
            cons: 'Might be too technical for some audiences'
          },
          {
            criteria: 'Relevance',
            score: 8.8,
            pros: 'Covers all technical features',
            cons: 'Could emphasize benefits more'
          }
        ]
      },
      {
        model: 'Llama 3 70B',
        response: 'This is a smart coffee mug. It can keep your drink warm. You can choose the temperature you want with an app on your phone. The mug is made of good materials and has a battery. The battery lasts for a while. You can also put it on its special coaster to keep it charged all day. It is a good product for people who like to drink coffee or tea.',
        scores: [
          {
            criteria: 'Creativity',
            score: 5.5,
            pros: 'Simple and straightforward',
            cons: 'Generic and unengaging tone'
          },
          {
            criteria: 'Clarity',
            score: 7.0,
            pros: 'Easy to understand',
            cons: 'Lacks specific details'
          },
          {
            criteria: 'Relevance',
            score: 6.8,
            pros: 'Mentions key features',
            cons: 'Vague descriptions'
          }
        ]
      }
    ]
  };

  const handleExport = () => {
    console.log('Export results');
  };

  const handleRerun = () => {
    console.log('Rerun comparison');
  };

  const handleShare = () => {
    console.log('Share comparison');
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-[1600px] mx-auto pb-10">
        <ResultsHeader
          comparisonTitle={comparisonData.title}
          runDate={comparisonData.runDate}
          onBack={onBack}
          onExport={handleExport}
          onRerun={handleRerun}
          onShare={handleShare}
        />

        <PromptUsed
          userPrompt={comparisonData.userPrompt}
          systemPrompt={comparisonData.systemPrompt}
        />

        <ModelOutputTable results={comparisonData.results} />

        <CriteriaScores results={comparisonData.results} />
      </main>
    </div>
  );
};

export default ComparisonResults;
