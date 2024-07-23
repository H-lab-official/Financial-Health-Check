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
    let logStatus = 2; // เริ่มต้นด้วย 2 (ไม่สำเร็จ)
    if (savedData) {
      const { nickname, age } = JSON.parse(savedData);
      if ( nickname === planData.nameData.nickname && age === planData.nameData.age) {
        console.log('Data in localStorage is the same as the new data.');
        logStatus = 1; // สำเร็จ
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
        logStatus = 1; // สำเร็จ
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
      logStatus = 1; // สำเร็จ
    }
    await logPlanToDB(logStatus, planData.nameData.user_params, 'ProtectionPlan');  
  } catch (error) {
    console.error('Error saving protection plan:', error);
    await logPlanToDB(2, planData.nameData.user_params, 'ProtectionPlan'); 
  }
};
const logPlanToDB = async (status, userParams, planType) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/planlogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_params: userParams,
        status: status,
        planType: planType,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to log plan');
    }

    const data = await response.json();
    console.log('Plan log saved:', data);
  } catch (error) {
    console.error('Error logging plan:', error);
  }
};
