
import React from 'react';
import ResultsHeader from '../features/results/ResultsHeader';
import PromptUsed from '../features/results/PromptUsed';
import LLMResultList, { LLMResult } from '../features/results/LLMResult/LLMResultList';

interface ComparisonResultsProps {
  onBack: () => void;
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ onBack }) => {
  const comparisonData = {
    title: 'E-commerce Product Descriptions',
    runDate: 'Run on July 26, 2024 at 10:45 AM',
    userPrompt: 'Write a product description for a smart coffee mug.',
    systemPrompts: [
      { model: 'GPT-4o', prompt: 'You are a witty and concise copywriter.' },
      { model: 'Claude 3', prompt: 'You are a professional and detailed technical writer.' },
    ],
    results: [
      {
        modelName: 'GPT-4o',
        modelLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR3GRHZlYTg4WZaCsYwz7rjTaYUxRlHrfVWmEGNAuDtP7jcLhhJAZBcFXexTdse4guP4lEhvbK25vq2vfH86dutgEm3_oZRUJOGyAE25heDLIM5herKsrbOKg04AM09MzE9YoYyVqivZOKXjDQIZ8YdK_lLtdawYSBrHXmN2uTFCOLzDDTlOxBE116I0UmwZ1qIAmGttHz6i_Df6AFNtI-zeEqfJAHB_rd-VS10T5Cn1wXM4OKjgUMdPwiNWlYHeeLUKJdCVpK7DU',
        score: 92,
        rating: 'Excellent',
        ratingColor: 'green' as const,
        rationale: [
          "Excellent adherence to the 'witty and concise' persona.",
          'Strong persuasive language that highlights key benefits.',
          'Clear, readable, and well-structured output.',
        ],
        output: "Meet the Ember Mug²: Your coffee's new best friend. Say goodbye to lukewarm letdowns and microwave do-overs. This mug keeps your brew at the perfect temperature from the first sip to the last drop. Too hot? Too cold? Just right. Every. Single. Time. Control it with your phone, and never suffer a bad sip again. Welcome to the future of coffee. It's hot.",
      },
      {
        modelName: 'Claude 3 Sonnet',
        modelLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsZU8co9Ce1teczQIWD0YGXMsjIyBlQGhub3GuE07KQwf3lBTQ4dzBiI0Im7kI7XX5WhRpokrjRxi0tKtv9kXBUdW4SsRtFpWnVOkp1TwwZlgiUvK1FDLvr3Hgsc9b8L3T0-cIHRS1wdQbuGvN4X8MIWgszesdtwayr1NJIeSyW3dC5ZZ6V6tczeP7RZNrQetS7Auw1FVnkgnDpavU3RrVoAl2nzzs3uJNv24cGBs_u8EQUfw98cl4yKg_JUvHfDMSWjdM62pRLAY',
        modelLogoStyle: { backgroundColor: '#D0BFFF' },
        score: 81,
        rating: 'Good',
        ratingColor: 'yellow' as const,
        rationale: [
          'Successfully adopted a professional, technical tone.',
          'Content is detailed and accurate but slightly dry.',
          'Could be more engaging for a consumer-facing product.',
        ],
        output: 'The SmartTemp Coffee Mug is an intelligent beverage container engineered for optimal temperature maintenance. It features a durable ceramic-coated stainless steel construction and an integrated heating element. Users can set a precise drinking temperature between 120°F (50°C) and 145°F (62.5°C) via the companion smartphone application. The onboard battery provides up to 1.5 hours of continuous heating, or all-day use with the included charging coaster. An LED indicator displays the current temperature status and battery level.',
      },
      {
        modelName: 'Llama 3 70B',
        modelLogo: '<svg className="h-6 w-6 text-blue-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>',
        modelLogoStyle: { backgroundColor: '#BFDBFE' },
        score: 65,
        rating: 'Needs Improvement',
        ratingColor: 'red' as const,
        rationale: [
          'Tone is generic and lacks a distinct persona.',
          'Output reads like a list of features, not a description.',
          'Grammatically correct but fails to be persuasive.',
        ],
        output: 'This is a smart coffee mug. It can keep your drink warm. You can choose the temperature you want with an app on your phone. The mug is made of good materials and has a battery. The battery lasts for a while. You can also put it on its special coaster to keep it charged all day. It is a good product for people who like to drink coffee or tea.',
      },
    ] as LLMResult[],
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
          systemPrompts={comparisonData.systemPrompts}
        />

        <div className="mt-6">
          <LLMResultList results={comparisonData.results} />
        </div>
      </main>
    </div>
  );
};

export default ComparisonResults;
