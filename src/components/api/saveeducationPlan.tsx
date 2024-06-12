import axios from 'axios';
import { EducationPlanData } from '@/recoil/educationPlanState';
import { nameState, nameData } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data: EducationPlanData;
  nameData: nameData;
}

export const saveEducationplan = async (planData: SaveProtectionPlanData) => {
  try {

    const saveData = localStorage.getItem('saveEducationplan')
    if (saveData) {
      const { nickname, age } = JSON.parse(saveData)
      if (nickname === planData.nameData.nickname && age === planData.nameData.age) {
        console.log('Data in localStorage is the same as the new data.');
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/educationplan`, planData);
        console.log("response1" + response);
        const dataToStore = {
          id: response.data.id,
          nickname: response.data.nickname,
          age: response.data.age
        };
        localStorage.removeItem('saveEducationplan')
        localStorage.setItem('saveEducationplan', JSON.stringify(dataToStore))
        console.log('Data in localStorage has been updated.');
      }
    } else {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/educationplan`, planData);
      console.log("response2" + response);
      const dataToStore = {
        id: response.data.id,
        nickname: response.data.nickname,
        age: response.data.age
      };
      localStorage.setItem('saveEducationplan', JSON.stringify(dataToStore));
    }
  } catch (error) {
    console.error('Error saving Education Plan:', error);
  }
};