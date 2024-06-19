import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { sortedSelectedState } from '@/recoil/progressState';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import exportlink from '@/assets/images/exportlink.svg'
import { Button, Typography } from "antd";
import ShareOnSocial from "react-share-on-social";
import logo from '@/assets/images/LOGO.png'
import {
  calculateRequiredScholarships,
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import axios from 'axios';
import { NavBar } from "@/components/navbar";
import Education2 from "@/assets/images/Education2.png"
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
  const convertMoney = (value: any) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  let TotalPreparationAssets = convertMoney(calculateTotalPreparationAssets(educationPlan))
  let RequiredScholarships = convertMoney(calculateRequiredScholarships(educationPlan))

  function toFloat(num: string) {
    const floatValue = parseFloat(num.replace(/,/g, ''))
    return floatValue
  }


  return (
    <div>


      {educationPlan ?
        (
          <div className="flex flex-col justify-center items-center text-[#0E2B81] font-sans">
            <div className=" fixed top-0 z-40"><NavBar /></div>


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
                      <p>1.ระดับการศึกษาที่คาดหวัง</p>
                      <p>{educationPlan.levelOfeducation}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>2.ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง</p>
                      <p>{[
                        { value: "107000.00", label: "รัฐบาล" },
                        { value: "214900.00", label: "เอกชน" },
                        { value: "500000.00", label: "อินเตอร์" },
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
                      <p>3.ค่าเล่าเรียน</p>
                      <p>{convertMoney(educationPlan.typeOfeducation)} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>4.ค่าใช้จ่ายระหว่างศึกษา</p>
                      <p>{convertMoney(
                        (
                          parseFloat(educationPlan.typeOfeducation) * 0.15
                        ).toFixed(2)
                      )} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>5.จำนวนปีการศึกษาของลูกที่จะต้องส่ง</p>
                      <p>{educationPlan.yearsOfeducation} ปี</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>6.อัตราการเฟ้อของค่าเทอมต่อปี</p>
                      <p>{parseFloat(educationPlan.inflationRate) * 100} %</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>7.รวมทุนการศึกษาที่จำเป็น</p>
                      <p>{RequiredScholarships} บาท</p>
                    </div>
                    <div className="flex flex-row justify-start my-6 text-[1.4rem] text-[#0E2B81]">
                      <p>สิ่งที่เตรียมไว้แล้ว</p>

                    </div>
                    <div className="flex flex-row justify-between">
                      <p>8.เงินฝาก</p>
                      <p>{convertMoney(educationPlan.deposit)} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>9.กรมธรรม์ที่ครบกำหนด</p>
                      <p>{convertMoney(educationPlan.insuranceFund)} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>10.อื่นๆ</p>
                      <p>{convertMoney(educationPlan.otherAssets)} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>11.รวมทุนการศึกษาที่เตรียมไว้แล้ว</p>
                      <p>{TotalPreparationAssets} บาท</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>12.รวมที่ขาดอยู่</p>
                      <p>{convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))} บาท</p>
                    </div>
                    <div className="flex flex-row justify-center mt-5 text-red-500 gap-5 font-bold text-[1rem]">
                      <p>ผลลัพธ์</p>
                      <p>{convertMoney(toFloat(RequiredScholarships) - toFloat(TotalPreparationAssets))} บาท</p>
                    </div>
                  </div>
                </div>
                <ShareOnSocial linkFavicon={logo} linkTitle={"Education Plan"}>
                  <Button className="bg-[#003781] flex flex-row justify-center items-center gap-5  rounded-full w-full h-10 text-white"><img src={exportlink} alt="exportlink" /><p>แชร์ผลสรุป</p></Button>
                </ShareOnSocial>
                
              </div>
            </div>
          </div>
        ) : (
          <div>No education plan found.</div>
        )}




    </div>
  );
};

export default Vieweducationplan;
