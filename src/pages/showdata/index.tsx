import React, { useState,useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router";
import { Button } from "antd";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { questionsState } from "@/recoil/questionsState";
import { protectionPlanState, calculateCoverage } from "@/recoil/protectionPlanState";
import { healthPlanState, calculateAnnualTreatments } from "@/recoil/healthPlanState";
import { retirementPlanState, totalRetirementMissingSelector, mustBeSavedSelector } from "@/recoil/retirementPlanState";
import { educationPlanState, totalMissingSelector } from "@/recoil/educationPlanState";
import { addressPlans,historyAddress } from '@/recoil/address'
import { NavBar } from "@/components/navbar";
import sumpic from "@/assets/images/sumpic.png";
import homeTop from "@/assets/images/homeTop.png";
import protection from "@/assets/images/protection.png";
import health from "@/assets/images/health.png";
import retirement from "@/assets/images/retirement.png";
import Education2 from "@/assets/images/Education2.png";
import usePlanNavigation from "@/components/usePlanNavigation"

const Showdata: React.FC = () => {
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const { plans, toone, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();
  const [, setPlans] = useState(plans);
  
const getPlansFromLocalStorage = () => {
  const plans = [];

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
  // localStorage.removeItem('addressPlans')
  // localStorage.removeItem('historyAddress')
  try {
    localStorage.setItem('addressPlans', JSON.stringify(plans));
  } catch (e) {
    console.error("Error saving addressPlans to localStorage:", e);
  }

  return plans;
};
  useEffect(()=>{
    localStorage.setItem('addressPlans',JSON.stringify([]))
    localStorage.setItem('historyAddress',JSON.stringify([]))
    const plansFromLocalStorage = getPlansFromLocalStorage();     
    setPlans(plansFromLocalStorage);
  },[plans])
  
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

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
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

  const nonZeroOrders = orders.map((order, index) => ({ order, index: index + 1 })).filter(({ order }) => order !== 0).sort((a, b) => b.order - a.order);
  
  const texts: { [key: string]: string } = {
    '1': 'Protection plan',
    '2': 'Health plan',
    '3': 'Retirement plan',
    '4': 'Education plan',
  };

  const renderTexts = (): JSX.Element[] | null => {
    if (sortedSelected.length === 1) {
      const value = sortedSelected[0];
      if (value === '5') {
        return Object.keys(texts).map(key => (
          <p key={key} className={`animate__animated animate__backInUp animate__delay-${key}s animate__duration-2s`}>{texts[key]}</p>
        ));
      } else if (texts[value]) {
        return [<p key={value} className={`animate__animated animate__backInUp animate__delay-${value}s animate__duration-2s`}>{texts[value]}</p>];
      }
    } else if (sortedSelected.length >= 1 && sortedSelected.length <= 4) {
      return sortedSelected.map(value => (
        <p key={value} className={`animate__animated animate__backInUp animate__delay-${value}s animate__duration-2s`}>{texts[value]}</p>
      ));
    }
    return null; 
  };

  const steps = [{
    title: "เย้ ยินดีด้วย",
    content: (
      <div className="flex flex-col text-[2rem] font-medium justify-center items-center mb-10">
        {renderTexts()}
      </div>
    )
  }, {
    title: "Financial  Health Check",
    content: (
      <>
        <div className="rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>ผลลัพธ์ โดยรวม</p></div>
          <div className="text-black">
            <div className="flex flex-row justify-between">
              <p>ค่าใช้จ่ายในครอบครัว</p>
              <p>{convertMoney(calculateCoverage(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>วางแผนเพื่อสุขภาพ</p>
              <p>{convertMoney(calculateAnnualTreatments(healthPlanData))} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>ค่าใช้จ่ายหลังเกษียณ</p>
              <p>{convertMoney(totalMissing)} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>วางแผนเพื่อการศึกษาบุตร</p>
              <p>{convertMoney(educationMissing)} บาท</p></div>
          </div>
        </div>
        <div className="rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3">
            <p>ความสำคัญที่คุณเลือกเป็นดังนี้</p>
          </div>
          <div className="text-black text-[0.9rem]">
            {nonZeroOrders.map(({ order }, i) => (
              <div className="flex flex-row" key={i}>
                <p className="text-red-500 font-bold">{i + 1}.</p>
                <p>{getPlanText(order)}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }];

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className="fixed top-0 z-40"><NavBar /></div>
        <div className="steps-content h-auto p-2 rounded-md gap-5 mb-5 mt-10 w-[375px]">
          {steps[current].content}
          <div className={`steps-action h-20 flex flex-row font-sans`}>
            {current === 0 && (
              <Button
                onClick={next}
                className={`bg-[#003781] font-sans rounded-full text-white h-10 ${current === 0 ? "w-full" : "w-[180px]"}`}
              >
                ไปหน้าสรุปผล
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={goBack} className={`bg-white rounded-full w-[180px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={toone} className={`bg-[#003781] rounded-full ${current === 0 ? "hidden" : "w-[180px]"}`}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button onClick={toone} className={`bg-[#003781] rounded-full w-[180px] text-white`}>
               สรุปฉบับเต็ม
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showdata;
