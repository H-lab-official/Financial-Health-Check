import { Input } from "antd";

const CustomFinancialInput: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
}> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    const regex = /^-?\d*(\\d{0,2})?$/;
    if (regex.test(newValue)) {
      onChange && onChange(newValue);
      return newValue;
    }
    return newValue.replace(/[^\d.]/g, "");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData("text");
    const regex = /^-?\d*(\\d{0,2})?$/;
    if (regex.test(pastedText)) {
      return;
    }
    e.preventDefault();
  };

  return (
    <Input
      type="text"
      addonAfter="฿"
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="0.00"
      maxLength={25}
      inputMode="decimal"
    />
  );
};

export default CustomFinancialInput;
