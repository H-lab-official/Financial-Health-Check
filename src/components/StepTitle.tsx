import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import tooltip from '@/assets/images/icons/tooltip.svg';

interface StepTitleProps {
    title: React.ReactNode;
    ModalTitle: React.ReactNode;
    imageUrl: string;
    ModalBody: string;
}

const StepTitle: React.FC<StepTitleProps> = ({ title, ModalTitle, imageUrl, ModalBody }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (title !== "สรุปผล") {
        return (
            <div className="flex flex-row items-center justify-start -ml-3 gap-5 ">
                <div className="flex flex-row items-center justify-start gap-5 w-[260px]">
                    <img src={imageUrl} alt="" className="w-8" />
                    <span className='text-lg'>{title}</span>
                </div>
                {ModalTitle && (
                    <>
                        <img src={tooltip} alt="tooltip" onClick={showModal} className="cursor-pointer" />
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
                    </>
                )}
            </div>
        );
    } else {
        return (
            <div className="flex flex-row items-center justify-center">
                <span>สรุปผล</span>
            </div>
        )

    }

    return null;
};

export default StepTitle;
