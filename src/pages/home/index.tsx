import { Row, Button, Flex, Spin,Input } from "antd";

import React, { useState, useEffect } from "react";
import LabelImages from '@/components/LabelImages'
import { useNavigate, useLocation } from "react-router";
import homeTop from '@/assets/images/homeTop.png'
import namePic from '@/assets/images/Frame.svg'
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { nameState } from "@/recoil/nameState";
import { selectedState, sortedSelectedState, currentIndexState } from '@/recoil/progressState';
import { NavBar } from "@/components/navbar";
import { useLocalStorage } from '@/components/localStoreage';
import EducationPlanActive from '@/assets/images/imagesButton/EducationPlanActive.svg'
import EducationPlanNormal from '@/assets/images/imagesButton/EducationPlanNormal.svg'
import EducationPlanHover from '@/assets/images/imagesButton/EducationPlanHover.svg'
import FHCAllPlanActive from '@/assets/images/imagesButton/FHCAllPlanActive.svg'
import FHCAllPlanHover from '@/assets/images/imagesButton/FHCAllPlanHover.svg'
import FHCAllPlanNormal from '@/assets/images/imagesButton/FHCAllPlanNormal.svg'
import HealthPlanActive from '@/assets/images/imagesButton/HealthPlanActive.svg'
import HealthPlanHover from '@/assets/images/imagesButton/HealthPlanHover.svg'
import HealthPlanNormal from '@/assets/images/imagesButton/HealthPlanNormal.svg'
import ProtectionPlanActive from '@/assets/images/imagesButton/ProtectionPlanActive.svg'
import ProtectionPlanHover from '@/assets/images/imagesButton/ProtectionPlanHover.svg'
import ProtectionPlanNormal from '@/assets/images/imagesButton/ProtectionPlanNormal.svg'
import RetirementPlanActive from '@/assets/images/imagesButton/RetirementPlanActive.svg'
import RetirementPlanHover from '@/assets/images/imagesButton/RetirementPlanHover.svg'
import RetirementPlanNormal from '@/assets/images/imagesButton/RetirementPlanNormal.svg'
import Man from '@/assets/images/Male.svg'
import Women from '@/assets/images/Female.svg'
import LoadingPage from '@/components/loadingPage'
import '@/components/css/loading.css'
const HomePage: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { loadData } = useLocalStorage();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const [formData, setFormData] = useRecoilState(nameState)
  const [name, setName] = useRecoilState(nameState);
  const [selectedValue, setSelectedValue] = useRecoilState(selectedState);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleInputChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    };
  const handleClickChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
      setSelectedGender(value);
    };
  const next = () => {
    setCurrent(current + 1);
  };
  const beforeNext = async () => {
    loadData()
    setCurrent(current + 1);
  }
  const prev = () => {
    setCurrent(current - 1);
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

    if (value === '5') {
      navigateThroughSequence(urlMap);
    } else {
      navigateToValue(urlMap, value, '/report');
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
    logSelectionToDB(selectedValue, name.user_params);
  };

  const checkUsers = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const userParams = searchParams.get('user_params');

      if (!userParams) {
        navigator('/error');
        return;
      }

      const userFromServer = await axios.get(`https://azayagencyjourney.com/api/verify_account/${userParams}`);
      const data = userFromServer.data;
      console.log(data);

      if (data.message !== "User found.") {
        navigator('/error');
        return;
      }

      setName((prevName) => ({
        ...prevName,
        user_params: userParams,
      }));
    } catch (error) {
      navigator('/error');
    }
  };
  const clearStorage = () => {
    localStorage.clear();
    console.log('All localStorage items have been removed');
  };
  useEffect(() => {
    clearStorage()
    setTimeout(() => {
      checkUsers()

      setIsLoading(false)

    }, 1500)
  }, []);
 
  const logSelectionToDB = async (selectedPlans: any, userParams: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_params: userParams,
          selectedPlans: selectedPlans,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log selection');
      }

      const data = await response.json();
      console.log('Log saved:', data);
    } catch (error) {
      console.error('Error logging selection:', error);
    }
  };
  const handleOptionChange = async (value: string) => {
    setSelectedValue((prevSelected) => {
      let updatedSelected: any;
  
      if (value === '5') {
        if (prevSelected.includes('5')) {
          updatedSelected = [];
        } else {
          updatedSelected = ['1', '2', '3', '4'];
        }
      } else {
        if (prevSelected.includes('5')) {
          updatedSelected = [value];
        } else {
          if (prevSelected.length === 4 && ['1', '2', '3', '4'].every(v => prevSelected.includes(v))) {
            updatedSelected = [value];
          } else {
            if (prevSelected.includes(value)) {
              updatedSelected = prevSelected.filter((item) => item !== value);
            } else {
              updatedSelected = [...prevSelected, value];
            }
          }
        }
      }
      return updatedSelected;
    });
  };
  


  const steps = [{
    title: "การตรวจสอบสุขภาพทางการเงิน",
    content: (
      <div className="flex flex-col font-sans w-full">

        <p className="text-[#243286] text-center font-bold text-[1.5rem] font-sans">
          Financial Health Check
        </p>
        <p className="text-[#243286] text-center text-[1.2rem] mb-3 font-sans">การตรวจสอบสุขภาพทางการเงิน</p>

        <p className="mb-3 text-[#243286] font-sans text-[0.85rem]">
          &nbsp;&nbsp;&nbsp;&nbsp;การตรวจสอบสุขภาพทางการเงินคือการประเมินสถานะทางการเงินของคุณ เพื่อช่วยให้คุณเห็นภาพรวมของการจัดการเงินส่วนบุคคล และระบุจุดที่ต้องปรับปรุง
        </p>
        <div className="font-sans text-[#243286] text-[0.85rem]">

          <li>การวางแผนการเงิน  ช่วยในการวางแผนการเงินระยะสั้นและระยะยาว</li>
          <li>การจัดการหนี้สิน  เห็นภาพรวมของหนี้สินและวางแผนการชำระหนี้ได้ดีขึ้น</li>
          <li>การประหยัดและการลงทุน  วางแผนการออมและการลงทุนเพื่ออนาคตได้มีประสิทธิภาพ</li>
          <li>การเพิ่มความมั่นคงทางการเงิน  ทำให้มีความมั่นคงทางการเงินมากขึ้นและลดความเสี่ยงทางการเงิน</li>

        </div>
      </div>


    )
  }, {
    title: "",
    content: (
      <div className="flex flex-col tracking-normal leading-tight">
        <div>
          <p className="text-2xl my-4 text-center font-bold">กรุณากรอกข้อมูลของคุณ</p>
        </div>
        <label htmlFor="nickname" className="pl-5 my-3 text-gray-500 font-bold">ชื่อเล่น</label>
        <Input
          value={formData.nickname || ""}
          name="nickname"
          placeholder="กรุณากรอกชื่อของคุณ"
          onChange={(e) => handleInputChange("nickname")(e)}
          className="bg-slate-200 rounded-full border border-gray-600 h-12 pl-5 text-[#0E2B81] text-base mb-3 font-sans"
          pattern="[a-zA-Z0-9ก-๙]{1,50}"
          title="ชื่อเล่นต้องประกอบด้วยตัวอักษรภาษาอังกฤษ ตัวเลข หรืออักขระภาษาไทย และมีความยาวไม่เกิน 50 ตัวอักษร"
          required
        />
        <div>
          <label htmlFor="age" className="pl-5 my-4 text-gray-500 font-bold">อายุ</label>
          <Input
            type="number"
            value={formData.age || ""}
            name="age"
            inputMode="numeric" // Ensure the numeric keyboard is displayed
            pattern="[0-9]*" 
            placeholder="กรุณากรอกอายุของคุณ"
            onChange={(e) => handleInputChange("age")(e)}
            className="bg-slate-200 rounded-full border w-full border-gray-600 h-12 pl-5 mt-2 text-[#0E2B81] text-base mb-5 font-sans"
            min="0"
            max="3"
            required
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-5 font-sans mt-5">
          <div className="flex flex-col justify-center items-center gap-2" onClick={() => handleClickChange('gender')('Man')}>
            <img src={Man} alt="manOrWomen" className={`cursor-pointer rounded-full w-20 ${selectedGender === 'Man' ? 'border-[#050C9C] border-4' : ''}`} />
            <p className={` py-2 px-5 text-white rounded-full  ${selectedGender === 'Man' ? 'bg-[#050C9C]' : 'bg-[#7e80a1]'}`}>MALE</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2" onClick={() => handleClickChange('gender')('Women')}>
            <img src={Women} alt="manOrWomen" className={`cursor-pointer rounded-full w-20 ${selectedGender === 'Women' ? 'border-[#050C9C] border-4' : ''}`} />
            <p className={`bg-[#050C9C] py-2 px-5 text-white rounded-full ${selectedGender === 'Women' ? 'bg-[#050C9C]' : 'bg-[#7e80a1]'}`}>FEMALE</p>
          </div>


        </div>
      </div>
    )
  }, {
    title: "เลือกแผนที่คุณต้องการ",
    content: (
      <div className="flex flex-col">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <LabelImages
            selectedValue={sortedSelected}
            handleOptionChange={handleOptionChange}
            normalImage={FHCAllPlanNormal}
            hoverImage={FHCAllPlanHover}
            activeImage={FHCAllPlanActive}
            selectedImage={FHCAllPlanActive}
            value="5"
            width="280px"
            height="80px"
          />
          <LabelImages
            selectedValue={sortedSelected}
            handleOptionChange={handleOptionChange}
            normalImage={ProtectionPlanNormal}
            hoverImage={ProtectionPlanHover}
            activeImage={ProtectionPlanActive}
            selectedImage={ProtectionPlanActive}
            value="1"
            width="280px"
            height="80px"
          />
          <LabelImages
            selectedValue={sortedSelected}
            handleOptionChange={handleOptionChange}
            normalImage={HealthPlanNormal}
            hoverImage={HealthPlanHover}
            activeImage={HealthPlanActive}
            selectedImage={HealthPlanActive}
            value="2"
            width="280px"
            height="80px"
          />
          <LabelImages
            selectedValue={sortedSelected}
            handleOptionChange={handleOptionChange}
            normalImage={RetirementPlanNormal}
            hoverImage={RetirementPlanHover}
            activeImage={RetirementPlanActive}
            selectedImage={RetirementPlanActive}
            value="3"
            width="280px"
            height="80px"
          />
          <LabelImages
            selectedValue={sortedSelected}
            handleOptionChange={handleOptionChange}
            normalImage={EducationPlanNormal}
            hoverImage={EducationPlanHover}
            activeImage={EducationPlanActive}
            selectedImage={EducationPlanActive}
            value="4"
            width="280px"
            height="80px"
          />
        </div>
      </div>
    )
  }]


  return (
    isLoading ? <><LoadingPage /></> :
      <div className="flex flex-col justify-center items-center text-[#0E2B81]">
        <div className=" fixed top-0 z-40 "><NavBar /></div>


        <div className={`bg-white   px-6  mx-6 mb-2 mt-10 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ${current===0&&"mt-16"}`}>

          <Row align={"middle"} justify={"center"}>
            {current == 0 ? <img src={homeTop} alt="" className={`rounded-xl w-56`} height={80} /> : null}
          </Row>
          <div className="steps-content h-auto p-2 rounded-md gap-5 mb-5 w-[350px]">
            <p className={`text-2xl mb-2 text-center font-bold ${current === 0 ? "hidden" : ""}`}>{steps[current].title}</p>
            {steps[current].content}

            <div className="steps-action h-20 flex flex-row justify-center items-center">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => beforeNext()} disabled={!formData.nickname || !formData.age} className={`bg-[#003781] font-sans rounded-full ${!formData.nickname || !formData.age ? "bg-[#E6E6E6] w-full h-10" : "w-full h-10"} ${current === 0 ? "hidden" : "w-[120px]"}`}>
                  ถัดไป
                </Button>
              )}
              {current == 0 && (<Button
                onClick={() => next()}

                className="flex items-center justify-center rounded-full p-5 bg-[#003781] text-white w-full font-sans"
              >
                เริ่มทำแบบทดสอบกัน
              </Button>)
              }

              {current == 2 && (
                <Button
                  onClick={toGoFirst}
                  className={`bg-[#003781] font-sans rounded-full text-white mt-10 ${(selectedValue.length === 0 || (selectedValue.includes('5') && selectedValue.length > 1)) ? 'bg-[#E6E6E6]' : ''} w-full h-10`}
                  disabled={selectedValue.length === 0 || (selectedValue.includes('5') && selectedValue.length > 1)}
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

export default HomePage;
