import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sumpic from "@/assets/images/sumpic.png"
import homeTop from "@/assets/images/homeTop.png"
import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education2 from "@/assets/images/Education2.png"
import download from "@/assets/images/download.png"
import sent from "@/assets/images/sent.png"
interface Data {
  id: string;
  nickname: string;
  age: string;
}

export interface DataFetchingComponentProps {
  value: string;
  sortedSelected: string[];
  current:number
}

const fetchPathMap: { [key: string]: string } = {
  '0': 'saveQuestionsState',
  '1': 'saveProtectionPlan',
  '2': 'savehealthPlan',
  '3': 'saveRetirementPlan',
  '4': 'saveEducationplan',
};

const apiPathMap: { [key: string]: string } = {
  '0': '/importance',
  '1': '/protection',
  '2': '/healthplan',
  '3': '/retirementplan',
  '4': '/educationplan',
};

interface EducationPlan extends Data {
  levelOfeducation: string;
  typeOfeducation: string;
  yearsOfeducation: string;
  inflationRate: string;
  deposit: string;
  insuranceFund: string;
  otherAssets: string;
}

interface ProtectionPlan extends Data {
  initialMonthlyExpense: string;
  numberOfYears: string;
  adjustedYearlyExpenses: string;
  inflationRate: string;
  homePayments: string;
  carPayments: string;
  otherDebts: string;
  bankDeposit: string;
  lifeInsuranceFund: string;
  otherAssets: string;
}

interface Importance extends Data {
  protectionPlanOrder: string;
  healthPlanOrder: string;
  retirementPlanOrder: string;
  educationPlanOrder: string;
}

interface HealthPlan extends Data {
  hospitals: string;
  dailyCompensationFromWelfare: string;
  treatingSeriousIllness: string;
  emergencyCosts: string;
  annualTreatment: string;
  roomFeeFromCompany: string;
  dailyCompensationFromCompany: string;
  treatingSeriousIllnessFromCompany: string;
  emergencyCostsFromCompany: string;
  annualTreatmentFromCompany: string;
}

interface RetirementPlan extends Data {
  livingCosts: string;
  houseCosts: string;
  internetCosts: string;
  clothingCosts: string;
  medicalCosts: string;
  otherCosts: string;
  retireAge: string;
  lifExpectancy: string;
  inflationRate: string;
  deposit: string;
  insuranceFund: string;
  otherAssets: string;
}

function isImportance(data: Data): data is Importance {
  return (data as Importance).protectionPlanOrder !== undefined;
}

function isProtectionPlan(data: Data): data is ProtectionPlan {
  return (data as ProtectionPlan).initialMonthlyExpense !== undefined;
}

function isHealthPlan(data: Data): data is HealthPlan {
  return (data as HealthPlan).hospitals !== undefined;
}

function isRetirementPlan(data: Data): data is RetirementPlan {
  return (data as RetirementPlan).livingCosts !== undefined;
}

function isEducationPlan(data: Data): data is EducationPlan {
  return (data as EducationPlan).levelOfeducation !== undefined;
}

