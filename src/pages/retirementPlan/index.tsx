import { Button, Col, Form, Row, Select, Typography } from "antd";
import InputField from "@/components/InputField";
import { useNavigate } from "react-router";
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
import { useRecoilState, useRecoilValue } from "recoil";

const { Title, Text } = Typography;

const RetirementPlan: React.FC = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useRecoilState(retirementPlanState);
  const totalCosts = useRecoilValue(totalCostsSelector);
  const workingYears = useRecoilValue(workingYearsSelector);
  const preparationYears = useRecoilValue(preparationYearsSelector);
  const totalPreparation = useRecoilValue(totalPreparationSelector);
  const totalPreparationAssets = useRecoilValue(
    totalRetirementPreparationAssetsSelector
  );
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);

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
          <Title level={3}>เรื่องที่ 3 : Retirement Plan</Title>
        </Row>
        <Form>
          <Row className="my-2">
            <Text className="text-xl font-bold">ค่าใช้จ่ายหลังเกษียณ</Text>
          </Row>
          <InputField
            label="1. กินอยู่"
            value={formData.livingCosts}
            onChange={handleInputChange("livingCosts")}
            addonAfter="บาท / เดือน"
            placeholder="15,000.00"
          />
          <InputField
            label="2. ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้าน"
            value={formData.houseCosts}
            onChange={handleInputChange("houseCosts")}
            addonAfter="บาท / เดือน"
            placeholder="5,000.00"
          />
          <InputField
            label="3. ค่ามือถือ อินเตอร์เน็ต"
            value={formData.internetCosts}
            onChange={handleInputChange("internetCosts")}
            addonAfter="บาท / เดือน"
            placeholder="1,000.00"
          />

          <div className="pt-4">
            <InputField
              label="4. ค่าเสื้อผ้า"
              value={formData.clothingCosts}
              onChange={handleInputChange("clothingCosts")}
              placeholder="6,000.00"
              addonAfter="บาท / เดือน"
            />
          </div>
          <InputField
            label="5. ค่ารักษาพยาบาล"
            value={formData.medicalCosts}
            onChange={handleInputChange("medicalCosts")}
            placeholder="6,000.00"
            addonAfter="บาท / เดือน"
          />
          <InputField
            label="6. ค่าใช้จ่ายอื่น ๆ (ขาดได้ ไม่ใช่ปัจจัย 4)"
            value={formData.otherCosts}
            onChange={handleInputChange("otherCosts")}
            placeholder="6,000.00"
            addonAfter="บาท / เดือน"
          />

          <div className="pt-4">
            <InputField
              label="7. รวมค่าใช้จ่ายต่อปี"
              value={totalCosts}
              onChange={() => {}}
              readOnly
              placeholder="6,000.00"
              addonAfter="บาท / เดือน"
            />
          </div>
          <div className="pt-4">
            <InputField
              label="8. อายุตอนนี้"
              value={formData.age}
              onChange={handleInputChange("age")}
              placeholder="34"
              addonAfter="ปี"
            />
          </div>
          <InputField
            label="9. อายุเกษียณ"
            value={formData.retireAge}
            onChange={handleInputChange("retireAge")}
            placeholder="65"
            addonAfter="ปี"
          />
          <InputField
            label="10. คาดการณ์อายุขัย"
            value={formData.lifExpectancy}
            onChange={handleInputChange("lifExpectancy")}
            placeholder="90"
            addonAfter="ปี"
          />
          <div className="pt-4">
            <InputField
              label="11. จำนวนปีที่ทำงานได้"
              value={workingYears}
              onChange={() => {}}
              readOnly
              placeholder="34"
              addonAfter="ปี"
            />
          </div>
          <InputField
            label="12. จำนวนปีที่ต้องเตรียม"
            value={preparationYears}
            onChange={() => {}}
            readOnly
            placeholder="34"
            addonAfter="ปี"
          />
          <Form.Item className="pt-4">
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"13. เงินเฟ้อ"}</Text>
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
          <InputField
            label="14. รวมค่าใช้จ่ายที่ต้องเตรียม"
            value={totalPreparation}
            onChange={() => {}}
            readOnly
            placeholder="30,626,766.28"
            addonAfter="บาท"
          />

          <Row className="my-2">
            <Text className="text-xl font-bold ">
              สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)
            </Text>
          </Row>

          <InputField
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
            onChange={() => {}}
            readOnly
            addonAfter="บาท"
            placeholder="2,000.00"
          />
          <div className="pt-4">
            <InputField
              label="19. รวมที่ขาดอยู่"
              value={totalMissing}
              onChange={() => {}}
              readOnly
              placeholder="34"
              addonAfter="บาท"
            />
          </div>
          <InputField
            label="20. ต่อปีที่ต้องเก็บได้"
            value={mustBeSaved}
            onChange={() => {}}
            readOnly
            addonAfter="บาท"
            placeholder="2,000.00"
          />
        </Form>
        <Row align={"middle"} justify={"center"} className="mb-4" gutter={20}>
          <Col>
            <Button
              onClick={() => navigator("/health-plan")}
              className="flex items-center justify-center rounded-lg p-5 "
            >
              ย้นอกลับ
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => navigator("/education-plan")}
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

export default RetirementPlan;
