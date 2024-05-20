import { Button, Col, Form, Row, Select, Typography } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import InputField from "@/components/InputField";
import { useNavigate } from "react-router";
import {
  educationPlanState,
  requiredScholarshipsSelector,
  totalPreparationAssetsSelector,
  totalMissingSelector,
} from "@/recoil/educationPlanState";

const { Title, Text } = Typography;

const EducationPlan: React.FC = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useRecoilState(educationPlanState);
  const requiredScholarships = useRecoilValue(requiredScholarshipsSelector);
  const totalPreparationAssets = useRecoilValue(totalPreparationAssetsSelector);
  const totalMissing = useRecoilValue(totalMissingSelector);

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
          <Title level={3}>เรื่องที่ 4 : Education Plan </Title>
        </Row>
        <Form>
          <Row className="my-2">
            <Text className="text-xl font-bold">วางแผนเพื่อการศึกษาบุตร</Text>
          </Row>
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
            onChange={() => {}}
            readOnly
            addonAfter="บาท / ปี"
            placeholder="15,000.00"
          />
          <InputField
            label="4. ค่าใช้จ่ายระหว่างศึกษา"
            value={(parseFloat(formData.typeOfeducation) * 0.15).toFixed(2)}
            onChange={() => {}}
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
              onChange={() => {}}
              readOnly
              placeholder="309,0630.66"
              addonAfter="บาท"
            />
          </div>
          <Row className="my-2">
            <Text className="text-xl font-bold">สิ่งที่เตรียมไว้แล้ว</Text>
          </Row>
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
            onChange={() => {}}
            readOnly
            placeholder="6,000.00"
            addonAfter="บาท"
          />
          <div className="pt-4">
            <InputField
              label="13. รวมที่ขาดอยู่"
              value={totalMissing}
              onChange={() => {}}
              readOnly
              placeholder="6,000.00"
              addonAfter="บาท"
            />
          </div>
        </Form>
        <Row align={"middle"} justify={"center"} className="mb-4" gutter={20}>
          <Col>
            <Button
              onClick={() => navigator("/retirement-plan")}
              className="flex items-center justify-center rounded-lg p-5 "
            >
              ย้นอกลับ
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => navigator("/summary")}
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

export default EducationPlan;
