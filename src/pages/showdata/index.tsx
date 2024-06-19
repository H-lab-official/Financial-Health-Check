import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import DataFetchingComponent, { DataFetchingComponentProps } from '@/components/api/DataFetchingComponent';
import { useNavigate, useLocation } from "react-router";
import { Button, Typography } from "antd";
import { NavBar } from "@/components/navbar";
import sumpic from "@/assets/images/sumpic.png"
import homeTop from "@/assets/images/homeTop.png"
import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education2 from "@/assets/images/Education2.png"
import download from "@/assets/images/download.png"
import sent from "@/assets/images/sent.png"
const Showdata: React.FC = () => {
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
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
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const toone = () => {
    setCurrent(1)
  }
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
  const steps = [
    {
      title: "เย้ ยินดีด้วย",
      content: (
        <div className="flex flex-col text-[2rem] font-medium justify-center items-center mb-10">
          {renderTexts()}
        </div>
      )
    },
    { title: "questionsstate", content: <DataFetchingComponent key="0" value={"0"} sortedSelected={sortedSelected} current={1} /> },
    { title: "Protection plan", content: <DataFetchingComponent key="1" value={"1"} sortedSelected={sortedSelected} current={2}/> },
    { title: "Health Plan", content: <DataFetchingComponent key="2" value={"2"} sortedSelected={sortedSelected} current={3}/> },
    { title: "Retirement Plan", content: <DataFetchingComponent key="3" value={"3"} sortedSelected={sortedSelected} current={4} /> },
    { title: "Education Plan", content: <DataFetchingComponent key="4" value={"4"} sortedSelected={sortedSelected} current={5} /> },
  ];

 
  
 
  
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className="fixed top-0 z-40"><NavBar /></div>
        
        <div className="steps-content h-auto p-2  rounded-md gap-5 mb-5 mt-10 w-[375px]">  
        {steps[current]?.content}
          <div className={`steps-action h-20 flex flex-row font-sans`}>
            {current === 0 && (
              <Button
                onClick={() => next()}
                className={`bg-[#003781] font-sans rounded-full text-white h-10 ${current === 0 ? "w-full" : "w-[180px]"}`}
              >
                ไปหน้าสรุปผล
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()} className={`bg-white rounded-full w-[180px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} className={`bg-[#003781] rounded-full ${current === 0 ? "hidden" : "w-[180px]"}`}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button onClick={() => toone()} className={`bg-[#003781] rounded-full w-[180px] text-white ${current === 0 ? "hidden" : ""}`}>
                กลับไปหน้าสรุป
              </Button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Showdata;
