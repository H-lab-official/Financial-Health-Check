import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { sortedSelectedState } from '@/recoil/progressState';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import exportlink from '@/assets/images/exportlink.svg'
import { Button, Typography } from "antd";
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png'
import {
  calculateCoverage,
  calculateExpenses,
  calculateInitialYearlyExpense,
  calculateRequiredAmount,
  calculateTotalAssets,
  calculateTotalDebts,
  protectionPlanState,
} from "@/recoil/protectionPlanState";
import axios from 'axios';
import { NavBar } from "@/components/navbar";
import protection from "@/assets/images/protection.png"
import usePlanNavigation from "@/components/usePlanNavigation"
const Vieweprotectionplan: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [protectionPlanData, setProtectionPlanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { plans, toone, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  useEffect(() => {
    const fetchProtectionPlan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/protection/${id}`);
        setProtectionPlanData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProtectionPlan();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  function toFloat(num: string) {
    const floatValue = parseFloat(num.replace(/,/g, ''))
    return floatValue
  }



  return (
    <div>

      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className=" fixed top-0 z-40"><NavBar /></div>
        {protectionPlanData ?
          (



            <div className="bg-white shadow-md rounded-lg mx-auto py-2 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
              <div className="flex flex-col justify-center items-center mb-5">
                <h1 className=" text-[1.9rem] font-bold text-center">Protection Plan</h1>
                <h1 className={` text-[1.8rem]`}>คุณ {protectionPlanData.nickname}</h1>
                <img src={protection} alt="Education2" width={200} />
              </div>
              <div className="steps-content h-auto mx-auto  rounded-md gap-5 mb-5 w-[375px]">
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
                

              </div>
              <div className="steps-action h-20 flex flex-col justify-center items-center gap-5">
                <>
                  <ShareOnSocial linkFavicon={logo} linkTitle={"Protection Plan Data"}>
                    <Button className="bg-[#003781] flex flex-row justify-center items-center gap-5  rounded-full w-[260px] h-10 text-white "><img src={exportlink} alt="exportlink" /><p>แชร์ผลสรุป</p></Button>
                  </ShareOnSocial>
                  <div className='flex flex-row justify-center items-center gap-5'>
                    <Button onClick={goBack} className="bg-white rounded-full w-[120px]">
                      ย้อนกลับ
                    </Button>
                    <Button onClick={toone} type="primary" className={`bg-[#003781] rounded-full w-[120px]`}>
                      ถัดไป
                    </Button>
                  </div>
                </>
              </div>
            </div>

          ) : (
            <div>No Protection Plan Data found.</div>
          )}

      </div>


    </div>
  );
};

export default Vieweprotectionplan;
