import { Button, Col, Form, Row, Select, Typography, Progress } from "antd";
import InputField from "@/components/InputField";
import ProgressBar from "@/components/progressBar";
import { useNavigate, useLocation } from "react-router";
import React, { useState } from "react";
import {
  preparationYearsSelector,
  retirementPlanState,
  totalCostsSelector,
  totalRetirementMissingSelector,
  totalRetirementPreparationAssetsSelector,
  totalPreparationSelector,
  workingYearsSelector,
  mustBeSavedSelector,
} from "@/recoil/retirementPlanState";
import DotsComponent from "@/components/DotsComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import retirement from "@/assets/images/retirement.png"
import retirement1 from "@/assets/images/retirement1.png"
import retirement2 from "@/assets/images/retirement2.png"
const { Text } = Typography;
import { nameState, nameData } from "@/recoil/nameState";
import { saveRetirementPlan } from "@/components/api/saveretirementPlan";
import { NavBar } from "@/components/navbar";
const RetirementPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(retirementPlanState);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const totalCosts = useRecoilValue(totalCostsSelector);
  const workingYears = useRecoilValue(workingYearsSelector);
  const preparationYears = useRecoilValue(preparationYearsSelector);
  const totalPreparation = useRecoilValue(totalPreparationSelector);
  const totalPreparationAssets = useRecoilValue(
    totalRetirementPreparationAssetsSelector
  );
  const selectedValue = useRecoilValue(selectedState)
  const dataname = useRecoilValue<nameData>(nameState)
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const [current, setCurrent] = useState(currentStep);
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
      allImages = retirement

      break;
    case 1:
      allImages = retirement1

      break;
    case 2:
      allImages = retirement2

      break;

  }
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
   if (sortedSelected.length === 1&&value!=='5') {
     navigator('/export-pdf');
   } else {   

     if (value === '5') {
       navigateThroughSequence(urlMap);
     } else {
       console.log(value);

       navigateToValue(urlMap, value, '/export-pdf');
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
      navigator(finalDestination);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const toGoFirst = () => {
    setCurrentIndex(0);
    toGoNext();
  };
  const toGoBack = () => {
    const urlMap: { [key: string]: { path: string, state: { current: number } } } = {
      '1': { path: '/protection-plan', state: { current: 3 } },
      '2': { path: '/health-plan', state: { current: 3 } },
      '3': { path: '/retirement-plan', state: { current: 2 } },
      '4': { path: '/education-plan', state: { current: 2 } },
      '5': { path: '/protection-plan', state: { current: 3 } },
    };

    if (sortedSelected.length === 1) {
      handleSingleBack(urlMap);
    } else {
      handleMultipleBack(urlMap);
    }
  };

  const handleSingleBack = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    const value = sortedSelected[0];
    if (sortedSelected.length === 1 && value !== '5') {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } })
    } else {
      if (value === '5') {
        navigateThroughBackSequence(urlMap);
      } else {
        navigateBackToValue(urlMap, value);
      }
    }

  };

  const handleMultipleBack = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    if (currentIndex > 1) {
      const value = sortedSelected[currentIndex - 2];
      navigateBackToValue(urlMap, value);
    } else if (currentIndex === 1) {
      const firstValue = sortedSelected[0];
      navigateBackToValue(urlMap, firstValue);
    } else {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } })
      setCurrentIndex(0);
    }
  };

  const navigateThroughBackSequence = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    const sequence = ['1', '2', '3', '4'];

    if (currentIndex > 0) {
      const previousValue = sequence[currentIndex - 1];
      navigateBackToValue(urlMap, previousValue);
    } else {
      navigator('/'); // Redirect to initial page if at the beginning
      setCurrentIndex(0);
    }
  };

  const navigateBackToValue = (urlMap: { [key: string]: { path: string, state: { current: number } } }, value: string) => {
    if (urlMap[value]) {
      navigator(urlMap[value].path, { state: urlMap[value].state });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

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

    if (current === 3) {
      newPercent -= progress.steps;
    } else if (current === 2) {
      newPercent -= progress.steps;
    }

    setProgress({ percent: newPercent, steps: progress.steps });
    setCurrent(current - 1);
  };

  const letMeback = async () => {
    toGoBack()
  }
  const handleSave = async () => {

    await saveRetirementPlan({ data: formData, nameData: dataname, })

    toGoNext()
  };
  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.livingCosts ||
        !formData.houseCosts ||
        !formData.internetCosts ||
        !formData.clothingCosts ||
        !formData.medicalCosts ||
        !formData.otherCosts ||
        !formData.age ||
        !formData.retireAge ||
        !formData.lifExpectancy ||
        !formData.inflationRate
      );
    } else if (current === 2) {
      return (
        !formData.deposit ||
        !formData.insuranceFund ||
        !formData.otherAssets


      )
    }
  }
  const steps = [{
    title: "แผนที่ 3",
    content: (
      <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
        <h1 className=" font-bold">Retirement Plan</h1>
        <h1 className=" text-center">แผนการคุ้มครอง <br />เรื่องเกษียณ<br /></h1>

      </div>
    )
  },
  {
    title: "ค่าใช้จ่ายหลังเกษียณ",
    content: (
      <div>
        <InputField
          label="1. กินอยู่"
          value={formData.livingCosts}
          onChange={handleInputChange("livingCosts")}
          addonAfter="บาท / เดือน"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="2. ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้าน"
          value={formData.houseCosts}
          onChange={handleInputChange("houseCosts")}
          addonAfter="บาท / เดือน"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="3. ค่ามือถือ อินเตอร์เน็ต"
          value={formData.internetCosts}
          onChange={handleInputChange("internetCosts")}
          addonAfter="บาท / เดือน"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />

        <div className="">
          <InputField
            label="4. ค่าเสื้อผ้า"
            value={formData.clothingCosts}
            onChange={handleInputChange("clothingCosts")}
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            addonAfter="บาท / เดือน"
          />
        </div>
        <InputField
          label="5. ค่ารักษาพยาบาล"
          value={formData.medicalCosts}
          onChange={handleInputChange("medicalCosts")}
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          addonAfter="บาท / เดือน"
        />
        <InputField
          label="6. ค่าใช้จ่ายอื่น ๆ (ขาดได้ ไม่ใช่ปัจจัย 4)"
          value={formData.otherCosts}
          onChange={handleInputChange("otherCosts")}
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          addonAfter="บาท / เดือน"
        />

        <div className="">
          <InputField
            label="7. รวมค่าใช้จ่ายต่อปี"
            value={totalCosts}
            onChange={() => { }}
            readOnly
            placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            addonAfter="บาท"
          />
        </div>

        <InputField
          label="8. อายุตอนนี้&nbsp;&nbsp;&nbsp;"
          value={formData.age}
          onChange={handleInputChange("age")}
          placeholder="กรุณากรอกอายุของคุณ"
          addonAfter="ปี"
        />

        <InputField
          label="9. อายุเกษียณ"
          value={formData.retireAge}
          onChange={handleInputChange("retireAge")}
          placeholder="กรุณากรอกอายุประเมิน"
          addonAfter="ปี"
        />
        <InputField
          label="10. คาดการณ์อายุขัย"
          value={formData.lifExpectancy}
          onChange={handleInputChange("lifExpectancy")}
          placeholder="กรุณากรอกอายุประเมิน"
          addonAfter="ปี"
        />
        <div className="">
          <InputField
            label="11. จำนวนปีที่ทำงานได้"
            value={workingYears}
            onChange={() => { }}
            readOnly
            placeholder="34"
            addonAfter="ปี"
          />
        </div>
        <InputField
          label="12. จำนวนปีที่ต้องเตรียม"
          value={preparationYears}
          onChange={() => { }}
          readOnly
          placeholder="34"
          addonAfter="ปี"
        />
        <Form.Item>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"13. เงินเฟ้อ"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '220px' }}
                  value={formData.inflationRate || undefined}
                  placeholder="เลือกประเภทโรงพยาบาล"
                  onChange={handleInputChange("inflationRate")}
                  options={[
                    { label: "กรุณาเลือก", value: undefined, disabled: !!formData.inflationRate },
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
        </Form.Item>


        <InputField
          label="14. รวมค่าใช้จ่ายที่ต้องเตรียม"
          value={totalPreparation}
          onChange={() => { }}
          readOnly
          placeholder="30,626,766.28"
          addonAfter="บาท"
        />
      </div>
    )
  },
  {
    title: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
    content: (
      <div><InputField
        label="15. เงินฝาก"
        value={formData.deposit}
        onChange={handleInputChange("deposit")}
        addonAfter="บาท"
        placeholder="2,000.00"
      />
        <InputField
          label="16. ทุนประกัน"
          value={formData.insuranceFund}
          onChange={handleInputChange("insuranceFund")}
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <InputField
          label="17. ทรัพย์สินอื่น ๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <InputField
          label="18. รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalPreparationAssets}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          placeholder="2,000.00"
        />
        <div className="pt-4">
          <InputField
            label="19. รวมที่ขาดอยู่"
            value={totalMissing}
            onChange={() => { }}
            readOnly
            placeholder="34"
            addonAfter="บาท"
          />
        </div>
        <InputField
          label="20. ต่อปีที่ต้องเก็บได้"
          value={mustBeSaved}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          placeholder="2,000.00"
        /></div>
    )
  }
  ]
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>

      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-2xl font-bold text-center">{current == 0 ? "แผนที่ 3" : "Retirement Plan"}</h1>

          <ProgressBar percent={progress.percent} current={current} />
          <img src={allImages} alt="" className="w-[265px] mt-5" />
          <DotsComponent steps={steps} current={current} />
        </div>
        <div className="steps-content h-auto py-2 px-3 shadow-lg rounded-md gap-5 mb-5 w-[350px]">
          <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">

            {current === 0 && (
              <Button
                onClick={() => letMeback()}
                className="bg-white rounded-full w-[120px]"
              >
                ย้อนกลับ
              </Button>
            )}

            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <><Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"}`}>
                ถัดไป
              </Button>
              </>
            )}
            {current === steps.length - 1 && (
              <Button
                disabled={handleDisabled()}
                onClick={() => handleSave()}
                className="bg-[#003781] rounded-full w-[120px] text-white"
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

export default RetirementPlan;
