import { Button, Col, Form, Select, Typography, Steps } from "antd";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import protection from "@/assets/images/protection.png"
import { useRecoilState, useRecoilValue } from "recoil";
import DotsComponent from "@/components/DotsComponent";
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
const { Text } = Typography;
import ProgressBar from "@/components/progressBar";
import { saveProtectionPlan } from "@/components/api/saveProtectionPlan";
import { NavBar } from "@/components/navbar";
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
      navigator('/report');
    } else {

      if (value === '5') {
        navigateThroughSequence(urlMap);
      } else {
        console.log(value);

        navigateToValue(urlMap, value, '/report');
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
  };

  const steps = [
    {
      title: "Protection Plan",
      content: (
        <div className="flex flex-col justify-center items-center text-[2rem] mb-4">
          {/* <h1 className=" font-bold">Protection Plan</h1> */}
          <h1 className=" text-center">แผนการคุ้มครอง <br />รายได้ให้กับครอบครัว <br />ในกรณีที่ต้องจากไป</h1>

        </div>
      )
    },
    {
      title: "ค่าใช้จ่าย",
      content: (
        <>
          <InputField
            label="1. ค่าใช้จ่ายภายในครอบครัว"
            value={formData.initialMonthlyExpense}
            onChange={handleInputChange("initialMonthlyExpense")}
            addonAfter="ต่อเดือน"
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            imgUrl={ProtectionPlan12}
          />
          <InputField
            label="2. ค่าใช้จ่ายภายในครอบครัวต่อปี"
            value={initialYearlyExpense}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="ต่อปี"
            imgUrl={ProtectionPlan13}

          />
          <InputField
            label="3. จำนวนปีที่ต้องการดูแลครอบครัว"
            value={formData.numberOfYears}
            onChange={handleInputChange("numberOfYears")}
            addonAfter="ปี"
            placeholder="กรุณากรอกจำนวนปี"
            imgUrl={ProtectionPlan14}
          />
          <InputField
            label="4.เงินสำรองฉุกเฉิน (เผื่อต่อรายปี)"
            value={formData.adjustedYearlyExpenses}
            onChange={handleInputChange("adjustedYearlyExpenses")}
            addonAfter="บาท"
            placeholder="กรุณากรอกข้อมูลเงินสำรองฉุกเฉิน"
            imgUrl={ProtectionPlan15}
          />
          <div className="flex flex-row justify-start items-center gap-4 mb-5">
            <Col><img src={ProtectionPlan16} alt="icons" /></Col>
            <Col>
              <Col>
                <Text className="text-[#243286]">{"5. เงินเฟ้อ"}</Text>
              </Col>
              <Col>
                <div className="flex flex-row justify-start items-center gap-5 ">
                  <Select
                    style={{ width: '190px' }}
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

                </div>
              </Col>
            </Col>
          </div>
          <div className="">
            <InputField
              label="6. เงินสำรองที่จำเป็นต้องจัดเตรียมไว้"
              value={totalAmount}
              onChange={() => { }}
              readOnly
              addonAfter="บาท"
              imgUrl={ProtectionPlan17}
            />
          </div>
        </>
      )
    }, {
      title: "หนี้สินค้างชำระ",
      content: (
        <>
          <InputField
            label="7. ค่าผ่อนบ้านคงค้างทั้งหมด"
            value={formData.homePayments}
            onChange={handleInputChange("homePayments")}
            addonAfter="บาท"
            placeholder="3,000.00"
            imgUrl={ProtectionPlan22}
          />
          <InputField
            label="8. ค่าผ่อนรถคงค้างทั้งหมด"
            value={formData.carPayments}
            onChange={handleInputChange("carPayments")}
            addonAfter="บาท"
            placeholder="300,000.00"
            imgUrl={ProtectionPlan23}
          />
          <InputField
            label="9 .หนี้สินอื่นๆ"
            value={formData.otherDebts}
            onChange={handleInputChange("otherDebts")}
            addonAfter="บาท"
            placeholder="50,000.00"
            imgUrl={ProtectionPlan24}
          />
          <InputField
            label="10. รวมหนี้สิน"
            value={totalDebts}
            onChange={() => { }}
            addonAfter="บาท"
            readOnly
            imgUrl={ProtectionPlan25}
          />
          <div className="">
            <InputField
              label="11 .จำนวนเงินที่ต้องการ"
              value={requiredAmount}
              onChange={() => { }}
              addonAfter="บาท"
              readOnly
              imgUrl={ProtectionPlan26}
            />
          </div>
        </>
      )
    },
    {
      title: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
      content: (<>
        <InputField
          label="12. เงินฝากธนาคาร"
          value={formData.bankDeposit}
          onChange={handleInputChange("bankDeposit")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          imgUrl={ProtectionPlan32}
        />
        <InputField
          label="13. ทุนประกันชีวิต"
          value={formData.lifeInsuranceFund}
          onChange={handleInputChange("lifeInsuranceFund")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          imgUrl={ProtectionPlan33}
        />
        <InputField
          label="14. ทรัพย์สินอื่น ๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          imgUrl={ProtectionPlan34}
        />
        <InputField
          label="15. รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalAssets}
          onChange={() => { }}
          addonAfter="บาท"
          readOnly
          imgUrl={ProtectionPlan35}
        />
        <div className=" ">
          <InputField
            label="16. ความคุ้มครองที่จำเป็น"
            value={coverage}
            onChange={() => { }}
            addonAfter="บาท"
            readOnly
            imgUrl={ProtectionPlan36}
          />
        </div>
      </>)
    },
    {
      title: "สรุปผล",
      content: (<>
        {/* <div className="steps-content h-auto mx-auto  rounded-md gap-5 mb-5 w-[375px]"> */}
        <div className="  rounded-lg p-5 shadow-lg mb-5">
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
              <p>{formData.numberOfYears} ปี</p></div>
            <div className="flex flex-row justify-between">
              <p>4.เงินสำรองฉุกเฉิน (50% ของรายได้บาท/ปี)</p>
              <p>{convertMoney(formData.adjustedYearlyExpenses)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>5.เงินเฟ้อ</p>
              <p>{parseFloat(formData.inflationRate) * 100} %</p>
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
            <div className="flex flex-row justify-between mt-5 text-red-500">
              <p>16.ความคุ้มครองที่จำเป็น</p>
              <p>{convertMoney(calculateTotalAssets(formData))} บาท</p>
            </div>
            <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(calculateCoverage(formData))} บาท</p>
            </div>
          </div>

        </div>


        {/* </div> */}
      </>)
    }

  ]


  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>


      <div className="bg-white  rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className={` text-2xl font-bold text-center  `}>{current == 0 ? "Protection Plan" : "Protection Plan"}</h1>
          {current === 4 ? "" : <ProgressBar percent={progress.percent} current={current} />}
          <img src={allImages} alt="" className="w-[265px] mt-5" />
          {current === 4 ? "" : <DotsComponent steps={steps} current={current} />}
        </div>
        <div className={`steps-content h-auto py-2 px-3  rounded-md gap-5 mb-5 w-[350px] ${current == 0 ? "" : "shadow-xl"}`}>
          <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title === "ค่าใช้จ่าย" ? <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={ProtectionPlan11} alt="" />{steps[current].title}</div> : steps[current].title === "หนี้สินค้างชำระ" ? <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={ProtectionPlan21} alt="" />{steps[current].title}</div> : steps[current].title === "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)" ? <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={ProtectionPlan31} alt="" />{steps[current].title}</div> : steps[current].title}</p>
          {steps[current].content}
          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current == 0 && (
              <Button onClick={() => {
                navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } })
                setCurrentIndex((prevIndex) => prevIndex - 1);
              }} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"}`}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                disabled={handleDisabled()}
                onClick={() => handleSave()} className="bg-[#003781] rounded-full w-[120px]"
              >
                ถัดไป
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPlan;
