import { Button, Col, Form, Row, Select, Typography ,Progress} from "antd";
import InputField from "@/components/InputField";
import ProgressBar from "@/components/progressBar";
import { useNavigate, useLocation } from "react-router";
import React, { useState } from "react";
import {
  preparationYearsSelector,
  retirementPlanState,
  totalCostsSelector,
  totalRetirementMissingSelector,
  totalRetirementPreparationAssetsSelector,
  totalPreparationSelector,
  workingYearsSelector,
  mustBeSavedSelector,
} from "@/recoil/retirementPlanState";
import DotsComponent from "@/components/DotsComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { progressState } from '@/recoil/progressState';
import retirement from "@/assets/images/retirement.png"
import retirement1 from "@/assets/images/retirement1.png"
import retirement2 from "@/assets/images/retirement2.png"
const { Text } = Typography;

const RetirementPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(retirementPlanState);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const totalCosts = useRecoilValue(totalCostsSelector);
  const workingYears = useRecoilValue(workingYearsSelector);
  const preparationYears = useRecoilValue(preparationYearsSelector);
  const totalPreparation = useRecoilValue(totalPreparationSelector);
  const totalPreparationAssets = useRecoilValue(
    totalRetirementPreparationAssetsSelector
  );
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const [current, setCurrent] = useState(currentStep);
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      const formattedValue = value.replace(/[^\d\.]/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: formattedValue,
      }));
    };

    let allImages
    
    switch (current) {
      case 0:
        allImages = retirement
       
        break;
      case 1:
        allImages = retirement1
      
        break;
      case 2:
        allImages = retirement2
        
        break;     
     
    }

    const next = () => {
      let newPercent = progress.percent;
  
      if (current === 1) {
        newPercent += progress.steps;
      } else if (current === 2) {
        newPercent += progress.steps;
      }
  
      setProgress({ percent: newPercent, steps: progress.steps });
      setCurrent(current + 1);
    };
  
    const prev = () => {
      let newPercent = progress.percent;
  
      if (current === 3) {
        newPercent -= progress.steps;
      } else if (current === 2) {
        newPercent -= progress.steps;
      }
  
      setProgress({ percent: newPercent, steps: progress.steps });
      setCurrent(current - 1);
    };
    const handleDisabled = () => {
      if (current === 1) {
        return (
          !formData.livingCosts ||
          !formData.houseCosts ||
          !formData.internetCosts ||
          !formData.clothingCosts ||
          !formData.medicalCosts||
          !formData.otherCosts||
          !formData.age||
          !formData.retireAge||
          !formData.lifExpectancy||
          !formData.inflationRate
        );
      } else if (current === 2) {
        return (
          !formData.deposit ||
          !formData.insuranceFund ||
          !formData.otherAssets 
         
  
        )
      } 
    }
  const steps = [{
    title: "แผนที่ 3",
    content: (
      <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
        <h1 className=" font-bold">Retirement Plan</h1>
        <h1 className=" text-center">แผนการคุ้มครอง <br />เรื่องเกษียณ<br /></h1>

      </div>
    )
  },
  {
    title: "ค่าใช้จ่ายหลังเกษียณ",
    content: (
      <div>
        <InputField
          label="1. กินอยู่"
          value={formData.livingCosts}
          onChange={handleInputChange("livingCosts")}
          addonAfter="บาท / เดือน"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="2. ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้าน"
          value={formData.houseCosts}
          onChange={handleInputChange("houseCosts")}
          addonAfter="บาท / เดือน"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="3. ค่ามือถือ อินเตอร์เน็ต"
          value={formData.internetCosts}
          onChange={handleInputChange("internetCosts")}
          addonAfter="บาท / เดือน"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />

        <div className="">
          <InputField
            label="4. ค่าเสื้อผ้า"
            value={formData.clothingCosts}
            onChange={handleInputChange("clothingCosts")}
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            addonAfter="บาท / เดือน"
          />
        </div>
        <InputField
          label="5. ค่ารักษาพยาบาล"
          value={formData.medicalCosts}
          onChange={handleInputChange("medicalCosts")}
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          addonAfter="บาท / เดือน"
        />
        <InputField
          label="6. ค่าใช้จ่ายอื่น ๆ (ขาดได้ ไม่ใช่ปัจจัย 4)"
          value={formData.otherCosts}
          onChange={handleInputChange("otherCosts")}
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          addonAfter="บาท / เดือน"
        />

        <div className="">
          <InputField
            label="7. รวมค่าใช้จ่ายต่อปี"
            value={totalCosts}
            onChange={() => { }}
            readOnly
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            addonAfter="บาท"
          />
        </div>
        
          <InputField
            label="8. อายุตอนนี้&nbsp;&nbsp;&nbsp;"
            value={formData.age}
            onChange={handleInputChange("age")}
            placeholder="กรุณากรอกอายุของคุณ"
            addonAfter="ปี"
          />
        
        <InputField
          label="9. อายุเกษียณ"
          value={formData.retireAge}
          onChange={handleInputChange("retireAge")}
          placeholder="กรุณากรอกอายุประเมิน"
          addonAfter="ปี"
        />
        <InputField
          label="10. คาดการณ์อายุขัย"
          value={formData.lifExpectancy}
          onChange={handleInputChange("lifExpectancy")}
          placeholder="กรุณากรอกอายุประเมิน"
          addonAfter="ปี"
        />
        <div className="">
          <InputField
            label="11. จำนวนปีที่ทำงานได้"
            value={workingYears}
            onChange={() => { }}
            readOnly
            placeholder="34"
            addonAfter="ปี"
          />
        </div>
        <InputField
          label="12. จำนวนปีที่ต้องเตรียม"
          value={preparationYears}
          onChange={() => { }}
          readOnly
          placeholder="34"
          addonAfter="ปี"
        />
        <Form.Item>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"13. เงินเฟ้อ"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '220px' }}
                  value={formData.inflationRate || undefined}
                  placeholder="เลือกประเภทโรงพยาบาล"
                  onChange={handleInputChange("inflationRate")}
                  options={[
                    { label: "กรุณาเลือก", value: undefined, disabled: !!formData.inflationRate },
                    { value: "0.02", label: "2 %" },
                    { value: "0.03", label: "3 %" },
                    { value: "0.04", label: "4 %" },
                    { value: "0.05", label: "5 %" },
                    { value: "0.06", label: "6 %" },
                    { value: "0.07", label: "7 %" },
                  ]}
                />

              </div>
            </Col>
          </Col>
        </Form.Item>

        
        <InputField
          label="14. รวมค่าใช้จ่ายที่ต้องเตรียม"
          value={totalPreparation}
          onChange={() => { }}
          readOnly
          placeholder="30,626,766.28"
          addonAfter="บาท"
        />
      </div>
    )
  },
  {
    title: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
    content: (
      <div><InputField
        label="15. เงินฝาก"
        value={formData.deposit}
        onChange={handleInputChange("deposit")}
        addonAfter="บาท"
        placeholder="2,000.00"
      />
        <InputField
          label="16. ทุนประกัน"
          value={formData.insuranceFund}
          onChange={handleInputChange("insuranceFund")}
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <InputField
          label="17. ทรัพย์สินอื่น ๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <InputField
          label="18. รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalPreparationAssets}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <div className="pt-4">
          <InputField
            label="19. รวมที่ขาดอยู่"
            value={totalMissing}
            onChange={() => { }}
            readOnly
            placeholder="34"
            addonAfter="บาท"
          />
        </div>
        <InputField
          label="20. ต่อปีที่ต้องเก็บได้"
          value={mustBeSaved}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          placeholder="2,000.00"
        /></div>
    )
  }
  ]
  return (
    <div className="flex justify-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[400px] gap-3 border border-red-400">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-2xl font-bold text-center">{current == 0 ? "แผนที่ 3" : "Retirement Plan"}</h1>
          
          <ProgressBar percent={progress.percent} current={current}/>
          <img src={allImages} alt="" className="w-[265px] mt-5" />
          <DotsComponent steps={steps} current={current} />
        </div>
        <div className="steps-content h-auto py-2 px-3 shadow-lg rounded-md gap-5 mb-5 w-[350px]">
          <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">

            {current === 0 && (
              <Button
                onClick={() => navigator("/health-plan", { state: { current: 3 } })}
                className="bg-white rounded-full w-[120px]"
              >
                ย้อนกลับ
              </Button>
            )}

            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <><Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"}`}>
                ถัดไป
              </Button>
              </>
            )}
            {current === steps.length - 1 && (
              <Button
              disabled={handleDisabled()}
                onClick={() => navigator("/education-plan")}
                className="bg-[#003781] rounded-full w-[120px] text-white"
              >
                ถัดไป
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlan;
