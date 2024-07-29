import { Button, Col, Form, Row, Select, Typography, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router";
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
import ProgressBar from "@/components/progressBar";
import Education from "@/assets/images/Education.png";
import Education1 from "@/assets/images/Education1.png";
import Education2 from "@/assets/images/Education2.png";
import DotsComponent from "@/components/DotsComponent";
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

    const expensesDuringStudy = (parseFloat(formData.typeOfeducation2) * 0.25).toFixed(2);
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
      navigator("/report");
    } else {
      if (value === "5") {
        navigateThroughSequence(urlMap);
      } else {
        navigateToValue(urlMap, value, "/report");
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
      title: "แผนที่ 4",
      content: (
        <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
          <h1 className=" font-bold">Education Plan</h1>
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
      content: (
        <div>
          <Form.Item>
            <Row>
              <InputField
                label="1. อายุของบุตร"
                value={formData.child}
                onChange={handleInputChange("child")}
                addonAfter="ปี"
                placeholder="กรุณาใส่อายุบุตร"
                imgUrl={EducationPlan12}
                ModalBody=""
                ModalTitle=""
              />
            </Row>
            <div className="flex flex-row justify-start items-center gap-4 mb-5">
              <Col><img src={EducationPlan13} alt="icons" /></Col>
              <Col>
                <Col>
                  <Text className="text-[#243286]">{"2. ระดับการศึกษาที่คาดหวังจะส่งลูก"}</Text>
                </Col>
                <Row className="gap-4">
                  <div className="flex flex-row justify-start items-center">
                    <Select
                      style={{ width: "190px" }}
                      value={formData.levelOfeducation}
                      placeholder="กรุณาเลือก"
                      onChange={handleSelectChange('levelOfeducation')}
                      options={[
                        { value: "19", label: "ปริญญาตรี" },
                        { value: "21", label: "ปริญญาโท" },
                        { value: "25", label: "ปริญญาเอก" },
                      ]}
                    />
                  </div>
                  <Button onClick={info}>!</Button>
                </Row>
              </Col>
            </div>
            <Row className="mt-4">
              <InputField
                label="3. จำนวนปีสำหรับการศึกษาลูกทั้งหมด (นับจาก 3 ปีเริ่มเข้าอนุบาล)"
                value={formData.levelOfeducation2}
                onChange={handleInputChange('levelOfeducation2')}
                addonAfter="ปี"
                placeholder=""
                readOnly
                imgUrl={EducationPlan14}
              />
              <InputField
                label="4. จำนวนปีการศึกษาของลูกที่จะต้องส่ง"
                value={yearsOfeducation}
                onChange={handleInputChange('yearsOfeducation2')}
                addonAfter="ปี"

                placeholder=""
                imgUrl={EducationPlan15}
              />
            </Row>

            <div className="flex flex-row justify-start items-center gap-4 mb-5">
              <Col><img src={EducationPlan16} alt="icons" /></Col>
              <Col>
                <Col>
                  <Text className="text-[#243286]">{"5. ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง"}</Text>
                </Col>
                <Col>
                  <div className="flex flex-row justify-start items-center">
                    <Select
                      style={{ width: "190px" }}
                      value={formData.typeOfeducation}
                      placeholder="กรุณาเลือก"
                      onChange={handleTypeOfEducationChange}
                      options={[
                        { value: "30000.00", label: "รัฐบาล" },
                        { value: "90000.00", label: "เอกชน" },
                        { value: "700000.00", label: "อินเตอร์" },
                        { value: "1200000.00", label: "เรียนต่อต่างประเทศ" },
                      ]}
                    />
                  </div>
                </Col>
              </Col>
            </div>
          </Form.Item>

          <Row className="my-2 gap-5">
            <img src={EducationPlan17} alt="" /> <Text className="text-xl font-bold text-[#243286]">ทุนการศึกษาที่จำเป็น</Text>
          </Row>
          <InputField
            label="6. ค่าเล่าเรียน"
            value={formData.typeOfeducation2}
            onChange={handleInputChange("typeOfeducation2")}
            addonAfter="บาท/ปี"
            placeholder=""
            imgUrl={EducationPlan18}
          />
          <InputField
            label="7. ค่าใช้จ่ายระหว่างศึกษา"
            value={formData.expensesDuringStudy}
            onChange={handleInputChange("expensesDuringStudy")}
            addonAfter="บาท/ปี"
            placeholder=""
            imgUrl={EducationPlan19}
          />

          <div className="flex flex-row justify-start items-center gap-4 mb-5">
            <Col><img src={EducationPlan110} alt="icons" /></Col>
            <Col>
              <Col>
                <Text className="text-[#243286]">{"8. อัตราการเฟ้อของค่าเทอมต่อปี"}</Text>
              </Col>
              <Col>
                <div className="flex flex-row justify-start items-center gap-5 ">
                  <Select
                    style={{ width: "190px" }}
                    value={formData.inflationRate}
                    placeholder="กรุณาเลือก"
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
                </div>
              </Col>
            </Col>
          </div>
          <InputField
            label="9. รวมทุนการศึกษาที่จำเป็น"
            value={requiredScholarships}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={EducationPlan111}
          />
        </div>
      ),
    },
    {
      title: "สิ่งที่เตรียมไว้แล้ว",
      content: (
        <div>
          <InputField
            label="10. เงินฝากให้ลูกเรียนหนังสือ"
            value={formData.deposit}
            onChange={handleInputChange("deposit")}
            placeholder="กรุณากรอกจำนวนเงิน"
            addonAfter="บาท"
            imgUrl={EducationPlan22}
          />

          <InputField
            label="11. กรมธรรม์ที่ครบกำหนด"
            value={formData.insuranceFund}
            onChange={handleInputChange("insuranceFund")}
            placeholder="กรุณากรอกจำนวนเงิน"
            addonAfter="บาท"
            imgUrl={EducationPlan23}
          />
          <InputField
            label="12. อื่นๆ"
            value={formData.otherAssets}
            onChange={handleInputChange("otherAssets")}
            placeholder="กรุณากรอกจำนวนเงิน"
            addonAfter="บาท"
            imgUrl={EducationPlan24}
          />
          <InputField
            label="13. รวมทุนการศึกษาที่เตรียมไว้แล้ว"
            value={totalPreparationAssets}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={EducationPlan25}
          />

          <InputField
            label="14. รวมที่ขาดอยู่"
            value={renderTotalMissingMessage()}
            onChange={() => { }}
            readOnly
            placeholder=""
            addonAfter="บาท"
            imgUrl={EducationPlan26}
          />
        </div>
      ),
    },
    {
      title: "สรุปผล",
      content: (
        <div className="  rounded-lg p-5 shadow-lg mb-5">
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
            <div className="flex flex-row justify-between">
              <p>5. ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง</p>
              <p>{[
                { value: "30000.00", label: "รัฐบาล" },
                { value: "90000.00", label: "เอกชน" },
                { value: "700000.00", label: "อินเตอร์" },
                { value: "1200000.00", label: "เรียนต่อต่างประเทศ" },
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
              <p>{parseFloat(formData.inflationRate) * 100} %</p>
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

      <div className="bg-white rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-2xl font-bold text-center">
            {current == 0 ? "Education Plan" : "Education Plan"}{" "}
          </h1>
          {current === 3 ? "" : <ProgressBar percent={progress.percent} current={current} />}
          <img src={allImages} alt="" className="w-[265px] mt-5" />
          {current === 3 ? "" : <DotsComponent steps={steps} current={current} />}
        </div>
        <div
          className={`steps-content h-auto py-2 px-3  rounded-md gap-5 mb-5 w-[350px] ${current == 0 ? "" : "shadow-xl"
            }`}
        >
          <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title === "วางแผนเพื่อการศึกษาบุตร" ? <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={EducationPlan11} alt="" />{steps[current].title}</div> : steps[current].title === "สิ่งที่เตรียมไว้แล้ว" ? <div className="flex flex-row items-center justify-start gap-5 pl-3"><img src={EducationPlan21} alt="" />{steps[current].title}</div> : steps[current].title}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
            {current === 0 && (
              <Button onClick={() => letMeback()} className="bg-white rounded-full w-[120px]">
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
                <Button
                  type="primary"
                  onClick={() => next()}
                  disabled={handleDisabled()}
                  className={`bg-[#003781] rounded-full ${current === 0 ? "w-[120px]" : "w-[120px]"}`}
                >
                  ถัดไป
                </Button>
              </>
            )}

            {current === steps.length - 1 && (
              <Button
                disabled={handleDisabled()}
                onClick={nextlast}
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

export default EducationPlan;
