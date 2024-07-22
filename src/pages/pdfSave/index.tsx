import React, { useState, useEffect } from "react";
import {
  calculateRequiredScholarships,
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import {
  calculateAdditionalRoomFee,
  calculateAnnualTreatments,
  calculateDailyCompensation,
  calculateEmergencyCosts,
  calculateTreatingSeriousIllness,
  healthPlanState,
} from "@/recoil/healthPlanState";
import {
  calculateCoverage,
  calculateExpenses,
  calculateInitialYearlyExpense,
  calculateRequiredAmount,
  calculateTotalAssets,
  calculateTotalDebts,
  protectionPlanState,
} from "@/recoil/protectionPlanState";
import { questionsState } from "@/recoil/questionsState";
import {
  calculatePreparationYears,
  calculateTotalCosts,
  calculateTotalPreparation,
  calculateWorkingYears,
  calculateisTotalPreparationAssets,
  mustBeSavedSelector,
  retirementPlanState,
  totalRetirementMissingSelector,
} from "@/recoil/retirementPlanState";

import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { nameState } from "@/recoil/nameState";
import { Button, Typography } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useLocation } from "react-router";
import { NavBar } from "@/components/navbar";
const { } = Typography;
import sumpic from "@/assets/images/sumpic.png"
import homeTop from "@/assets/images/homeTop.png"
import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education2 from "@/assets/images/Education2.png"
import download from "@/assets/images/download.png"
import sent from "@/assets/images/sent.png"
import 'animate.css'
import AnimatedSVG from '@/components/AnimatedSVG';
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
const PDFSave: React.FC = () => {
  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const namestate = useRecoilValue(nameState)
  const selectedValue = useRecoilValue(selectedState)
  const navigator = useNavigate();
  const location = useLocation();
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    if (current === 0) {
      const animationDuration = 6000; // Duration of the animation in milliseconds
      const timeoutId = setTimeout(() => {
        setShowButton(true);
      }, animationDuration);

      return () => clearTimeout(timeoutId);
    } else {
      setShowButton(false);
    }
  }, [current]);

  const convertMoney = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const fullDetails = async () => {
    const plansFromLocalStorage = getPlansFromLocalStorage();
    console.log(plansFromLocalStorage);

    // setPlans(plansFromLocalStorage);
  };
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
  let allImages
  let allTitle
  switch (current) {
    case 0:
      allImages = sumpic
      allTitle = "เย้ ยินดีด้วย"
      break;
    case 1:
      allImages = homeTop
      allTitle = "Financial Health Check"
      break;
    case 2:
      allImages = protection
      allTitle = "Protection plan"
      break;
    case 3:
      allImages = health
      allTitle = "Health Plan"
      break;
    case 4:
      allImages = retirement
      allTitle = "Retirement Plan"
      break
    case 5:
      allImages = Education2
      allTitle = "Education Plan"
      break
    default:
      allImages = ""
      allTitle = "Financial  Health Check"
      break;
  }


  const next = async () => {
    await fullDetails();
    console.log("Finished fullDetails");
  
    await toone();
    console.log("Finished toone");
    // setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };
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
  },
    //  {
    //   title: "Financial  Health Check",
    //   content: (
    //     <div className="  rounded-lg p-5 shadow-lg mb-5 gap-5 h-[60vh]">
    //       <div className="flex flex-col justify-center items-center gap-5">
    //         <div className="p-2 bg-[#003781] h-36 w-full rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer"><img src={download} alt="" width={51} /><p className=" text-white">ดาวน์โหลด PDF</p></div>
    //         <div className="p-2 bg-[#003781] h-36 w-full rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer"><img src={sent} alt="" width={51} /><p className=" text-white">แชร์ผลสรุป</p></div>
    //         <div className="p-2 bg-[#003781] h-36 w-full rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer"><img src={sent} alt="" width={51} /><p className=" text-white">กลับสู่ Agency Journey</p></div>
    //       </div>
    //     </div>
    //   )
    // }
  ]
  return (
    <>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className=" fixed top-0 z-40"><NavBar /></div>


        <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
          <div className="flex flex-col justify-center items-center gap-3 mb-5">
            <h1 className=" text-lg font-bold text-center">{allTitle}</h1>
            <h1 className={` text-lg font-semibold ${current == 0 ? " hidden" : ""} `}>คุณ {namestate.nickname}</h1>
            {current === 0 ? <AnimatedSVG /> : <img src={allImages} alt="" width={300} />}
          </div>
          <div className="steps-content h-auto p-2  rounded-md gap-5 mb-5 w-[375px]">
            {/* <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title}</p> */}

            {steps[current].content}
            <div className={`steps-action h-20 flex flex-row font-sans`}>
              {current == 1 && (
                <Button style={{ margin: "0 8px" }} onClick={prev} className={`bg-white rounded-full w-[180px]`}>
                  ย้อนกลับ
                </Button>
              )}
              {/* {current > 1 && (
              <Button style={{ margin: "0 8px" }} onClick={goBack} className={`bg-white rounded-full w-[180px]`}>
                ย้อนกลับ
              </Button>
            )} */}
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
    </>
  );
};

export default PDFSave;
