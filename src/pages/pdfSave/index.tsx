import React, { useState } from "react";
import {
  calculateRequiredScholarships,
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import {
  calculateAdditionalRoomFee,
  calculateAnnualTreatments,
  calculateDailyCompensation,
  calculateEmergencyCosts,
  calculateTreatingSeriousIllness,
  healthPlanState,
} from "@/recoil/healthPlanState";
import {
  calculateCoverage,
  calculateExpenses,
  calculateInitialYearlyExpense,
  calculateRequiredAmount,
  calculateTotalAssets,
  calculateTotalDebts,
  protectionPlanState,
} from "@/recoil/protectionPlanState";
import { questionsState } from "@/recoil/questionsState";
import {
  calculatePreparationYears,
  calculateTotalCosts,
  calculateTotalPreparation,
  calculateWorkingYears,
  calculateisTotalPreparationAssets,
  mustBeSavedSelector,
  retirementPlanState,
  totalRetirementMissingSelector,
} from "@/recoil/retirementPlanState";
import { nameState } from "@/recoil/nameState";
import { Button, Typography } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useLocation } from "react-router";
const { } = Typography;
import sumpic from "@/assets/images/sumpic.png"
import homeTop from "@/assets/images/homeTop.png"
import protection from "@/assets/images/protection.png"
import health from "@/assets/images/health.png"
import retirement from "@/assets/images/retirement.png"
import Education2 from "@/assets/images/Education2.png"
import download from "@/assets/images/download.png"
import sent from "@/assets/images/sent.png"
const PDFSave: React.FC = () => {
  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const namestate = useRecoilValue(nameState)
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const convertMoney = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  console.log(current);
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
  const getPlanText = (order: number) => {
    switch (order) {
      case questionsData.educationPlanOrder:
        return 'การเก็บออมเพื่อค่าเล่าเรียนบุตร';
      case questionsData.healthPlanOrder:
        return 'การวางแผนเกี่ยวกับสุขภาพ';
      case questionsData.protectionPlanOrder:
        return 'คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป';
      case questionsData.retirementPlanOrder:
        return 'การวางแผนเตรียมเงินไว้ยามเกษียณ';
      default:
        return '';
    }
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const toone=()=>{
    setCurrent(1)
  }
  const steps = [{
    title: "เย้ ยินดีด้วย",
    content: (
      <div className="flex flex-col text-[2rem] font-medium justify-center items-center mb-10">
        <p>Protection plan</p>
        <p>Health plan</p>
        <p>Retirement plan</p>
        <p>Education plan</p>
      </div>
    )
  }, {
    title: "Financial  Health Check",
    content: (
      <>
        <div className="  rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>ผลลัพธ์ โดยรวม</p></div>
          <div className=" text-black">
            <div className="flex flex-row justify-between">
              <p>ค่าใช้จ่ายในครอบครัว</p>
              <p>{convertMoney(calculateCoverage(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>วางแผนเพื่อสุขภาพ</p>
              <p>{convertMoney(calculateAnnualTreatments(healthPlanData))} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>ค่าใช้จ่ายหลังเกษียณ</p>
              <p>{convertMoney(totalMissing)} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>วางแผนเพื่อการศึกษาบุตร</p>
              <p>{convertMoney(educationMissing)} บาท</p></div>
          </div>
        </div>
        <div className="  rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>ความสำคัญที่คุณเลือกเป็นดังนี้</p></div>
          <div className=" text-black text-[0.9rem]">
            <div className="flex flex-row">
              <p className=" text-red-500 font-bold">1.</p>
              <p>{getPlanText(1)}</p>
            </div>
            <div className="flex flex-row ">
              <p className=" text-red-500 font-bold">2.</p>
              <p>{getPlanText(2)}</p>
            </div>
            <div className="flex flex-row ">
              <p className=" text-red-500 font-bold">3.</p>
              <p>{getPlanText(3)}</p>
            </div>
            <div className="flex flex-row ">
              <p className=" text-red-500 font-bold">4.</p>
              <p>{getPlanText(4)}</p></div>
          </div>

        </div>
      </>
    )
  }, {
    title: "Protection plan",
    content: (
      <>
        <div className="  rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>ค่าใช้จ่าย</p></div>
          <div className=" text-black text-[0.8rem]">
            <div className="flex flex-row justify-between">
              <p>1.ค่าใช้จ่ายภายในครอบครัว</p>
              <p>{convertMoney(protectionPlanData.initialMonthlyExpense)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>2.ค่าใช้จ่ายภายในครอบครัวบาทต่อปี</p>
              <p>{convertMoney(calculateInitialYearlyExpense(protectionPlanData))} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>3.จำนวนปีที่ต้องการดูแลครอบครัว</p>
              <p>{protectionPlanData.numberOfYears} ปี</p></div>
            <div className="flex flex-row justify-between">
              <p>4.เงินสำรองฉุกเฉิน (50% ของรายได้บาท/ปี)</p>
              <p>{convertMoney(protectionPlanData.adjustedYearlyExpenses)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>5.เงินเฟ้อ</p>
              <p>{parseFloat(protectionPlanData.inflationRate) * 100} %</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>6.เงินสำรองที่จำเป็นต้องจัดเตรียมไว้</p>
              <p>{convertMoney(calculateExpenses(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <p>7.ค่าผ่อนบ้านคงค้างทั้งหมด</p>
              <p>{convertMoney(protectionPlanData.homePayments)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>8.ค่าผ่อนรถคงค้างทั้งหมด</p>
              <p>{convertMoney(protectionPlanData.carPayments)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>9.หนี้สินอื่นๆ</p>
              <p>{convertMoney(protectionPlanData.otherDebts)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>10.รวมหนี้สิน</p>
              <p>{convertMoney(calculateTotalDebts(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>11.จำนวนเงินที่ต้องการ</p>
              <p>{convertMoney(calculateRequiredAmount(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <p>12.เงินฝากธนาคาร</p>
              <p>{convertMoney(protectionPlanData.bankDeposit)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>13.ทุนประกันชีวิต</p>
              <p>{convertMoney(protectionPlanData.lifeInsuranceFund)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>14.ทรัพย์สินอื่น ๆ</p>
              <p>{convertMoney(protectionPlanData.otherAssets)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>15.รวมสิ่งที่เตรียมไว้แล้ว</p>
              <p>{convertMoney(calculateTotalAssets(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-5 text-red-500">
              <p>16.ความคุ้มครองที่จำเป็น</p>
              <p>{convertMoney(calculateTotalAssets(protectionPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(calculateCoverage(protectionPlanData))} บาท</p>
            </div>
          </div>

        </div>

      </>
    )
  }, {
    title: "Health Plan",
    content: (
      <>
        <div className="  rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>วางแผนเพื่อสุขภาพ</p></div>
          <div className=" text-black text-[0.8rem]">
            <div className="flex flex-row justify-between ">
              <p>1.กลุ่มโรงพยาบาลที่ใช้บริการประจำ</p>
              <p>{[
                { label: "โรงพยาบาลรัฐ", value: "1500.00" },
                { label: "โรงพยาบาลรัฐนอกเวลา", value: "2500.00" },
                { label: "โรงพยาบาลเอกชน", value: "4000.00" },
                { label: "โรงพยาบาลเอกชนพรีเมียม", value: "6000.00" },
              ].filter((obj) => obj.value === healthPlanData.hospitals)
                .map((obj) => obj.label)
                .join(",")}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>2.ค่าห้องต่อวันประมาณ</p>
              <p>{convertMoney(healthPlanData.hospitals)} บาท</p></div>
            <div className="flex flex-row justify-between mt-6">
              <p>3.ค่าห้องวันละ</p>
              <p>{convertMoney(healthPlanData.hospitals)} บาท</p></div>
            <div className="flex flex-row justify-between">
              <p>3.1.ค่าชดเชยรายวัน</p>
              <p>{convertMoney(healthPlanData.dailyCompensationFromWelfare)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>4.ค่ารักษาโรคร้ายแรง</p>
              <p>{convertMoney(healthPlanData.treatingSeriousIllness)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>5.ค่ารักษาอุบัติเหตุฉุกเฉิน</p>
              <p>{convertMoney(healthPlanData.emergencyCosts)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>6.งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)</p>
              <p>{convertMoney(healthPlanData.annualTreatment)} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <p>7.ค่าห้องวันละ</p>
              <p>{convertMoney(healthPlanData.roomFeeFromCompany)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>7.1.ค่าชดเชยรายวัน</p>
              <p>{convertMoney(healthPlanData.dailyCompensationFromWelfare)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>8.ค่ารักษาโรคร้ายแรง</p>
              <p>{convertMoney(healthPlanData.treatingSeriousIllnessFromCompany)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>9.ค่ารักษาอุบัติเหตุฉุกเฉิน</p>
              <p>{convertMoney(healthPlanData.emergencyCostsFromCompany)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>10.งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)</p>
              <p>{convertMoney(healthPlanData.annualTreatmentFromCompany)} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <p>11.ค่าห้องวันละ</p>
              <p>{convertMoney(calculateAdditionalRoomFee(healthPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>11.1.ค่าชดเชยรายวัน</p>
              <p>{convertMoney(calculateDailyCompensation(healthPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>12.ค่ารักษาโรคร้ายแรง</p>
              <p>{convertMoney(calculateTreatingSeriousIllness(healthPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>13.ค่ารักษาอุบัติเหตุฉุกเฉิน</p>
              <p>{convertMoney(calculateEmergencyCosts(healthPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>14.งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)</p>
              <p>{convertMoney(calculateAnnualTreatments(healthPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(calculateAnnualTreatments(healthPlanData))} บาท</p>
            </div>
          </div>
        </div>
      </>
    )
  }, {
    title: "Retirement Plan",
    content: (
      <>
        <div className="  rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>ค่าใช้จ่ายหลังเกษียณ</p></div>
          <div className=" text-black text-[0.8rem]">
            <div className="flex flex-row justify-between">
              <p>1.กินอยู่</p>
              <p>{convertMoney(retirementPlanData.livingCosts)} บาท/เดือน</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>2.ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้าน</p>
              <p>{convertMoney(retirementPlanData.houseCosts)} บาท/ปี</p></div>
            <div className="flex flex-row justify-between">
              <p>3.ค่ามือถือ อินเตอร์เน็ต</p>
              <p>{convertMoney(retirementPlanData.internetCosts)} บาท/เดือน</p></div>
            <div className="flex flex-row justify-between mt-3">
              <p>4.ค่าเสื้อผ้า</p>
              <p>{convertMoney(retirementPlanData.clothingCosts)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>5.ค่ารักษาพยาบาล</p>
              <p>{convertMoney(retirementPlanData.medicalCosts)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>6.ค่าใช้จ่ายอื่น ๆ (ขาดได้ ไม่ใช่ปัจจัย 4)</p>
              <p>{convertMoney(retirementPlanData.otherCosts)} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <p>7.รวมค่าใช้จ่ายต่อปี</p>
              <p>{convertMoney(calculateTotalCosts(retirementPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <p>8.อายุตอนนี้</p>
              <p>{retirementPlanData.age} ปี</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>9.อายุเกษียณ</p>
              <p>{retirementPlanData.retireAge} ปี</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>10.คาดการณ์อายุขัย</p>
              <p>{retirementPlanData.lifExpectancy} ปี</p>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <p>11.จำนวนปีที่ทำงานได้</p>
              <p>{calculateWorkingYears(retirementPlanData)} ปี</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>12.จำนวนปีที่ต้องเตรียม</p>
              <p>{calculatePreparationYears(retirementPlanData)} ปี</p>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <p>13.เงินเฟ้อ</p>
              <p>{parseFloat(retirementPlanData.inflationRate) * 100} %</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>14.รวมค่าใช้จ่ายที่ต้องเตรียม</p>
              <p>{convertMoney(calculateTotalPreparation(retirementPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-start mt-7 text-[1.4rem] text-[#0E2B81]">
              <p>สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)</p>

            </div>
            <div className="flex flex-row justify-between mt-3">
              <p>15.เงินฝาก</p>
              <p>{convertMoney(retirementPlanData.deposit)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>16.ทุนประกัน</p>
              <p>{convertMoney(retirementPlanData.insuranceFund)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>17.ทรัพย์สินอื่น ๆ</p>
              <p>{convertMoney(retirementPlanData.otherAssets)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>18.รวมสิ่งที่เตรียมไว้แล้ว</p>
              <p>{convertMoney(calculateisTotalPreparationAssets(retirementPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <p>19.รวมที่ขาดอยู่</p>
              <p>{convertMoney(totalMissing)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>20.ต่อปีที่ต้องเก็บได้</p>
              <p>{convertMoney(mustBeSaved)} บาท</p>
            </div>
            <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(totalMissing)} บาท</p>
            </div>
          </div>
        </div>
      </>
    )
  }, {
    title: "Education Plan",
    content: (
      <div>
        <div className="  rounded-lg p-5 shadow-lg mb-5">
          <div className="text-[1.4rem] mb-3"><p>วางแผนเพื่อการศึกษาบุตร</p></div>
          <div className=" text-black text-[0.8rem]">
            <div className="flex flex-row justify-between">
              <p>1.ระดับการศึกษาที่คาดหวัง</p>
              <p>{educationPlanData.levelOfeducation}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>2.ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง</p>
              <p>{[
                { value: "107000.00", label: "รัฐบาล" },
                { value: "214900.00", label: "เอกชน" },
                { value: "500000.00", label: "อินเตอร์" },
              ]
                .filter(
                  (obj) => obj.value === educationPlanData.typeOfeducation
                )
                .map((obj) => obj.label)
                .join(",")}</p></div>
            <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
              <p>ทุนการศึกษาที่จำเป็น</p>

            </div>
            <div className="flex flex-row justify-between">
              <p>3.ค่าเล่าเรียน</p>
              <p>{convertMoney(educationPlanData.typeOfeducation)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>4.ค่าใช้จ่ายระหว่างศึกษา</p>
              <p>{convertMoney(
                (
                  parseFloat(educationPlanData.typeOfeducation) * 0.15
                ).toFixed(2)
              )} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>5.จำนวนปีการศึกษาของลูกที่จะต้องส่ง</p>
              <p>{educationPlanData.yearsOfeducation} ปี</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>6.อัตราการเฟ้อของค่าเทอมต่อปี</p>
              <p>{parseFloat(educationPlanData.inflationRate) * 100} %</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>7.รวมทุนการศึกษาที่จำเป็น</p>
              <p>{convertMoney(
                calculateRequiredScholarships(educationPlanData)
              )} บาท</p>
            </div>
            <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
              <p>สิ่งที่เตรียมไว้แล้ว</p>

            </div>
            <div className="flex flex-row justify-between">
              <p>8.เงินฝาก</p>
              <p>{convertMoney(educationPlanData.deposit)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>9.กรมธรรม์ที่ครบกำหนด</p>
              <p>{convertMoney(educationPlanData.insuranceFund)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>10.อื่นๆ</p>
              <p>{convertMoney(educationPlanData.otherAssets)} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>11.รวมทุนการศึกษาที่เตรียมไว้แล้ว</p>
              <p>{convertMoney(calculateTotalPreparationAssets(educationPlanData))} บาท</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>12.รวมที่ขาดอยู่</p>
              <p>{convertMoney(educationMissing)} บาท</p>
            </div>
            <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
              <p>ผลลัพธ์</p>
              <p>{convertMoney(educationMissing)} บาท</p>
            </div>
          </div>
        </div>

      </div>
    )
  }, {
    title: "Financial  Health Check",
    content: (
      <div className="  rounded-lg p-5 shadow-lg mb-5 gap-5 h-[50vh]">
        <div className="flex flex-row justify-evenly items-center">
        <div className="p-2 bg-[#003781] h-36 w-36 rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer"><img src={download} alt="" width={51}/><p className=" text-white">ดาวน์โหลด PDF</p></div>
        <div className="p-2 bg-[#003781] h-36 w-36 rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer"><img src={sent} alt="" width={51}/><p className=" text-white">แชร์ผลสรุป</p></div>
        </div>
      </div>
    )
  }]
  return (
    <>
      <div className="flex justify-center text-[#0E2B81]">
        <div className="bg-white rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl h-auto flex flex-col w-[425px] gap-3 border border-red-400">
          <div className="flex flex-col justify-center items-center gap-3 mb-5">
            <h1 className=" text-lg font-bold text-center">{allTitle}</h1>
            <h1 className={` text-lg font-semibold ${current == 0 ? " hidden" : ""} `}>คุณ {namestate.nickname}</h1>
            <img src={allImages} alt="" width={300} />
          </div>
          <div className="steps-content h-auto p-2  rounded-md gap-5 mb-5 w-[375px]">
            {/* <p className="text-xl mb-3">{current == 0 ? "" : steps[current].title}</p> */}

            {steps[current].content}
            <div className="steps-action h-20 flex flex-row">
              {current === 0 && (
                <Button
                  onClick={() => next()}
                  className={`bg-[#003781] rounded-full text-white h-10 ${current === 0 ? "w-full" : "w-[180px]"}`}
                >
                  ไปหน้าสรุปผล
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()} className={` bg-white rounded-full w-[180px]`}>
                  ย้อนกลับ
                </Button>
              )}
              {current < steps.length - 1 && (
                <><Button type="primary" onClick={() => next()} className={`bg-[#003781] rounded-full ${current === 0 ? "hidden" : "w-[180px]"}`}>
                  ถัดไป
                </Button>
                </>
              )}

              {current === steps.length - 1 && (
                <Button
                  // onClick={() => navigator("/export-pdf", { state: { current:1 } })}
                  onClick={() => toone()}
                  
                  className={`bg-[#003781] rounded-full w-[180px] text-white ${current === 0 ? "hidden" : ""}`}
                >
                  กลับไปหน้าสรุป
                </Button>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PDFSave;
