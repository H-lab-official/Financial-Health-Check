import { Button, Col, Form, Row, Select, Typography, Progress } from "antd";
import InputField from "@/components/InputField";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  additionalRoomFeeSelector,
  annualTreatmentSelector,
  dailyCompensationSelector,
  emergencyCostsSelector,
  healthPlanState,
  treatingSeriousIllnessSelector,
} from "@/recoil/healthPlanState";
import { savehealthPlan } from '@/components/api/savehealthPlan'
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import DotsComponent from "@/components/DotsComponent";
import ProgressBar from "@/components/progressBar";
import health from "@/assets/images/health.png"
import health1 from "@/assets/images/health1.png"
import health2 from "@/assets/images/health2.png"
import health3 from "@/assets/images/health3.png"

const { Text } = Typography;
import { nameState, nameData } from "@/recoil/nameState";
import { NavBar } from "@/components/navbar";
const HealthPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(healthPlanState);
  const additionalRoomFee = useRecoilValue(additionalRoomFeeSelector);
  const additionalDailyCompensation = useRecoilValue(dailyCompensationSelector);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const additionalTreatingSeriousIllness = useRecoilValue(
    treatingSeriousIllnessSelector
  );
  const selectedValue = useRecoilValue(selectedState)

  const additionalEmergencyCosts = useRecoilValue(emergencyCostsSelector);
  const dataname = useRecoilValue<nameData>(nameState)
  const additionalAnnualTreatment = useRecoilValue(annualTreatmentSelector);
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
      allImages = health

      break;
    case 1:
      allImages = health1

      break;
    case 2:
      allImages = health2

      break;
    case 3:
      allImages = health3

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
      navigator(finalDestination);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const toGoFirst = () => {
    setCurrentIndex(0);
    toGoNext();
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
    if (selectedValue.includes('2')) {
      navigator(`/Financial-Health-Check?user_params=${dataname.user_params}`, { state: { current: 2 } })
    } else if (selectedValue.includes('5')) {
      navigator("/protection-plan", { state: { current: 3 } })
    }
  }


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
    if (value !== '5') {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } });
    } else {
      navigateThroughBackSequence(urlMap);
    }

  };

  const handleMultipleBack = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {

    if (currentIndex > 1) {
      const value = sortedSelected[currentIndex - 2];

      navigateBackToValue(urlMap, value);
    } else if (currentIndex === 1) {
      const firstValue = sortedSelected[0];

      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } });
      setCurrentIndex(0);
      // navigateBackToValue(urlMap, firstValue);
    } else if (currentIndex === 0) {

      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } });
      setCurrentIndex(0);
    } else {
      console.log("Unexpected index value");
    }
  };

  const navigateThroughBackSequence = (urlMap: { [key: string]: { path: string, state: { current: number } } }) => {
    const sequence = ['1', '2', '3', '4'];

    if (currentIndex > 0) {
      const previousValue = sequence[currentIndex - 1];
      navigateBackToValue(urlMap, previousValue);
    } else {
      navigator('/');
      setCurrentIndex(0);
    }
  };

  const navigateBackToValue = (urlMap: { [key: string]: { path: string, state: { current: number } } }, value: string) => {
    if (urlMap[value]) {
      navigator(urlMap[value].path, { state: urlMap[value].state });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };


  const getPagePath = (page: string) => {
    switch (page) {
      case '1':
        return 'protection-plan';
      case '2':
        return 'health-plan';
      case '3':
        return 'retirement-plan';
      case '4':
        return 'education-plan';
      default:
        return '';
    }
  };
  const handleSave = async () => {
    await savehealthPlan({ data: formData, nameData: dataname });
    toGoNext();
  };
  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.hospitals ||
        !formData.dailyCompensationFromWelfare ||
        !formData.treatingSeriousIllness ||
        !formData.emergencyCosts ||
        !formData.annualTreatment
      );
    } else if (current === 2) {
      return (
        !formData.roomFeeFromCompany ||
        !formData.dailyCompensationFromCompany ||
        !formData.treatingSeriousIllnessFromCompany ||
        !formData.emergencyCostsFromCompany ||
        !formData.annualTreatmentFromCompany

      )
    } else if (current === 3) {
      return (
        !additionalRoomFee ||
        !additionalDailyCompensation ||
        !additionalTreatingSeriousIllness ||
        !additionalEmergencyCosts ||
        !additionalAnnualTreatment
      )
    }
  }
  const steps = [{
    title: "แผนที่ 1",
    content: (
      <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
        {/* <h1 className=" font-bold">Health Plan</h1> */}
        <h1 className=" text-center">แผนการคุ้มครอง <br />เรื่องสุขภาพ<br /></h1>

      </div>
    )
  }, {
    title: "วางแผนเพื่อสุขภาพ",
    content: (
      <div>
        <Form.Item>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"1. กลุ่มโรงพยาบาลที่ใช้บริการประจำ"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '260px' }}
                  value={formData.hospitals || undefined}
                  placeholder="เลือกประเภทโรงพยาบาล"
                  onChange={handleInputChange("hospitals")}
                  options={[
                    { label: "เลือกประเภทโรงพยาบาล", value: undefined, disabled: !!formData.hospitals },
                    { label: "โรงพยาบาลรัฐ", value: "1500.00" },
                    { label: "โรงพยาบาลรัฐนอกเวลา", value: "2500.00" },
                    { label: "โรงพยาบาลเอกชน", value: "4000.00" },
                    { label: "โรงพยาบาลเอกชนพรีเมียม", value: "6000.00" },
                  ]}
                />

              </div>
            </Col>
          </Col>
        </Form.Item>

        <InputField
          label="2. ค่าห้องต่อวันประมาณ"
          value={formData.hospitals}
          onChange={() => { }}
          addonAfter="บาท"
          placeholder=""
          readOnly
        />
        <div>
          <h1 className="text-xl mb-3">สวัสดิการที่คาดหวังจะได้</h1>
          <div><InputField
            label="3. ค่าห้องวันละ"
            value={formData.hospitals}
            onChange={handleInputChange("roomFeeFromWelfare")}
            readOnly
            placeholder=""
            addonAfter="บาท"
          />
            <InputField
              label="3.1. ค่าชดเชยรายวัน"
              value={formData.dailyCompensationFromWelfare}
              onChange={handleInputChange("dailyCompensationFromWelfare")}
              addonAfter="บาท"
              placeholder="2,000.00"
            />
            <InputField
              label="4 .ค่ารักษาโรคร้ายแรง"
              value={formData.treatingSeriousIllness}
              onChange={handleInputChange("treatingSeriousIllness")}
              addonAfter="บาท"
              placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            />
            <InputField
              label="5. ค่ารักษาอุบัติเหตุฉุกเฉิน"
              value={formData.emergencyCosts}
              onChange={handleInputChange("emergencyCosts")}
              addonAfter="บาท"
              placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            />
            <InputField
              label="6. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
              value={formData.annualTreatment}
              onChange={handleInputChange("annualTreatment")}
              addonAfter="บาท"
              placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
            /></div>
        </div>
      </div>

    )
  },
  {
    title: `สวัสดิการปัจจุบันจากบริษัทหรือจากประกันที่มี`,
    content: (
      <div><InputField
        label="7. ค่าห้องวันละ"
        value={formData.roomFeeFromCompany}
        onChange={handleInputChange("roomFeeFromCompany")}
        placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        addonAfter="บาท"
      />
        <InputField
          label="7.1. ค่าชดเชยรายวัน"
          value={formData.dailyCompensationFromCompany}
          onChange={handleInputChange("dailyCompensationFromCompany")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="8. ค่ารักษาโรคร้ายแรง"
          value={formData.treatingSeriousIllnessFromCompany}
          onChange={handleInputChange("treatingSeriousIllnessFromCompany")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="9. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={formData.emergencyCostsFromCompany}
          onChange={handleInputChange("emergencyCostsFromCompany")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        />
        <InputField
          label="10. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={formData.annualTreatmentFromCompany}
          onChange={handleInputChange("annualTreatmentFromCompany")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
        /></div>
    )
  }, {
    title: "สวัสดิการที่ต้องเพิ่มเติม",
    content: (
      <div> <InputField
        label="13. ค่าห้องวันละ"
        value={additionalRoomFee}
        onChange={() => { }}
        placeholder="6,000.00"
        addonAfter="บาท"
        readOnly
      />
        <InputField
          label="14. ค่าชดเชยรายวัน"
          value={additionalDailyCompensation}
          onChange={() => { }}
          addonAfter="บาท"
          placeholder="2,000.00"
          readOnly
        />
        <InputField
          label="15. ค่ารักษาโรคร้ายแรง"
          value={additionalTreatingSeriousIllness}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
        />
        <InputField
          label="16. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={additionalEmergencyCosts}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
        />
        <InputField
          label="17. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={additionalAnnualTreatment}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
        /></div>
    )
  }]
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>
      <div className="bg-white  rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-2xl font-bold text-center">{current == 0 ? "Health Plan" : "Health Plan"}</h1>

          <ProgressBar percent={progress.percent} current={current} />
          <img src={allImages} alt="" className=" w-[265px] mt-5" />
          <DotsComponent steps={steps} current={current} />
        </div>
        <div className={`steps-content h-auto py-2 px-3  rounded-md gap-5 mb-5 w-[350px] ${current == 0 ? "" : "shadow-xl"}`}>
          <p className={`text-xl mb-3 ${current === 2 ? " text-base" : null}`}>{current == 0 ? "" : steps[current].title}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
            {current === 0 && (
              <Button
                onClick={() => toGoBack()}
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

export default HealthPlan;
