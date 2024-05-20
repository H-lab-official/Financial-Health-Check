import { Form, Input, Typography, Row, Col } from "antd";
const { Text } = Typography;

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  addonAfter?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  addonAfter,
  placeholder,
  readOnly,
}) => (
  <Form.Item>
    <Row gutter={20}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Text>{label}</Text>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          addonAfter={addonAfter}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </Col>
    </Row>
  </Form.Item>
);

export default InputField;
