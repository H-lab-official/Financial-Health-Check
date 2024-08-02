import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { sortedSelectedState } from '@/recoil/progressState';
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
import Education2 from "@/assets/images/Education2.png";
import usePlanNavigation from "@/components/usePlanNavigation";

const Vieweducationplan: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentStep = location.state?.current || 0;
  const [current, setCurrent] = useState(currentStep);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [educationPlan, setEducationPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const [linkButton, setLinkButton] = useState(false);
  const { plans, toone, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();
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
    const fetchEducationPlan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/educationplan/${id}`);
        setEducationPlan(response.data);
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
    checkLocalStorageLengths();
    // const address = JSON.parse(localStorage.getItem('addressPlans') || "[]")
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

  let TotalPreparationAssets = convertMoney(calculateTotalPreparationAssets(educationPlan));
  let yearsOfeducationFrontCount = parseInt(educationPlan.levelOfeducation2) - (parseInt(educationPlan.child) - 4);
  const expensesDuringStudy = parseFloat(educationPlan.expensesDuringStudy) || 0;
  const typeOfEducation = parseFloat(educationPlan.typeOfeducation) || 0;
  const inflationRate = parseFloat(educationPlan.inflationRate) || 0;



  let RequiredScholarships = (typeOfEducation + expensesDuringStudy) *
    ((1 - Math.pow(1 + inflationRate, yearsOfeducationFrontCount)) /
      (1 - (1 + inflationRate)));




  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
        <div className=" fixed top-0 z-40"><NavBar /></div>
        {educationPlan ? (
          <div className="bg-white shadow-md rounded-lg mx-auto py-2 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3 ">
            <div className="flex flex-col justify-center items-center mb-5">
              <h1 className=" text-[1.9rem] font-bold text-center">Education Plan</h1>
              <h1 className={` text-[1.8rem]`}>คุณ {educationPlan.nickname}</h1>
              <img src={Education2} alt="Education2" width={200} />
            </div>
            <div className="steps-content h-auto mx-auto  rounded-md gap-5 mb-5 w-[375px]">
              <div className="  rounded-lg p-5 shadow-lg mb-5">
                <div className="text-[1.4rem] mb-3"><p>วางแผนเพื่อการศึกษาบุตร</p></div>
                <div className=" text-black text-[0.8rem]">
                  <div className="flex flex-row justify-between">
                    <p>1. อายุของบุตร</p>
                    <p>{convertMoney(educationPlan.child)} ปี</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>2. ระดับการศึกษาที่คาดหวัง</p>
                    <p>{[
                      { value: "19", label: "ปริญญาตรี" },
                      { value: "21", label: "ปริญญาโท" },
                      { value: "25", label: "ปริญญาเอก" },
                    ]
                      .filter(
                        (obj) => obj.value === educationPlan.levelOfeducation
                      )
                      .map((obj) => obj.label)
                      .join(",")}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>3. จำนวนปีสำหรับการศึกษาลูกทั้งหมด</p>
                    <p>{convertMoney(educationPlan.levelOfeducation2)} ปี</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>4. จำนวนปีการศึกษาที่เหลือที่ต้องส่ง</p>
                    <p>{yearsOfeducationFrontCount} ปี</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>5. ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง</p>
                    <p>{[
                      { value: "30000.00", label: "รัฐบาล" },
                      { value: "90000.00", label: "เอกชน" },
                      { value: "700000.00", label: "อินเตอร์" },
                      { value: "1200000.00", label: "เรียนต่อต่างประเทศ" },
                    ]
                      .filter(
                        (obj) => obj.value === educationPlan.typeOfeducation
                      )
                      .map((obj) => obj.label)
                      .join(",")}</p></div>
                  <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
                    <p>ทุนการศึกษาที่จำเป็น</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>6. ค่าเล่าเรียน</p>
                    <p>{convertMoney(educationPlan.typeOfeducation)} บาท</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>7. ค่าใช้จ่ายระหว่างศึกษา</p>
                    <p>{convertMoney(educationPlan.expensesDuringStudy)} บาท</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>8. อัตราการเฟ้อของค่าเทอมต่อปี</p>
                    <p>{(parseFloat(educationPlan.inflationRate) * 100).toFixed(0)} %</p>
                   
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>9. รวมทุนการศึกษาที่จำเป็น</p>
                    <p>{convertMoney(RequiredScholarships)} บาท</p>
                  </div>
                  <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
                    <p>สิ่งที่เตรียมไว้แล้ว</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>10. เงินฝาก</p>
                    <p>{convertMoney(educationPlan.deposit)} บาท</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>11.กรมธรรม์ที่ครบกำหนด</p>
                    <p>{convertMoney(educationPlan.insuranceFund)} บาท</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>12. อื่นๆ</p>
                    <p>{convertMoney(educationPlan.otherAssets)} บาท</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>13. รวมทุนการศึกษาที่เตรียมไว้แล้ว</p>
                    <p>{TotalPreparationAssets} บาท</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>14. รวมที่ขาดอยู่</p>
                    <p>{convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))} บาท</p>
                  </div>
                  <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
                    <p>ผลลัพธ์</p>
                    <p>{convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))} บาท</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="steps-action h-20 flex flex-col justify-center items-center gap-5">
              <>
                {shareLink && linkButton && <ShareOnSocial
                  link={`https://financial-health-check.azayagencyjourney.com${shareLink}`}
                  linkFavicon={logo}
                  linkTitle={"Education Plan Data"}
                >
                  <button className="bg-[#003781] flex flex-row justify-center items-center gap-5 rounded-full w-[260px] h-10 text-white hover:bg-[#76a1d8]">
                    <img src={exportlink} alt="exportlink" /><p>แชร์ผลสรุป</p>
                  </button>
                </ShareOnSocial>}
                {!linkButton && (
                  <div className='flex flex-row justify-center items-center gap-5'>
                    <Button onClick={goBack} className="bg-white rounded-full w-[120px]">
                      ย้อนกลับ
                    </Button>
                    <Button onClick={() => toone(educationPlan.nickname)} type="primary" className={`bg-[#003781] rounded-full w-[120px]`}>
                      ถัดไป
                    </Button>
                  </div>
                )}
              </>
            </div>
          </div>
        ) : (
          <div>No education plan found.</div>
        )}
      </div>
    </div>
  );
};

export default Vieweducationplan;
