
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateComparison from './pages/CreateComparison';
import ComparisonResults from './pages/ComparisonResults';
import Settings from './pages/Settings';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [comparisonData, setComparisonData] = React.useState<any>(null);

  const handleNavigateHome = () => navigate('/');
  const handleNewComparison = () => navigate('/create');
  const handleNavigateSettings = () => navigate('/settings');
  const handleViewDetails = (id: string) => navigate(`/results`);
  const handleRunComparison = (data: any) => {
    setComparisonData(data);
    navigate('/results');
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              onNavigateHome={handleNavigateHome}
              onNewComparison={handleNewComparison}
              onSettings={handleNavigateSettings}
              onViewDetails={handleViewDetails}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateComparison
              onCancel={handleNavigateHome}
              onSaveDraft={handleNavigateHome}
              onRun={handleRunComparison}
            />
          }
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/results"
          element={<ComparisonResults onBack={handleNavigateHome} comparisonData={comparisonData} />}
        />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
