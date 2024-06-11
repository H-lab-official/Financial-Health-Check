import axios from 'axios';
import { HealthPlanData } from '@/recoil/healthPlanState';
import { nameState, nameData } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data: HealthPlanData;
  nameData: nameData;
}

export const savehealthPlan = async (planData: SaveProtectionPlanData) => {
  try {

    const savedData = localStorage.getItem('savehealthPlan');
    if (savedData) {
      const { nickname, age } = JSON.parse(savedData)
      if (nickname === planData.nameData.nickname && age === planData.nameData.age) {
        console.log('Data in localStorage is the same as the new data.');
      } else {
        const response = await axios.post(`http://localhost:3000/healthplan`, planData);
        console.log("response1" + response);
        const dataToStore = {
          id: response.data.id,
          nickname: response.data.nickname,
          age: response.data.age
        };
        localStorage.removeItem('savehealthPlan')
        localStorage.setItem('savehealthPlan', JSON.stringify(dataToStore))
        console.log('Data in localStorage has been updated.');
      }
    } else {
      const response = await axios.post(`http://localhost:3000/healthplan`, planData);
      console.log("response2" + response);
      const dataToStore = {
        id: response.data.id,
        nickname: response.data.nickname,
        age: response.data.age
      };
      localStorage.setItem('savehealthPlan', JSON.stringify(dataToStore));
    }

  } catch (error) {
    console.error('Error saving health plan:', error);
  }
};