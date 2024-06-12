import axios from 'axios';
import {ProtectionPlanData} from '@/recoil/protectionPlanState'
import { nameState,nameData } from '@/recoil/nameState';

interface SaveProtectionPlanData {
  data: ProtectionPlanData;
  nameData: nameData;
}

export const saveProtectionPlan = async (planData: SaveProtectionPlanData) => {
  try {
    const savedData = localStorage.getItem('saveProtectionPlan');
    if (savedData) {
      const { nickname, age } = JSON.parse(savedData);
      if ( nickname === planData.nameData.nickname && age === planData.nameData.age) {
        console.log('Data in localStorage is the same as the new data.');
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/protection`, planData);
       console.log("response1"+response);
       
        const dataToStore = {
          id: response.data.id,
          nickname: response.data.nickname,
          age: response.data.age
        };
        localStorage.removeItem('saveProtectionPlan');
        localStorage.setItem('saveProtectionPlan', JSON.stringify(dataToStore));
        console.log('Data in localStorage has been updated.');
      }
    } else {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/protection`, planData);
      console.log("response2"+response);
      const dataToStore = {
        id: response.data.id,
        nickname: response.data.nickname,
        age: response.data.age
      };
      localStorage.setItem('saveProtectionPlan', JSON.stringify(dataToStore));
    }
  } catch (error) {
    console.error('Error saving protection plan:', error);
  }
};
