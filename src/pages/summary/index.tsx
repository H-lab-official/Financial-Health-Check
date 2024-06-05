import { questionsState } from "@/recoil/questionsState";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Typography, Card
} from "antd";
import { useNavigate, useLocation } from "react-router";
import { useRecoilState } from "recoil";
import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education from "@/assets/images/Education.png"
import summary from "@/assets/images/summary.png"
import './customRadio.css'
const { Text } = Typography;

const Summary: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(questionsState);
  const [current, setCurrent] = useState(currentStep);
  const [selectedValue, setSelectedValue] = useState(null)
  // const handleInputChange =
  //   (field: keyof typeof formData) =>
  //     ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
  //       const formattedValue = value.replace(/[^\d]/g, ""); // Remove any non-digit characters

  //       if (formattedValue === "") {
  //         // Allow clearing the field
  //         setFormData((prevFormData) => ({
  //           ...prevFormData,
  //           [field]: "",
  //         }));
  //         return;
  //       }

  //       const parsedValue = parseInt(formattedValue, 10);
  //       if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 4) return; // Check if value is within the valid range

  //       setFormData((prevFormData) => {
  //         const isDuplicate = Object.entries(prevFormData).some(
  //           ([key, val]) =>
  //             key !== field && parseInt(val as string, 10) === parsedValue
  //         );
  //         if (isDuplicate) return prevFormData;

  //         return {
  //           ...prevFormData,
  //           [field]: formattedValue,
  //         };
  //       });
  //     };

  // const handleRadioChange =
  //   (field: keyof typeof formData) =>
  //     ({ target: { value } }: RadioChangeEvent) => {
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         [field]: value,
  //       }));
  //     };
  // const next = () => {
  //   setCurrent(current + 1);
  // };
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
  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[425px] gap-3 border border-red-400">


        <Row className="flex justify-center items-center mb-3 gap-5">
          <h1 className="text-[24px] text-center text-[#0E2B81]">การจัดลำดับความสำคัญ</h1>
        </Row>



       
          <div className="flex justify-between items-start">
            <div className="">
              <img src={protection} width={70} height={70} />
              <p className=" text-[12px]">แผนคุ้มครองรายได้ <br />ให้กับครอบครัว<br /> ในกรณีที่ต้องจากไป</p>
            </div>
            <div>

              <div className="mt-8 w-[222px]">
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
                  <span className="radio-label text-[#0E2B81]">1</span>
                  </Radio>
                  <Radio value={2} className="custom-radio">
                  <span className="radio-label text-[#0E2B81]">2</span>
                  </Radio>
                  <Radio value={3} className="custom-radio">
                  <span className="radio-label text-[#0E2B81]">3</span>
                  </Radio>
                  <Radio value={4} className="custom-radio">
                  <span className="radio-label text-[#0E2B81]">4</span>
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
                  <span className="radio-label text-white">1</span>
                  </Radio>
                  <Radio value={2} className="custom-radio">
                  <span className="radio-label text-white">2</span>
                  </Radio>
                  <Radio value={3} className="custom-radio">
                  <span className="radio-label text-white">3</span>
                  </Radio>
                  <Radio value={4} className="custom-radio">
                  <span className="radio-label text-white">4</span>
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
                  <span className="radio-label text-white">1</span>
                  </Radio>
                  <Radio value={2} className="custom-radio">
                  <span className="radio-label text-white">2</span>
                  </Radio>
                  <Radio value={3} className="custom-radio">
                  <span className="radio-label text-white">3</span>
                  </Radio>
                  <Radio value={4} className="custom-radio">
                  <span className="radio-label text-white">4</span>
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
                  <span className="radio-label text-white">1</span>
                  </Radio>
                  <Radio value={2} className="custom-radio">
                  <span className="radio-label text-white">2</span>
                  </Radio>
                  <Radio value={3} className="custom-radio">
                  <span className="radio-label text-white">3</span>
                  </Radio>
                  <Radio value={4} className="custom-radio">
                  <span className="radio-label text-white">4</span>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        

          <div className="steps-action h-20 flex flex-row justify-center items-center">
          <Button
                onClick={() => navigator("/education-plan", { state: { current: 2 } })}
                className="bg-white rounded-full w-[180px]"
              >
                ย้อนกลับ
              </Button>
            <Button
              onClick={() => navigator("/export-pdf")}
              className="bg-[#003781] rounded-full w-[180px] h-10 text-white"
            >
              สรุปผล
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
