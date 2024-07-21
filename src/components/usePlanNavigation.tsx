import { useRecoilState } from 'recoil';
import { addressPlans, historyAddress } from '@/recoil/address';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePlanNavigation = () => {
  const [plans, setPlans] = useRecoilState(addressPlans);
  const [history, setHistory] = useRecoilState(historyAddress);
  const location = useLocation();

  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    setPlans(storedPlans);

    const storedHistory = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    setHistory(storedHistory);
  }, [setPlans, setHistory]);

  const handleFetchPlans = useCallback(() => {
    const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    setPlans(storedPlans);

    const storedHistory = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    setHistory(storedHistory);
  }, [setPlans, setHistory]);

  const handleSavePlans = useCallback((localPlans) => {
    if (localPlans && localPlans.length > 0) {
      setPlans(localPlans);
    }
  }, [setPlans]);

  const toone = () => {
    if (plans.length > 0) {
      const nextPlan = plans[0];
      let updatedPlans = plans.slice(1);
      let updatedHistory = [...history];

      if (location.pathname === nextPlan && updatedPlans.length > 0) {
        updatedHistory.push(nextPlan);
        const nextPlanAfterCurrent = updatedPlans[0];
        updatedPlans = updatedPlans.slice(1);

        window.open(nextPlanAfterCurrent, '_self');
        updatedHistory.push(nextPlanAfterCurrent);
      } else {
        window.open(nextPlan, '_self');
        updatedHistory.push(nextPlan);
      }

      setPlans(updatedPlans);
      setHistory(updatedHistory);
    } else {
      console.log('No more plans to navigate to.');
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousPlan = history[history.length - 1];
      let updatedHistory = history.slice(0, -1);
      let updatedPlans = [previousPlan, ...plans];

      if (location.pathname === previousPlan && updatedHistory.length > 0) {
        const previousPlanBeforeCurrent = updatedHistory[updatedHistory.length - 1];
        updatedHistory = updatedHistory.slice(0, -1);

        window.open(previousPlanBeforeCurrent, '_self');
        updatedPlans = [previousPlanBeforeCurrent, ...updatedPlans];
      } else {
        window.open(previousPlan, '_self');
      }

      setHistory(updatedHistory);
      setPlans(updatedPlans);
    } else {
      console.log('No previous plans to navigate to.');
    }
  };

  return { plans, toone, goBack, handleFetchPlans, handleSavePlans };
};

export default usePlanNavigation;
