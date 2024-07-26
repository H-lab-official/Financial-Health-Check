import { useLocalStorage } from './localStoreage';
import logo from '@/assets/images/LOGO.png'
import iconhome from '@/assets/images/iconhome.png'
import { useRecoilValue } from 'recoil';
import { nameState } from '@/recoil/nameState';
import { educationPlanState } from '@/recoil/educationPlanState';
import { healthPlanState } from '@/recoil/healthPlanState';
import { protectionPlanState } from '@/recoil/protectionPlanState';
import { questionsState } from '@/recoil/questionsState';
import { retirementPlanState } from '@/recoil/retirementPlanState';
import { useNavigate, useLocation } from "react-router";
export const NavBar = () => {
    const { saveData } = useLocalStorage();
    const name = useRecoilValue(nameState);
    const educationPlan = useRecoilValue(educationPlanState);
    const healthPlan = useRecoilValue(healthPlanState);
    const protection = useRecoilValue(protectionPlanState);
    const questions = useRecoilValue(questionsState);
    const retirement = useRecoilValue(retirementPlanState);
    const navigator = useNavigate();
    const handleSaveData = () => {
        saveData({
            nickname: name.nickname,
            age: name.age,
            educationPlan: {
                levelOfeducation: educationPlan.levelOfeducation,
                typeOfeducation: educationPlan.typeOfeducation,
                yearsOfeducation: educationPlan.yearsOfeducation,
                inflationRate: educationPlan.inflationRate,
                deposit: educationPlan.deposit,
                insuranceFund: educationPlan.insuranceFund,
                otherAssets: educationPlan.otherAssets,
            },
            healthPlan: {
                hospitals: healthPlan.hospitals,
                dailyCompensationFromWelfare: healthPlan.dailyCompensationFromWelfare,
                treatingSeriousIllness: healthPlan.treatingSeriousIllness,
                emergencyCosts: healthPlan.emergencyCosts,
                annualTreatment: healthPlan.annualTreatment,
                roomFeeFromCompany: healthPlan.roomFeeFromCompany,
                dailyCompensationFromCompany: healthPlan.dailyCompensationFromCompany,
                treatingSeriousIllnessFromCompany: healthPlan.treatingSeriousIllnessFromCompany,
                emergencyCostsFromCompany: healthPlan.emergencyCostsFromCompany,
                annualTreatmentFromCompany: healthPlan.annualTreatmentFromCompany,
            },
            protection: {
                initialMonthlyExpense: protection.initialMonthlyExpense,
                numberOfYears: protection.numberOfYears,
                adjustedYearlyExpenses: protection.adjustedYearlyExpenses,
                inflationRate: protection.inflationRate,
                homePayments: protection.homePayments,
                carPayments: protection.carPayments,
                otherDebts: protection.otherDebts,
                bankDeposit: protection.bankDeposit,
                lifeInsuranceFund: protection.lifeInsuranceFund,
                otherAssets: protection.otherAssets
            },
            questions,
            retirement: {
                livingCosts: retirement.livingCosts,
                houseCosts: retirement.houseCosts,
                internetCosts: retirement.internetCosts,
                clothingCosts: retirement.clothingCosts,
                medicalCosts: retirement.medicalCosts,
                otherCosts: retirement.otherCosts,
                age: retirement.age,
                retireAge: retirement.retireAge,
                lifExpectancy: retirement.lifExpectancy,
                inflationRate: retirement.inflationRate,
                deposit: retirement.deposit,
                insuranceFund: retirement.insuranceFund,
                otherAssets: retirement.otherAssets
            },
        });
        window.location.href = 'https://azayagencyjourney.com/tools';
    };

    return (
        <div className='flex flex-row justify-between items-center py-4 w-[400px] px-2 bg-white mb-2'>
            <div className='flex flex-row items-center gap-2'>
                <img src={logo} alt="logo" />
                <div className='flex flex-col'>
                    <p className='text-[0.9rem] font-bold'>AGENCY JOURNEY</p>
                    <p className='text-[0.7rem] font-semibold'>ALLIANZ BOARDING</p>
                </div>
            </div>
            <button
                onClick={handleSaveData}
                className='border flex flex-row border-[#0E2B81] justify-center items-center rounded-full w-[200px] h-8 gap-1'
            >
                <img src={iconhome} alt="iconhome" />
                <p className='text-[0.8rem]'>กลับสู่เว็บไซต์ Agency Journey</p>
            </button>
        </div>
    );
};