import { Row, Typography, Button } from "antd";
import React, { useState,useEffect } from "react";
const { Text, Paragraph } = Typography;
import { useNavigate, useLocation } from "react-router";
import homeTop from '@/assets/images/homeTop.png'
import namePic from '@/assets/images/Frame.png'
import protection from '@/assets/images/protection.png'
import health from '@/assets/images/health.png'
import retirement from '@/assets/images/retirement.png'
import education from '@/assets/images/Education2.png'
import { useRecoilState, useRecoilValue } from "recoil";
import {  nameState } from "@/recoil/nameState";
import { selectedState ,sortedSelectedState,currentIndexState} from '@/recoil/progressState';
import { NavBar } from "@/components/navbar";
import { useLocalStorage } from '@/components/localStoreage';
const HomePage: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { loadData} = useLocalStorage();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const [formData, setFormData] = useRecoilState(nameState)
  const [name, setName] = useRecoilState(nameState);
  const [selectedValue, setSelectedValue] = useRecoilState(selectedState);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const handleInputChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    };

  const next = () => {
    setCurrent(current + 1);
  };
const beforeNext=async()=>{
  loadData()
  setCurrent(current + 1);
}
  const prev = () => {
    setCurrent(current - 1);
  };
console.log(sortedSelected);

// const toGoNext = () => {
//   const urlMap: { [key: string]: string } = {
//     '1': '/protection-plan',
//     '2': '/health-plan',
//     '3': '/retirement-plan',
//     '4': '/education-plan',
//     '5': '/protection-plan',
//   };

