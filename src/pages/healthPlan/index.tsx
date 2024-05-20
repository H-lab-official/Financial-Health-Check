import { Button, Col, Form, Row, Select, Typography } from "antd";
import InputField from "@/components/InputField";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  additionalRoomFeeSelector,
  annualTreatmentSelector,
  dailyCompensationSelector,
  emergencyCostsSelector,
  healthPlanState,
  treatingSeriousIllnessSelector,
} from "@/recoil/healthPlanState";

const { Title, Text } = Typography;

const HealthPlan: React.FC = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useRecoilState(healthPlanState);
  const additionalRoomFee = useRecoilValue(additionalRoomFeeSelector);
  const additionalDailyCompensation = useRecoilValue(dailyCompensationSelector);
  const additionalTreatingSeriousIllness = useRecoilValue(
    treatingSeriousIllnessSelector
  );
  const additionalEmergencyCosts = useRecoilValue(emergencyCostsSelector);

  const additionalAnnualTreatment = useRecoilValue(annualTreatmentSelector);

  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      const formattedValue = value.replace(/[^\d\.]/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: formattedValue,
      }));
    };

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl w-full">
        <Row>
          <Title level={3}>เรื่องที่ 2 : Health Plan</Title>
        </Row>
        <Form>
          <Row className="my-2">
            <Text className="text-xl font-bold">วางแผนเพื่อสุขภาพ</Text>
          </Row>

          <Form.Item className="py-2">
            <Row gutter={20} className="">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"กลุ่มโรงพยาบาลที่ใช้บริการประจำ"}</Text>
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
            label="ค่าห้องต่อวันประมาณ"
            value={formData.hospitals}
            onChange={() => {}}
            addonAfter="บาท"
            placeholder="6,000.00"
            readOnly
          />
          <Row className="my-2">
            <Text className="text-xl font-bold">สวัสดิการที่คาดหวังจะได้</Text>
          </Row>

          <InputField
            label="ค่าห้องวันละ"
            value={formData.hospitals}
            onChange={handleInputChange("roomFeeFromWelfare")}
            readOnly
            placeholder="6,000.00"
            addonAfter="บาท"
          />
          <InputField
            label="ค่าชดเชยรายวัน"
            value={formData.dailyCompensationFromWelfare}
            onChange={handleInputChange("dailyCompensationFromWelfare")}
            addonAfter="บาท"
            placeholder="2,000.00"
          />
          <InputField
            label="ค่ารักษาโรคร้ายแรง"
            value={formData.treatingSeriousIllness}
            onChange={handleInputChange("treatingSeriousIllness")}
            addonAfter="บาท"
          />
          <InputField
            label="ค่ารักษาอุบัติเหตุฉุกเฉิน"
            value={formData.emergencyCosts}
            onChange={handleInputChange("emergencyCosts")}
            addonAfter="บาท"
          />
          <InputField
            label="งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
            value={formData.annualTreatment}
            onChange={handleInputChange("annualTreatment")}
            addonAfter="บาท"
          />

          <Row className="my-2">
            <Text className=" text-xl font-bold">
              สวัสดิการปัจจุบันจากบริษัท หรือ จากประกันที่มี
            </Text>
          </Row>
          <InputField
            label="ค่าห้องวันละ"
            value={formData.roomFeeFromCompany}
            onChange={handleInputChange("roomFeeFromCompany")}
            placeholder="6,000.00"
            addonAfter="บาท"
          />
          <InputField
            label="ค่าชดเชยรายวัน"
            value={formData.dailyCompensationFromCompany}
            onChange={handleInputChange("dailyCompensationFromCompany")}
            addonAfter="บาท"
            placeholder="2,000.00"
          />
          <InputField
            label="ค่ารักษาโรคร้ายแรง"
            value={formData.treatingSeriousIllnessFromCompany}
            onChange={handleInputChange("treatingSeriousIllnessFromCompany")}
            addonAfter="บาท"
          />
          <InputField
            label="ค่ารักษาอุบัติเหตุฉุกเฉิน"
            value={formData.emergencyCostsFromCompany}
            onChange={handleInputChange("emergencyCostsFromCompany")}
            addonAfter="บาท"
          />
          <InputField
            label="งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
            value={formData.annualTreatmentFromCompany}
            onChange={handleInputChange("annualTreatmentFromCompany")}
            addonAfter="บาท"
          />

          <Row className="my-2">
            <Text className=" text-xl font-bold py-4">
              สวัสดิการที่ต้องเพิ่มเติม
            </Text>
          </Row>
          <InputField
            label="ค่าห้องวันละ"
            value={additionalRoomFee}
            onChange={() => {}}
            placeholder="6,000.00"
            addonAfter="บาท"
            readOnly
          />
          <InputField
            label="ค่าชดเชยรายวัน"
            value={additionalDailyCompensation}
            onChange={() => {}}
            addonAfter="บาท"
            placeholder="2,000.00"
            readOnly
          />
          <InputField
            label="ค่ารักษาโรคร้ายแรง"
            value={additionalTreatingSeriousIllness}
            onChange={() => {}}
            readOnly
            addonAfter="บาท"
          />
          <InputField
            label="ค่ารักษาอุบัติเหตุฉุกเฉิน"
            value={additionalEmergencyCosts}
            onChange={() => {}}
            readOnly
            addonAfter="บาท"
          />
          <InputField
            label="งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
            value={additionalAnnualTreatment}
            onChange={() => {}}
            readOnly
            addonAfter="บาท"
          />
        </Form>
        <Row align={"middle"} justify={"center"} className="mb-4" gutter={20}>
          <Col>
            <Button
              onClick={() => navigator("/protection-plan")}
              className="flex items-center justify-center rounded-lg p-5 "
            >
              ย้นอกลับ
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => navigator("/retirement-plan")}
              className="flex items-center justify-center rounded-lg py-5 px-7 "
            >
              ถัดไป
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HealthPlan;
