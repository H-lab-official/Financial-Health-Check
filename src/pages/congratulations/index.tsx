import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavBar } from "@/components/navbar";
import usePlanNavigation from "@/components/usePlanNavigation";
import { sortedSelectedState } from '@/recoil/progressState';
import congratulations from "@/assets/images/congratulations.svg";
import congratulationsBG from "@/assets/images/congratulationsbg.svg";

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

  const handleNavigate = () => {
    const historyAddress = JSON.parse(localStorage.getItem('historyAddress') || '[]');
    if (historyAddress.length > 0) {
      const firstAddress = historyAddress[0];
      const remainingAddresses = historyAddress.slice(1);
      const updatedAddressPlans = [...remainingAddresses];
      localStorage.setItem('addressPlans', JSON.stringify(updatedAddressPlans));
      localStorage.setItem('historyAddress', JSON.stringify([]));
      navigate(firstAddress);
    } else {
      console.log('No history address found.');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans mt-16 relative w-full h-screen bg-local bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${congratulationsBG})` }}
      >
        <div className="fixed top-0 z-40 w-full"><NavBar /></div>
        <div
          className="px-5 pt-5 pb-10 my-5 w-[325px] flex flex-col justify-center items-center gap-10 bg-white/90 rounded-lg shadow-lg"
        >
          <div className="mb-3 flex flex-col justify-center items-center gap-10">
            <p className="text-4xl">Congratulations</p>
            <p className="text-3xl">คุณ {name}</p>
          </div>
          <img src={congratulations} alt="Congratulations" />
          <div className="flex flex-col justify-center items-center text-white p-5 rounded-lg bg-gray-800">
            <p className="text-xl">คุณได้ทำ</p>
            <p className="text-2xl">Financial Health Check</p>
            <p className="text-xl">เสร็จสิ้นแล้ว</p>
          </div>
          <button
            onClick={handleNavigate}
            className="bg-blue-600 px-7 py-2 rounded-full text-lg text-white hover:bg-blue-700"
          >
            กลับไปหน้าสรุป
          </button>
        </div>
      </div>
    </>
  );
};

export default Congratulations;
