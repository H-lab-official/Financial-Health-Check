import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { sortedSelectedState } from '@/recoil/progressState';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import exportlink from '@/assets/images/exportlink.svg'
import { Button, Typography } from "antd";
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png'
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

import axios from 'axios';
import { NavBar } from "@/components/navbar";
import retirement from "@/assets/images/retirement.png"
import usePlanNavigation from "@/components/usePlanNavigation"
const Vieweretirementplan: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [retirementPlanData, setRetirementPlanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  // const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const { toone, goBack } = usePlanNavigation();
  const [linkButton, setLinkButton] = useState(false)
  const [shareLink, setShareLink] = useState<string>("");
  const checkLocalStorageLengths = () => {
    const addressPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
    const historyAddress = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    const addressPlansLength = addressPlans.length;
    const historyAddressLength = historyAddress.length;
    if ((addressPlansLength + historyAddressLength) === 1) {
      setLinkButton(true);
      setShareLink(location.pathname);
    } else {
      setLinkButton(false);
      const linkshare = localStorage.getItem('linkshare');
      if (linkshare) {
        setShareLink(`/share/${linkshare}`);
      }
    }
  };
  const localStoreDelete = () => {

  }
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  const calculateTotalMissing = (data: any) => {
    const totalPreparation = parseFloat(calculateTotalPreparation(data));
    const totalPreparationAssets = parseFloat(calculateisTotalPreparationAssets(data));
    return totalPreparation - totalPreparationAssets;
  };
  useEffect(() => {
    const fetchRetirementPlan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/retirementplan/${id}`);
        setRetirementPlanData(response.data);
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

    fetchRetirementPlan();
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


  const totalMissing = retirementPlanData ? calculateTotalMissing(retirementPlanData) : 0;
  const mustBeSaved = retirementPlanData ? (totalMissing / parseFloat(calculateWorkingYears(retirementPlanData))) : 0;


  return (
    <div>

      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className=" fixed top-0 z-40"><NavBar /></div>
        {retirementPlanData ?
          (
            <div className="bg-white  rounded-lg mx-auto py-2 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
              <div className="flex flex-col justify-center items-center mb-5">
                <h1 className=" text-[1.9rem] font-bold text-center">Retirement Plan</h1>
                <h1 className={` text-[1.8rem]`}>คุณ {retirementPlanData.nickname}</h1>
                <img src={retirement} alt="Education2" width={200} />
              </div>
              <div className="steps-content h-auto mx-auto  rounded-md gap-5 mb-5 w-[375px]">
                <div className="  rounded-lg p-5  mb-5">
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
                    <div className="flex flex-row justify-between ">
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
                    <div className="flex flex-row justify-between">
                      <p>7.รวมค่าใช้จ่ายต่อปี</p>
                      <p>{convertMoney(calculateTotalCosts(retirementPlanData))} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
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
                    <div className="flex flex-row justify-between">
                      <p>11.จำนวนปีที่ทำงานได้</p>
                      <p>{calculateWorkingYears(retirementPlanData)} ปี</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>12.จำนวนปีที่ต้องเตรียม</p>
                      <p>{calculatePreparationYears(retirementPlanData)} ปี</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>13.เงินเฟ้อ</p>
                      <p>{(parseFloat(retirementPlanData.inflationRate) * 100).toFixed(0)} %</p>
                      {/* <p>{parseFloat(retirementPlanData.inflationRate) * 100} %</p> */}
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
                    <div className="flex flex-row justify-between ">
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


              </div>

              <div className="steps-action h-20 flex flex-col justify-center items-center gap-5">
                <>
                  {!linkButton && <div className='flex flex-row justify-center items-center gap-5'>
                    <Button onClick={goBack} className="bg-white rounded-full w-[120px] font-sans">
                      ย้อนกลับ
                    </Button>
                    <Button onClick={() => toone(retirementPlanData.nickname)} type="primary" className={`bg-[#003781] rounded-full w-[120px] font-sans`}>
                      ถัดไป
                    </Button>
                  </div>}
                  {shareLink && linkButton && <ShareOnSocial
                    link={`https://financial-health-check.azayagencyjourney.com${shareLink}`}
                    linkFavicon={logo}
                    linkTitle={"Retirement Plan Data"}
                  >
                    <button className="bg-[#003781] flex flex-row justify-center items-center gap-5 rounded-full w-[260px] h-10 text-white hover:bg-[#76a1d8] font-sans">
                      <img src={exportlink} alt="exportlink" /><p className='font-sans'>แชร์ผลสรุป</p>
                    </button>
                  </ShareOnSocial>}

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

export default Vieweretirementplan;
