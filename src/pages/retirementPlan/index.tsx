import { Button, Col, Form, Row, Select, Typography, Progress, Modal } from "antd";
import InputField from "@/components/InputField";
import ProgressBar from "@/components/progressBar";
import { useNavigate, useLocation } from "react-router";
import React, { useState } from "react";
import StepTitle from '@/components/StepTitle';
import {
  preparationYearsSelector,
  retirementPlanState,
  totalCostsSelector,
  totalRetirementMissingSelector,
  totalRetirementPreparationAssetsSelector,
  totalPreparationSelector,
  workingYearsSelector,
  mustBeSavedSelector, calculatePreparationYears,
  calculateTotalCosts,
  calculateTotalPreparation,
  calculateWorkingYears,
  calculateisTotalPreparationAssets,

} from "@/recoil/retirementPlanState";
import DotsComponent from "@/components/DotsComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import InflationComponent from '@/components/SelectOptions'
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import retirement from "@/assets/images/retirement.png"
import retirement1 from "@/assets/images/retirement1.png"
import retirement2 from "@/assets/images/retirement2.png"
const { Text } = Typography;
import { nameState, nameData } from "@/recoil/nameState";
import { saveRetirementPlan } from "@/components/api/saveretirementPlan";
import { NavBar } from "@/components/navbar";
import RetirementPlan11 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-1.svg"
import RetirementPlan12 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-2.svg"
import RetirementPlan13 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-3.svg"
import RetirementPlan14 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-4.svg"
import RetirementPlan15 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-5.svg"
import RetirementPlan16 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-6.svg"
import RetirementPlan17 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-7.svg"
import RetirementPlan18 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-8.svg"
import RetirementPlan19 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-9.svg"
import RetirementPlan110 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-10.svg"
import RetirementPlan111 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-11.svg"
import RetirementPlan112 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-12.svg"
import RetirementPlan113 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-13.svg"
import RetirementPlan114 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-14.svg"
import RetirementPlan115 from "@/assets/images/icons/RetirementPlan/RetirementPlan1-15.svg"
import RetirementPlan21 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-1.svg"
import RetirementPlan22 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-2.svg"
import RetirementPlan23 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-3.svg"
import RetirementPlan24 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-4.svg"
import RetirementPlan25 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-5.svg"
import RetirementPlan26 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-6.svg"
import RetirementPlan27 from "@/assets/images/icons/RetirementPlan/RetirementPlan2-7.svg"
import tooltip from '@/assets/images/icons/tooltip.svg'
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  console.log(formData);

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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
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
      navigator('/'); // Redirect to initial page if at the beginning
      setCurrentIndex(0);
    }
  };

  const navigateBackToValue = (urlMap: { [key: string]: { path: string, state: { current: number } } }, value: string) => {
    if (urlMap[+value]) {
      navigator(urlMap[+value].path, { state: urlMap[+value].state });
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
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
  };

  const letMeback = async () => {
    toGoBack()
  }
  const handleSave = async () => {
    const totalMissingX = convertMoney(totalMissing);

    // ดึงค่าเดิมจาก localStorage
    const currentData = JSON.parse(localStorage.getItem('beforeImport') || '{}');

    // อัปเดตค่าใหม่เข้าไปใน currentData
    currentData.totalMissing = totalMissingX;


    // Save the updated data to localStorage with the key 'beforeImport'
    localStorage.setItem('beforeImport', JSON.stringify(currentData));

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
    title: "",
    content: (
      <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
        {/* <h1 className=" font-bold">Retirement Plan</h1> */}
        <h1 className=" text-center">แผนการคุ้มครอง <br />เรื่องเกษียณ<br /></h1>

      </div>
    )
  },
  {
    ModalTitle: "ค่าใช้จ่ายหลังเกษียณ",
    imageUrl: RetirementPlan11,
    ModalBody: "ค่าใช้จ่ายในชีวิตประจำวันหลังจากที่เราหยุดทำงานแล้ว ไม่ว่าจะเป็นค่าอาหาร ค่าที่อยู่อาศัย ค่ารักษาพยาบาล ค่าเดินทาง หรือค่าใช้จ่ายอื่นๆ ที่จำเป็นต่อการดำรงชีวิต",
    title: "ค่าใช้จ่ายหลังเกษียณ",
    content: (
      <div>
        <InputField
          label={<>1.ค่าใช้จ่ายประจำวัน(ค่าอาหาร ค่าที่อยู่อาศัย)</>}
          value={formData.livingCosts}
          onChange={handleInputChange("livingCosts")}
          addonAfter="บาท/เดือน"
          placeholder="กรุณากรอกข้อมูล"
          imgUrl={RetirementPlan12}
          ModalBody={`เงินที่ต้องใช้จ่ายไปกับการดำรงชีวิตประจำวัน โดยเฉพาะอย่างยิ่งค่าอาหารและค่าที่อยู่อาศัย`}
          ModalTitle="1.ค่าใช้จ่ายประจำวัน (ค่าอาหาร ค่าที่อยู่อาศัย)"
        />
        <InputField
          label="2.ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้านอื่นๆ"
          value={formData.houseCosts}
          onChange={handleInputChange("houseCosts")}
          addonAfter="บาท/เดือน"
          imgUrl={RetirementPlan13}
          placeholder="กรุณากรอกข้อมูล"
          ModalBody={`เงินที่เราต้องใช้จ่ายสำหรับการดำรงชีวิตภายในบ้าน`}
          ModalTitle="2.ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้านอื่นๆ"
        />
        <InputField
          label="3.ค่ามือถือ อินเตอร์เน็ต"
          value={formData.internetCosts}
          onChange={handleInputChange("internetCosts")}
          addonAfter="บาท/เดือน"
          imgUrl={RetirementPlan14}
          placeholder="กรุณากรอกข้อมูล"
          ModalBody={`เงินที่เราต้องจ่ายเพื่อใช้บริการโทรศัพท์มือถือและบริการอินเทอร์เน็ต`}
          ModalTitle="3.ค่ามือถือ อินเตอร์เน็ต"
        />
        <InputField
          label="4.ค่าเสื้อผ้า"
          value={formData.clothingCosts}
          onChange={handleInputChange("clothingCosts")}
          placeholder="กรุณากรอกข้อมูล"
          addonAfter="บาท/เดือน"
          imgUrl={RetirementPlan15}
          ModalBody={`เงินที่เราใช้จ่ายไปกับการซื้อเสื้อผ้าและเครื่องแต่งกาย`}
          ModalTitle="4.ค่าเสื้อผ้า"
        />
        <InputField
          label="5.ค่ารักษาพยาบาล"
          value={formData.medicalCosts}
          onChange={handleInputChange("medicalCosts")}
          placeholder="กรุณากรอกข้อมูล"
          addonAfter="บาท/เดือน"
          imgUrl={RetirementPlan16}
          ModalBody={`เงินที่เราต้องจ่ายเพื่อใช้บริการทางการแพทย์ในการรักษาโรคภัยไข้เจ็บ หรือเพื่อป้องกันโรค`}
          ModalTitle="5.ค่ารักษาพยาบาล"
        />
        <InputField
          label={<>6.ค่าใช้จ่ายอื่นๆ(ขาดไม่ได้ ไม่ใช่ปัจจัย4)</>}
          value={formData.otherCosts}
          onChange={handleInputChange("otherCosts")}
          placeholder="กรุณากรอกข้อมูล"
          addonAfter="บาท/เดือน"
          imgUrl={RetirementPlan17}
          ModalBody={`เงินที่เราต้องใช้จ่ายไปกับสิ่งของหรือบริการต่างๆ ที่ช่วยให้ชีวิตมีความสะดวกสบายมากขึ้น หรือเป็นค่าใช้จ่ายที่จำเป็นต่อการดำรงชีวิตในสังคมปัจจุบัน แม้จะไม่ใช่ปัจจัยพื้นฐานที่สุดก็ตาม ที่นอกเหนือไปจากปัจจัย 4 (อาหาร, ที่อยู่อาศัย, เสื้อผ้า, และยารักษาโรค)`}
          ModalTitle="6.ค่าใช้จ่ายอื่นๆ (ขาดไม่ได้ ไม่ใช่ปัจจัย 4)"
        />
        <InputField
          label="7.รวมค่าใช้จ่ายต่อปี"
          value={totalCosts}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="บาท"
          imgUrl={RetirementPlan18}
          ModalBody={`จำนวนเงินที่คำนวนมาจาก  (ข้อ 1. + ข้อ 2. + ข้อ 3. + ข้อ 4. + ข้อ 5. + ข้อ 6.) x 12 เดือน`}
          ModalTitle="7.รวมค่าใช้จ่ายต่อปี"
        />

        <InputField
          label="8.อายุปัจจุบัน"
          value={formData.age}
          onChange={handleInputChange("age")}
          placeholder="กรุณากรอกข้อมูล"
          addonAfter="ปี"
          imgUrl={RetirementPlan19}
          ModalBody={`-`}
          ModalTitle="-"
        />
        <InputField
          label="9.อายุที่คาดว่าเกษียณ "
          value={formData.retireAge}
          onChange={handleInputChange("retireAge")}
          placeholder="กรุณากรอกข้อมูล"
          addonAfter="ปี"
          imgUrl={RetirementPlan110}
          ModalBody={`-`}
          ModalTitle="-"
        />
        <InputField
          label="10.คาดการณ์อายุขัย"
          value={formData.lifExpectancy}
          onChange={handleInputChange("lifExpectancy")}
          placeholder="กรุณากรอกข้อมูล"
          addonAfter="ปี"
          imgUrl={RetirementPlan111}
          ModalBody={`การประมาณการว่าบุคคลหนึ่งๆ จะมีชีวิตอยู่ได้นานเท่าไร โดยพิจารณาจากปัจจัยต่างๆ เช่น เพศ อายุ สุขภาพ สภาพแวดล้อม และปัจจัยทางพันธุกรรม`}
          ModalTitle="10.คาดการณ์อายุขัย"
        />

        <InputField
          label="11.จำนวนปีที่ทำงานได้"
          value={workingYears}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="ปี"
          imgUrl={RetirementPlan112}
          ModalBody={`ช่วงอายุตั้งแต่เริ่มทำงานจนถึงอายุเกษียณ คำนวณจาก (ข้อ 9. - ข้อ 8.)`}
          ModalTitle="11.จำนวนปีที่ทำงานได้"
        />

        <InputField
          label="12.จำนวนปีเกษียณที่ต้องเตรียมค่าใช้จ่ายไว้"
          value={preparationYears}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="ปี"
          imgUrl={RetirementPlan113}
          ModalBody={`ระยะเวลาที่เราต้องใช้ในการเตรียมตัวเพื่อการเกษียณอายุ คำนวณจาก (ข้อ 10. - ข้อ 9.)`}
          ModalTitle="12.จำนวนปีเกษียณที่ต้องเตรียมค่าใช้จ่ายไว้"
        />
        <InflationComponent
          iconsImg={RetirementPlan114}
          title="13.เงินเฟ้อ"
          textModal=" ภาวะที่ราคาสินค้าและบริการต่างๆ โดยทั่วไป มีแนวโน้มที่จะสูงขึ้นเรื่อยๆ เมื่อเทียบกับช่วงเวลาที่ผ่านมา ทำให้เงินที่เรามีอยู่ซื้อของได้น้อยลง หรือพูดอีกอย่างคือ 'ของแพงขึ้น'"
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
          label="14.รวมค่าใช้จ่ายที่ต้องเตรียม"
          value={totalPreparation}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="บาท"
          imgUrl={RetirementPlan115}
          ModalBody={<>การรวบรวมรายการค่าใช้จ่ายทั้งหมดที่คาดว่าจะเกิดขึ้นในอนาคต เพื่อนำมาคำนวณและวางแผนการใช้เงินให้เพียงพอต่อความต้องการ
          </>}
          ModalTitle="14.รวมค่าใช้จ่ายที่ต้องเตรียม"
        />
      </div>
    )
  },
  {
    title: <>สิ่งที่เตรียมไว้แล้ว <br />(มีสภาพคล่อง)</>,
    ModalTitle: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
    imageUrl: RetirementPlan21,
    ModalBody: "สิ่งของหรือทรัพย์สินที่เราสามารถนำมาใช้จ่ายหรือเปลี่ยนเป็นเงินสดได้อย่างรวดเร็วและง่ายดายในยามจำเป็น โดยไม่สูญเสียมูลค่ามากนัก",
    content: (
      <div><InputField
        label="15.เงินฝาก"
        value={formData.deposit}
        onChange={handleInputChange("deposit")}
        addonAfter="บาท"
        placeholder="กรุณากรอกข้อมูล"
        imgUrl={RetirementPlan22}
        ModalBody={`เงินที่ฝากไว้กับสถาบันการเงิน เช่น ธนาคาร สหกรณ์ หรือบริษัทหลักทรัพย์ เพื่อเก็บรักษาและอาจได้รับดอกเบี้ยตอบแทน`}
        ModalTitle="15.เงินฝาก"
      />
        <InputField
          label="16.ทุนประกันชีวิต"
          value={formData.insuranceFund}
          onChange={handleInputChange("insuranceFund")}
          addonAfter="บาท"
          placeholder="กรุณากรอกข้อมูล"
          imgUrl={RetirementPlan23}
          ModalBody={`จำนวนเงินสูงสุดที่บริษัทประกันภัยจะจ่ายให้กับผู้เอาประกัน หรือผู้รับผลประโยชน์ ในกรณีที่เกิดเหตุการณ์ตามที่ระบุไว้ในกรมธรรม์ประกันภัย เช่น การเสียชีวิต การเจ็บป่วย การสูญเสียทรัพย์สิน เป็นต้น`}
          ModalTitle="16.ทุนประกันชีวิต"
        />
        <InputField
          label="17.ทรัพย์สินอื่นๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          addonAfter="บาท"
          placeholder="กรุณากรอกข้อมูล"
          imgUrl={RetirementPlan24}
          ModalBody={`สิ่งของหรือวัตถุที่มีมูลค่าทางเศรษฐกิจและสามารถนำมาเปลี่ยนเป็นเงินสดได้ไม่ยากนัก เช่น ทอง เครื่องประดับ ที่ดิน`}
          ModalTitle="17.ทรัพย์สินอื่นๆ"
        />
        <InputField
          label="18.รวมสิ่งที่เตรียมไว้แล้ว"
          value={totalPreparationAssets}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          placeholder=""
          imgUrl={RetirementPlan25}
          ModalBody={`การรวมสิ่งของหรือทรัพย์สินทั้งหมดที่เราได้เตรียมเอาไว้แล้ว เพื่อให้เห็นภาพรวมของสิ่งที่เรามีอยู่ทั้งหมด คำนวณจาก (ข้อ 15. + ข้อ 16. + ข้อ 17.)`}
          ModalTitle="18.รวมสิ่งที่เตรียมไว้แล้ว"
        />

        <InputField
          label="19.รวมที่ขาดอยู่"
          value={totalMissing}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="บาท"
          imgUrl={RetirementPlan26}
          ModalBody={`การรวมสิ่งของหรือทรัพย์สินทั้งหมดที่เราขาดอยู่ เพื่อให้เห็นภาพรวมของสิ่งที่เราขาดอยูทั้งหมด คำนวณจาก (ข้อ 14. - ข้อ 18.)`}
          ModalTitle="19.รวมที่ขาดอยู่"
        />

        <InputField
          label="20.ต่อปีที่ต้องเก็บได้"
          value={mustBeSaved}
          onChange={() => { }}
          readOnly
          addonAfter="บาท"
          placeholder=""
          imgUrl={RetirementPlan27}
          ModalBody={<>จำนวนเงินที่เราตั้งเป้าหมายว่าจะสามารถออมหรือเก็บสะสมได้ภายในหนึ่งปี เป็นตัวเลขที่แสดงถึงเป้าหมายทางการเงินของเราในระยะเวลาหนึ่งปี <br />คำนวณจาก (ข้อ 19. / ข้อ 11.)</>}
          ModalTitle="20.ต่อปีที่ต้องเก็บได้"
        /></div>
    )
  }, {
    title: "สรุปผล",
    content: (

      <div className="  rounded-lg   mb-5">
        <div className="text-[1rem] mb-3 flex flex-row justify-between items-center "><p>ค่าใช้จ่ายหลังเกษียณ</p><button className="bg-[#243286] py-1 px-3 text-white rounded-xl" onClick={() => setCurrent(current - 2)}>แก้ไข</button></div>
        <div className=" text-black text-[0.8rem]">
          <div className="flex flex-row justify-between">
            <p>1.ค่าใช้จ่ายประจำวัน (ค่าอาหาร ค่าที่อยู่อาศัย)</p>
            <p>{convertMoney(formData.livingCosts)} บาท/เดือน</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>2.ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้าน</p>
            <p>{convertMoney(formData.houseCosts)} บาท/ปี</p></div>
          <div className="flex flex-row justify-between">
            <p>3.ค่ามือถือ อินเตอร์เน็ต</p>
            <p>{convertMoney(formData.internetCosts)} บาท/เดือน</p></div>
          <div className="flex flex-row justify-between">
            <p>4.ค่าเสื้อผ้า</p>
            <p>{convertMoney(formData.clothingCosts)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>5.ค่ารักษาพยาบาล</p>
            <p>{convertMoney(formData.medicalCosts)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>6.ค่าใช้จ่ายอื่น ๆ (ขาดได้ ไม่ใช่ปัจจัย 4)</p>
            <p>{convertMoney(formData.otherCosts)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>7.รวมค่าใช้จ่ายต่อปี</p>
            <p>{convertMoney(calculateTotalCosts(formData))} บาท</p>
          </div>
          <div className="flex flex-row justify-between ">
            <p>8.อายุตอนนี้</p>
            <p>{formData.age} ปี</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>9.อายุเกษียณ</p>
            <p>{formData.retireAge} ปี</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>10.คาดการณ์อายุขัย</p>
            <p>{formData.lifExpectancy} ปี</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>11.จำนวนปีที่ทำงานได้</p>
            <p>{calculateWorkingYears(formData)} ปี</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>12.จำนวนปีที่ต้องเตรียม</p>
            <p>{calculatePreparationYears(formData)} ปี</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>13.เงินเฟ้อ</p>
            <p>{(parseFloat(formData.inflationRate) * 100).toFixed(0)} %&nbsp;&nbsp;&nbsp;&nbsp;</p>

          </div>
          <div className="flex flex-row justify-between">
            <p>14.รวมค่าใช้จ่ายที่ต้องเตรียม</p>
            <p>{convertMoney(calculateTotalPreparation(formData))} บาท</p>
          </div>
          <div className="flex flex-row justify-between mt-2 text-[1rem] text-[#0E2B81]">
            <p>สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)</p><button className="bg-[#243286] py-1 px-3 text-white rounded-xl" onClick={() => setCurrent(current - 1)}>แก้ไข</button>

          </div>
          <div className="flex flex-row justify-between mt-1">
            <p>15.เงินฝาก</p>
            <p>{convertMoney(formData.deposit)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>16.ทุนประกันชีวิต</p>
            <p>{convertMoney(formData.insuranceFund)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>17.ทรัพย์สินอื่น ๆ</p>
            <p>{convertMoney(formData.otherAssets)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>18.รวมสิ่งที่เตรียมไว้แล้ว</p>
            <p>{convertMoney(calculateisTotalPreparationAssets(formData))} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>19.รวมที่ขาดอยู่</p>
            <p>{convertMoney(totalMissing)} บาท</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>20.ต่อปีที่ต้องเก็บได้</p>
            <p>{convertMoney(mustBeSaved)} บาท</p>
          </div>
          {/* <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
            <p>ผลลัพธ์</p>
            <p>{convertMoney(totalMissing)} บาท</p>
          </div> */}
        </div>
      </div>


    )
  }
  ]
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>

      <div className="bg-white  rounded-lg px-8 py-2 mx-4 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 ">
          <h1 className=" text-2xl font-bold text-center">{current == 0 ? "Retirement Plan" : "Retirement Plan"}</h1>
          {/* {current === 3 ? "" : <ProgressBar percent={progress.percent} current={current} />} */}
          {current === 0 && <img src={retirement} alt="" className="w-[265px] mt-5" />}

          {/* {current === 3 ? "" : <DotsComponent steps={steps} current={current} />} */}
        </div>
        <div className={`steps-content h-auto py-2   rounded-md gap-5 mb-5 w-[350px] ${current == 0 ? "" : ""}`}>
          <p className="text-xl mb-3">
            {steps[current].title && (
              <StepTitle
                title={steps[current].title}
                ModalTitle={steps[current].ModalTitle}
                imageUrl={steps[current].imageUrl || ""}
                ModalBody={steps[current].ModalBody || ""}
              />
            )}
          </p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">

            {current === 0 && (
              <Button
                onClick={() => letMeback()}
                className="bg-white rounded-full w-[120px] font-sans"
              >
                ย้อนกลับ
              </Button>
            )}

            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px] font-sans`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <><Button type="primary" onClick={() => next()} disabled={handleDisabled()} className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"} font-sans`}>
                ถัดไป
              </Button>
              </>
            )}
            {current === steps.length - 1 && (
              <Button
                disabled={handleDisabled()}
                onClick={() => handleSave()}
                className="bg-[#003781] rounded-full w-[120px] text-white font-sans"
              >
                ถัดไป
              </Button>
            )}
          </div>
          {/* <div className="flex flex-row justify-center items-center mb-5">
            {current > 0 && current < 3 && <img src={allImages} alt="" className="w-[200px] mt-5" />}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RetirementPlan;
