import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import DataFetchingComponent, { DataFetchingComponentProps } from '@/components/api/DataFetchingComponent';
import { useNavigate, useLocation } from "react-router";

const Viewhealthplan: React.FC = () => {
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
 
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
    <h1>Viewhealthplan</h1>
    </div>
  );
};

export default Viewhealthplan;
