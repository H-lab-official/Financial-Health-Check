import React, { useState } from 'react';
import { Modal, Button, Select,Typography } from 'antd';
import tooltip from '@/assets/images/icons/tooltip.svg';
import '@/components/css/noZoom.css'
const { Text } = Typography;
interface SelectOptions {
    iconsImg: string;
    title: string;
    onChange: (value: string) => void;
    textModal: string;
    defaultValue: string;
    options: { value: string, label: string }[];
}

const InflationComponent: React.FC<SelectOptions> = ({
    iconsImg,
    title,
    textModal,
    defaultValue,
    options,
    onChange
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-row justify-start items-center mb-5">
            <div className="w-[55px] flex justify-start items-center pl-2">
                <img src={iconsImg} alt="icons" className="w-10" />
            </div>
            <div>
                <div className="flex flex-row justify-between items-center">
                    <Text className="text-[#243286] w-[197px] font-sans">{title}</Text>
                    <img src={tooltip} alt="tooltip" onClick={showModal} className={`cursor-pointer ${textModal === "-" ? "hidden" : ""}`} />
                </div>
                <Modal
                    title={<div className="custom-modal-title font-sans">{title}</div>}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="close" className="custom-close-button font-sans" onClick={handleCancel}>
                            ปิด
                        </Button>,
                    ]}
                    closable={false}
                    className="custom-modal"
                >
                    <div className="custom-modal-body font-sans">{textModal}</div>
                </Modal>
               
                    <Select

                        className="font-sans custom-select"
                        style={{ width: '190px', fontSize: '16px' }}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        options={options}
                    />
                
            </div>
        </div>
    );
};

export default InflationComponent;
