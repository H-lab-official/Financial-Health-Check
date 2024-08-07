import { Button, Col, Form, Select, Typography, Steps, Modal } from "antd";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import protection from "@/assets/images/protection.png"
import { useRecoilState, useRecoilValue } from "recoil";
import DotsComponent from "@/components/DotsComponent";
import StepTitle from '@/components/StepTitle';
import {
  protectionPlanState,
  totalDebtsSelector,
  totalAssetsSelector,
  initialYearlyExpenseSelector,
  totalAmountSelector,
  requiredAmountSelector,
  coverageSelector, calculateCoverage,
  calculateExpenses,
  calculateInitialYearlyExpense,
  calculateRequiredAmount,
  calculateTotalAssets,
  calculateTotalDebts,
} from "@/recoil/protectionPlanState";
import tooltip from '@/assets/images/icons/tooltip.svg'
import ProtectionPlan11 from "@/assets/images/icons/ProtectionPlan/protection1-1.svg";
import ProtectionPlan12 from "@/assets/images/icons/ProtectionPlan/protection1-2.svg";
import ProtectionPlan13 from "@/assets/images/icons/ProtectionPlan/protection1-3.svg";
import ProtectionPlan14 from "@/assets/images/icons/ProtectionPlan/protection1-4.svg";
import ProtectionPlan15 from "@/assets/images/icons/ProtectionPlan/protection1-5.svg";
import ProtectionPlan16 from "@/assets/images/icons/ProtectionPlan/protection1-6.svg";
import ProtectionPlan17 from "@/assets/images/icons/ProtectionPlan/protection1-7.svg";
import ProtectionPlan21 from "@/assets/images/icons/ProtectionPlan/protection2-1.svg";
import ProtectionPlan22 from "@/assets/images/icons/ProtectionPlan/protection2-2.svg";
import ProtectionPlan23 from "@/assets/images/icons/ProtectionPlan/protection2-3.svg";
import ProtectionPlan24 from "@/assets/images/icons/ProtectionPlan/protection2-4.svg";
import ProtectionPlan25 from "@/assets/images/icons/ProtectionPlan/protection2-5.svg";
import ProtectionPlan26 from "@/assets/images/icons/ProtectionPlan/protection2-6.svg";
import ProtectionPlan31 from "@/assets/images/icons/ProtectionPlan/protection3-1.svg";
import ProtectionPlan32 from "@/assets/images/icons/ProtectionPlan/protection3-2.svg";
import ProtectionPlan33 from "@/assets/images/icons/ProtectionPlan/protection3-3.svg";
import ProtectionPlan34 from "@/assets/images/icons/ProtectionPlan/protection3-4.svg";
import ProtectionPlan35 from "@/assets/images/icons/ProtectionPlan/protection3-5.svg";
import ProtectionPlan36 from "@/assets/images/icons/ProtectionPlan/protection3-6.svg";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { nameState, nameData } from "@/recoil/nameState";
import protection1 from "@/assets/images/protection1.png"
import protection2 from "@/assets/images/protection2.png"
import protection3 from "@/assets/images/protection3.png"
import '@/components/css/InputField.css'
const { Text } = Typography;
import ProgressBar from "@/components/progressBar";
import { saveProtectionPlan } from "@/components/api/saveProtectionPlan";
import { NavBar } from "@/components/navbar";
import InflationComponent from '@/components/SelectOptions'
const ProtectionPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(protectionPlanState);
  const totalDebts = useRecoilValue(totalDebtsSelector);
  const totalAssets = useRecoilValue(totalAssetsSelector);
  const initialYearlyExpense = useRecoilValue(initialYearlyExpenseSelector);
  const totalAmount = useRecoilValue(totalAmountSelector);
  const requiredAmount = useRecoilValue(requiredAmountSelector);
  const coverage = useRecoilValue(coverageSelector);
  const [current, setCurrent] = useState(currentStep);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const dataname = useRecoilValue<nameData>(nameState)
  const selectedValue = useRecoilValue(selectedState)
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      const formattedValue = value.replace(/[^\d\.]/g, "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: formattedValue,
      }));
    };
  let allImages

  switch (current) {
    case 0:
      allImages = protection
      break;
    case 1:
      allImages = protection1
      break;
    case 2:
      allImages = protection2
      break;
    case 3:
      allImages = protection3
      break;

  }
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
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
  const toGoNext = () => {
    const urlMap: { [key: string]: string } = {
      '1': '/protection-plan',
      '2': '/health-plan',
      '3': '/retirement-plan',
      '4': '/education-plan',
      '5': '/protection-plan',
    };

    if (sortedSelected.length === 1) {
      handleSingleSelection(urlMap);
    } else {
      handleMultipleSelections(urlMap);
    }
  };

  const handleSingleSelection = (urlMap: { [key: string]: string }) => {
    const value = sortedSelected[0];
    if (sortedSelected.length === 1 && value !== '5') {
      navigator('/showdata');
    } else {

      if (value === '5') {
        navigateThroughSequence(urlMap);
      } else {
        console.log(value);

        navigateToValue(urlMap, value, '/showdata');
      }
    }
  };

  const handleMultipleSelections = (urlMap: { [key: string]: string }) => {
    if (currentIndex < sortedSelected.length - 1) {
      const value = sortedSelected[currentIndex];
      navigateToValue(urlMap, value);
    } else if (currentIndex === sortedSelected.length - 1) {
      const lastValue = sortedSelected[currentIndex];
      navigateToValue(urlMap, lastValue);
    } else if (currentIndex === sortedSelected.length) {
      navigator('/summary');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateThroughSequence = (urlMap: { [key: string]: string }) => {
    const sequence = ['1', '2', '3', '4'];

    if (currentIndex < sequence.length) {
      const currentValue = sequence[currentIndex];
      navigateToValue(urlMap, currentValue);
    } else if (currentIndex === sequence.length) {
      navigator('/summary');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateToValue = (urlMap: { [key: string]: string }, value: string, finalDestination: string = '/summary') => {

    if (urlMap[value]) {

      navigator(urlMap[value]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex === 0) {
      console.log('3');

      navigator(finalDestination);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const toGoFirst = () => {
    setCurrentIndex(0);
    toGoNext();
  };



  const handleSave = async () => {
    const coverageValue = convertMoney(calculateCoverage(formData));

    // Save the protectiondata to localStorage
    localStorage.setItem('beforeImport', JSON.stringify({ protectiondata: coverageValue }));

    await saveProtectionPlan({ data: formData, nameData: dataname });
    toGoNext();
  };
  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.initialMonthlyExpense ||
        !formData.numberOfYears ||
        !formData.adjustedYearlyExpenses ||
        !formData.inflationRate
      );
    } else if (current === 2) {
      return (
        !formData.homePayments ||
        !formData.carPayments ||
        !formData.otherDebts
      )
    } else if (current === 3) {
      return (
        !formData.bankDeposit ||
        !formData.lifeInsuranceFund ||
        !formData.otherAssets
      )
    }
  }
  const next = () => {
    let newPercent = progress.percent;
    if (current === 1) {
      newPercent += progress.steps;
    } else if (current === 2) {
      newPercent += progress.steps;
    }
    setProgress({ percent: newPercent, steps: progress.steps });
    setCurrent(current + 1);
    window.scrollTo(0, 0);
  };
  const prev = () => {
    let newPercent = progress.percent;
    if (current === 0) {
      setProgress({ percent: 0, steps: progress.steps });
    }
    if (current === 3) {
      newPercent -= progress.steps;
    } else if (current === 2) {
      newPercent -= progress.steps;
    }
    setProgress({ percent: newPercent, steps: progress.steps });
    setCurrent(current - 1);
    window.scrollTo(0, 0);
  };

  const steps = [
    {
      title: "",
      content: (
        <div className="flex flex-col justify-center items-center text-[2rem] mb-4">
          {/* <h1 className=" font-bold">Protection Plan</h1> */}
          <h1 className=" text-center">แผนการคุ้มครอง <br />รายได้ให้กับครอบครัว</h1>

        </div>
      )
    },
    {
      title: "ค่าใช้จ่าย",
      ModalTitle: "ค่าใช้จ่าย",
      imageUrl: ProtectionPlan11,
      ModalBody: "เงินที่ต้องจ่ายเพื่อแลกกับสินค้า หรือบริการต่าง ๆ หรือค่าใช้จ่ายที่เกิดจากเหตุการณ์ไม่คาดคิด เป็นต้น",
      content: (
        <>
          <InputField
            label="1.ค่าใช้จ่ายภายในครอบครัวต่อเดือน"
            value={formData.initialMonthlyExpense}
            onChange={handleInputChange("initialMonthlyExpense")}
            addonAfter="บาท"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={ProtectionPlan12}
            ModalBody="จำนวนเงินที่ใช้จ่ายที่ใช้ในการดำรงชีพสำหรับครอบครัวในแต่ละเดือน"
            ModalTitle="1.ค่าใช้จ่ายภายในครอบครัวต่อเดือน"
          />
          <InputField
            label="2.ค่าใช้จ่ายภายในครอบครัวต่อปี"
            value={initialYearlyExpense}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={ProtectionPlan13}
            ModalBody="จำนวนเงินของค่าใช้จ่ายในครอบครัวตลอดทั้งปี  คำนวณจาก (ข้อ 1. X 12 เดือน)
"
            ModalTitle="2.ค่าใช้จ่ายภายในครอบครัวต่อปี"

          />

          <InputField
            label="3.จำนวนปีที่ต้องดูแลครอบครัว"
            value={formData.numberOfYears}
            onChange={handleInputChange("numberOfYears")}
            addonAfter="ปี"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={ProtectionPlan14}
            ModalBody={`จำนวนปีที่คาดว่าจะต้องดูแลครอบครัว เช่น จำนวนปีในการดูแลบุตรและคู่ชีวิต ดูแลบิดามารดา ในกรณีที่เราจากไปแล้ว`}
            ModalTitle="3.จำนวนปีที่ต้องดูแลครอบครัว"
          />
          <InputField
            label={<>4.จำนวนเงินสำรองฉุกเฉิน(ต่อปี)</>}
            value={formData.adjustedYearlyExpenses}
            onChange={handleInputChange("adjustedYearlyExpenses")}
            addonAfter="บาท"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={ProtectionPlan15}
            ModalBody="เงินเก็บฉุกเฉินที่เราเตรียมไว้เผื่อเหตุการณ์ไม่คาดฝันหรือค่าใช้จ่ายในสิ่งที่จำเป็นอย่างเร่งด่วน เช่น เงินสำรองเมื่อเกิดการตกงาน เงินสำรองสำหรับค่ารักษาพยาบาลที่ไม่คาดคิด"
            ModalTitle="4.จำนวนเงินสำรองฉุกเฉิน (ต่อปี)"
          />
          <InflationComponent
            iconsImg={ProtectionPlan16}
            title="5. เงินเฟ้อ"
            textModal="ภาวะที่ราคาสินค้าและบริการต่างๆ มีแนวโน้มที่จะสูงขึ้นเรื่อยๆ เมื่อเทียบกับช่วงเวลาที่ผ่านมา ทำให้เงินที่เรามีอยู่ซื้อของได้น้อยลง หรือพูดอีกอย่างคือ 'ของแพงขึ้น'"
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
          <InputField
            label="6.เงินสำรองที่จำเป็นต้องจัดเตรียมไว้"
            value={totalAmount}
            onChange={() => { }}
            readOnly
            addonAfter="บาท"
            imgUrl={ProtectionPlan17}
            ModalBody={`เงินทั้งหมดที่ต้องเตรียมไว้ในกรณีที่เกิดการจากไปเพื่อให้ครอบครัวมีเงินก้อนนี้ในการใช้ชีวิต โดยมีการคิดอัตราเงินเฟ้อไว้แล้ว`}
            ModalTitle="6.เงินสำรองที่จำเป็นต้องจัดเตรียมไว้"
          />

        </>
      )
    }, {
      title: "หนี้สินค้างชำระ",
      ModalTitle: "หนี้สินค้างชำระ",
      imageUrl: ProtectionPlan21,
      ModalBody: "หนี้ที่ต้องชำระตามที่ตกลงไว้กับเจ้าหนี้ทั้งหมด เช่น ค่าผ่อนบ้าน ค่าผ่อนรถ เป็นต้น",
      content: (
        <>
          <InputField
            label="7.ค่าผ่อนบ้านคงค้างทั้งหมด"
            value={formData.homePayments}
            onChange={handleInputChange("homePayments")}
            addonAfter="บาท"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={ProtectionPlan22}
            ModalBody={`จำนวนเงินทั้งหมดที่ยังค้างชำระสำหรับที่อยู่อาศัย นับตั้งแต่วันที่กู้เงินมาจนถึงปัจจุบัน`}
            ModalTitle="7.ค่าผ่อนบ้านคงค้างทั้งหมด"
          />
          <InputField
            label="8.ค่าผ่อนรถคงค้างทั้งหมด"
            value={formData.carPayments}
            onChange={handleInputChange("carPayments")}
            addonAfter="บาท"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={ProtectionPlan23}
            ModalBody={`จำนวนเงินทั้งหมดที่ยังค้างชำระสำหรับรถ (ยานพาหนะทุกชนิด) นับตั้งแต่วันที่กู้เงินมาจนถึงปัจจุบัน`}
            ModalTitle="8.ค่าผ่อนรถคงค้างทั้งหมด"
          />
          <InputField
            label="9.หนี้สินอื่นๆ"
            value={formData.otherDebts}
            onChange={handleInputChange("otherDebts")}
            addonAfter="บาท"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={ProtectionPlan24}
            ModalBody={`หนี้สินที่เกิดขึ้นจากค่าใช้จ่ายส่วนตัวหรือการกู้ยืมเงิน เพื่อวัตถุประสงค์ต่างๆ นอกเหนือจากหนี้บ้าน หนี้รถ`}
            ModalTitle="9.หนี้สินอื่นๆ"
          />
          <InputField
            label="10.รวมหนี้สิน"
            value={totalDebts}
            onChange={() => { }}
            addonAfter="บาท"
            readOnly
            imgUrl={ProtectionPlan25}
            ModalBody={`จำนวนหนี้สินทั้งหมดที่ต้องจ่ายในกรณีที่เกิดการจากไป คำนวณจาก (ข้อ 7. + ข้อ 8. + ข้อ 9.)`}
            ModalTitle="10.รวมหนี้สิน"
          />
          <div className="">
            <InputField
              label="11 .จำนวนเงินที่ต้องการ"
              value={requiredAmount}
              onChange={() => { }}
              addonAfter="บาท"
              readOnly

              imgUrl={ProtectionPlan26}
              ModalBody={`จำนวนเงินหนี้สินที่ต้องจ่ายทั้งหมดและเงินสำรองที่ทิ้งไว้ให้คนข้างหลัง คำนวณจาก (ข้อ 6. + ข้อ 10.)`}
              ModalTitle="11.จำนวนเงินที่ต้องการ"
            />
          </div>
        </>
      )
    },
    {
      title: <>สิ่งที่เตรียมไว้แล้ว<br />(มีสภาพคล่อง)</>,
      ModalTitle: "สิ่งที่เตรียมไว้แล้ว(มีสภาพคล่อง)",
      imageUrl: ProtectionPlan31,
      ModalBody: "สิ่งของหรือทรัพย์สินที่สามารถเปลี่ยนให้เป็นเงินสดได้อย่างรวดเร็วและง่ายดายเมื่อต้องการ โดยไม่สูญเสียมูลค่ามากนัก หรือสามารถนำมาใช้ในการชำระหนี้หรือค่าใช้จ่ายต่างๆ ได้ทันที",
      content: (<>
        <InputField
          label="12.เงินฝาก"
          value={formData.bankDeposit}
          onChange={handleInputChange("bankDeposit")}
          addonAfter="บาท"
          placeholder="กรุณากรอกข้อมูล"
          imgUrl={ProtectionPlan32}
          ModalBody={`เงินที่ฝากไว้กับสถาบันการเงิน เช่น ธนาคาร สหกรณ์ หรือบริษัทหลักทรัพย์ เพื่อเก็บรักษาและอาจได้รับดอกเบี้ยตอบแทน`}
          ModalTitle="12.เงินฝาก"
        />
        <InputField
          label="13.ทุนประกันชีวิต"
          value={formData.lifeInsuranceFund}
          onChange={handleInputChange("lifeInsuranceFund")}
          addonAfter="บาท"
          placeholder="กรุณากรอกข้อมูล"
          imgUrl={ProtectionPlan33}
          ModalBody={`จำนวนเงินสูงสุดที่บริษัทประกันภัยจะจ่ายให้กับผู้เอาประกัน หรือผู้รับผลประโยชน์ ในกรณีที่เกิดเหตุการณ์ตามที่ระบุไว้ในกรมธรรม์ประกันภัย เช่น การเสียชีวิต การเจ็บป่วย การสูญเสียทรัพย์สิน เป็นต้น`}
          ModalTitle="13.ทุนประกันชีวิต"
        />
        <InputField
          label="14.ทรัพย์สินอื่น ๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="กรุณากรอกข้อมูล"
          imgUrl={ProtectionPlan34}
          ModalBody={`สิ่งของหรือวัตถุที่มีมูลค่าทางเศรษฐกิจและสามารถนำมาเปลี่ยนเป็นเงินสดได้ไม่ยากนัก เช่น ทอง เครื่องประดับ ที่ดิน`}
          ModalTitle="14.ทรัพย์สินอื่น ๆ"
        />
        <InputField
          label="15.รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalAssets}
          onChange={() => { }}
          addonAfter="บาท"
          readOnly
          imgUrl={ProtectionPlan35}
          ModalBody={`จำนวนเงินที่คำนวนมาจาก  (ข้อ 12. + ข้อ 13. + ข้อ 14.)`}
          ModalTitle="15.รวมสิ่งที่เตรียมไว้แล้ว"
        />
        <div className=" ">
          <InputField
            label="16.ความคุ้มครองที่จำเป็นเพิ่มเติม"
            value={coverage}
            onChange={() => { }}
            addonAfter="บาท"
            readOnly
            imgUrl={ProtectionPlan36}
            ModalBody={`จำนวนเงินที่คำนวนมาจาก  (ข้อ 11. - ข้อ 15.)`}
            ModalTitle="16.ความคุ้มครองที่จำเป็นเพิ่มเติม"
          />
        </div>
      </>)
    },
    {
      title: "สรุปผล",
      content: (<>
        {/* <div className="steps-content h-auto mx-auto  rounded-md gap-5 mb-5 w-[375px]"> */}
        <div className="  rounded-lg p-5  mb-5">
          <div className="text-[1rem] mb-3 flex flex-row justify-between items-center">
            <p>ค่าใช้จ่าย</p>
            <button
              className="bg-[#243286] py-1 px-3 text-white rounded-xl"
              onClick={() => setCurrent(current - 3)}
            >
              แก้ไข
            </button>
          </div>

          <div className=" text-black text-[0.8rem]">
            <div className="flex flex-row justify-between">
              <p>1.ค่าใช้จ่ายภายในครอบครัว</p>
              <p>{convertMoney(formData.initialMonthlyExpense)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>2.ค่าใช้จ่ายภายในครอบครัวบาทต่อปี</p>
              <p>{convertMoney(calculateInitialYearlyExpense(formData))} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>3.จำนวนปีที่ต้องการดูแลครอบครัว</p>
              <p>{formData.numberOfYears} ปี&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
            <div className="flex flex-row justify-between">
              <p>4.เงินสำรองฉุกเฉิน</p>
              <p>{convertMoney(formData.adjustedYearlyExpenses)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>5.เงินเฟ้อ</p>
              <p>{(parseFloat(formData.inflationRate) * 100).toFixed(0)} %&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>6.เงินสำรองที่จำเป็นต้องจัดเตรียมไว้</p>
              <p>{convertMoney(calculateExpenses(formData))} บาท</p>
            </div>
            <div className="text-[1rem] my-3 flex flex-row justify-between items-center text-[#0E2B81]"><p>หนี้สินค้างชำระ</p> <button className="bg-[#243286] py-1 px-3 text-white rounded-xl" onClick={() => setCurrent(current - 2)}>แก้ไข</button></div>
            <div className="flex flex-row justify-between mt-2">
              <p>7.ค่าผ่อนบ้านคงค้างทั้งหมด</p>
              <p>{convertMoney(formData.homePayments)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>8.ค่าผ่อนรถคงค้างทั้งหมด</p>
              <p>{convertMoney(formData.carPayments)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>9.หนี้สินอื่นๆ</p>
              <p>{convertMoney(formData.otherDebts)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>10.รวมหนี้สิน</p>
              <p>{convertMoney(calculateTotalDebts(formData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>11.จำนวนเงินที่ต้องการ</p>
              <p>{convertMoney(calculateRequiredAmount(formData))} บาท</p>
            </div>
            <div className="text-[1rem] my-3 flex flex-row justify-between items-center text-[#0E2B81]"><p>สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)</p> <button className="bg-[#243286] py-1 px-3 text-white rounded-xl" onClick={() => setCurrent(current - 1)}>แก้ไข</button></div>
            <div className="flex flex-row justify-between mt-2">
              <p>12.เงินฝากธนาคาร</p>
              <p>{convertMoney(formData.bankDeposit)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>13.ทุนประกันชีวิต</p>
              <p>{convertMoney(formData.lifeInsuranceFund)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>14.ทรัพย์สินอื่น ๆ</p>
              <p>{convertMoney(formData.otherAssets)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>15.รวมสิ่งที่เตรียมไว้แล้ว</p>
              <p>{convertMoney(calculateTotalAssets(formData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-5 text-red-500 font-bold">
              <p>16.ความคุ้มครองที่จำเป็น</p>
              <p>{convertMoney(calculateTotalAssets(formData))} บาท</p>
            </div>
            {/* <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(calculateCoverage(formData))} บาท</p>
            </div> */}
          </div>

        </div>


        {/* </div> */}
      </>)
    }

  ]


  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
      <div className=" fixed top-0 z-40"><NavBar /></div>


      <div className="bg-white  rounded-lg px-6 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-1 ">
        <div className="flex flex-col justify-center items-center gap-1 mb-1">
          <h1 className={` text-2xl font-bold text-center  `}>{current == 0 ? "Protection Plan" : "Protection Plan"}</h1>
          {/* {current === 4 ? "" : <ProgressBar percent={progress.percent} current={current} />} */}
          {current === 0 && <img src={allImages} alt="" className="w-[265px] mt-5" />}

          {/* {current === 4 ? "" : <DotsComponent steps={steps} current={current} />} */}
        </div>
        <div className={`steps-content h-auto py-2 px-3  rounded-md gap-5 mb-5 w-[350px] ${current == 0 ? "" : ""}`}>
          <p className="text-xl mb-3">
            {steps[current].title && (
              <StepTitle
                title={steps[current].title}
                ModalTitle={steps[current].ModalTitle}
                imageUrl={steps[current].imageUrl || ""}
                ModalBody={steps[current].ModalBody || ""}
              />
            )}
            {/* {current == 0 ? ""
            : steps[current].title === "ค่าใช้จ่าย" ? <StepTitle title={steps[current].title} ModalTitle="ค่าใช้จ่าย" imageUrl={ProtectionPlan11} ModalBody="เงินที่ต้องจ่ายเพื่อแลกกับสินค้า หรือบริการต่าง ๆ หรือค่าใช้จ่ายที่เกิดจากเหตุการณ์ไม่คาดคิด เป็นต้น" />
              : steps[current].title === "หนี้สินค้างชำระ" ? <StepTitle title={steps[current].title} ModalTitle="หนี้สินค้างชำระ" imageUrl={ProtectionPlan21} ModalBody="หนี้ที่ต้องชำระตามที่ตกลงไว้กับเจ้าหนี้ทั้งหมด เช่น ค่าผ่อนบ้าน ค่าผ่อนรถ เป็นต้น" />
                : steps[current].title === "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)" ? <StepTitle title={steps[current].title} ModalTitle={`<>สิ่งที่เตรียมไว้แล้ว<br />(มีสภาพคล่อง)</>`} imageUrl={ProtectionPlan31} ModalBody="สิ่งของหรือทรัพย์สินที่สามารถเปลี่ยนให้เป็นเงินสดได้อย่างรวดเร็วและง่ายดายเมื่อต้องการ โดยไม่สูญเสียมูลค่ามากนัก หรือสามารถนำมาใช้ในการชำระหนี้หรือค่าใช้จ่ายต่างๆ ได้ทันที" />
                  : <div className="flex flex-row justify-center text-3xl">{steps[current].title}</div>} */}
          </p>
          {steps[current].content}
          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10 ">
            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px] font-sans`}>
                ย้อนกลับ
              </Button>
            )}
            {current == 0 && (
              <Button onClick={() => {
                navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } })
                setCurrentIndex((prevIndex) => prevIndex - 1);
              }} className={` bg-white rounded-full w-[120px] font-sans`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"} font-sans`}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                disabled={handleDisabled()}
                onClick={() => handleSave()} className="bg-[#003781] rounded-full w-[120px] font-sans"
              >
                ถัดไป
              </Button>
            )}
          </div>
          {/* <div className="flex flex-row justify-center items-center mb-5">
            {current > 0 && current < 4 && <img src={allImages} alt="" className="w-[200px] mt-5" />}
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default ProtectionPlan;
