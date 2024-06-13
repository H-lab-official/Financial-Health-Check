import { Button, Col, Form, Row, Select, Typography, Progress } from "antd";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router";
import {
  educationPlanState,
  requiredScholarshipsSelector,
  totalPreparationAssetsSelector,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import ProgressBar from "@/components/progressBar";
import Education from "@/assets/images/Education.png"
import Education1 from "@/assets/images/Education1.png"
import Education2 from "@/assets/images/Education2.png"
import DotsComponent from "@/components/DotsComponent";
const { Text } = Typography;
import { nameState, nameData } from "@/recoil/nameState";
import { NavBar } from "@/components/navbar";
import { saveEducationplan } from "@/components/api/saveeducationPlan";
const EducationPlan: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(educationPlanState);
  const requiredScholarships = useRecoilValue(requiredScholarshipsSelector);
  const selectedValue = useRecoilValue(selectedState)
  const totalPreparationAssets = useRecoilValue(totalPreparationAssetsSelector);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const dataname = useRecoilValue<nameData>(nameState)
  const totalMissing = useRecoilValue(totalMissingSelector);
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
  const handleSelectChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  let allImages

  switch (current) {
    case 1:
      allImages = Education

      break;
    case 2:
      allImages = Education1

      break;
    case 0:
      allImages = Education2

      break;

  }
  console.log(selectedValue);
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
    setProgress({ percent: newPercent, steps: progress.steps })
    await handleSave()
    toGoNext()

  }
  const letMeback = async () => {
    toGoBack()
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
    console.log("currentIndex"+currentIndex);    
    if (currentIndex > 1) {
      const value = sortedSelected[currentIndex - 2];
      console.log("value"+value);      
      navigateBackToValue(urlMap, value);
    } else if (currentIndex === 1) {
      const firstValue = sortedSelected[0];
      console.log("firstValue"+firstValue);
      
      navigateBackToValue(urlMap, firstValue);
    } else if (currentIndex === 0) {
      console.log("Current index is 0");      
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
    if (urlMap[value]) {
      navigator(urlMap[value].path, { state: urlMap[value].state });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  
  const handleSave = async () => {  
      await saveEducationplan({ data: formData, nameData: dataname, })     
   
  };
  const handleDisabled = () => {
    if (current === 1) {
      return (
        !formData.levelOfeducation ||
        !formData.typeOfeducation ||
        !formData.yearsOfeducation ||
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
    title: "แผนที่ 4",
    content: (
      <div className="flex flex-col justify-center items-center text-[2rem] mb-10">
        <h1 className=" font-bold">Education Plan</h1>
        <h1 className=" text-center">แผนการเก็บออม <br />เพื่อค่าเล่าเรียนบุตร<br /></h1>

      </div>
    )
  },
  {
    title: "วางแผนเพื่อการศึกษาบุตร",
    content: (
      <div>

        <Form.Item>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"1. ระดับการศึกษาที่คาดหวัง"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '260px' }}
                  value={formData.levelOfeducation}
                  placeholder="กรุณาเลือก"
                  onChange={handleSelectChange("levelOfeducation")}
                  options={[

                    { value: "ปริญญาตรี", label: "ปริญญาตรี" },
                    { value: "ปริญญาโท", label: "ปริญญาโท" },
                    { value: "ปริญญาเอก", label: "ปริญญาเอก" },
                  ]}
                />

              </div>
            </Col>
          </Col>
        </Form.Item>

        <Form.Item>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"2. ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '260px' }}
                  value={formData.typeOfeducation}
                  placeholder="กรุณาเลือก"
                  onChange={handleSelectChange("typeOfeducation")}
                  options={[

                    { value: "107000.00", label: "รัฐบาล" },
                    { value: "214900.00", label: "เอกชน" },
                    { value: "500000.00", label: "อินเตอร์" },
                  ]}
                />

              </div>
            </Col>
          </Col>
        </Form.Item>

        <Row className="my-2 ">
          <Text className="text-xl font-bold text-[#243286]">ทุนการศึกษาที่จำเป็น</Text>
        </Row>
        <InputField
          label="3. ค่าเล่าเรียน"
          value={formData.typeOfeducation}
          onChange={() => { }}
          readOnly
          addonAfter="บาท/ปี"
          placeholder=""
        />
        <InputField
          label="4. ค่าใช้จ่ายระหว่างศึกษา"
          value={(parseFloat(formData.typeOfeducation) * 0.15).toFixed(2)}
          onChange={() => { }}
          readOnly
          addonAfter="บาท/ปี"
          placeholder=""
        />
        <InputField
          label="5. จำนวนปีการศึกษาของลูกที่จะต้องส่ง"
          value={formData.yearsOfeducation}
          onChange={handleInputChange("yearsOfeducation")}
          addonAfter="ปี"
          placeholder="กรุณากรอกจำนวนปี"
        />

        <Form.Item>
          <Col>
            <Col>
              <Text className="text-[#243286]">{"6. อัตราการเฟ้อของค่าเทอมต่อปี"}</Text>
            </Col>
            <Col>
              <div className="flex flex-row justify-start items-center gap-5 ">
                <Select
                  style={{ width: '260px' }}
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
        </Form.Item>


        <InputField
          label="7. รวมทุนการศึกษาที่จำเป็น"
          value={requiredScholarships}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="บาท"
        />

      </div>
    )
  }, {
    title: "สิ่งที่เตรียมไว้แล้ว",
    content: (
      <div>

        <InputField
          label="8. เงินฝาก"
          value={formData.deposit}
          onChange={handleInputChange("deposit")}
          placeholder="กรุณากรอกจำนวนเงิน"
          addonAfter="บาท"
        />

        <InputField
          label="9. กรมธรรม์ที่ครบกำหนด"
          value={formData.insuranceFund}
          onChange={handleInputChange("insuranceFund")}
          placeholder="กรุณากรอกจำนวนเงิน"
          addonAfter="บาท"
        />
        <InputField
          label="10. อื่นๆ"
          value={formData.otherAssets}
          onChange={handleInputChange("otherAssets")}
          placeholder="กรุณากรอกจำนวนเงิน"
          addonAfter="บาท"
        />
        <InputField
          label="11. รวมทุนการศึกษาที่เตรียมไว้แล้ว"
          value={totalPreparationAssets}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="บาท"
        />

        <InputField
          label="13. รวมที่ขาดอยู่"
          value={totalMissing}
          onChange={() => { }}
          readOnly
          placeholder=""
          addonAfter="บาท"
        />

      </div>
    )
  }
  ]
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className=" fixed top-0 z-40"><NavBar /></div>

      <div className="bg-white rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <h1 className=" text-2xl font-bold text-center">{current == 0 ? "Education Plan" : "Education Plan"} </h1>
          <ProgressBar percent={progress.percent} current={current} />
          <img src={allImages} alt="" className="w-[265px] mt-5" />
          <DotsComponent steps={steps} current={current} />
        </div>
        <div className={`steps-content h-auto py-2 px-3  rounded-md gap-5 mb-5 w-[350px] ${current==0?"":"shadow-xl"}`}>
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