const DataFetchingComponent: React.FC<DataFetchingComponentProps> = ({ value, sortedSelected,current }) => {
  const [data, setData] = useState<Data | null>(null);

  let allImages
  let allTitle
  switch (current) {
    case 0:
      allImages = sumpic
      allTitle = "เย้ ยินดีด้วย"
      break;
    case 1:
      allImages = homeTop
      allTitle = "Financial Health Check"
      break;
    case 2:
      allImages = protection
      allTitle = "Protection plan"
      break;
    case 3:
      allImages = health
      allTitle = "Health Plan"
      break;
    case 4:
      allImages = retirement
      allTitle = "Retirement Plan"
      break
    case 5:
      allImages = Education2
      allTitle = "Education Plan"
      break
    default:
      allImages = ""
      allTitle = "Financial  Health Check"
      break;
  }
  useEffect(() => {
    const fetchData = async () => {
      const itemKey = fetchPathMap[value];
      const storedData = localStorage.getItem(itemKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        try {
          const response = await axios.get<Data>(`${import.meta.env.VITE_API_URL}${apiPathMap[value]}/${parsedData.id}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [value]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const convertMoney = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getPlanText = (order: string) => {
    if (isImportance(data)) {
      switch (order) {
        case "1":
          return data.educationPlanOrder === "1"
            ? 'การเก็บออมเพื่อค่าเล่าเรียนบุตร'
            : data.healthPlanOrder === "1"
              ? 'การวางแผนเกี่ยวกับสุขภาพ'
              : data.protectionPlanOrder === "1"
                ? 'คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป'
                : data.retirementPlanOrder === "1"
                  ? 'การวางแผนเตรียมเงินไว้ยามเกษียณ'
                  : null;
        case "2":
          return data.educationPlanOrder === "2"
            ? 'การเก็บออมเพื่อค่าเล่าเรียนบุตร'
            : data.healthPlanOrder === "2"
              ? 'การวางแผนเกี่ยวกับสุขภาพ'
              : data.protectionPlanOrder === "2"
                ? 'คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป'
                : data.retirementPlanOrder === "2"
                  ? 'การวางแผนเตรียมเงินไว้ยามเกษียณ'
                  : null;
        case "3":
          return data.educationPlanOrder === "3"
            ? 'การเก็บออมเพื่อค่าเล่าเรียนบุตร'
            : data.healthPlanOrder === "3"
              ? 'การวางแผนเกี่ยวกับสุขภาพ'
              : data.protectionPlanOrder === "3"
                ? 'คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป'
                : data.retirementPlanOrder === "3"
                  ? 'การวางแผนเตรียมเงินไว้ยามเกษียณ'
                  : null;
        case "4":
          return data.educationPlanOrder === "4"
            ? 'การเก็บออมเพื่อค่าเล่าเรียนบุตร'
            : data.healthPlanOrder === "4"
              ? 'การวางแผนเกี่ยวกับสุขภาพ'
              : data.protectionPlanOrder === "4"
                ? 'คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป'
                : data.retirementPlanOrder === "4"
                  ? 'การวางแผนเตรียมเงินไว้ยามเกษียณ'
                  : null;
        default:
          return '';
      }
    }
    return '';
  };
  
  return (<>
    <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
      <div className="flex flex-col justify-center items-center gap-3 mb-5">
        <h1 className=" text-lg font-bold text-center">{allTitle}</h1>
        <h1 className={` text-lg font-semibold ${current == 0 ? " hidden" : ""} `}>คุณ {data.nickname}</h1>
          {current === 0 ?"": <img src={allImages} alt="" width={300} />}
      </div>
    <div className="steps-content h-auto p-2  rounded-md gap-5 mb-5 w-[375px]">
    
   
        <p className='hidden'>ID: {data.id}</p>
       
  
        {/* Render other properties based on the specific data type */}
        {value === '0' && isImportance(data) && (
          <>
           <div className="  rounded-lg p-5 shadow-lg mb-5">
           <div className="text-[1.4rem] mb-3"><p>ผลลัพธ์ โดยรวม</p></div>
           <div className=" text-black">
             <div className="flex flex-row justify-between">
               <p>ค่าใช้จ่ายในครอบครัว</p>
               {/* <p>{convertMoney(calculateCoverage(protectionPlanData))} บาท</p> */}
               <p>200000 บาท</p>
             </div>
             <div className="flex flex-row justify-between">
               <p>วางแผนเพื่อสุขภาพ</p>
               {/* <p>{convertMoney(calculateAnnualTreatments(healthPlanData))} บาท</p> */}
               <p>250000 บาท</p>
              </div>
             <div className="flex flex-row justify-between">
               <p>ค่าใช้จ่ายหลังเกษียณ</p>
               {/* <p>{convertMoney(totalMissing)} บาท</p> */}
               <p>250000 บาท</p>
              </div>
             <div className="flex flex-row justify-between">
               <p>วางแผนเพื่อการศึกษาบุตร</p>
               {/* <p>{convertMoney(educationMissing)} บาท</p> */}
               <p>2500000 บาท</p>
              </div>
           </div>
         </div>
          <div className="rounded-lg p-5 shadow-lg mb-5">
            <div className="text-[1.4rem] mb-3">
              <p>ความสำคัญที่คุณเลือกเป็นดังนี้</p>
            </div>
            <div className="text-black text-[0.9rem]">
              {getPlanText("1") && (
                <div className="flex flex-col">
                  <p className="text-red-500 font-bold">อันดับ 1</p>
                  <p>{getPlanText("1")}</p>
                </div>
              )}
              {getPlanText("2") && (
                <div className="flex flex-col">
                  <p className="text-red-500 font-bold">อันดับ 2</p>
                  <p>{getPlanText("2")}</p>
                </div>
              )}
              {getPlanText("3") && (
                <div className="flex flex-col">
                  <p className="text-red-500 font-bold">อันดับ 3</p>
                  <p>{getPlanText("3")}</p>
                </div>
              )}
              {getPlanText("4") && (
                <div className="flex flex-col">
                  <p className="text-red-500 font-bold">อันดับ 4</p>
                  <p>{getPlanText("4")}</p>
                </div>
              )}
            </div>
          </div>
          </>
        )}
      {value === '1' && isProtectionPlan(data) && (
        <>
          <p>Initial Monthly Expense: {convertMoney(data.initialMonthlyExpense)}</p>
          <p>Number of Years: {data.numberOfYears}</p>
          <p>Adjusted Yearly Expenses: {convertMoney(data.adjustedYearlyExpenses)}</p>
          <p>Inflation Rate: {data.inflationRate}</p>
          <p>Home Payments: {convertMoney(data.homePayments)}</p>
          <p>Car Payments: {convertMoney(data.carPayments)}</p>
          <p>Other Debts: {convertMoney(data.otherDebts)}</p>
          <p>Bank Deposit: {convertMoney(data.bankDeposit)}</p>
          <p>Life Insurance Fund: {convertMoney(data.lifeInsuranceFund)}</p>
          <p>Other Assets: {convertMoney(data.otherAssets)}</p>
        </>
      )}
      {value === '2' && isHealthPlan(data) && (
        <>
          <p>Hospitals: {data.hospitals}</p>
          <p>Daily Compensation From Welfare: {convertMoney(data.dailyCompensationFromWelfare)}</p>
          <p>Treating Serious Illness: {convertMoney(data.treatingSeriousIllness)}</p>
          <p>Emergency Costs: {convertMoney(data.emergencyCosts)}</p>
          <p>Annual Treatment: {convertMoney(data.annualTreatment)}</p>
          <p>Room Fee From Company: {convertMoney(data.roomFeeFromCompany)}</p>
          <p>Daily Compensation From Company: {convertMoney(data.dailyCompensationFromCompany)}</p>
          <p>Treating Serious Illness From Company: {convertMoney(data.treatingSeriousIllnessFromCompany)}</p>
          <p>Emergency Costs From Company: {convertMoney(data.emergencyCostsFromCompany)}</p>
          <p>Annual Treatment From Company: {convertMoney(data.annualTreatmentFromCompany)}</p>
        </>
      )}
      {value === '3' && isRetirementPlan(data) && (
        <>
          <p>Living Costs: {convertMoney(data.livingCosts)}</p>
          <p>House Costs: {convertMoney(data.houseCosts)}</p>
          <p>Internet Costs: {convertMoney(data.internetCosts)}</p>
          <p>Clothing Costs: {convertMoney(data.clothingCosts)}</p>
          <p>Medical Costs: {convertMoney(data.medicalCosts)}</p>
          <p>Other Costs: {convertMoney(data.otherCosts)}</p>
          <p>Retire Age: {data.retireAge}</p>
          <p>Life Expectancy: {data.lifExpectancy}</p>
          <p>Inflation Rate: {data.inflationRate}</p>
          <p>Deposit: {convertMoney(data.deposit)}</p>
          <p>Insurance Fund: {convertMoney(data.insuranceFund)}</p>
          <p>Other Assets: {convertMoney(data.otherAssets)}</p>
        </>
      )}
      {value === '4' && isEducationPlan(data) && (
        <>
          <p>Level of Education: {data.levelOfeducation}</p>
          <p>Type of Education: {data.typeOfeducation}</p>
          <p>Years of Education: {data.yearsOfeducation}</p>
          <p>Inflation Rate: {data.inflationRate}</p>
          <p>Deposit: {convertMoney(data.deposit)}</p>
          <p>Insurance Fund: {convertMoney(data.insuranceFund)}</p>
          <p>Other Assets: {convertMoney(data.otherAssets)}</p>
        </>
      )}
    </div></div>
    </>
  );
};

export default DataFetchingComponent;