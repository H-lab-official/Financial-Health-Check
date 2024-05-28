import { Button, Col, Form, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router";
import {
  educationPlanState,
  requiredScholarshipsSelector,
  totalPreparationAssetsSelector,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import Education from "@/assets/images/Education.png"
const { Text } = Typography;

const EducationPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(educationPlanState);
  const requiredScholarships = useRecoilValue(requiredScholarshipsSelector);
  const totalPreparationAssets = useRecoilValue(totalPreparationAssetsSelector);
  const totalMissing = useRecoilValue(totalMissingSelector);
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
      title: "วางแผนเพื่อการศึกษาบุตร",
      content: (
        <div>
          <Form.Item>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"1. ระดับการศึกษาที่คาดหวัง"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Select
                  defaultValue={formData.levelOfeducation}
                  onChange={handleInputChange("levelOfeducation")}
                  options={[
                    { value: "ปริญญาตรี", label: "ปริญญาตรี" },
                    { value: "ปริญญาโท", label: "ปริญญาโท" },
                    { value: "ปริญญาเอก", label: "ปริญญาเอก" },
                  ]}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"2. ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Select
                  defaultValue={formData.typeOfeducation}
                  onChange={handleInputChange("typeOfeducation")}
                  options={[
                    { value: "107000.00", label: "รัฐบาล" },
                    { value: "214900.00", label: "เอกชน" },
                    { value: "500000.00", label: "อินเตอร์" },
                  ]}
                />
              </Col>
            </Row>
          </Form.Item>
          <Row className="my-2">
            <Text className="text-xl font-bold">ทุนการศึกษาที่จำเป็น</Text>
          </Row>
          <InputField
            label="3. ค่าเล่าเรียน"
            value={formData.typeOfeducation}
            onChange={() => { }}
            readOnly
            addonAfter="บาท / ปี"
            placeholder="15,000.00"
          />
          <InputField
            label="4. ค่าใช้จ่ายระหว่างศึกษา"
            value={(parseFloat(formData.typeOfeducation) * 0.15).toFixed(2)}
            onChange={() => { }}
            readOnly
            addonAfter="บาท / ปี"
            placeholder="5,000.00"
          />
          <InputField
            label="5. จำนวนปีการศึกษาของลูกที่จะต้องส่ง"
            value={formData.yearsOfeducation}
            onChange={handleInputChange("yearsOfeducation")}
            addonAfter="ปี"
            placeholder="19"
          />
          <Form.Item>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"6. อัตราการเฟ้อของค่าเทอมต่อปี"}</Text>
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
          <div className="pt-4">
            <InputField
              label="8. รวมทุนการศึกษาที่จำเป็น"
              value={requiredScholarships}
              onChange={() => { }}
              readOnly
              placeholder="309,0630.66"
              addonAfter="บาท"
            />
          </div>
        </div>
      )
    }, {
      title: "สิ่งที่เตรียมไว้แล้ว",
      content: (
        <div>
          <div className="pt-4">
            <InputField
              label="9. เงินฝาก"
              value={formData.deposit}
              onChange={handleInputChange("deposit")}
              placeholder="6,000.00"
              addonAfter="บาท"
            />
          </div>
          <InputField
            label="10. กรมธรรม์ที่ครบกำหนด"
            value={formData.insuranceFund}
            onChange={handleInputChange("insuranceFund")}
            placeholder="6,000.00"
            addonAfter="บาท"
          />
          <InputField
            label="11. อื่นๆ"
            value={formData.otherAssets}
            onChange={handleInputChange("otherAssets")}
            placeholder="6,000.00"
            addonAfter="บาท"
          />
          <InputField
            label="12. รวมทุนการศึกษาที่เตรียมไว้แล้ว"
            value={totalPreparationAssets}
            onChange={() => { }}
            readOnly
            placeholder="6,000.00"
            addonAfter="บาท"
          />
          <div className="pt-4">
            <InputField
              label="13. รวมที่ขาดอยู่"
              value={totalMissing}
              onChange={() => { }}
              readOnly
              placeholder="6,000.00"
              addonAfter="บาท"
            />
          </div>
        </div>
      )
    }
  ]
  return (
    <div className="flex justify-center text-[#0E2B81]">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[425px] gap-3 border border-red-400">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-lg font-bold text-center">Education Plan </h1>
          <img src={Education} alt="" />
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
                onClick={() => navigator("/retirement-plan", { state: { current: 1 } })}
                className="bg-white rounded-full w-[180px]"
              >
                ย้อนกลับ
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                onClick={() => navigator("/summary")}
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

export default EducationPlan;
