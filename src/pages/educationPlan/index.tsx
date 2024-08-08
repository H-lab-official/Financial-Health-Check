import { Button, Col, Form, Row, Select, Typography, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router";
import StepTitle from '@/components/StepTitle';
import {

  requiredScholarshipsSelector,
  yearsOfeducationSelector,
  totalPreparationAssetsSelector,
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import {
  selectedState,
  sortedSelectedState,
  currentIndexState,
  progressState,
} from "@/recoil/progressState";
import tooltip from '@/assets/images/icons/tooltip.svg'
import ProgressBar from "@/components/progressBar";
import Education from "@/assets/images/Education.png";
import Education1 from "@/assets/images/Education1.png";
import Education2 from "@/assets/images/Education2.png";
import DotsComponent from "@/components/DotsComponent";
import InflationComponent from '@/components/SelectOptions'
const { Text } = Typography;
import { nameState, nameData } from "@/recoil/nameState";
import { NavBar } from "@/components/navbar";
import { saveEducationplan } from "@/components/api/saveeducationPlan";
import EducationPlan11 from '@/assets/images/icons/EducationPlan/EducationPlan1-1.svg'
import EducationPlan12 from '@/assets/images/icons/EducationPlan/EducationPlan1-2.svg'
import EducationPlan13 from '@/assets/images/icons/EducationPlan/EducationPlan1-3.svg'
import EducationPlan14 from '@/assets/images/icons/EducationPlan/EducationPlan1-4.svg'
import EducationPlan15 from '@/assets/images/icons/EducationPlan/EducationPlan1-5.svg'
import EducationPlan16 from '@/assets/images/icons/EducationPlan/EducationPlan1-6.svg'
import EducationPlan17 from '@/assets/images/icons/EducationPlan/EducationPlan1-7.svg'
import EducationPlan18 from '@/assets/images/icons/EducationPlan/EducationPlan1-8.svg'
import EducationPlan19 from '@/assets/images/icons/EducationPlan/EducationPlan1-9.svg'
import EducationPlan110 from '@/assets/images/icons/EducationPlan/EducationPlan1-10.svg'
import EducationPlan111 from '@/assets/images/icons/EducationPlan/EducationPlan1-11.svg'
import EducationPlan21 from '@/assets/images/icons/EducationPlan/EducationPlan2-1.svg'
import EducationPlan22 from '@/assets/images/icons/EducationPlan/EducationPlan2-2.svg'
import EducationPlan23 from '@/assets/images/icons/EducationPlan/EducationPlan2-3.svg'
import EducationPlan24 from '@/assets/images/icons/EducationPlan/EducationPlan2-4.svg'
import EducationPlan25 from '@/assets/images/icons/EducationPlan/EducationPlan2-5.svg'
import EducationPlan26 from '@/assets/images/icons/EducationPlan/EducationPlan2-6.svg'
const EducationPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(educationPlanState);
  const requiredScholarships = useRecoilValue(requiredScholarshipsSelector);
  const selectedValue = useRecoilValue(selectedState);
  const yearsOfeducation = useRecoilValue(yearsOfeducationSelector);
  const totalPreparationAssets = useRecoilValue(totalPreparationAssetsSelector);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const dataname = useRecoilValue<nameData>(nameState);
  const totalMissing = useRecoilValue(totalMissingSelector);
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [levelOfeducation2, setLevelOfeducation2] = useState(formData.levelOfeducation);

  const [typeOfeducation2, setTypeOfeducation2] = useState(formData.typeOfeducation);

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    let formattedValue = value.replace(/[^\d\.]/g, "");
    if (formattedValue === "") {
      if (["deposit", "insuranceFund", "otherAssets"].includes(field)) {
        formattedValue = "0";
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formattedValue,
    }));
  };

  const handleSelectChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };



  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const showModal3 = () => {
    setIsModalOpen3(true);
  };



  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  const toFloat = (num: any) => {
    const floatValue = parseFloat(num.toString().replace(/,/g, ''));
    return floatValue;
  };

  const handleTypeOfEducationChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeOfeducation: value,
      typeOfeducation2: value,
    }));
  };

  useEffect(() => {
    if (formData.levelOfeducation !== levelOfeducation2) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        levelOfeducation2: formData.levelOfeducation,
      }));
      setLevelOfeducation2(formData.levelOfeducation);
    }
  }, [formData.levelOfeducation]);

  useEffect(() => {
    if (formData.typeOfeducation !== typeOfeducation2) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        typeOfeducation2: formData.typeOfeducation,
      }));
      setTypeOfeducation2(formData.typeOfeducation);
    }
  }, [formData.typeOfeducation]);

  useEffect(() => {

    const expensesDuringStudy = Math.floor(parseFloat(formData.typeOfeducation2) * 0.25).toString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      expensesDuringStudy,
    }));


  }, [formData.typeOfeducation]);
  console.log(formData);
  const handleyearsOfeducationChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,

    }));
  }
  let allImages;
  switch (current) {
    case 1:
      allImages = Education;
      break;
    case 2:
      allImages = Education1;
      break;
    case 0:
      allImages = Education2;
      break;
  }

  const toGoNext = () => {
    const urlMap: { [key: string]: string } = {
      1: "/protection-plan",
      2: "/health-plan",
      3: "/retirement-plan",
      4: "/education-plan",
      5: "/protection-plan",
    };

    if (sortedSelected.length === 1) {
      handleSingleSelection(urlMap);
    } else {
      handleMultipleSelections(urlMap);
    }
  };
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  const handleSingleSelection = (urlMap: { [key: string]: string }) => {
    const value = sortedSelected[0];
    if (sortedSelected.length === 1 && value !== "5") {
      navigator("/showdata");
    } else {
      if (value === "5") {
        navigateThroughSequence(urlMap);
      } else {
        navigateToValue(urlMap, value, "/showdata");
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
      navigator("/summary");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateThroughSequence = (urlMap: { [key: string]: string }) => {
    const sequence = ["1", "2", "3", "4"];

    if (currentIndex < sequence.length) {
      const currentValue = sequence[currentIndex];
      navigateToValue(urlMap, currentValue);
    } else if (currentIndex === sequence.length) {
      navigator("/summary");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateToValue = (
    urlMap: { [key: string]: string },
    value: string,
    finalDestination: string = "/summary"
  ) => {
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

  const nextlast = async () => {
    let newPercent = progress.percent;
    newPercent += 3;
    setProgress({ percent: newPercent, steps: progress.steps });
    await handleSave();
    toGoNext();
  };

  const letMeback = async () => {
    toGoBack();
  };

  const toGoBack = () => {
    const urlMap: { [key: string]: { path: string; state: { current: number } } } = {
      1: { path: "/protection-plan", state: { current: 3 } },
      2: { path: "/health-plan", state: { current: 3 } },
      3: { path: "/retirement-plan", state: { current: 2 } },
      4: { path: "/education-plan", state: { current: 2 } },
      5: { path: "/protection-plan", state: { current: 3 } },
    };

    if (sortedSelected.length === 1) {
      handleSingleBack(urlMap);
    } else {
      handleMultipleBack(urlMap);
    }
  };

  const handleSingleBack = (urlMap: { [key: string]: { path: string; state: { current: number } } }) => {
    const value = sortedSelected[0];
    if (sortedSelected.length === 1 && value !== "5") {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } });
    } else {
      if (value === "5") {
        navigateThroughBackSequence(urlMap);
      } else {
        navigateBackToValue(urlMap, value);
      }
    }
  };

  const handleMultipleBack = (urlMap: { [key: string]: { path: string; state: { current: number } } }) => {
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

  const navigateThroughBackSequence = (urlMap: { [key: string]: { path: string; state: { current: number } } }) => {
    const sequence = ["1", "2", "3", "4"];

    if (currentIndex > 0) {
      const previousValue = sequence[currentIndex - 1];
      navigateBackToValue(urlMap, previousValue);
    } else {
      navigator("/"); // Redirect to initial page if at the beginning
      setCurrentIndex(0);
    }
  };

  const navigateBackToValue = (
    urlMap: { [key: string]: { path: string; state: { current: number } } },
    value: string
  ) => {
    if (urlMap[value]) {
      navigator(urlMap[value].path, { state: urlMap[value].state });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSave = async () => {
    const missingTotal = convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))

    // ดึงค่าเดิมจาก localStorage
    const currentData = JSON.parse(localStorage.getItem('beforeImport') || '{}');

    // อัปเดตค่าใหม่เข้าไปใน currentData
    currentData.missingTotal = missingTotal;


    // Save the updated data to localStorage with the key 'beforeImport'
    localStorage.setItem('beforeImport', JSON.stringify(currentData));
    await saveEducationplan({ data: formData, nameData: dataname });
  };

  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.child ||
        !formData.inflationRate
      );
    } else if (current === 2) {
      return !formData.deposit || !formData.insuranceFund || !formData.otherAssets;
    }
  };

  const info = () => {
    Modal.info({
      title: "หมายเหตุ",
      content: (
        <div>
          <p>ปริญญาตรี เรียนจบอายุ 23 ปี</p>
          <p>ปริญญาโท เรียนจบอายุ 25 ปี</p>
          <p>ปริญญาเอก เรียนจบอายุ 29 ปี</p>
        </div>
      ),
      onOk() { },
    });
  };

  const renderTotalMissingMessage = () => {
    if (parseFloat(requiredScholarships) < parseFloat(totalPreparationAssets)) {
      return "คุณไม่ต้องเตรียมค่าใช้จ่ายในส่วนนี้";
    } else {
      return totalMissing;
    }
  };

  let TotalPreparationAssets = convertMoney(calculateTotalPreparationAssets(formData));
  let yearsOfeducationFrontCount = parseInt(formData.levelOfeducation2) - (parseInt(formData.child) - 4);
  const expensesDuringStudy = parseFloat(formData.expensesDuringStudy) || 0;
  const typeOfEducation = parseFloat(formData.typeOfeducation2) || 0;
  const inflationRate = parseFloat(formData.inflationRate) || 0;



  let RequiredScholarships = (typeOfEducation + expensesDuringStudy) *
    ((1 - Math.pow(1 + inflationRate, yearsOfeducationFrontCount)) /
      (1 - (1 + inflationRate)));

  const steps = [
    {
      title: "",
      content: (
        <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
          {/* <h1 className=" font-bold">Education Plan</h1> */}
          <h1 className=" text-center">
            แผนการเก็บออม <br />
            เพื่อค่าเล่าเรียนบุตร
            <br />
          </h1>
        </div>
      ),
    },
    {
      title: "วางแผนเพื่อการศึกษาบุตร",
      ModalTitle: "วางแผนเพื่อการศึกษาบุตร",
      imageUrl: EducationPlan11,
      ModalBody: "การเตรียมตัวและวางแผนทางการเงินล่วงหน้า เพื่อให้บุตรหลานได้รับการศึกษาที่ดีที่สุด ไม่ว่าจะเป็นการศึกษาในระดับใดก็ตาม ",
      content: (
        <div>


          <InputField
            label="1.อายุปัจจุบันของบุตร"
            value={formData.child}
            onChange={handleInputChange("child")}
            addonAfter="ปี"
            placeholder="กรุณากรอกข้อมูล"
            imgUrl={EducationPlan12}
            ModalBody="-"
            ModalTitle="-"
          />

          <InflationComponent
            iconsImg={EducationPlan13}
            title="2.ระดับการศึกษาสูงสุด"
            textModal="ระดับการศึกษาสูงสุดที่ผู้ปกครองตั้งเป้าหมายให้บุตรหลานของตนศึกษาถึง เช่น มัธยมศึกษาตอนปลาย ปริญญาตรี โท หรือเอก"
            defaultValue={formData.levelOfeducation}
            onChange={handleInputChange("levelOfeducation")}
            options={[
              { value: "19", label: "ปริญญาตรี" },
              { value: "21", label: "ปริญญาโท" },
              { value: "25", label: "ปริญญาเอก" },
            ]}
          />

          <InputField
            label={<>3.จำนวนปีสำหรับการศึกษาบุตรทั้งหมด<br />(นับจากเริ่มเข้าอนุบาล)</>}
            value={formData.levelOfeducation2}
            onChange={handleInputChange('levelOfeducation2')}
            addonAfter="ปี"
            placeholder=""
            readOnly
            imgUrl={EducationPlan14}
            ModalBody="-"
            ModalTitle="-"
          />
          <InputField
            label="4.จำนวนปีการศึกษาที่จะต้องส่งบุตรเรียน"
            value={yearsOfeducation || ""}
            onChange={handleInputChange('yearsOfeducation2')}
            addonAfter="ปี"
            placeholder=""
            imgUrl={EducationPlan15}
            ModalBody="ระยะเวลาทั้งหมดที่ผู้ปกครองตั้งใจจะส่งลูกเรียน ตั้งแต่เข้าเรียนระดับแรกจนถึงระดับสูงสุดที่วางแผนไว้"
            ModalTitle="4.จำนวนปีการศึกษาที่จะต้องส่งบุตรเรียน"
          />

          <InflationComponent
            iconsImg={EducationPlan16}
            title="5.ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง"
            textModal="-"
            defaultValue={formData.typeOfeducation}
            onChange={handleTypeOfEducationChange}
            options={[
              { value: "30000", label: "รัฐบาล" },
              { value: "90000", label: "เอกชน" },
              { value: "700000", label: "อินเตอร์" },
              { value: "1200000", label: "เรียนต่อต่างประเทศ" },
            ]}
          />

          <div className="flex flex-row justify-start items-center -ml-[1px] mb-2 gap-8">
            <div className="flex flex-row justify-center items-center gap-5">
              <img src={EducationPlan17} alt="" className="w-8" />
              <h1 className="text-xl mb-3">ทุนการศึกษาที่จำเป็น&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
            </div>
            <img src={tooltip} alt="tooltip" onClick={showModal} className="cursor-pointer" />
            <Modal
              title={<div className="custom-modal-title font-sans">ทุนการศึกษาที่จำเป็น</div>}
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
              <div className="custom-modal-body font-sans">เงินทุนที่จำเป็นต่อการศึกษาของบุคคลหนึ่ง เพื่อให้สามารถเรียนต่อได้จนจบตามเป้าหมายที่ตั้งไว้</div>
            </Modal>

          </div>         

          <InputField
            label="6.ค่าเล่าเรียน"
            value={formData.typeOfeducation2}
            onChange={handleInputChange("typeOfeducation2")}
            addonAfter="บาท/ปี"
            placeholder=""
            imgUrl={EducationPlan18}
            ModalBody="เงินที่ต้องชำระให้กับสถาบันการศึกษาเพื่อแลกกับการได้รับความรู้และการศึกษาในระดับต่างๆ"
            ModalTitle="6.ค่าเล่าเรียน"
          />
          <InputField
            label="7.ค่าใช้จ่ายระหว่างศึกษา"
            value={formData.expensesDuringStudy}
            onChange={handleInputChange("expensesDuringStudy")}
            addonAfter="บาท/ปี"
            placeholder=""
            imgUrl={EducationPlan19}
            ModalBody="เงินที่ต้องใช้จ่ายนอกเหนือจากค่าเล่าเรียนที่สถาบันการศึกษาเรียกเก็บ ซึ่งรวมถึงค่าใช้จ่ายที่จำเป็นสำหรับการศึกษาและการดำรงชีวิตในระหว่างที่กำลังศึกษาอยู่"
            ModalTitle="7.ค่าใช้จ่ายระหว่างการศึกษา"
          />
          <InflationComponent
            iconsImg={EducationPlan110}
            title="8.อัตราการเฟ้อของค่าเทอมต่อปี"
            textModal="อัตราที่ค่าเทอมของสถาบันการศึกษาต่างๆ เพิ่มขึ้นเฉลี่ยในแต่ละปี คล้ายๆ กับอัตราเงินเฟ้อทั่วไปที่ราคาสินค้าและบริการต่างๆ เพิ่มขึ้น"
            defaultValue={formData.inflationRate}
            onChange={handleSelectChange("inflationRate")}
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
            label="9.รวมทุนการศึกษาที่จำเป็น"
            value={requiredScholarships}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={EducationPlan111}
            ModalBody="การรวมเอาค่าใช้จ่ายทั้งหมดที่เกี่ยวข้องกับการศึกษา ไม่ว่าจะเป็นค่าเล่าเรียน ค่าอุปกรณ์การเรียน ค่าที่พัก ค่าอาหาร และค่าใช้จ่ายส่วนตัวอื่นๆ เข้าด้วยกัน เพื่อให้ได้ภาพรวมของจำนวนเงินทั้งหมดที่จำเป็นสำหรับการศึกษาในช่วงเวลาหนึ่งๆ"
            ModalTitle="9.รวมทุนการศึกษาที่จำเป็น"
          />
        </div>
      ),
    },
    {
      title: "สิ่งที่เตรียมไว้แล้ว",
      ModalTitle: "สิ่งที่เตรียมไว้แล้ว",
      imageUrl: EducationPlan21,
      ModalBody: "ทรัพย์สิน หรืออะไรก็ตามที่เราได้จัดเตรียมหรือเตรียมการไว้ล่วงหน้า ",
      content: (
        <div>
          <InputField
            label="10.เงินฝาก"
            value={formData.deposit}
            onChange={handleInputChange("deposit")}
            placeholder="กรุณากรอกข้อมูล"
            addonAfter="บาท"
            imgUrl={EducationPlan22}
            ModalBody="การออมเงินหรือลงทุนเงินก้อนหนึ่งไว้ เพื่อเตรียมไว้สำหรับค่าใช้จ่ายในการศึกษาของบุตรหลานในอนาคต"
            ModalTitle="10.เงินฝาก"
          />

          <InputField
            label="11.ทุนประกันชีวิต"
            value={formData.insuranceFund}
            onChange={handleInputChange("insuranceFund")}
            placeholder="กรุณากรอกข้อมูล"
            addonAfter="บาท"
            imgUrl={EducationPlan23}
            ModalBody="สัญญาประกันชีวิตหรือประกันอื่นๆ ที่ถึงระยะเวลาสิ้นสุดตามที่ระบุไว้ในกรมธรรม์ฉบับนั้นๆ กล่าวคือ เมื่อถึงวันที่กำหนดไว้ในกรมธรรม์ สัญญานั้นจะสิ้นสุดลง และบริษัทประกันจะดำเนินการตามเงื่อนไขที่ระบุไว้ในกรมธรรม์"
            ModalTitle="11.ทุนประกันชีวิต"
          />
          <InputField
            label="12.ทรัพย์สินอื่นๆ"
            value={formData.otherAssets}
            onChange={handleInputChange("otherAssets")}
            placeholder="กรุณากรอกข้อมูล"
            addonAfter="บาท"
            imgUrl={EducationPlan24}
            ModalBody="สิ่งของหรือวัตถุ ที่มีรูปร่างและไม่มีรูปร่าง ที่มีมูลค่าทางเศรษฐกิจ เช่น ที่ดิน ลิขสิทธิ์"
            ModalTitle="12.ทรัพย์สินอื่นๆ"
          />
          <InputField
            label="13.รวมทุนการศึกษาที่เตรียมไว้แล้ว"
            value={totalPreparationAssets}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={EducationPlan25}
            ModalBody="การคำนวณและวางแผนค่าใช้จ่ายในการศึกษาทั้งหมด รวมถึงแหล่งเงินทุนต่างๆ ที่จะนำมาใช้ในการศึกษา"
            ModalTitle="13.รวมทุนการศึกษาที่เตรียมไว้แล้ว"
          />

          <InputField
            label="14.รวมที่ขาดอยู่"
            value={renderTotalMissingMessage()}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={EducationPlan26}
            ModalBody="การรวมสิ่งของหรือทรัพย์สินทั้งหมดที่เราขาดอยู่ เพื่อให้เห็นภาพรวมของสิ่งที่เราขาดอยูทั้งหมด"
            ModalTitle="14.รวมที่ขาดอยู่"
          />
        </div>
      ),
    },
    {
      title: "สรุปผล",
      content: (
        <div className="  rounded-lg   mb-5">
          <div className="text-[1rem] mb-3 flex flex-row justify-between items-center"><p>วางแผนเพื่อการศึกษาบุตร</p> <button className="bg-[#243286] py-1 px-3 text-white rounded-xl h-8" onClick={() => setCurrent(current - 2)}>แก้ไข</button></div>
          <div className=" text-black text-[0.8rem]">
            <div className="flex flex-row justify-between">
              <p>1. อายุของบุตร</p>
              <p>{convertMoney(formData.child)} ปี</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>2. ระดับการศึกษาที่คาดหวัง</p>
              <p>{[
                { value: "19", label: "ปริญญาตรี" },
                { value: "21", label: "ปริญญาโท" },
                { value: "25", label: "ปริญญาเอก" },
              ]
                .filter(
                  (obj) => obj.value === formData.levelOfeducation
                )
                .map((obj) => obj.label)
                .join(",")}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>3. จำนวนปีสำหรับการศึกษาลูกทั้งหมด</p>
              <p>{convertMoney(formData.levelOfeducation2)} ปี</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>4. จำนวนปีการศึกษาที่เหลือที่ต้องส่ง</p>
              <p>{yearsOfeducationFrontCount} ปี</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p>5. ลักษณะโรงเรียน หรือ <br /> หลักสูตรที่คาดหวัง</p>
              <p>{[
                { value: "30000", label: "รัฐบาล" },
                { value: "90000", label: "เอกชน" },
                { value: "700000", label: "อินเตอร์" },
                { value: "1200000", label: "เรียนต่อต่างประเทศ" },
              ]
                .filter(
                  (obj) => obj.value === formData.typeOfeducation
                )
                .map((obj) => obj.label)
                .join(",")}</p></div>
            <div className="flex flex-row justify-between items-center my-2 text-[1rem] text-[#0E2B81]">
              <p>ทุนการศึกษาที่จำเป็น</p>
              {/* <button className="bg-[#243286] py-1 px-3 text-white rounded-xl h-8" onClick={() => setCurrent(current - 1)}>แก้ไข</button> */}
            </div>
            <div className="flex flex-row justify-between">
              <p>6. ค่าเล่าเรียน</p>
              <p>{convertMoney(formData.typeOfeducation)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>7. ค่าใช้จ่ายระหว่างศึกษา</p>
              <p>{convertMoney(formData.expensesDuringStudy)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>8. อัตราการเฟ้อของค่าเทอมต่อปี</p>
              <p>{(parseFloat(formData.inflationRate) * 100).toFixed(0)} %&nbsp;&nbsp;&nbsp;&nbsp;</p>

            </div>
            <div className="flex flex-row justify-between">
              <p>9. รวมทุนการศึกษาที่จำเป็น</p>
              <p>{convertMoney(RequiredScholarships)} บาท</p>
            </div>
            <div className="flex flex-row justify-between items-center my-2 text-[1rem] text-[#0E2B81]">
              <p>สิ่งที่เตรียมไว้แล้ว</p><button className="bg-[#243286] py-1 px-3 text-white rounded-xl h-8" onClick={() => setCurrent(current - 1)}>แก้ไข</button>
            </div>
            <div className="flex flex-row justify-between">
              <p>10. เงินฝาก</p>
              <p>{convertMoney(formData.deposit)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>11.กรมธรรม์ที่ครบกำหนด</p>
              <p>{convertMoney(formData.insuranceFund)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>12. อื่นๆ</p>
              <p>{convertMoney(formData.otherAssets)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>13. รวมทุนการศึกษาที่เตรียมไว้แล้ว</p>
              <p>{TotalPreparationAssets} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>14. รวมที่ขาดอยู่</p>
              <p>{convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))} บาท</p>
            </div>
            <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))} บาท</p>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40">
        <NavBar />
      </div>

      <div className="bg-white rounded-lg px-8 py-2 mx-4 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 ">
          <h1 className=" text-2xl font-bold text-center">
            {current == 0 ? "Education Plan" : "Education Plan"}{" "}
          </h1>
          {/* {current === 3 ? "" : <ProgressBar percent={progress.percent} current={current} />} */}
          {current === 0 && <img src={Education} alt="" className="w-[265px] mt-5" />}
          {/* {current === 3 ? "" : <DotsComponent steps={steps} current={current} />} */}
        </div>
        <div
          className={`steps-content h-auto py-2   rounded-md gap-5 mb-5 w-[350px] ${current == 0 ? "" : ""
            }`}
        >
          <p className="text-xl mb-3"> {steps[current].title && (
            <StepTitle
              title={steps[current].title}
              ModalTitle={steps[current].ModalTitle}
              imageUrl={steps[current].imageUrl || ""}
              ModalBody={steps[current].ModalBody || ""}
            />
          )}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
            {current === 0 && (
              <Button onClick={() => letMeback()} className="bg-white rounded-full w-[120px] font-sans">
                ย้อนกลับ
              </Button>
            )}
            {current > 0 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px] font-sans`}>
                ย้อนกลับ
              </Button>
            )}
            {current < steps.length - 1 && (
              <>
                <Button
                  type="primary"
                  onClick={() => next()}
                  disabled={handleDisabled()}
                  className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"} font-sans`}
                >
                  ถัดไป
                </Button>
              </>
            )}

            {current === steps.length - 1 && (
              <Button
                disabled={handleDisabled()}
                onClick={nextlast}
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

export default EducationPlan;
