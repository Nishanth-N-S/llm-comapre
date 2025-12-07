import React, { useState } from 'react';
import BasicSetup from '../features/create/BasicSetup';
import Models from '../features/create/Models';
import PromptDefinition from '../features/create/PromptDefinition';
import Evaluation from '../features/create/Evaluation/Evaluation';
import ComparisonSummary from '../features/create/ComparisonSummary';
import { createComparison, ModelSelection } from '../api';

interface CreateComparisonProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onRun: (comparisonData: any) => void;
}

const CreateComparison: React.FC<CreateComparisonProps> = ({ onCancel, onSaveDraft, onRun }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [criteria, setCriteria] = useState<string[]>(['Clarity', 'Conciseness', 'Code Quality']);
  const [selectedModels, setSelectedModels] = useState<ModelSelection[]>([]);
  const [evaluationModel, setEvaluationModel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleRunComparison = async () => {
    if (!name.trim()) {
      setSubmitError('Comparison name is required');
      return;
    }

    if (selectedModels.length === 0) {
      setSubmitError('Please select at least one model');
      return;
    }

    if (!userPrompt.trim()) {
      setSubmitError('User prompt is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await createComparison({
        name,
        description,
        systemPrompt,
        userPrompt,
        models: selectedModels,
        criteria,
        evaluationModel,
      });

      console.log('Comparison created:', response);
      
      // Pass the comparison data to the results page
      onRun({
        title: name,
        runDate: `Run on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
        userPrompt: response.userPrompt || userPrompt,
        systemPrompt: response.systemPrompt || systemPrompt,
        results: response.results || [],
        comparisonId: response.comparisonId
      });
    } catch (error) {
      console.error('Error creating comparison:', error);
      setSubmitError('Failed to create comparison. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              evaluationModel={evaluationModel}
              onEvaluationModelChange={setEvaluationModel}
            />

            {submitError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {submitError}
              </div>
            )}

            <div className="flex items-center justify-end gap-4 pt-4">
              <button onClick={onCancel} className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-normal hover:text-black dark:hover:text-white transition-colors" disabled={isSubmitting}>Cancel</button>
              <button onClick={handleRunComparison} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-8 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                <span className="truncate">{isSubmitting ? 'Creating...' : 'Run Comparison'}</span>
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
