import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router";
import { Button, Spin } from "antd";
import { selectedState } from '@/recoil/progressState';
import { NavBar } from "@/components/navbar";
import usePlanNavigation from "@/components/usePlanNavigation";
import axios from 'axios';
import LoadingPage from '@/components/loadingPage'
const getPlansFromLocalStorage = () => {
  const plans = [];
  const questionsState = localStorage.getItem('saveQuestionsState');
  if (questionsState) {
    try {
      const { id } = JSON.parse(questionsState);
      plans.push(`/view/conclusion/${id}`);
    } catch (e) {
      console.error("Error parsing summaryPlan:", e);
    }
  } else {
    console.log("saveQuestionsState not found in localStorage");
  }
  const protectionPlan = localStorage.getItem('saveProtectionPlan');
  if (protectionPlan) {
    try {
      const { id } = JSON.parse(protectionPlan);
      plans.push(`/view/protectionplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveProtectionPlan:", e);
    }
  } else {
    console.log("saveProtectionPlan not found in localStorage");
  }

  const healthPlan = localStorage.getItem('savehealthPlan');
  if (healthPlan) {
    try {
      const { id } = JSON.parse(healthPlan);
      plans.push(`/view/healthplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveHealthPlan:", e);
    }
  } else {
    console.log("saveHealthPlan not found in localStorage");
  }

  const retirementPlan = localStorage.getItem('saveRetirementPlan');
  if (retirementPlan) {
    try {
      const { id } = JSON.parse(retirementPlan);
      plans.push(`/view/retirementplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveRetirementPlan:", e);
    }
  } else {
    console.log("saveRetirementPlan not found in localStorage");
  }

  const educationPlan = localStorage.getItem('saveEducationplan');
  if (educationPlan) {
    try {
      const { id } = JSON.parse(educationPlan);
      plans.push(`/view/educationplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveEducationplan:", e);
    }
  } else {
    console.log("saveEducationplan not found in localStorage");
  }

  console.log("Constructed plans array:", plans);
  try {
    localStorage.setItem('addressPlans', JSON.stringify(plans));
  } catch (e) {
    console.error("Error saving addressPlans to localStorage:", e);
  }

  return plans;
};

const saveAddressPlans = async (plans: string[]) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/addressplan`, { plans });
    console.log("Plans saved successfully:", response.data);
    return response.data.id; // Assuming the API returns an 'id'
  } catch (error) {
    console.error("Error saving plans:", error);
    throw error;
  }
};

const Showdata: React.FC = () => {
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);






  const [loading, setLoading] = useState(true);

  const fullDetails = async () => {
    const plansFromLocalStorage = getPlansFromLocalStorage();
    const id = await saveAddressPlans(plansFromLocalStorage);
    localStorage.setItem('linkshare', id);
  };

  const toone = () => {
    return new Promise<void>((resolve) => {


      const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');

      if (storedPlans.length > 0) {
        const nextPlan = storedPlans[0];
        window.open(nextPlan, '_self');
        resolve();
      } else {
        const plansFromLocalStorage = getPlansFromLocalStorage();
        localStorage.setItem('addressPlans', JSON.stringify(plansFromLocalStorage));
        resolve();
      }
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      await fullDetails();
      await toone();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className="fixed top-0 z-40"><NavBar /></div>
        <div className="steps-content h-auto p-2 rounded-md gap-5 mb-5  w-[375px] mt-16">

          <div className={`flex flex-col font-sans justify-center items-center gap-10 mt-20`}>
            <Spin size="large" />
            <p className='font-sans'>ระบบจะพาคุณไปยัง หน้าแสดงผลภายใน 2 วินาที <br /></p>

            <Button type="primary" onClick={toone} className={`bg-[#003781] rounded-full w-[180px]`}>
              ไปหน้าสรุปผล
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Showdata;
