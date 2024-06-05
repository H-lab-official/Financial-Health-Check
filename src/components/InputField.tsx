import { Form, Input, Typography, Row, Col } from "antd";
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  addonAfter?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  addonAfter,
  placeholder,
  readOnly,
}) => {
  const location = useLocation();
  const isRetirementPlan = location.pathname === '/retirement-plan';

  return (
    <Form.Item>
      <Row gutter={10}>
        <Col>
          <Text className={`${label.startsWith("16. ความคุ้มครองที่จำเป็น"||"19."||"20.") ? "text-red-600" : "text-[#243286]"} `}>{label}</Text>
        </Col>
        <Col>
          <div className="flex flex-row justify-center items-center gap-5">
            <Input
              type="text"
              value={formatNumber(value)}
              onChange={(event) => onChange(event.target.value.replace(/,/g, ""))}
              placeholder={placeholder}
              readOnly={readOnly}
              className={`${isRetirementPlan ? 'w-[240px]' : 'w-[280px]'} ${
                readOnly
                  ? "bg-[#4B90E254] hover:bg-[#4B90E254] active:bg-[#4B90E254] focus:bg-[#4B90E254]"
                  : "none"
              }`}
            />
            <Text className="text-[#243286]">{addonAfter}</Text>
          </div>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default InputField;