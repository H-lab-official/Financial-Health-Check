import { Button, Col, Form, Select, Typography, Steps } from "antd";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router";
import protection from "@/assets/images/protection.png"
import { useRecoilState, useRecoilValue } from "recoil";
import DotsComponent from "@/components/DotsComponent";
import {
  protectionPlanState,
  totalDebtsSelector,
  totalAssetsSelector,
  initialYearlyExpenseSelector,
  totalAmountSelector,
  requiredAmountSelector,
  coverageSelector,
} from "@/recoil/protectionPlanState";

import { progressState } from '@/recoil/progressState';
import { selectedState  } from '@/recoil/progressState';
import { nameState} from "@/recoil/nameState";
import protection1 from "@/assets/images/protection1.png"
import protection2 from "@/assets/images/protection2.png"
import protection3 from "@/assets/images/protection3.png"
const { Text } = Typography;
import ProgressBar from "@/components/progressBar";
import { saveProtectionPlan} from "@/components/api/saveProtectionPlan";

const ProtectionPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(protectionPlanState);
  const totalDebts = useRecoilValue(totalDebtsSelector);
  const totalAssets = useRecoilValue(totalAssetsSelector);
  const initialYearlyExpense = useRecoilValue(initialYearlyExpenseSelector);
  const totalAmount = useRecoilValue(totalAmountSelector);
  const requiredAmount = useRecoilValue(requiredAmountSelector);
  const coverage = useRecoilValue(coverageSelector);
  const [current, setCurrent] = useState(currentStep);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const dataname=useRecoilValue<nameState>(nameState)
  const selectedValue=useRecoilValue(selectedState)
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
      allImages = protection     
      break;
    case 1:
      allImages = protection1
      break;
    case 2:
      allImages = protection2
      break;
    case 3:
      allImages = protection3
      break;

  }
  const handleSave = async() => {  
   await saveProtectionPlan({ data: formData,nameData: dataname, })
   if(selectedValue=='1'){
    navigator("/export-pdf", { state: { current: 2 } })
  }else if(selectedValue=='5'){
     navigator("/health-plan")
  }
  };
  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.initialMonthlyExpense ||
        !formData.numberOfYears ||
        !formData.adjustedYearlyExpenses ||
        !formData.inflationRate
      );
    } else if (current === 2) {
      return (
        !formData.homePayments || 
        !formData.carPayments || 
        !formData.otherDebts
      )
    } else if(current===3){
      return(
        !formData.bankDeposit||
        !formData.lifeInsuranceFund||
        !formData.otherAssets
      )
    }
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
    if (current === 0) {
      setProgress({ percent: 0, steps: progress.steps });
    }
    if (current === 3) {
      newPercent -= progress.steps;
    } else if (current === 2) {
      newPercent -= progress.steps;
    }
    setProgress({ percent: newPercent, steps: progress.steps });
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "แผนที่ 1",
      content: (
        <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
          <h1 className=" font-bold">Protection Plan</h1>
          <h1 className=" text-center mt-5">แผนการคุ้มครอง <br />รายได้ให้กับครอบครัว <br />ในกรณีที่ต้องจากไป</h1>

        </div>
      )
    },
    {
      title: "ค่าใช้จ่าย",
      content: (
        <>
          <InputField
            label="1. ค่าใช้จ่ายภายในครอบครัว"
            value={formData.initialMonthlyExpense}
            onChange={handleInputChange("initialMonthlyExpense")}
            addonAfter="ต่อเดือน"
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          />
          <InputField
            label="2. ค่าใช้จ่ายภายในครอบครัวต่อปี"
            value={initialYearlyExpense}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="ต่อปี"


          />
          <InputField
            label="3. จำนวนปีที่ต้องการดูแลครอบครัว"
            value={formData.numberOfYears}
            onChange={handleInputChange("numberOfYears")}
            addonAfter="ปี"
            placeholder="กรุณากรอกจำนวนปี"
          />
          <InputField
            label="4.เงินสำรองฉุกเฉิน (50% ของ รายได้ต่อปี)"
            value={formData.adjustedYearlyExpenses}
            onChange={handleInputChange("adjustedYearlyExpenses")}
            addonAfter="บาท"
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          />
          <Form.Item>
            <Col>
              <Col>
                <Text className="text-[#243286]">{"5. เงินเฟ้อ"}</Text>
              </Col>
              <Col>
                <div className="flex flex-row justify-start items-center gap-5 ">
                  <Select
                    style={{ width: '260px' }}
                    defaultValue={formData.inflationRate}
                    onChange={handleInputChange("inflationRate")}
                    options={[
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
          <div className="">
            <InputField
              label="6. เงินสำรองที่จำเป็นต้องจัดเตรียมไว้"
              value={totalAmount}
              onChange={() => { }}
              readOnly
              addonAfter="บาท"
            />
          </div>
        </>
      )
    }, {
      title: "หนี้สินค้างชำระ",
      content: (
        <>
          <InputField
            label="7. ค่าผ่อนบ้านคงค้างทั้งหมด"
            value={formData.homePayments}
            onChange={handleInputChange("homePayments")}
            addonAfter="บาท"
            placeholder="3,000.00"
          />
          <InputField
            label="8. ค่าผ่อนรถคงค้างทั้งหมด"
            value={formData.carPayments}
            onChange={handleInputChange("carPayments")}
            addonAfter="บาท"
            placeholder="300,000.00"
          />
          <InputField
            label="9 .หนี้สินอื่นๆ"
            value={formData.otherDebts}
            onChange={handleInputChange("otherDebts")}
            addonAfter="บาท"
            placeholder="50,000.00"
          />
          <InputField
            label="10. รวมหนี้สิน"
            value={totalDebts}
            onChange={() => { }}
            addonAfter="บาท"
            readOnly
          />
          <div className="">
            <InputField
              label="11 .จำนวนเงินที่ต้องการ"
              value={requiredAmount}
              onChange={() => { }}
              addonAfter="บาท"
              readOnly
            />
          </div>
        </>
      )
    },
    {
      title: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
      content: (<>
        <InputField
          label="12. เงินฝากธนาคาร"
          value={formData.bankDeposit}
          onChange={handleInputChange("bankDeposit")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="13. ทุนประกันชีวิต"
          value={formData.lifeInsuranceFund}
          onChange={handleInputChange("lifeInsuranceFund")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="14. ทรัพย์สินอื่น ๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="15. รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalAssets}
          onChange={() => { }}
          addonAfter="บาท"
          readOnly
        />
        <div className=" ">
          <InputField
            label="16. ความคุ้มครองที่จำเป็น"
            value={coverage}
            onChange={() => { }}
            addonAfter="บาท"
            readOnly
          />
        </div>
      </>)
    }

  ]
  console.log();

  return (
    <div className="flex justify-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[400px] gap-3 border border-red-400">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className={` text-2xl font-bold text-center  `}>{current == 0 ? "แผนที่ 1" : "Protection Plan"}</h1>
          <ProgressBar percent={progress.percent} current={current} />
          <img src={allImages} alt="" className="w-[265px] mt-5" />
          <DotsComponent steps={steps} current={current} />
        </div>
        <div className="steps-content h-auto py-2 px-3 shadow-lg rounded-md gap-5 mb-5 w-[350px] ">
          <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title}</p>
          {steps[current].content}
          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current == 0 && (
              <Button onClick={() => navigator("/Financial-Health-Check", { state: { current: 2 } })} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"}`}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                disabled={handleDisabled()}
                onClick={() => handleSave()} className="bg-[#003781] rounded-full w-[120px]"
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

export default ProtectionPlan;
