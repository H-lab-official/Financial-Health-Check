import axios from 'axios';
import { RetirementPlanData } from '@/recoil/retirementPlanState';
import { nameState,nameData } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data: RetirementPlanData;
  nameData: nameData;
}
export const saveRetirementPlan = async (planData: SaveProtectionPlanData) => {
  try {
   
  const savedData=localStorage.getItem('saveRetirementPlan')
  if(savedData){
    const {nickname,age}=JSON.parse(savedData)
    if(nickname===planData.nameData.nickname&&age===planData.nameData.age){
      console.log('Data in localStorage is the same as the new data.');
    }else{
      const response= await axios.post(`${import.meta.env.VITE_API_URL}/retirementplan`, planData);
   console.log("response1"+response);
   const dataToStore = {
    id: response.data.id,
    nickname: response.data.nickname,
    age: response.data.age
  };
      localStorage.removeItem('saveRetirementPlan')
      localStorage.setItem('saveRetirementPlan',JSON.stringify(dataToStore))
      console.log('Data in localStorage has been updated.');
    }
  }else{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/retirementplan`, planData);
   console.log("response2"+response);
   const dataToStore = {
    id: response.data.id,
    nickname: response.data.nickname,
    age: response.data.age
  };
    localStorage.setItem('saveRetirementPlan', JSON.stringify(dataToStore));
  }   
  } catch (error) {
    console.error('Error saving retirement plan:', error);
  }
};