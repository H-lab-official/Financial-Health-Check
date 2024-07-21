import { useRecoilState } from 'recoil';
import { addressPlans, historyAddress } from '@/recoil/address';
import { useState, useCallback, useEffect } from 'react';

const usePlanNavigation = () => {
  const [plans, setPlans] = useRecoilState(addressPlans);
  const [history, setHistory] = useRecoilState(historyAddress);
  const [planId, setPlanId] = useState<string | null>(null);

  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    setPlans(storedPlans);

    const storedHistory = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    setHistory(storedHistory);
  }, [setPlans, setHistory]);

  useEffect(() => {
    localStorage.setItem('addressPlans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('historyAddress', JSON.stringify(history));
  }, [history]);

  const handleFetchPlans = useCallback(() => {
    const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    setPlans(storedPlans);

    const storedHistory = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    setHistory(storedHistory);
  }, [setPlans, setHistory]);

  const handleSavePlans = useCallback((localPlans) => {
    if (localPlans && localPlans.length > 0) {
      setPlans(localPlans);
      localStorage.setItem('addressPlans', JSON.stringify(localPlans));
    }
  }, [setPlans]);

  const toone = () => {
    if (history.length == 0 && plans.length > 0) {
      const nextPlan = plans[1]
      const currentPage = plans[0]
     window.open(nextPlan, '_self')
      const updatedPlans = plans.slice(0, -2)
      setHistory([nextPlan, currentPage])
      setPlans(updatedPlans)

    }
    else if (plans.length > 0) {
      const nextPlan = plans[0];
     window.open(nextPlan, '_self');

      const updatedPlans = plans.slice(1);
      setHistory([...history, nextPlan]);
      setPlans(updatedPlans);

    }
    else {
      console.log('No more plans to navigate to.');
    }
  };

  const goBack = () => {
    if (plans.length == 0 && history.length > 0) {
      const lastPlans = history[history.length - 1]
      const previousPlan = history[history.length - 2];
        window.open(previousPlan, '_self')
      const updatedHistory = history.slice(0, -2)
      setHistory(updatedHistory)
      setPlans([lastPlans, previousPlan, ...plans])
    }
    else if (history.length > 0 && plans.length > 0) {
      const previousPlan = history[history.length - 1];
        window.open(previousPlan, '_self')

      const updatedHistory = history.slice(0, -1);
      setHistory(updatedHistory);
      setPlans([previousPlan, ...plans]);
    } else {
      console.log('No previous plans to navigate to.');
    }
  };

  return { plans, toone, goBack, handleFetchPlans, handleSavePlans };
};

export default usePlanNavigation;
