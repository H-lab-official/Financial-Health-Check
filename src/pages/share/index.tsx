import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import exportlink from '@/assets/images/exportlink.svg';
import { Button } from "antd";
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png';
import {
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import axios from 'axios';
import { NavBar } from "@/components/navbar";
import usePlanNavigation from "@/components/usePlanNavigation";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { questionsState } from "@/recoil/questionsState";
import { protectionPlanState, calculateCoverage } from "@/recoil/protectionPlanState";
import { healthPlanState, calculateAnnualTreatments } from "@/recoil/healthPlanState";
import { retirementPlanState, totalRetirementMissingSelector, mustBeSavedSelector } from "@/recoil/retirementPlanState";

import LoadingPage from '@/components/loadingPage'
const Share: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [addressPlan, setAddressPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const [linkButton, setLinkButton] = useState(false);
  const { plans, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();

  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);

  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const [address, setAddress] = useState<any>(null);
  const [educationPlan, setEducationPlan] = useState<any>(null);
  const checkLocalStorageLengths = () => {
    const addressPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    const historyAddress = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    const addressPlansLength = addressPlans.length;
    const historyAddressLength = historyAddress.length;
    if ((addressPlansLength + historyAddressLength) === 1) {
      setLinkButton(true);
    } else {
      setLinkButton(false);
    }
  };

  useEffect(() => {
    const fetchAddressplan = async () => {
      try {
        localStorage.removeItem('addressPlans')
        localStorage.removeItem('historyAddress')
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/addressplan/${id}`);
        setAddressPlan(response.data.data);
        localStorage.setItem('addressPlans', JSON.stringify(response.data.data));
        setTimeout(toone, 1500); // Wait for 1.5 seconds before calling toone
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddressplan();
    checkLocalStorageLengths();
  }, [id]);

  const toone = () => {
    return new Promise<void>((resolve) => {
      const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
      if (storedPlans.length > 0) {
        const nextPlan = storedPlans[0];
        window.open(nextPlan, '_self');
        resolve();
      } else {
        console.log('No more plans to navigate to.');
        resolve();
      }
    });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans mt-16">
        <div className=" fixed top-0 z-40"><NavBar /></div>
      </div>
    </>
  );
};

export default Share;