//   if (sortedSelected.length === 1) {
//     const value = sortedSelected[0];
//     if (value === '5') {
//       const sequence = ['1', '2', '3', '4'];
//       if (currentIndex < sequence.length) {
//         const currentValue = sequence[currentIndex];
//         if (urlMap[currentValue]) {
//           navigator(urlMap[currentValue]);
//           setCurrentIndex((prevIndex) => prevIndex + 1);
//         }
//       } else if (currentIndex === sequence.length) {
//         navigator('/summary');
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }
//     } else {
//       if (currentIndex === 0) {
//         if (urlMap[value]) {
//           navigator(urlMap[value]);
//           setCurrentIndex((prevIndex) => prevIndex + 1);
//         }
//       } else if (currentIndex === 1) {
//         navigator('/export-pdf');
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }
//     }
//   } else {
//     if (currentIndex < sortedSelected.length - 1) {
//       const value = sortedSelected[currentIndex];
//       if (urlMap[value]) {
//         navigator(urlMap[value]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }
//     } else if (currentIndex === sortedSelected.length - 1) {
//       const lastValue = sortedSelected[currentIndex];
//       if (urlMap[lastValue]) {
//         navigator(urlMap[lastValue]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       }
//     } else if (currentIndex === sortedSelected.length) {
//       navigator('/summary');
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   }
// };
// const toGoFirst = () => {
//   setCurrentIndex(0);
//   toGoNext();
// };

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
    navigateToValue(urlMap, value, '/export-pdf');
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userParams = searchParams.get('user_params');

    if (userParams) {
      setName((prevName) => ({
        ...prevName,
        user_params: userParams,
      }));
      // setCurrent(0)
    } else {
      navigator('/error'); 
    }
  }, []); 

  const handleOptionChange = (value: string) => {
    setSelectedValue((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
console.log(formData);


  const steps = [{
    title: "การตรวจสอบสุขภาพทางการเงิน",
    content: (
      <div className="flex flex-col ">

        <Text className=" text-[#243286] text-center font-bold text-[1.5rem]">
          Financial Health Check
        </Text>
        <Text className="text-[#243286] text-center text-[1.2rem] mb-3"> การตรวจสอบสุขภาพทางการเงิน</Text>

        <Text className="mb-3 text-[#243286]">
          การตรวจสอบสุขภาพทางการเงิน เป็นกระบวนการที่สำคัญในการประเมินและทำความเข้าใจสถานะทางการเงินของคุณ สามารถช่วยให้คุณเห็นภาพรวมของการจัดการเงินส่วนบุคคล และระบุจุดที่ต้องปรับปรุงเพื่อเพิ่มความมั่นคงทางการเงิน โดย
        </Text>
        <Paragraph className="text-[#243286]">


          - การวางแผนการเงิน ช่วยให้คุณสามารถวางแผนการเงินได้อย่างมีประสิทธิภาพ ทั้งในระยะสั้นและระยะยาว <br />

          - การจัดการหนี้สิน ทำให้คุณเห็นภาพรวมของหนี้สินและสามารถวางแผนการชำระหนี้ได้ดีขึ้น <br />

          - การประหยัดและการลงทุน ช่วยให้คุณสามารถวางแผนการออมและการลงทุนเพื่ออนาคตได้อย่างมีประสิทธิภาพ <br />

          - การเพิ่มความมั่นคงทางการเงิน ทำให้คุณมีความมั่นคงทางการเงินมากขึ้น ลดความเสี่ยงทางการเงิน


        </Paragraph>
      </div>
    )
  }, {
    title: "กรุณากรอกชื่อของคุณ",
    content: (
      <div className="flex flex-col ">
        <label htmlFor="nickname" className="pl-5 mb-3 text-gray-500 font-bold">ชื่อเล่น</label>
        <input
          value={formData.nickname || ""}
          name="nickname"
          placeholder="กรุณากรอกชื่อของคุณ"
          onChange={(e) => handleInputChange("nickname")(e)}
          className="bg-slate-200 rounded-full border border-gray-600 h-12 pl-5 text-[#0E2B81] text-base mb-2"
        />
        <label htmlFor="age" className="pl-5 my-3 text-gray-500 font-bold">อายุ</label>
        <input
          value={formData.age || ""}
          name="nickname"
          placeholder="กรุณากรอกอายุของคุณ"
          onChange={(e) => handleInputChange("age")(e)}
          className="bg-slate-200 rounded-full border border-gray-600 h-12 pl-5 text-[#0E2B81] text-base mb-5"
        />
      </div>
    )
  }, {
    title: "เลือกแผนที่คุณต้องการ",
    content: (
      <div className="flex flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <label className={`custom-checkbox flex justify-start items-center mb-2 py-2 pl-5 rounded-xl shadow-lg cursor-pointer h-24 w-80 ${selectedValue.includes('1') ? 'bg-[#D5D7F8]' : 'bg-[#F2F3FF] hover:bg-gray-50'}`}>
          <input
            type="checkbox"
            value="1"
            checked={selectedValue.includes('1')}
            onChange={() => handleOptionChange('1')}
            className="hidden"
          />
          <div className="flex flex-row">
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-bold">Protection Plan</span>
              <span className="text-[0.7rem] font-semibold">แผนการคุ้มครอง รายได้ให้กับครอบครัว</span>
            </div>
            <img src={protection} alt="Protection Plan" className="ml-4 w-16" />
          </div>
        </label>
        <label className={`custom-checkbox flex justify-start items-center mb-2 py-2 pl-5 rounded-xl shadow-lg cursor-pointer h-24 w-80 ${selectedValue.includes('2') ? 'bg-[#D5D7F8]' : 'bg-[#F2F3FF] hover:bg-gray-50'}`}>
          <input
            type="checkbox"
            value="2"
            checked={selectedValue.includes('2')}
            onChange={() => handleOptionChange('2')}
            className="hidden"
          />
          <div className="flex flex-row gap-11">
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-bold">Health Plan</span>
              <span className="text-[0.7rem] font-semibold">แผนการคุ้มครองเรื่องสุขภาพ</span>
            </div>
            <img src={health} alt="Health Plan" className="ml-4 w-16 mr-2" />
          </div>
        </label>
        <label className={`custom-checkbox flex justify-start items-center mb-2 py-2 pl-5 rounded-xl shadow-lg cursor-pointer h-24 w-80 ${selectedValue.includes('3') ? 'bg-[#D5D7F8]' : 'bg-[#F2F3FF] hover:bg-gray-50'}`}>
          <input
            type="checkbox"
            value="3"
            checked={selectedValue.includes('3')}
            onChange={() => handleOptionChange('3')}
            className="hidden"
          />
          <div className="flex flex-row">
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-bold">Retirement Plan</span>
              <span className="text-[0.7rem] font-semibold">แผนการคุ้มครองเรื่องการเกษียณ</span>
            </div>
            <img src={retirement} alt="Retirement Plan" className="ml-2 w-16 mr-2" />
          </div>
        </label>
        <label className={`custom-checkbox flex justify-start items-center mb-2 py-2 pl-5 rounded-xl shadow-lg cursor-pointer h-24 w-80 ${selectedValue.includes('4') ? 'bg-[#D5D7F8]' : 'bg-[#F2F3FF] hover:bg-gray-50'}`}>
          <input
            type="checkbox"
            value="4"
            checked={selectedValue.includes('4')}
            onChange={() => handleOptionChange('4')}
            className="hidden"
          />
          <div className="flex flex-row">
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-bold">Education Plan</span>
              <span className="text-[0.7rem] font-semibold">แผนการเก็บออมเพื่อค่าเล่าเรียนบุตร</span>
            </div>
            <img src={education} alt="Education Plan" className="ml-4 w-16" />
          </div>
        </label>

        <label className={`custom-checkbox flex justify-start items-center mb-2 py-2 pl-8 rounded-xl shadow-lg cursor-pointer h-24 w-80 ${selectedValue.includes('5') ? 'bg-[#D5D7F8]' : 'bg-[#F2F3FF] hover:bg-gray-100'}`}>
          <input
            type="checkbox"
            value="5"
            checked={selectedValue.includes('5')}
            onChange={() => handleOptionChange('5')}
            className="hidden"
          />
          <span className="text-[1.6rem] font-bold">เลือกทำทั้งหมด</span>
          <img src={homeTop} alt="เลือกทำทั้งหมด" className="ml-4 w-16" />
        </label>
      </div>
    </div>
    )
  }]
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
<div className=" fixed top-0 z-40"><NavBar /></div>


      <div className="bg-white shadow-md rounded-lg px-6  mx-6 mb-2 mt-12 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">

        <Row align={"middle"} justify={"center"}>
          <img src={current == 0 ? homeTop : namePic} alt="" className={`rounded-xl ${current === 1 ? "h-[300px]" : current === 2 ? "hidden" : ""} `} height={150} />
        </Row>
        <div className="steps-content h-auto p-2 rounded-md gap-5 mb-5 w-[350px]">
          <p className={`text-2xl my-2 text-center font-bold ${current === 0 ? "hidden" : ""}`}>{steps[current].title}</p>
          {steps[current].content}

          <div className="steps-action h-20 flex flex-row justify-center items-center">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={()=>beforeNext()} disabled={!formData.nickname || !formData.age} className={`bg-[#003781] rounded-full ${!formData.nickname || !formData.age ? "bg-[#E6E6E6] w-full h-10" : "w-full h-10"} ${current === 0 ? "hidden" : "w-[120px]"}`}>
                ถัดไป
              </Button>
            )}
            {current == 0 && (<Button
              onClick={() => next()}
              // onClick={() => navigator("/protection-plan")}
              className="flex items-center justify-center rounded-full p-5 bg-[#003781] text-white w-full"
            >
              เริ่มทำแบบทดสอบกัน
            </Button>)
            }
            {/* {current > 1 && (
              <Button onClick={() => prev()} className={` bg-white rounded-full w-[120px]`}>
                ย้อนกลับ
              </Button>
            )} */}
            {current == 2 && (
              <Button
              onClick={toGoFirst}
              className={`bg-[#003781] rounded-full text-white mt-10 ${(selectedValue.length===0 || (selectedValue.includes('5') && selectedValue.length > 1)) ? 'bg-[#E6E6E6]' : ''} w-full h-10`}
              disabled={selectedValue.length===0 || (selectedValue.includes('5') && selectedValue.length > 1)}
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
