import { useRecoilState } from 'recoil';
import { addressPlans, historyAddress } from '@/recoil/address';
import axios from 'axios';
import { useState, useCallback } from 'react';

const usePlanNavigation = () => {
  const [plans, setPlans] = useRecoilState(addressPlans);
  const [history, setHistory] = useRecoilState(historyAddress);
  const [planId, setPlanId] = useState<string | null>(null);

  console.log(plans);

  const savePlansToBackend = async (plans) => {
    try {
      console.log('Sending plans to backend:', plans); // Debugging log
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/addressplan`, { plans });
      const responseData = response?.data;
      if (responseData?.id) {
        setPlanId(responseData.id); // Store the ID of the created plan
        return responseData.id;
      } else {
        throw new Error('Invalid response from backend');
      }
    } catch (error) {
      console.error('Error saving plans to backend:', error);
      throw error;
    }
  };

  const fetchPlansFromBackend = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/addressplan/${id}`);
      const responseData = response?.data;
      console.log('Fetched plans from backend:', responseData);
      if (responseData?.data) {
        return responseData.data;
      } else {
        throw new Error('Invalid response from backend');
      }
    } catch (error) {
      console.error('Error fetching plans from backend:', error);
      throw error;
    }
  };

  const handleFetchPlans = useCallback(async () => {
    if (planId) {
      const fetchedPlans = await fetchPlansFromBackend(planId);
      setPlans(fetchedPlans); // Assuming the fetched data is in the format you need
    }
  }, [planId, setPlans]);

  const handleSavePlans = useCallback(async (localPlans) => {
    if (localPlans && localPlans.length > 0) {
      const id = await savePlansToBackend(localPlans);
      const fetchedPlans = await fetchPlansFromBackend(id);
      setPlans(fetchedPlans);
    }
  }, [setPlans]);

  const toone = () => {
    if (plans.length > 0) {
      const nextPlan = plans[0];
      window.location.href = nextPlan;

      const updatedPlans = plans.slice(1);
      setHistory([...history, nextPlan]); // Add current plan to history
      setPlans(updatedPlans);
    } else {
      console.log('No more plans to navigate to.');
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousPlan = history[history.length - 1];
      window.location.href = previousPlan;

      const updatedHistory = history.slice(0, -1); // Remove the last item from history
      setHistory(updatedHistory);
      setPlans([previousPlan, ...plans]); // Add the previous plan back to plans
    } else {
      console.log('No previous plans to navigate to.');
    }
  };

  return { plans, toone, goBack, handleFetchPlans, handleSavePlans };
};

export default usePlanNavigation;
