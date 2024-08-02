import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import exportlink from '@/assets/images/exportlink.svg';
import { Button } from "antd";
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png';
import {
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import axios from 'axios';
import { NavBar } from "@/components/navbar";
import usePlanNavigation from "@/components/usePlanNavigation";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from '@/recoil/progressState';
import { questionsState } from "@/recoil/questionsState";
import { protectionPlanState, calculateCoverage } from "@/recoil/protectionPlanState";
import { healthPlanState, calculateAnnualTreatments } from "@/recoil/healthPlanState";
import { retirementPlanState, totalRetirementMissingSelector, mustBeSavedSelector } from "@/recoil/retirementPlanState";
import health from "@/assets/images/health.png";
import Education2 from "@/assets/images/Education2.png";
import protection from "@/assets/images/protection.png"
const VieweConclusionplan: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [conclusionplan, setConclusionplan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const [linkButton, setLinkButton] = useState(false);
  const { plans, toone, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();

  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);

  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const [address, setAddress] = useState<any>(null);
  const [educationPlan, setEducationPlan] = useState<any>(null);
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

  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const toFloat = (num: any) => {
    const floatValue = parseFloat(num.toString().replace(/,/g, ''));
    return floatValue;
  };

  useEffect(() => {
    const fetchConclusionplan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/importance/${id}`);
        setConclusionplan(response.data);
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

    fetchConclusionplan();
    checkLocalStorageLengths();

    // const address = JSON.parse(localStorage.getItem('addressPlans') || "[]")
    // const historyAddress = JSON.parse(localStorage.getItem('historyAddress') || "[]")
    // if (address.length === 1) {
    //   setShareLink(location.pathname);
    // } else {

    //   const linkshare = localStorage.getItem('linkshare');
    //   if (linkshare) {
    //     setShareLink(`/share/${linkshare}`);
    //   }
    // }

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getPlanText = (order: number) => {
    switch (order) {
      case 4:
        return (
          <div className='flex flex-row justify-start items-center gap-1 p-2 bg-[#F2F3FF] rounded-lg w-[233px] '>
            <div>
              <p className='text-[#0E2B81] font-bold'>Education Plan</p>
              <p className='text-[#0E2B81] text-[0.8rem]'>แผนการเก็บออมเพื่อค่าเล่าเรียนบุตร</p>
            </div>
            <div><img src={Education2} alt="" className='w-7' /></div>
          </div>)
      case 2:
        return (
          <div className='flex flex-row justify-between items-center gap-5 p-2 bg-[#F2F3FF] rounded-lg w-[233px]'>
            <div>
              <p className='text-[#0E2B81] font-bold'>Health Plan</p>
              <p className='text-[#0E2B81] text-[0.85rem]'>แผนการคุ้มครองเรื่องสุขภาพ</p>
            </div>
            <div><img src={health} alt="" className='w-7' /></div>
          </div>)
      case 1:
        return (
          <div className='flex flex-row justify-start items-center gap-5 p-2 bg-[#F2F3FF] rounded-lg w-[233px]'>
            <div>
              <p className='text-[#0E2B81] font-bold'>Protection Plan</p>
              <p className='text-[#0E2B81] text-[0.8rem]'>แผนคุ้มครองรายได้ให้ครอบครัว</p>
            </div>
            <div><img src={protection} alt="" className='w-7' /></div>
          </div>)
      case 3:
        return (
          <div className='flex flex-row justify-between items-center gap-5 p-2 bg-[#F2F3FF] rounded-lg w-[233px]'>
            <div>
              <p className='text-[#0E2B81] font-bold'>Retirement Plan</p>
              <p className='text-[#0E2B81] text-[0.78rem]'>แผนการคุ้มครองเรื่องการเกษียณ</p>
            </div>
            <div><img src={health} alt="" className='w-7' /></div>
          </div>)
      default:
        return '';
    }
  };

  const orders = [
    conclusionplan.protectionPlanOrder,
    conclusionplan.healthPlanOrder,
    conclusionplan.retirementPlanOrder,
    conclusionplan.educationPlanOrder,
  ];

  const nonZeroOrders = orders
    .map((order, index) => ({ order: parseInt(order), index: index + 1 }))
    .filter(({ order }) => order !== 0)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans mt-16">
        <div className=" fixed top-0 z-40"><NavBar /></div>
        <div className="rounded-lg p-5 shadow-lg mb-5 w-[350px]">
          <div className="text-[1.4rem] mb-3">
            <p>ความสำคัญที่คุณเลือกเป็นดังนี้</p>
          </div>
          <div className="text-black text-[0.9rem]">
            {nonZeroOrders.map(({ order, index }, i) => (
              <div className="flex flex-row justify-between items-center mb-3" key={i}>
                <p className="text-red-500 font-bold">อันดับ {order}.</p>
                <p>{getPlanText(index)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg p-5 shadow-lg mb-5 w-[350px]">
          <div className="text-[1.4rem] mb-3"><p>ผลลัพธ์ โดยรวม</p></div>
          <div className="text-black w-full">
            {nonZeroOrders.map(({ order }) => {
              if (order === parseInt(conclusionplan.protectionPlanOrder)) {
                return (
                  <div key={order} className="flex flex-row justify-between">
                    <p>ค่าใช้จ่ายในครอบครัว</p>
                    <p>{conclusionplan.protectiondata} บาท</p>
                  </div>
                );
              }
              if (order === parseInt(conclusionplan.healthPlanOrder)) {
                return (
                  <div key={order} className="flex flex-col justify-start">
                    <div>
                      <p>วางแผนเพื่อสุขภาพ</p>
                    </div>
                    <div className='flex flex-col'>
                      <li className='flex justify-between'><li>ค่าห้อง</li><p>{conclusionplan.roomRates} บาท</p> </li>
                      <li className='flex justify-between'><li>ค่ารักษาโรคร้ายแรง</li><p>{conclusionplan.severeMedicalExpenses} บาท</p></li>
                      <li className='flex justify-between'><li>ค่ารักษาอุบัติเหตุฉุกเฉิน</li><p>{conclusionplan.emergencyAccidentTreatmentCosts} บาท</p></li>
                      <li className='flex justify-between'><li>งบประมาณค่ารักษาบาท/ปี</li><p>{conclusionplan.treatmentBudget} บาท</p></li>
                    </div>
                  </div>
                );
              }
              if (order === parseInt(conclusionplan.retirementPlanOrder)) {
                return (
                  <div key={order} className="flex flex-row justify-between">
                    <p>ค่าใช้จ่ายหลังเกษียณ</p>
                    <p>{conclusionplan.totalMissing} บาท</p>
                  </div>
                );
              }
              if (order === parseInt(conclusionplan.educationPlanOrder)) {
                return (
                  <div key={order} className="flex flex-row justify-between">
                    <p>วางแผนเพื่อการศึกษาบุตร</p>
                    <p>{conclusionplan.missingTotal} บาท</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="steps-action h-20 flex flex-col justify-center items-center gap-5">
          <>{shareLink && linkButton && <ShareOnSocial
            link={`https://financial-health-check.azayagencyjourney.com${shareLink}`}
            linkFavicon={logo}
            linkTitle={"ข้อมูลสรุป"}
          >
            <button className="bg-[#003781] flex flex-row justify-center items-center gap-5 rounded-full w-[260px] h-10 text-white hover:bg-[#76a1d8]">
              <img src={exportlink} alt="exportlink" /><p>แชร์ผลสรุป</p>
            </button>
          </ShareOnSocial>}

            {!linkButton && (
              <div className='flex flex-row justify-center items-center gap-5'>
                <Button onClick={toone} type="primary" className={`bg-[#003781] rounded-full w-[260px]`}>
                  ถัดไป
                </Button>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default VieweConclusionplan;
