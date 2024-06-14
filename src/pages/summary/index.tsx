import { questionsState } from "@/recoil/questionsState";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useState } from "react";
import {
  Button,

  Radio,
  RadioChangeEvent,
  Row,

} from "antd";
import ProgressBar from "@/components/progressBar";
import { useNavigate, useLocation } from "react-router";
import { NavBar } from "@/components/navbar";

import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education from "@/assets/images/Education.png"

import { nameState, nameData } from "@/recoil/nameState";
import '@/components/css/customRadio.css'
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { saveQuestionsState } from "@/components/api/saveQuestionsState";
const Summary: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(questionsState);
  const [current, setCurrent] = useState(currentStep);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const sortedSelected = useRecoilValue(sortedSelectedState);

  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const dataname = useRecoilValue<nameData>(nameState)
  const handleRadioChange =
    (field: keyof typeof formData) =>
      ({ target: { value } }: RadioChangeEvent) => {
        const selectedValue = parseInt(value, 10);

        setFormData((prevFormData) => {
          const updatedFormData = { ...prevFormData };

          // ตรวจสอบว่ามีฟิลด์อื่นที่มีค่าเดียวกับที่เลือกหรือไม่
          Object.keys(updatedFormData).forEach((key) => {
            if (key !== field && updatedFormData[key as keyof typeof formData] === selectedValue) {
              updatedFormData[key as keyof typeof formData] = 0; // กำหนดค่าเป็น 0 สำหรับฟิลด์ที่ซ้ำกัน
            }
          });

          updatedFormData[field] = selectedValue;
          return updatedFormData;
        });
      };
  console.log();

  const toGoNext = () => {
    const urlMap: { [key: string]: string } = {
      '1': '/protection-plan',
      '2': '/health-plan',
      '3': '/retirement-plan',
      '4': '/education-plan',
      '5': '/protection-plan',
    };

    if (sortedSelected.length === 1) {
      handleSingleSelection(urlMap);
    } else {
      handleMultipleSelections(urlMap);
    }
  };

  const handleSingleSelection = (urlMap: { [key: string]: string }) => {
    const value = sortedSelected[0];
    if (sortedSelected.length === 1 && value !== '5') {
      navigator('/export-pdf');
    } else {

      if (value === '5') {
        navigateThroughSequence(urlMap);
      } else {
        console.log(value);

        navigateToValue(urlMap, value, '/export-pdf');
      }
    }
  };

  const handleMultipleSelections = (urlMap: { [key: string]: string }) => {
    if (currentIndex < sortedSelected.length - 1) {
      const value = sortedSelected[currentIndex];
      navigateToValue(urlMap, value);
    } else if (currentIndex === sortedSelected.length - 1) {
      const lastValue = sortedSelected[currentIndex];
      navigateToValue(urlMap, lastValue);
    } else if (currentIndex === sortedSelected.length) {
      navigator('/summary');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateThroughSequence = (urlMap: { [key: string]: string }) => {
    const sequence = ['1', '2', '3', '4'];

    if (currentIndex < sequence.length) {
      const currentValue = sequence[currentIndex];
      navigateToValue(urlMap, currentValue);
    } else if (currentIndex === sequence.length) {
      navigator('/summary');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateToValue = (urlMap: { [key: string]: string }, value: string, finalDestination: string = '/summary') => {

    if (urlMap[value]) {

      navigator(urlMap[value]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex === 0) {
      console.log('3');

      navigator(finalDestination);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const toGoFirst = () => {
    setCurrentIndex(0);
    toGoNext();
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "",
      content: (
        <div>

        </div>
      )
    }
  ]
  const toGoBack = () => {
    const urlMap: { [key: string]: { path: string, state: { current: number } } } = {
      '1': { path: '/protection-plan', state: { current: 3 } },
      '2': { path: '/health-plan', state: { current: 3 } },
      '3': { path: '/retirement-plan', state: { current: 2 } },
      '4': { path: '/education-plan', state: { current: 2 } },
      '5': { path: '/protection-plan', state: { current: 3 } },
    };

    if (sortedSelected.length === 1) {
      handleSingleBack(urlMap);
    } else {
      handleMultipleBack(urlMap);
    }
  };

  const handleSingleBack = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    const value = sortedSelected[0];

    if (value === '5') {
      navigateThroughBackSequence(urlMap);
    } else {
      navigateBackToValue(urlMap, value);
    }
  };

  const handleMultipleBack = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    if (currentIndex > 1) {
      const value = sortedSelected[currentIndex - 2];
      navigateBackToValue(urlMap, value);
    } else if (currentIndex === 1) {
      const firstValue = sortedSelected[0];
      navigateBackToValue(urlMap, firstValue);
    } else {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } })
      setCurrentIndex(0);
    }
  };

  const navigateThroughBackSequence = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    const sequence = ['1', '2', '3', '4'];

console.log(currentIndex); //5

    if (currentIndex > 0) {
      console.log(currentIndex);
      const previousValue = sequence[currentIndex - 2];
    console.log(previousValue); //undefined
    
      
      navigateBackToValue(urlMap, previousValue);
    } else {
      

      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } })
      setCurrentIndex(0);
    }
  };

  const navigateBackToValue = (urlMap: { [key: string]: { path: string, state: { current: number } } }, value: string) => {
    if (urlMap[value]) {
      navigator(urlMap[value].path, { state: urlMap[value].state });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  const backlast = () => {
    let newPercent = progress.percent;
    newPercent -= 3;
    setProgress({ percent: newPercent, steps: progress.steps })
    toGoBack()
  }
  const nextlast = async () => {
    let newPercent = progress.percent;
    newPercent += 1;
    setProgress({ percent: newPercent, steps: progress.steps })
    await handleSave()
    toGoNext()
  }
  const handleSave = async () => {
    await saveQuestionsState({ data: formData, nameData: dataname, })

  };
  const handleDisabled = () => {
    if (current === 0) {
      // ตรวจสอบเงื่อนไข sortedSelected.length === 1
      if (sortedSelected.length === 1) {
        const value = sortedSelected[0];
        if (value === '1') {
          return !formData.protectionPlanOrder;
        } else if (value === '2') {
          return !formData.healthPlanOrder;
        } else if (value === '3') {
          return !formData.retirementPlanOrder;
        } else if (value === '4') {
          return !formData.educationPlanOrder;
        } else if (value === '5') {
          return (
            !formData.protectionPlanOrder ||
            !formData.healthPlanOrder ||
            !formData.retirementPlanOrder ||
            !formData.educationPlanOrder
          );
        }
      } 
  
      // ตรวจสอบเงื่อนไข sortedSelected.length >= 1
      if (sortedSelected.length >= 1) {
        return (
          !formData.protectionPlanOrder ||
          !formData.healthPlanOrder ||
          !formData.retirementPlanOrder ||
          !formData.educationPlanOrder
        );
      }
    }
    return false;
  };
  

  const divs: { [key: string]: JSX.Element } = {
    '1': <div className="protectionPlanOrder flex justify-between items-start">
      <div className="">
        <img src={protection} width={70} height={70} />
        <p className=" text-[12px]">แผนคุ้มครองรายได้ <br />ให้กับครอบครัว<br /> ในกรณีที่ต้องจากไป</p>
      </div>
      <div>
        <div className="flex flex-row gap-16 justify-center items-center">
          <p>น้อย</p>
          <div className="long-arrow-right"></div>
          {/* <img src={arrow} alt="" className=" h-5"/> */}
          <p>มาก</p>
        </div>
        <div className="mt-3 w-[222px]">
          <Radio.Group
            onChange={handleRadioChange("protectionPlanOrder")}
            value={formData.protectionPlanOrder}
            size="large"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Radio value={1} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">น้อย</span> */}
            </Radio>
            <Radio value={2} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={3} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={4} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">มาก</span> */}
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>,
    '2': <div className="healthPlanOrder flex justify-between items-start">
      <div className="">
        <img src={health} width={70} height={70} />
        <p className=" text-[12px]">การวางแผนเตรียมเงิน <br /> เรื่องสุขภาพ</p>
      </div>
      <div>

        <div className="mt-5 w-[222px]">
          <Radio.Group
            onChange={handleRadioChange("healthPlanOrder")}
            value={formData.healthPlanOrder}
            size="large"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Radio value={1} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">น้อย</span> */}
            </Radio>
            <Radio value={2} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={3} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={4} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">มาก</span> */}
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>,
    '3': <div className="retirementPlanOrder flex justify-between items-start">
      <div className="">
        <img src={retirement} width={70} height={70} />
        <p className=" text-[12px]">การวางแผนเตรียมเงิน<br />ไว้ยามเกษียณ </p>
      </div>
      <div>

        <div className="mt-5 w-[222px]">
          <Radio.Group
            onChange={handleRadioChange("retirementPlanOrder")}
            value={formData.retirementPlanOrder}
            size="large"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Radio value={1} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">น้อย</span> */}
            </Radio>
            <Radio value={2} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={3} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={4} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">มาก</span> */}
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
    ,
    '4': <div className="educationPlanOrder flex justify-between items-start">
      <div className="">
        <img src={Education} width={70} height={70} />
        <p className=" text-[12px]">การเก็บออม<br />เพื่อค่าเล่าเรียนบุตร </p>
      </div>
      <div>

        <div className="mt-5 w-[222px]">
          <Radio.Group
            onChange={handleRadioChange("educationPlanOrder")}
            value={formData.educationPlanOrder}
            size="large"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Radio value={1} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">น้อย</span> */}
            </Radio>
            <Radio value={2} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={3} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">&gt;</span> */}
            </Radio>
            <Radio value={4} className="custom-radio">
              {/* <span className="radio-label text-[#0E2B81]">มาก</span> */}
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>,
  };
  const renderDivs = (): JSX.Element[] | null => {
    if (sortedSelected.length === 1) {
      const value = sortedSelected[0];
      if (value === '5') {
        // ถ้า value เป็น '5' ให้แสดงทุกอัน 1-4
        return Object.keys(divs).map(key => divs[key]);
      } else if (divs[value]) {
        // ถ้า value เป็น 1-4 แสดงเฉพาะ value นั้น
        return [divs[value]];
      }
    } else if (sortedSelected.length >= 1 && sortedSelected.length <= 4) {
      // ถ้ามีการเลือกมากกว่า 1 และไม่เกิน 4 ตัว ให้แสดงทุกตัวที่เลือก
      return sortedSelected.map(value => divs[value]);
    }
    return null; // ไม่มี div ที่จะแสดง
  };
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>


      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">


        <Row className="flex justify-center items-center mb-3 gap-5">

          <h1 className="text-[24px] text-center text-[#0E2B81]">การจัดลำดับความสำคัญ</h1>

          <ProgressBar percent={progress.percent} current={current} />
          {/* <h1 className="text-[24px] text-center text-[#0E2B81]">น้อย--------------------มาก</h1> */}
        </Row>




        {renderDivs()}




        <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
          <Button
            onClick={backlast}
            className="bg-white rounded-full w-[120px]"
          >
            ย้อนกลับ
          </Button>
          <Button
            disabled={handleDisabled()}
            onClick={nextlast}
            className="bg-[#003781] rounded-full w-[120px] h-10 text-white"
          >
            สรุปผล
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
