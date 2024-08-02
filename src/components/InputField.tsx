import { Form, Input, Typography, Row, Modal, Button } from "antd";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import tooltip from '@/assets/images/icons/tooltip.svg';
const { Text } = Typography;
import "@/components/css/InputField.css";

interface InputFieldProps {
  label: string;
  imgUrl: string;
  value: string;
  ModalTitle: string;
  ModalBody: string;
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
  imgUrl,
  value,
  onChange,
  addonAfter,
  placeholder,
  readOnly,
  ModalTitle,
  ModalBody
}) => {
  const location = useLocation();
  const isRetirementPlan = location.pathname === '/retirement-plan';
  const [inputValue, setInputValue] = useState(value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setInputValue(formatNumber(value));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, '');
    rawValue = rawValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    rawValue = rawValue.replace(/^0+(?=\d)/, ''); // Remove leading zeros except a single zero if it's the only digit

    setInputValue(formatNumber(rawValue));
    onChange(rawValue);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Form.Item>
      <Row gutter={10} className="flex flex-row justify-start items-center">
        <div className="w-[60px] flex justify-start items-center pl-3">
          <img src={imgUrl} alt="icons" className="w-10" />
        </div>
        <div>
          <div className="flex flex-row justify-start items-center gap-2">
            <Text className={`font-sans w-[190px] flex ${label.startsWith("16. ความคุ้มครองที่จำเป็น" || "19." || "20.") ? "text-red-600" : "text-[#243286]"}`}>{label}{!readOnly && <span className="text-red-600 ">*</span>}</Text>
            <img src={tooltip} alt="tooltip" onClick={showModal} className="cursor-pointer" />
          </div>
          <div>
            <div className="flex flex-row justify-center items-center gap-5 font-sans">
              <Input
                type="text"
                style={{ fontSize: '16px' }}
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                readOnly={readOnly}
                inputMode="numeric" // Ensure the numeric keyboard is displayed
                pattern="[0-9]*" // Ensure only numbers are allowed
                className={`font-sans ${isRetirementPlan ? 'w-[190px]' : 'w-[190px]'} ${readOnly
                  ? "bg-[#4B90E254] hover:bg-[#4B90E254] active:bg-[#4B90E254] focus:bg-[#4B90E254]"
                  : "none"
                  }`}
              />
              <Text className="text-[#243286] w-8 flex justify-start items-center font-sans">{addonAfter}</Text>
            </div>
          </div>
        </div>
      </Row>
      <Modal
        title={<div className="custom-modal-title font-sans">{ModalTitle}</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="close" className="custom-close-button font-sans" onClick={handleCancel}>
            ปิด
          </Button>
        ]}
        closable={false}
        className="custom-modal font-sans"
      >
        <div className="custom-modal-body font-sans" dangerouslySetInnerHTML={{ __html: ModalBody }} />
      </Modal>
    </Form.Item>
  );
};

export default InputField;
