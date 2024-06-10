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

import { progressState } from '@/recoil/progressState';
import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education from "@/assets/images/Education.png"

import { nameState} from "@/recoil/nameState";
import '@/components/css/customRadio.css'

import { saveQuestionsState } from "@/components/api/saveQuestionsState";
const Summary: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(questionsState);
  const [current, setCurrent] = useState(currentStep);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);

  const dataname=useRecoilValue<nameState>(nameState)
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
  const backlast = () => {
    let newPercent = progress.percent;
    newPercent -= 3;
    setProgress({ percent: newPercent, steps: progress.steps })
    navigator("/education-plan", { state: { current: 2 } })
  }
  const nextlast =async () => {
    let newPercent = progress.percent;
    newPercent += 1;
    setProgress({ percent: newPercent, steps: progress.steps })
   await handleSave()
    navigator("/export-pdf")
  }
  const handleSave = async() => {  
    await saveQuestionsState({ data: formData,nameData: dataname, })
    
   };
  const handleDisabled = () => {
    if (current === 0) {
      return (
        !formData.protectionPlanOrder ||
        !formData.healthPlanOrder ||
        !formData.retirementPlanOrder ||
        !formData.educationPlanOrder
       
      );
    } 
  }
  console.log(current);
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[400px] gap-3 border border-red-400">


        <Row className="flex justify-center items-center mb-3 gap-5">

          <h1 className="text-[24px] text-center text-[#0E2B81]">การจัดลำดับความสำคัญ</h1>
         
          <ProgressBar percent={progress.percent} current={current}/>
          {/* <h1 className="text-[24px] text-center text-[#0E2B81]">น้อย--------------------มาก</h1> */}
        </Row>




        <div className="flex justify-between items-start">
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
        </div>


        <div className="flex justify-between items-start">
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
        </div>


        <div className="flex justify-between items-start">
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

        <div className="flex justify-between items-start">
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
        </div>


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
