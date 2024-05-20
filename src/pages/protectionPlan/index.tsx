import { Button, Col, Form, Row, Select, Typography } from "antd";
import InputField from "@/components/InputField";
import { useNavigate } from "react-router";
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

const { Text, Title } = Typography;

const ProtectionPlan: React.FC = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useRecoilState(protectionPlanState);
  const totalDebts = useRecoilValue(totalDebtsSelector);
  const totalAssets = useRecoilValue(totalAssetsSelector);
  const initialYearlyExpense = useRecoilValue(initialYearlyExpenseSelector);
  const totalAmount = useRecoilValue(totalAmountSelector);
  const requiredAmount = useRecoilValue(requiredAmountSelector);
  const coverage = useRecoilValue(coverageSelector);

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
          <Title level={3}>เรื่องที่ 1 : Protection Plan</Title>
        </Row>
        <Form>
          <Row className="my-2">
            <Text className="text-xl font-bold">ค่าใช้จ่าย</Text>
          </Row>

          <InputField
            label="ค่าใช้จ่ายภายในครอบครัว"
            value={formData.initialMonthlyExpense}
            onChange={handleInputChange("initialMonthlyExpense")}
            addonAfter="บาท"
            placeholder="40,000.00"
          />
          <InputField
            label="ค่าใช้จ่ายภายในครอบครัวต่อปี"
            value={initialYearlyExpense}
            onChange={() => {}}
            readOnly
            placeholder="48,000.00"
            addonAfter="บาท"
          />
          <InputField
            label="จำนวนปีที่ต้องการดูแลครอบครัว"
            value={formData.numberOfYears}
            onChange={handleInputChange("numberOfYears")}
            addonAfter="ปี"
            placeholder="20"
          />
          <InputField
            label="ค่าใช้จ่ายเงินก้อนที่จะเกิด (ค่าซ่อมรถ ซ่อมบ้าน เที่ยว เสริมสวย)"
            value={formData.adjustedYearlyExpenses}
            onChange={handleInputChange("adjustedYearlyExpenses")}
            addonAfter="บาท"
            placeholder="50,000.00"
          />

          <Form.Item>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"เงินเฟ้อ"}</Text>
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
              label="จำนวนเงินที่ครอบครัวต้องการ ถ้าเกิดเป็นอะไร ณ วันนี้"
              value={totalAmount}
              onChange={() => {}}
              readOnly
              addonAfter="บาท"
            />
          </div>
          <Row className="mb-2">
            <Text className=" text-xl font-bold ">หนี้สินค้างชำระ</Text>
          </Row>

          <InputField
            label="ค่าผ่อนบ้านคงค้างทั้งหมด รวมดอกเบี้ย"
            value={formData.homePayments}
            onChange={handleInputChange("homePayments")}
            addonAfter="บาท"
            placeholder="3,000,000.00"
          />
          <InputField
            label="ค่าผ่อนรถคงค้างทั้งหมด รวมดอกเบี้ย"
            value={formData.carPayments}
            onChange={handleInputChange("carPayments")}
            addonAfter="บาท"
            placeholder="300,000.00"
          />
          <InputField
            label="หนี้สินอื่นๆ"
            value={formData.otherDebts}
            onChange={handleInputChange("otherDebts")}
            addonAfter="บาท"
            placeholder="50,000.00"
          />
          <InputField
            label="รวมหนี้สิน"
            value={totalDebts}
            onChange={() => {}}
            addonAfter="บาท"
          />
          <div className="py-4">
            <InputField
              label="จำนวนเงินที่ต้องการ"
              value={requiredAmount}
              onChange={() => {}}
              addonAfter="บาท"
            />
          </div>

          <Row className="mb-2">
            <Text className=" text-xl font-bold py-4">
              สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)
            </Text>
          </Row>

          <InputField
            label="เงินฝากธนาคาร"
            value={formData.bankDeposit}
            onChange={handleInputChange("bankDeposit")}
            addonAfter="บาท"
            placeholder="1,000,000.00"
          />
          <InputField
            label="ทุนประกันชีวิต"
            value={formData.lifeInsuranceFund}
            onChange={handleInputChange("lifeInsuranceFund")}
            addonAfter="บาท"
            placeholder="6,000,000.00"
          />
          <InputField
            label="ทรัพย์สินอื่น ๆ"
            value={formData.otherAssets}
            onChange={handleInputChange("otherAssets")}
            addonAfter="บาท"
            placeholder="3,000,000.00"
          />
          <InputField
            label="รวมสิ่งที่เตรียมไว้แล้ว"
            value={totalAssets}
            onChange={() => {}}
            addonAfter="บาท"
          />
          <div className="py-4">
            <InputField
              label="ความคุ้มครองที่จำเป็น"
              value={coverage}
              onChange={() => {}}
              addonAfter="บาท"
            />
          </div>
        </Form>
        <Row align={"middle"} justify={"center"} className="mb-4" gutter={20}>
          <Col>
            <Button
              onClick={() => navigator("/health-plan")}
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

export default ProtectionPlan;
