import { Button, Col, Form, Row, Select, Typography } from "antd";
import InputField from "@/components/InputField";
import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  additionalRoomFeeSelector,
  annualTreatmentSelector,
  dailyCompensationSelector,
  emergencyCostsSelector,
  healthPlanState,
  treatingSeriousIllnessSelector,
} from "@/recoil/healthPlanState";
import health from "@/assets/images/health.png"


const { Title, Text } = Typography;

const HealthPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(healthPlanState);
  const additionalRoomFee = useRecoilValue(additionalRoomFeeSelector);
  const additionalDailyCompensation = useRecoilValue(dailyCompensationSelector);
  const additionalTreatingSeriousIllness = useRecoilValue(
    treatingSeriousIllnessSelector
  );
  const additionalEmergencyCosts = useRecoilValue(emergencyCostsSelector);

  const additionalAnnualTreatment = useRecoilValue(annualTreatmentSelector);
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
  

  const steps = [{
    title: "วางแผนเพื่อสุขภาพ",
    content: (
      <div>
        <Form.Item className="py-2">
          <Row gutter={20} className="">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Text>{"1. กลุ่มโรงพยาบาลที่ใช้บริการประจำ"}</Text>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Select
                defaultValue={formData.hospitals}
                onChange={handleInputChange("hospitals")}
                options={[
                  { label: "โรงพยาบาลรัฐ", value: "1500.00" },
                  { label: "โรงพยาบาลรัฐนอกเวลา", value: "2500.00" },
                  { label: "โรงพยาบาลเอกชน", value: "4000.00" },
                  { label: "โรงพยาบาลเอกชนพรีเมียม", value: "6000.00" },
                ]}
              />
            </Col>
          </Row>
        </Form.Item>
        <InputField
          label="2. ค่าห้องต่อวันประมาณ"
          value={formData.hospitals}
          onChange={() => { }}
          addonAfter="บาท"
          placeholder="6,000.00"
          readOnly
        />
        <div>
          <h1 className="text-xl mb-3">สวัสดิการที่คาดหวังจะได้</h1>
          <div><InputField
        label="3. ค่าห้องวันละ"
        value={formData.hospitals}
        onChange={handleInputChange("roomFeeFromWelfare")}
        readOnly
        placeholder="6,000.00"
        addonAfter="บาท"
      />
        <InputField
          label="4. ค่าชดเชยรายวัน"
          value={formData.dailyCompensationFromWelfare}
          onChange={handleInputChange("dailyCompensationFromWelfare")}
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <InputField
          label="5 .ค่ารักษาโรคร้ายแรง"
          value={formData.treatingSeriousIllness}
          onChange={handleInputChange("treatingSeriousIllness")}
          addonAfter="บาท"
        />
        <InputField
          label="6. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={formData.emergencyCosts}
          onChange={handleInputChange("emergencyCosts")}
          addonAfter="บาท"
        />
        <InputField
          label="7. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={formData.annualTreatment}
          onChange={handleInputChange("annualTreatment")}
          addonAfter="บาท"
        /></div>
        </div>
      </div>
      
    )
  },
  {
    title: "สวัสดิการปัจจุบันจากบริษัท หรือ จากประกันที่มี",
    content: (
      <div><InputField
        label="8. ค่าห้องวันละ"
        value={formData.roomFeeFromCompany}
        onChange={handleInputChange("roomFeeFromCompany")}
        placeholder="6,000.00"
        addonAfter="บาท"
      />
        <InputField
          label="9. ค่าชดเชยรายวัน"
          value={formData.dailyCompensationFromCompany}
          onChange={handleInputChange("dailyCompensationFromCompany")}
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <InputField
          label="10. ค่ารักษาโรคร้ายแรง"
          value={formData.treatingSeriousIllnessFromCompany}
          onChange={handleInputChange("treatingSeriousIllnessFromCompany")}
          addonAfter="บาท"
        />
        <InputField
          label="11. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={formData.emergencyCostsFromCompany}
          onChange={handleInputChange("emergencyCostsFromCompany")}
          addonAfter="บาท"
        />
        <InputField
          label="12. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={formData.annualTreatmentFromCompany}
          onChange={handleInputChange("annualTreatmentFromCompany")}
          addonAfter="บาท"
        /></div>
    )
  }, {
    title: "สวัสดิการที่ต้องเพิ่มเติม",
    content: (
      <div> <InputField
        label="13. ค่าห้องวันละ"
        value={additionalRoomFee}
        onChange={() => { }}
        placeholder="6,000.00"
        addonAfter="บาท"
        readOnly
      />
        <InputField
          label="14. ค่าชดเชยรายวัน"
          value={additionalDailyCompensation}
          onChange={() => { }}
          addonAfter="บาท"
          placeholder="2,000.00"
          readOnly
        />
        <InputField
          label="15. ค่ารักษาโรคร้ายแรง"
          value={additionalTreatingSeriousIllness}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
        />
        <InputField
          label="16. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={additionalEmergencyCosts}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
        />
        <InputField
          label="17. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={additionalAnnualTreatment}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
        /></div>
    )
  }]
  return (
    <div className="flex justify-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[425px] gap-3 border border-red-400">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-lg font-bold text-center">Health Plan</h1>
          <img src={health} alt="" className="" />
        </div>
        <div className="steps-content h-auto p-2 shadow-lg rounded-md gap-5 mb-5 w-[375px]">
          <p className="text-xl mb-3">{steps[current].title}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row">
            {current < steps.length - 1 && (
              <><Button type="primary" onClick={() => next()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[180px]" : "w-[180px]"}`}>
                ถัดไป
              </Button>
              </>


            )}
            {current === 0 && (
              <Button
                onClick={() => navigator("/protection-plan", { state: { current: 2 } })}
                className="bg-white rounded-full w-[180px]"
              >
                ย้อนกลับ
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                onClick={() => navigator("/retirement-plan")}
                className="bg-[#003781] rounded-full w-[180px]"
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

export default HealthPlan;
