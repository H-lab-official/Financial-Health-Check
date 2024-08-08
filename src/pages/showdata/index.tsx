import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router";
import { Button } from "antd";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { questionsState } from "@/recoil/questionsState";
import { protectionPlanState, calculateCoverage } from "@/recoil/protectionPlanState";
import { healthPlanState, calculateAnnualTreatments } from "@/recoil/healthPlanState";
import { retirementPlanState, totalRetirementMissingSelector, mustBeSavedSelector } from "@/recoil/retirementPlanState";
import { educationPlanState, totalMissingSelector } from "@/recoil/educationPlanState";
import { addressPlans, historyAddress } from '@/recoil/address';
import { NavBar } from "@/components/navbar";
import sumpic from "@/assets/images/sumpic.png";
import homeTop from "@/assets/images/homeTop.png";
import protection from "@/assets/images/protection.png";
import health from "@/assets/images/health.png";
import retirement from "@/assets/images/retirement.png";
import Education2 from "@/assets/images/Education2.png";
import usePlanNavigation from "@/components/usePlanNavigation";
import axios from 'axios';

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
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const newsSlectedState = useRecoilValue(selectedState)
  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const { plans, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();
  const [, setPlans] = useState(plans);
  const [showButton, setShowButton] = useState(false);



  const fullDetails = async () => {
    const plansFromLocalStorage = getPlansFromLocalStorage();
    console.log(plansFromLocalStorage);

    setPlans(plansFromLocalStorage);

    // Save plans to the database and get the id
    const id = await saveAddressPlans(plansFromLocalStorage);
    // Save the id to localStorage
    localStorage.setItem('linkshare', id);
  };

  const toone = () => {
    return new Promise<void>((resolve) => {
      const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
      console.log('====================================');
      console.log(storedPlans);
      console.log('====================================');
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

  const convertMoney = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  let allImages;
  let allTitle;
  switch (current) {
    case 0:
      allImages = sumpic;
      allTitle = "เย้ ยินดีด้วย";
      break;
    case 1:
      allImages = homeTop;
      allTitle = "Financial Health Check";
      break;
    case 2:
      allImages = protection;
      allTitle = "Protection plan";
      break;
    case 3:
      allImages = health;
      allTitle = "Health Plan";
      break;
    case 4:
      allImages = retirement;
      allTitle = "Retirement Plan";
      break;
    case 5:
      allImages = Education2;
      allTitle = "Education Plan";
      break;
    default:
      allImages = "";
      allTitle = "Financial Health Check";
      break;
  }

  const next = async () => {
    await fullDetails();
    // setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
    toone();
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const getPlanText = (order: number) => {
    switch (order) {
      case questionsData.educationPlanOrder:
        return 'การเก็บออมเพื่อค่าเล่าเรียนบุตร';
      case questionsData.healthPlanOrder:
        return 'การวางแผนเกี่ยวกับสุขภาพ';
      case questionsData.protectionPlanOrder:
        return 'คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป';
      case questionsData.retirementPlanOrder:
        return 'การวางแผนเตรียมเงินไว้ยามเกษียณ';
      default:
        return '';
    }
  };

  const orders = [
    questionsData.educationPlanOrder,
    questionsData.healthPlanOrder,
    questionsData.protectionPlanOrder,
    questionsData.retirementPlanOrder
  ];

  const nonZeroOrders = orders.map((order, index) => ({ order, index: index + 1 })).filter(({ order }) => order !== 0).sort((a, b) => a.order - b.order);

  const texts: { [key: string]: string } = {
    '1': 'Protection plan',
    '2': 'Health plan',
    '3': 'Retirement plan',
    '4': 'Education plan',
  };
  console.log(newsSlectedState);

  const renderTexts = (): JSX.Element[] | null => {
    if (newsSlectedState.length === 1) {
      const value = newsSlectedState[0];
      if (value === '5') {
        return Object.keys(texts).map(key => (
          <p key={key} className={``}>{texts[key]}</p>
        ));
      } else if (texts[value]) {
        return [<p key={value} className={``}>{texts[value]}</p>];
      }
    } else if (newsSlectedState.length >= 1 && newsSlectedState.length <= 4) {
      return newsSlectedState.map(value => (
        <p key={value} className={``}>{texts[value]}</p>
      ));
    }
    return null;
  };

  const steps = [{
    title: "เย้ ยินดีด้วย",
    content: (
      <div className="flex flex-col text-[2rem] font-medium justify-center items-center mb-10">
        {renderTexts()}
        {showButton && (
          <Button
            onClick={next}
            className={`bg-[#003781] font-sans rounded-full text-white h-10 ${current === 0 ? "w-full" : "w-[180px]"}`}
          >
            ไปหน้าสรุปผล
          </Button>
        )}
      </div>
    )
  }];
  useEffect(() => {
    const fetchData = async () => {
      await fullDetails();
      toone();
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className="fixed top-0 z-40"><NavBar /></div>
        <div className="steps-content h-auto p-2 rounded-md gap-5 mb-5  w-[375px] mt-16">
          {/* {steps[current].content} */}
          <div className={`steps-action h-20 flex flex-row font-sans`}>
            {current == 1 && (
              <Button style={{ margin: "0 8px" }} onClick={prev} className={`bg-white rounded-full w-[180px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current > 1 && (
              <Button style={{ margin: "0 8px" }} onClick={goBack} className={`bg-white rounded-full w-[180px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={toone} className={`bg-[#003781] rounded-full ${current === 0 ? "hidden" : "w-[180px]"}`}>
                ถัดไป
              </Button>
            )}
            {/* {current === steps.length - 1 && (
              <Button onClick={toone} className={`bg-[#003781] rounded-full w-[180px] text-white`}>
                สรุปฉบับเต็ม
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showdata;
