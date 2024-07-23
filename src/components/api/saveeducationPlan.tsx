import axios from 'axios';
import { EducationPlanData } from '@/recoil/educationPlanState';
import { nameData } from '@/recoil/nameState';

interface SaveEducationPlanData {
  data: EducationPlanData;
  nameData: nameData;
}
export const saveEducationplan = async (planData: SaveEducationPlanData) => {
  try {

    const savedData = localStorage.getItem('saveEducationplan');
    let logStatus = 2; // เริ่มต้นด้วย 2 (ไม่สำเร็จ)
    if (savedData) {
      const { nickname, age, gender } = JSON.parse(savedData)
      if (nickname === planData.nameData.nickname && age === planData.nameData.age && gender === planData.nameData.gender) {
        console.log('Data in localStorage is the same as the new data.');
        logStatus = 1; // สำเร็จ
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/educationplan`, planData);
        console.log("response1" + response);
        const dataToStore = {
          id: response.data.id,
          nickname: response.data.nickname,
          age: response.data.age,
          gender :response.data.gender

        };
        localStorage.removeItem('saveEducationplan')
        localStorage.setItem('saveEducationplan', JSON.stringify(dataToStore))
        console.log('Data in localStorage has been updated.');
        logStatus = 1; // สำเร็จ
      }
    } else {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/educationplan`, planData);
      console.log("response2" + response);
      const dataToStore = {
        id: response.data.id,
        nickname: response.data.nickname,
        age: response.data.age,
        gender :response.data.gender
      };
      localStorage.setItem('saveEducationplan', JSON.stringify(dataToStore));
      logStatus = 1; // สำเร็จ
    }
    await logPlanToDB(logStatus, planData.nameData.user_params, 'Educationplan');
  } catch (error) {
    console.error('Error saving Education plan:', error);
    await logPlanToDB(2, planData.nameData.user_params, 'Educationplan');
  }
};
const logPlanToDB = async (status:any, userParams:any, planType:any) => {
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