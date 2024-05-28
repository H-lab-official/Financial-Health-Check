import { Button, Col, Form, Row, Select, Typography, Steps } from "antd";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router";
import protection from "@/assets/images/protection.png"
import { useRecoilState, useRecoilValue } from "recoil";
import {
  protectionPlanState,
  totalDebtsSelector,
  totalAssetsSelector,
  initialYearlyExpenseSelector,
  totalAmountSelector,
  requiredAmountSelector,
  coverageSelector,
} from "@/recoil/protectionPlanState";


const { Text } = Typography;

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
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      const formattedValue = value.replace(/[^\d\.]/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: formattedValue,
      }));
    };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "ค่าใช้จ่าย",
      content: (
        <>
          <InputField
            label="1. ค่าใช้จ่ายภายในครอบครัว"
            value={formData.initialMonthlyExpense}
            onChange={handleInputChange("initialMonthlyExpense")}
            addonAfter="ต่อเดือน"
            placeholder="40,000.00"
          />
          <InputField
            label="2. ค่าใช้จ่ายภายในครอบครัวต่อปี"
            value={initialYearlyExpense}
            onChange={() => { }}
            readOnly
            placeholder="48,000.00"
            addonAfter="ต่อปี"
            
          />
          <InputField
            label="3. จำนวนปีที่ต้องการดูแลครอบครัว"
            value={formData.numberOfYears}
            onChange={handleInputChange("numberOfYears")}
            addonAfter="ปี"
            placeholder="20"
          />
          <InputField
            label="4. ค่าใช้จ่ายเงินก้อนที่จะเกิด (ค่าซ่อมรถ ซ่อมบ้าน เที่ยว เสริมสวย)"
            value={formData.adjustedYearlyExpenses}
            onChange={handleInputChange("adjustedYearlyExpenses")}
            addonAfter="บาท"
            placeholder="50,000.00"
          />
          <Form.Item>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"5. เงินเฟ้อ"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Select
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
              </Col>
            </Row>
          </Form.Item>
          <div className="py-4">
            <InputField
              label="6. จำนวนเงินที่ครอบครัวต้องการ ถ้าเกิดเป็นอะไร ณ วันนี้"
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
            label="7. ค่าผ่อนบ้านคงค้างทั้งหมด รวมดอกเบี้ย"
            value={formData.homePayments}
            onChange={handleInputChange("homePayments")}
            addonAfter="บาท"
            placeholder="3,000,000.00"
          />
          <InputField
            label="6. ค่าผ่อนรถคงค้างทั้งหมด รวมดอกเบี้ย"
            value={formData.carPayments}
            onChange={handleInputChange("carPayments")}
            addonAfter="บาท"
            placeholder="300,000.00"
          />
          <InputField
            label="8 .หนี้สินอื่นๆ"
            value={formData.otherDebts}
            onChange={handleInputChange("otherDebts")}
            addonAfter="บาท"
            placeholder="50,000.00"
          />
          <InputField
            label="9. รวมหนี้สิน"
            value={totalDebts}
            onChange={() => { }}
            addonAfter="บาท"
          />
          <div className="py-4">
            <InputField
              label="10 .จำนวนเงินที่ต้องการ"
              value={requiredAmount}
              onChange={() => { }}
              addonAfter="บาท"
            />
          </div>
        </>
      )
    },
    {
      title: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
      content: (<>
        <InputField
          label="11. เงินฝากธนาคาร"
          value={formData.bankDeposit}
          onChange={handleInputChange("bankDeposit")}
          addonAfter="บาท"
          placeholder="1,000,000.00"
        />
        <InputField
          label="12. ทุนประกันชีวิต"
          value={formData.lifeInsuranceFund}
          onChange={handleInputChange("lifeInsuranceFund")}
          addonAfter="บาท"
          placeholder="6,000,000.00"
        />
        <InputField
          label="13. ทรัพย์สินอื่น ๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="3,000,000.00"
        />
        <InputField
          label="14. รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalAssets}
          onChange={() => { }}
          addonAfter="บาท"
        />
        <div className="py-4">
          <InputField
            label="15. ความคุ้มครองที่จำเป็น"
            value={coverage}
            onChange={() => { }}
            addonAfter="บาท"
          />
        </div>
      </>)
    }

  ]

  return (
    <div className="flex justify-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[425px] gap-3 border border-red-400">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-lg font-bold text-center">Protection Plan</h1>
          <img src={protection} alt="" className="" />
        </div>

        <div className="steps-content h-auto p-2 shadow-lg rounded-md gap-5 mb-5 w-[375px]">
         <p className="text-xl mb-3">{steps[current].title}</p> 
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-full" : "w-[180px]"
                }`}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  if (coverage) navigator("/health-plan");
                }} className="bg-[#003781] rounded-full w-[180px]"
              >
                ถัดไป
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()} className={` bg-white rounded-full w-[180px]`}>
                ย้อนกลับ
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPlan;
