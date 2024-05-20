import { questionsState } from "@/recoil/questionsState";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from "antd";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";

const { Title, Text } = Typography;

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(questionsState);

  const handleInputChange =
    (field: keyof typeof formData) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = value.replace(/[^\d]/g, ""); // Remove any non-digit characters

      if (formattedValue === "") {
        // Allow clearing the field
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: "",
        }));
        return;
      }

      const parsedValue = parseInt(formattedValue, 10);
      if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 4) return; // Check if value is within the valid range

      setFormData((prevFormData) => {
        const isDuplicate = Object.entries(prevFormData).some(
          ([key, val]) =>
            key !== field && parseInt(val as string, 10) === parsedValue
        );
        if (isDuplicate) return prevFormData;

        return {
          ...prevFormData,
          [field]: formattedValue,
        };
      });
    };

  const handleRadioChange =
    (field: keyof typeof formData) =>
    ({ target: { value } }: RadioChangeEvent) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    };

  return (
    <div
      className="flex justify-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl w-full">
        <Row>
          <Title level={3}>การจัดลำดับความสำคัญ</Title>
        </Row>
        <Form>
          <Row gutter={20} align="middle">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}></Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={20} align="middle" justify="space-between">
                <Col style={{ textAlign: "center" }}>
                  <Text style={{ maxWidth: 60 }}>ต่ำ</Text>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <Text style={{ maxWidth: 60 }}>ปานกลาง</Text>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <Text style={{ maxWidth: 60 }}>มาก</Text>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <Text style={{ maxWidth: 60 }}>จัดระดับความสำคัญ</Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Row gutter={20} align="middle">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Radio.Group
                  value={formData.protectionPlan}
                  onChange={handleRadioChange("protectionPlan")}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Radio value={1} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={2} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={3} style={{ maxWidth: 60 }}></Radio>
                  <Input
                    type="text"
                    style={{ maxWidth: 100 }}
                    value={formData.protectionPlanOrder}
                    onChange={handleInputChange("protectionPlanOrder")}
                  />
                </Radio.Group>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={20} align="middle">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"การวางแผนเกี่ยวกับสุขภาพ"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Radio.Group
                  value={formData.healthPlan}
                  onChange={handleRadioChange("healthPlan")}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Radio value={1} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={2} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={3} style={{ maxWidth: 60 }}></Radio>
                  <Input
                    type="text"
                    style={{ maxWidth: 100 }}
                    value={formData.healthPlanOrder}
                    onChange={handleInputChange("healthPlanOrder")}
                  />
                </Radio.Group>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={20} align="middle">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"การวางแผนเตรียมเงินไว้ยามเกษียณ"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Radio.Group
                  value={formData.retirementPlan}
                  onChange={handleRadioChange("retirementPlan")}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Radio value={1} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={2} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={3} style={{ maxWidth: 60 }}></Radio>
                  <Input
                    type="text"
                    style={{ maxWidth: 100 }}
                    value={formData.retirementPlanOrder}
                    onChange={handleInputChange("retirementPlanOrder")}
                  />
                </Radio.Group>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={20} align="middle">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text>{"การเก็บออมเพื่อค่าเล่าเรียนบุตร"}</Text>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Radio.Group
                  value={formData.educationPlan}
                  onChange={handleRadioChange("educationPlan")}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Radio value={1} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={2} style={{ maxWidth: 60 }}></Radio>
                  <Radio value={3} style={{ maxWidth: 60 }}></Radio>
                  <Input
                    type="text"
                    style={{ maxWidth: 100 }}
                    value={formData.educationPlanOrder}
                    onChange={handleInputChange("educationPlanOrder")}
                  />
                </Radio.Group>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Row align={"middle"} justify={"center"} className="mb-4" gutter={20}>
          <Col>
            <Button
              onClick={() => navigate("/export-pdf")}
              className="flex items-center justify-center rounded-lg py-5 px-7 "
            >
              สรุปผล
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Summary;
