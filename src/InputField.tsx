import { Form, Input } from "antd";

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
  <Form.Item label={label}>
    <Input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      addonAfter={addonAfter}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </Form.Item>
);

export default InputField;
