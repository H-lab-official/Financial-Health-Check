import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavBar } from "@/components/navbar";
import usePlanNavigation from "@/components/usePlanNavigation";
import { sortedSelectedState } from '@/recoil/progressState';
import congratulations from "@/assets/images/congratulations.svg";
import congratulationsBG from "@/assets/images/congratulationsbg.svg";
import exportlink from '@/assets/images/exportlink.svg';
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png';
const Congratulations: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const name = location.state?.name || 'User';
  const [shareLink, setShareLink] = useState<string>("");
  const handleNavigate = () => {
    const historyAddress = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    if (historyAddress.length > 0) {
      const firstAddress = historyAddress[0];
      const remainingAddresses = historyAddress.slice(1);
      const updatedHistory = [firstAddress]
      console.log(updatedHistory);

      const updatedAddressPlans = [...remainingAddresses];
      localStorage.setItem('addressPlans', JSON.stringify(updatedAddressPlans));
      localStorage.setItem('historyAddress', JSON.stringify(updatedHistory));
      navigate(firstAddress);
    } else {
      console.log('No history address found.');
    }
  };
  useEffect(() => {
    const linkshare = localStorage.getItem('linkshare');
    if (linkshare) {
      setShareLink(`/share/${linkshare}`);
    }
  }, [])
  return (
    <>
      <div className="flex flex-col justify-center items-center  text-[#0E2B81] font-sans"
        
      >
        <div className="fixed top-0 z-40"><NavBar /></div>
        <div className="px-5 pt-5 pb-10 my-5 w-[325px] flex flex-col justify-center items-center gap-10 rounded-lg shadow-lg mt-16">
          <div className="mb-3 flex flex-col justify-center items-center gap-10">
            <p className="text-4xl">Congratulations</p>
            <p className="text-3xl">คุณ {name}</p>
          </div>
          <img src={congratulations} alt="Congratulations" />
          <div className="flex flex-col justify-center items-center text-[#0E2B81] p-5 rounded-lg ">
            <p className="text-xl">คุณได้ทำ</p>
            <p className="text-2xl">Financial Health Check</p>
            <p className="text-xl">เสร็จสิ้นแล้ว</p>
          </div>
          {shareLink && <ShareOnSocial
            link={`https://financial-health-check.azayagencyjourney.com${shareLink}`}
            linkFavicon={logo}
            linkTitle={"ข้อมูลสรุป"}
          >
            <button className="bg-blue-600 flex flex-row justify-center items-center text-lg gap-5 rounded-full w-[260px]  text-white px-7 py-2 hover:bg-[#76a1d8]">
              <img src={exportlink} alt="exportlink" /><p>แชร์ผลสรุป</p>
            </button>
          </ShareOnSocial>}
          <button
            onClick={handleNavigate}
            className="bg-blue-600 px-7 py-2 rounded-full text-lg text-white hover:bg-[#76a1d8] w-[260px]"
          >
            กลับไปหน้าสรุป
          </button>
        </div>
      </div>
    </>
  );
};

export default Congratulations;
