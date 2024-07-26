import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { sortedSelectedState } from '@/recoil/progressState';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import exportlink from '@/assets/images/exportlink.svg'
import { Button, Typography } from "antd";
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png'
import {
  calculateAdditionalRoomFee,
  calculateAnnualTreatments,
  calculateDailyCompensation,
  calculateEmergencyCosts,
  calculateTreatingSeriousIllness,
  healthPlanState,
} from "@/recoil/healthPlanState";
import axios from 'axios';
import { NavBar } from "@/components/navbar";
import health from "@/assets/images/health.png"
import usePlanNavigation from "@/components/usePlanNavigation"
const Viewehealthplan: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [healthPlanData, setHealthPlanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkButton, setLinkButton] = useState(false)
  const { plans, toone, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  const checkLocalStorageLengths = () => {
    const addressPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    const historyAddress = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    const addressPlansLength = addressPlans.length;
    const historyAddressLength = historyAddress.length;
    if ((addressPlansLength + historyAddressLength) == 1) {
      setLinkButton(true)
    } else {
      setLinkButton(false)
    }

  }
  useEffect(() => {
    const fetchEducationPlan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/healthplan/${id}`);
        setHealthPlanData(response.data);
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

    fetchEducationPlan();
    checkLocalStorageLengths()
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
        {healthPlanData ?
          (



            <div className="bg-white shadow-md rounded-lg mx-auto py-2 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
              <div className="flex flex-col justify-center items-center mb-5">
                <h1 className=" text-[1.9rem] font-bold text-center">Health Plan</h1>
                <h1 className={` text-[1.8rem]`}>คุณ {healthPlanData.nickname}</h1>
                <img src={health} alt="Education2" width={200} />
              </div>
              <div className="steps-content h-auto mx-auto  rounded-md gap-5 mb-5 w-[375px]">
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
                    <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
                      <p>สวัสดิการที่คาดหวังจะได้</p>
                    </div>
                    <div className="flex flex-row justify-between mt-6">
                      <p>3.ค่าห้องวันละ</p>
                      <p>{convertMoney(healthPlanData.hospitals)} บาท</p></div>
                    {/* <div className="flex flex-row justify-between">
                      <p>3.1.ค่าชดเชยรายวัน</p>
                      <p>{convertMoney(healthPlanData.dailyCompensationFromWelfare)} บาท</p>
                    </div> */}
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
                    <div className="flex flex-row justify-start my-6 text-[1rem] text-[#0E2B81]">
                      <p>สวัสดิการปัจจุบันจากบริษัท หรือ จากประกันที่มี</p>
                    </div>
                    <div className="flex flex-row justify-between mt-6">
                      <p>7.ค่าห้องวันละ</p>
                      <p>{convertMoney(healthPlanData.roomFeeFromCompany)} บาท</p>
                    </div>
                    {/* <div className="flex flex-row justify-between">
                      <p>7.1.ค่าชดเชยรายวัน</p>
                      <p>{convertMoney(healthPlanData.dailyCompensationFromWelfare)} บาท</p>
                    </div> */}
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
                    <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
                      <p>สวัสดิการที่ต้องเพิ่มเติม</p>
                    </div>
                    <div className="flex flex-row justify-between mt-6">
                      <p>11.ค่าห้องวันละ</p>
                      <p>{convertMoney(calculateAdditionalRoomFee(healthPlanData))} บาท</p>
                    </div>
                    {/* <div className="flex flex-row justify-between">
                      <p>11.1.ค่าชดเชยรายวัน</p>
                      <p>{convertMoney(calculateDailyCompensation(healthPlanData))} บาท</p>
                    </div> */}
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
                    {/* <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
                      <p>ผลลัพธ์</p>
                      <p>{convertMoney(calculateAnnualTreatments(healthPlanData))} บาท</p>
                    </div> */}
                  </div>
                </div>


              </div>
              <div className="steps-action h-20 flex flex-col justify-center items-center gap-5">
                <>
                  <ShareOnSocial linkFavicon={logo} linkTitle={"Health Plan Data"}>
                    <Button className="bg-[#003781] flex flex-row justify-center items-center gap-5  rounded-full w-[260px] h-10 text-white "><img src={exportlink} alt="exportlink" /><p>แชร์ผลสรุป</p></Button>
                  </ShareOnSocial>
                  {!linkButton && <div className='flex flex-row justify-center items-center gap-5'>
                    <Button onClick={goBack} className="bg-white rounded-full w-[120px]">
                      ย้อนกลับ
                    </Button>
                    <Button onClick={toone} type="primary" className={`bg-[#003781] rounded-full w-[120px]`}>
                      ถัดไป
                    </Button>
                  </div>}
                </>
              </div>
            </div>

          ) : (
            <div>No Health Plan Data found.</div>
          )}

      </div>


    </div>
  );
};

export default Viewehealthplan;
