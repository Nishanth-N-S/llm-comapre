import React, { useState } from 'react';
import BasicSetup from '../features/create/BasicSetup';
import Models from '../features/create/Models';
import PromptDefinition from '../features/create/PromptDefinition';
import Evaluation from '../features/create/Evaluation/Evaluation';
import ComparisonSummary from '../features/create/ComparisonSummary';

interface CreateComparisonProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onRun: () => void;
}

const CreateComparison: React.FC<CreateComparisonProps> = ({ onCancel, onSaveDraft, onRun }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [criteria, setCriteria] = useState<string[]>(['Clarity', 'Conciseness', 'Code Quality']);
  const [selectedModels, setSelectedModels] = useState<string[]>(['GPT-4o', 'Claude 3 Opus']);

  return (
    <div className="w-full h-full overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-7xl mx-auto pb-10">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-grow lg:w-2/3 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button onClick={onCancel} className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors">Comparisons</button>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
                <span className="text-black dark:text-white text-sm font-medium leading-normal">Create New</span>
              </div>
              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Create a New Comparison</p>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Configure the models, frameworks, and prompts to test and evaluate.</p>
                </div>
              </div>
            </div>

            <BasicSetup 
              name={name}
              description={description}
              onNameChange={setName}
              onDescriptionChange={setDescription}
            />
            <Models 
              selectedModels={selectedModels}
              onModelsChange={setSelectedModels}
            />
            <PromptDefinition 
              systemPrompt={systemPrompt}
              userPrompt={userPrompt}
              onSystemPromptChange={setSystemPrompt}
              onUserPromptChange={setUserPrompt}
            />
            <Evaluation 
              criteria={criteria}
              onCriteriaChange={setCriteria}
            />

            <div className="flex items-center justify-end gap-4 pt-4">
              <button onClick={onCancel} className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-normal hover:text-black dark:hover:text-white transition-colors">Cancel</button>
              <button onClick={onRun} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-8 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors">
                <span className="truncate">Run Comparison</span>
              </button>
            </div>
          </div>

          <ComparisonSummary 
            name={name}
            models={selectedModels}
            criteria={criteria}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateComparison;
