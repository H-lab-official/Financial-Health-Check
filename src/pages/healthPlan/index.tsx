import { Button, Col, Form, Row, Select, Typography, Progress } from "antd";
import InputField from "@/components/InputField";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  additionalRoomFeeSelector,
  annualTreatmentSelector,
  dailyCompensationSelector,
  emergencyCostsSelector,

  treatingSeriousIllnessSelector, calculateAdditionalRoomFee,
  calculateAnnualTreatments,
  calculateDailyCompensation,
  calculateEmergencyCosts,
  calculateTreatingSeriousIllness,
  healthPlanState,
} from "@/recoil/healthPlanState";
import { savehealthPlan } from '@/components/api/savehealthPlan';
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import DotsComponent from "@/components/DotsComponent";
import ProgressBar from "@/components/progressBar";
import health from "@/assets/images/health.png";
import health1 from "@/assets/images/health1.png";
import health2 from "@/assets/images/health2.png";
import health3 from "@/assets/images/health3.png";
import HealthPlan11 from "@/assets/images/icons/HealthPlan/HealthPlan1-1.svg";
import HealthPlan12 from "@/assets/images/icons/HealthPlan/HealthPlan1-2.svg";
import HealthPlan13 from "@/assets/images/icons/HealthPlan/HealthPlan1-3.svg";
import HealthPlan14 from "@/assets/images/icons/HealthPlan/HealthPlan1-4.svg";
import HealthPlan15 from "@/assets/images/icons/HealthPlan/HealthPlan1-5.svg";
import HealthPlan16 from "@/assets/images/icons/HealthPlan/HealthPlan1-6.svg";
import HealthPlan17 from "@/assets/images/icons/HealthPlan/HealthPlan1-7.svg";
import HealthPlan18 from "@/assets/images/icons/HealthPlan/HealthPlan1-8.svg";
import HealthPlan19 from "@/assets/images/icons/HealthPlan/HealthPlan1-9.svg";
import HealthPlan21 from "@/assets/images/icons/HealthPlan/HealthPlan2-1.svg";
import HealthPlan22 from "@/assets/images/icons/HealthPlan/HealthPlan2-2.svg";
import HealthPlan23 from "@/assets/images/icons/HealthPlan/HealthPlan2-3.svg";
import HealthPlan24 from "@/assets/images/icons/HealthPlan/HealthPlan2-4.svg";
import HealthPlan25 from "@/assets/images/icons/HealthPlan/HealthPlan2-5.svg";
import HealthPlan26 from "@/assets/images/icons/HealthPlan/HealthPlan2-6.svg";
import HealthPlan31 from "@/assets/images/icons/HealthPlan/HealthPlan3-1.svg";
import HealthPlan32 from "@/assets/images/icons/HealthPlan/HealthPlan3-2.svg";
import HealthPlan33 from "@/assets/images/icons/HealthPlan/HealthPlan3-3.svg";
import HealthPlan34 from "@/assets/images/icons/HealthPlan/HealthPlan3-4.svg";
import HealthPlan35 from "@/assets/images/icons/HealthPlan/HealthPlan3-5.svg";
import HealthPlan36 from "@/assets/images/icons/HealthPlan/HealthPlan3-6.svg";
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
  const [hospitals2, setHospitals2] = useState(formData.hospitals)
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
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  useEffect(() => {
    if (formData.hospitals !== hospitals2) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hospitals2: formData.hospitals,
      }));
      setHospitals2(formData.hospitals);
    }
  }, [formData.hospitals]);
  let allImages;
  switch (current) {
    case 0:
      allImages = health;
      break;
    case 1:
      allImages = health1;
      break;
    case 2:
      allImages = health2;
      break;
    case 3:
      allImages = health3;
      break;
    default:
      allImages = health;
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
    const treatmentBudget = convertMoney(calculateAnnualTreatments(formData)); //งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)
    const roomRates = convertMoney(calculateAdditionalRoomFee(formData)) // ค่าห้อง
    const severeMedicalExpenses = convertMoney(calculateTreatingSeriousIllness(formData)) //ค่ารักษาโรค้รายแรง 
    const emergencyAccidentTreatmentCosts = convertMoney(calculateEmergencyCosts(formData))//ค่ารักษาอุบัติเหตุฉุกเฉิน
    // ดึงค่าเดิมจาก localStorage
    const currentData = JSON.parse(localStorage.getItem('beforeImport') || '{}');

    // อัปเดตค่าใหม่เข้าไปใน currentData
    currentData.treatmentBudget = treatmentBudget;
    currentData.roomRates = roomRates;
    currentData.severeMedicalExpenses = severeMedicalExpenses;
    currentData.emergencyAccidentTreatmentCosts = emergencyAccidentTreatmentCosts;

    // Save the updated data to localStorage with the key 'beforeImport'
    localStorage.setItem('beforeImport', JSON.stringify(currentData));

    await savehealthPlan({ data: formData, nameData: dataname });
    toGoNext();
  };


  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.hospitals ||
        !formData.treatingSeriousIllness ||
        !formData.emergencyCosts ||
        !formData.annualTreatment
      );
    } else if (current === 2) {
      return (
        !formData.roomFeeFromCompany ||
        !formData.treatingSeriousIllnessFromCompany ||
        !formData.emergencyCostsFromCompany ||
        !formData.annualTreatmentFromCompany
      );
    } else if (current === 3) {
      return (
        !additionalRoomFee ||
        !additionalTreatingSeriousIllness ||
        !additionalEmergencyCosts ||
        !additionalAnnualTreatment
      );
    }
  };

  const steps = [{
    title: "แผนที่ 1",
    content: (
      <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
        <h1 className=" text-center">แผนการคุ้มครอง <br />เรื่องสุขภาพ<br /></h1>
      </div>
    )
  }, {
    title: "วางแผนเพื่อสุขภาพ",
    content: (
      <div>
        <div className="flex flex-row justify-start items-center gap-5 mb-5">
          <Col><img src={HealthPlan12} alt="icons" /></Col>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"1. กลุ่มโรงพยาบาลที่ใช้บริการประจำ"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '190px' }}
                  value={formData.hospitals}
                  onChange={handleInputChange("hospitals")}
                  placeholder="เลือกประเภทโรงพยาบาล"
                  options={[
                    { label: "โรงพยาบาลรัฐ", value: "1500.00" },
                    { label: "โรงพยาบาลรัฐนอกเวลา", value: "2500.00" },
                    { label: "โรงพยาบาลเอกชน", value: "4000.00" },
                    { label: "โรงพยาบาลเอกชนพรีเมียม", value: "6000.00" },
                  ]}
                />
              </div>
            </Col>
          </Col>
        </div>

        <InputField
          label="2. ค่าห้องต่อวันประมาณ (ค่าประมาณการ)"
          value={formData.hospitals}
          onChange={handleInputChange("hospitals")}
          addonAfter="บาท"
          placeholder=""
          readOnly
          imgUrl={HealthPlan13}
          ModalBody={`ค่าใช้จ่ายโดยประมาณที่ต้องชำระสำหรับการพักรักษาตัวในโรงพยาบาลหนึ่งคืน โดยค่าใช้จ่ายนี้จะแตกต่างกันไปขึ้นอยู่กับหลายปัจจัย`}
          ModalTitle="2.ค่าห้องต่อวันประมาณ"
        />
        <div>
          <h1 className="text-xl mb-3">สวัสดิการที่คาดหวังจะได้</h1>
          <div>
            <InputField
              label="3. ค่าห้องวันละ"
              value={formData.hospitals2}
              onChange={handleInputChange("hospitals2")}
              placeholder=""
              addonAfter="บาท"
              imgUrl={HealthPlan14}
              ModalBody={`ค่าใช้จ่ายในการเข้าพักในห้องพักของโรงพยาบาล เป็นเวลา 1 วัน คิดเป็นรายวัน โดยปกติจะรวมค่าใช้จ่ายพื้นฐาน เช่น ค่าห้อง ค่าอาหารและบางครั้งอาจรวมถึงค่าบริการอื่นๆ ที่เกี่ยวข้องกับการพักรักษาตัวในโรงพยาบาลด้วย`}
              ModalTitle="3.ค่าห้องวันละ"
            />
            <InputField
              label="4 .ค่ารักษาโรคร้ายแรง"
              value={formData.treatingSeriousIllness}
              onChange={handleInputChange("treatingSeriousIllness")}
              addonAfter="บาท"
              placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
              imgUrl={HealthPlan15}
              ModalBody={`ค่าใช้จ่ายทั้งหมดที่เกิดขึ้นในการรักษาโรคที่จัดว่า เป็นโรคร้ายแรงตามที่ระบุไว้ในกรมธรรม์ประกันสุขภาพ เช่น ค่าผ่าตัด ค่ายา เคมีบำบัด รังสีบำบัด ค่าตรวจวินิจฉัย ค่าพักฟื้น และค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องกับการรักษาโรคนั้นๆ`}
              ModalTitle="4.ค่ารักษาโรคร้ายแรง"
            />
            <InputField
              label="5. ค่ารักษาอุบัติเหตุฉุกเฉิน"
              value={formData.emergencyCosts}
              onChange={handleInputChange("emergencyCosts")}
              addonAfter="บาท"
              placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
              imgUrl={HealthPlan16}
              ModalBody={`เป็นค่าใช้จ่ายที่อาจเกิดขึ้นได้อย่างไม่คาดคิด และมักจะมีจำนวนสูง ซึ่งอาจส่งผลกระทบต่อสภาพคล่องทางการเงินของเราได้อย่างมาก ดังนั้น การมีประกันสุขภาพที่คุ้มครองค่าใช้จ่ายเหล่านี้จึงเป็นสิ่งสำคัญอย่างยิ่ง`}
              ModalTitle="5. ค่ารักษาอุบัติเหตุฉุกเฉิน"
            />
            <InputField
              label="6. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
              value={formData.annualTreatment}
              onChange={handleInputChange("annualTreatment")}
              addonAfter="บาท"
              placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
              imgUrl={HealthPlan17}
              ModalBody={`วงเงินสูงสุดที่บริษัทประกันจะจ่ายให้คุณ ในหนึ่งปีสำหรับค่าใช้จ่ายด้านสุขภาพทั้งหมด ไม่ว่าจะเป็นค่ารักษาพยาบาล ค่าผ่าตัด ค่ายา หรือค่าบริการอื่นๆ ที่เกี่ยวข้องกับการรักษาพยาบาล`}
              ModalTitle="6.งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
            />
          </div>
        </div>
      </div>
    )
  }, {
    title: `สวัสดิการปัจจุบันจากบริษัทหรือจากประกันที่มี`,
    content: (
      <div>
        <InputField
          label="7. ค่าห้องวันละ"
          value={formData.roomFeeFromCompany}
          onChange={handleInputChange("roomFeeFromCompany")}
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          addonAfter="บาท"
          imgUrl={HealthPlan22}
          ModalBody={`ค่าใช้จ่ายในการเข้าพักในห้องพักของโรงพยาบาล เป็นเวลา 1 วัน คิดเป็นรายวัน โดยปกติจะรวมค่าใช้จ่ายพื้นฐาน เช่น ค่าห้อง ค่าอาหารและบางครั้งอาจรวมถึงค่าบริการอื่นๆ ที่เกี่ยวข้องกับการพักรักษาตัวในโรงพยาบาลด้วย`}
          ModalTitle="7.ค่าห้องวันละ"
        />
        <InputField
          label="8. ค่ารักษาโรคร้ายแรง"
          value={formData.treatingSeriousIllnessFromCompany}
          onChange={handleInputChange("treatingSeriousIllnessFromCompany")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          imgUrl={HealthPlan24}
          ModalBody={`ค่าใช้จ่ายทั้งหมดที่เกิดขึ้นในการรักษาโรคที่จัดว่า เป็นโรคร้ายแรงตามที่ระบุไว้ในกรมธรรม์ประกันสุขภาพ เช่น ค่าผ่าตัด ค่ายา เคมีบำบัด รังสีบำบัด ค่าตรวจวินิจฉัย ค่าพักฟื้น และค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องกับการรักษาโรคนั้นๆ`}
          ModalTitle="8.ค่ารักษาโรคร้ายแรง"
        />
        <InputField
          label="9. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={formData.emergencyCostsFromCompany}
          onChange={handleInputChange("emergencyCostsFromCompany")}
          addonAfter="บาท"
          imgUrl={HealthPlan25}
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          ModalBody={`ค่าใช้จ่ายโดยประมาณที่ต้องชำระสำหรับการพักรักษาตัวในโรงพยาบาลหนึ่งคืน โดยค่าใช้จ่ายนี้จะแตกต่างกันไปขึ้นอยู่กับหลายปัจจัย`}
          ModalTitle="9. ค่ารักษาอุบัติเหตุฉุกเฉิน"
        />
        <InputField
          label="10. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={formData.annualTreatmentFromCompany}
          onChange={handleInputChange("annualTreatmentFromCompany")}
          addonAfter="บาท"
          placeholder="กรุณากรอกค่าใช้จ่ายของคุณ"
          imgUrl={HealthPlan26}
          ModalBody={`วงเงินสูงสุดที่บริษัทประกันจะจ่ายให้คุณ ในหนึ่งปีสำหรับค่าใช้จ่ายด้านสุขภาพทั้งหมด ไม่ว่าจะเป็นค่ารักษาพยาบาล ค่าผ่าตัด ค่ายา หรือค่าบริการอื่นๆ ที่เกี่ยวข้องกับการรักษาพยาบาล`}
          ModalTitle="10.งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
        />
      </div>
    )
  }, {
    title: "สวัสดิการที่ต้องเพิ่มเติม",
    content: (
      <div>
        <InputField
          label="11. ค่าห้องวันละ"
          value={additionalRoomFee}
          onChange={() => { }}
          placeholder="6,000.00"
          addonAfter="บาท"
          readOnly
          imgUrl={HealthPlan32}
          ModalBody={`ค่าใช้จ่ายในการเข้าพักในห้องพักของโรงพยาบาลเป็นเวลา 1 วัน คิดเป็นรายวัน โดยปกติจะรวมค่าใช้จ่ายพื้นฐาน เช่น ค่าห้อง ค่าอาหารและบางครั้งอาจรวมถึงค่าบริการอื่นๆ ที่เกี่ยวข้องกับการพักรักษาตัวในโรงพยาบาลด้วย`}
          ModalTitle="11.ค่าห้องวันละ"
        />
        <InputField
          label="12. ค่ารักษาโรคร้ายแรง"
          value={additionalTreatingSeriousIllness}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          imgUrl={HealthPlan34}
          ModalBody={`ค่าใช้จ่ายทั้งหมดที่เกิดขึ้นในการรักษาโรคที่จัดว่า เป็นโรคร้ายแรงตามที่ระบุไว้ในกรมธรรม์ประกันสุขภาพ เช่น ค่าผ่าตัด ค่ายา เคมีบำบัด รังสีบำบัด ค่าตรวจวินิจฉัย ค่าพักฟื้น และค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องกับการรักษาโรคนั้นๆ`}
          ModalTitle="12.ค่ารักษาโรคร้ายแรง"
        />
        <InputField
          label="13. ค่ารักษาอุบัติเหตุฉุกเฉิน"
          value={additionalEmergencyCosts}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          imgUrl={HealthPlan35}
          ModalBody={`ค่าใช้จ่ายโดยประมาณที่ต้องชำระสำหรับการพักรักษาตัวในโรงพยาบาลหนึ่งคืน โดยค่าใช้จ่ายนี้จะแตกต่างกันไปขึ้นอยู่กับหลายปัจจัย`}
          ModalTitle="13. ค่ารักษาอุบัติเหตุฉุกเฉิน"
        />
        <InputField
          label="14. งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
          value={additionalAnnualTreatment}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          imgUrl={HealthPlan36}
          ModalBody={`วงเงินสูงสุดที่บริษัทประกันจะจ่ายให้คุณในหนึ่งปีสำหรับค่าใช้จ่ายด้านสุขภาพทั้งหมด ไม่ว่าจะเป็นค่ารักษาพยาบาล ค่าผ่าตัด ค่ายา หรือค่าบริการอื่นๆ ที่เกี่ยวข้องกับการรักษาพยาบาล`}
          ModalTitle="14.งบประมาณค่ารักษาต่อปี (เหมาจ่าย)"
        />
      </div>
    )
  }, {
    title: "",
    content: (

      <div className="  rounded-lg p-5 shadow-lg mb-5">
        <div className="text-[1rem] mb-3 flex flex-row items-center justify-between"><p>วางแผนเพื่อสุขภาพ</p>
          <button className="bg-[#243286] py-1 px-3 text-white rounded-xl" onClick={() => setCurrent(current - 3)}>แก้ไข</button>
        </div>
        <div className=" text-black text-[0.8rem]">

          <div className="flex flex-row justify-between text-[0.7rem]">
            <p>1.กลุ่มโรงพยาบาลที่ใช้บริการประจำ</p>
            <p>{[
              { label: "โรงพยาบาลรัฐ", value: "1500.00" },
              { label: "โรงพยาบาลรัฐนอกเวลา", value: "2500.00" },
              { label: "โรงพยาบาลเอกชน", value: "4000.00" },
              { label: "โรงพยาบาลเอกชนพรีเมียม", value: "6000.00" },
            ].filter((obj) => obj.value === formData.hospitals)
              .map((obj) => obj.label)
              .join(",")}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>2.ค่าห้องต่อวันประมาณ</p>
            <p>{convertMoney(formData.hospitals)} บาท</p></div>
          <div className="flex flex-row justify-start my-2 text-[1.4rem] text-[#0E2B81]">
            <p className="text-[1rem]">สวัสดิการที่คาดหวังจะได้</p>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <p>3.ค่าห้องวันละ</p>
            <p>{convertMoney(formData.hospitals)} บาท</p></div>
          {/* <div className="flex flex-row justify-between">
                      <p>3.1.ค่าชดเชยรายวัน</p>
                      <p>{convertMoney(formData.dailyCompensationFromWelfare)} บาท</p>
                    </div> */}
          <div className="flex flex-row justify-between">
            <p>4.ค่ารักษาโรคร้ายแรง</p>
            <p>{convertMoney(formData.treatingSeriousIllness)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>5.ค่ารักษาอุบัติเหตุฉุกเฉิน</p>
            <p>{convertMoney(formData.emergencyCosts)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>6.งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)</p>
            <p>{convertMoney(formData.annualTreatment)} บาท</p>
          </div>
          <div className="flex flex-row justify-between items-center my-3 text-[1rem] text-[#0E2B81]">
            <p>สวัสดิการปัจจุบันจากบริษัท หรือ จากประกันที่มี</p>
            <button className="bg-[#243286] py-1 px-3 text-white rounded-xl h-8" onClick={() => setCurrent(current - 2)}>แก้ไข</button>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <p>7.ค่าห้องวันละ</p>
            <p>{convertMoney(formData.roomFeeFromCompany)} บาท</p>
          </div>
          {/* <div className="flex flex-row justify-between">
                      <p>7.1.ค่าชดเชยรายวัน</p>
                      <p>{convertMoney(formData.dailyCompensationFromWelfare)} บาท</p>
                    </div> */}
          <div className="flex flex-row justify-between">
            <p>8.ค่ารักษาโรคร้ายแรง</p>
            <p>{convertMoney(formData.treatingSeriousIllnessFromCompany)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>9.ค่ารักษาอุบัติเหตุฉุกเฉิน</p>
            <p>{convertMoney(formData.emergencyCostsFromCompany)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>10.งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)</p>
            <p>{convertMoney(formData.annualTreatmentFromCompany)} บาท</p>
          </div>
          <div className="flex flex-row justify-between items-center  my-2 text-[1rem] text-[#0E2B81]">
            <p>สวัสดิการที่ต้องเพิ่มเติม</p>
            <button className="bg-[#243286] py-1 px-3 text-white rounded-xl h-8" onClick={() => setCurrent(current - 1)}>แก้ไข</button>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <p>11.ค่าห้องวันละ</p>
            <p>{convertMoney(calculateAdditionalRoomFee(formData))} บาท</p>
          </div>
          {/* <div className="flex flex-row justify-between">
                      <p>11.1.ค่าชดเชยรายวัน</p>
                      <p>{convertMoney(calculateDailyCompensation(formData))} บาท</p>
                    </div> */}
          <div className="flex flex-row justify-between">
            <p>12.ค่ารักษาโรคร้ายแรง</p>
            <p>{convertMoney(calculateTreatingSeriousIllness(formData))} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>13.ค่ารักษาอุบัติเหตุฉุกเฉิน</p>
            <p>{convertMoney(calculateEmergencyCosts(formData))} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>14.งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)</p>
            <p>{convertMoney(calculateAnnualTreatments(formData))} บาท</p>
          </div>
          {/* <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
                      <p>ผลลัพธ์</p>
                      <p>{convertMoney(calculateAnnualTreatments(formData))} บาท</p>
                    </div> */}
        </div>
      </div>



    )
  }];

  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>
      <div className="bg-white  rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-2xl font-bold text-center">{current === 0 ? "Health Plan" : "Health Plan"}</h1>
          {/* {current === 4 ? "" : <ProgressBar percent={progress.percent} current={current} />} */}
          {current === 0 && <img src={health} alt="" className=" w-[265px] mt-5" />}
          {/* {current === 4 ? "" : <DotsComponent steps={steps} current={current} />} */}
        </div>
        <div className={`steps-content h-auto py-2 px-3  rounded-md gap-5 mb-5 w-[350px] ${current === 0 ? "" : "shadow-xl"}`}>
          <p className={`text-xl mb-3`}>
            {current === 0 ? "" : steps[current].title === "วางแผนเพื่อสุขภาพ" ?
              <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={HealthPlan11} alt="" />{steps[current].title}</div> :
              steps[current].title === "สวัสดิการปัจจุบันจากบริษัทหรือจากประกันที่มี" ?
                <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={HealthPlan21} alt="" />{steps[current].title}</div> :
                steps[current].title === "สวัสดิการที่ต้องเพิ่มเติม" ?
                  <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={HealthPlan31} alt="" />{steps[current].title}</div> : steps[current].title}
          </p>
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
              <>
                <Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"}`}>
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
