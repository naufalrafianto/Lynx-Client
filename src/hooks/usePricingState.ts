import { useState } from 'react';

export const usePricingState = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    // Add any additional logic here (e.g., redirect to signup)
  };

  return {
    showComparison,
    setShowComparison,
    selectedPlan,
    handleSelectPlan,
  };
};
