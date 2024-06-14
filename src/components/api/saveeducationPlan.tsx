import axios from 'axios';
import { EducationPlanData } from '@/recoil/educationPlanState';
import { nameData } from '@/recoil/nameState';

interface SaveEducationPlanData {
  data: EducationPlanData;
  nameData: nameData;
}

// const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const ONE_DAY_IN_MS =  10000;
export const saveEducationplan = async (planData: SaveEducationPlanData) => {
  try {
    const saveData = localStorage.getItem('saveEducationplan');
    const now = new Date().getTime();

    if (saveData) {
      const parsedSaveData = JSON.parse(saveData);
      const { timestamp, nickname, age } = parsedSaveData;

   
      if (now - timestamp > ONE_DAY_IN_MS) {
        console.log('Data in localStorage is expired.');
        localStorage.removeItem('saveEducationplan');
      } else if (nickname === planData.nameData.nickname && age === planData.nameData.age) {
        console.log('Data in localStorage is the same as the new data.');
        return;
      }
    }

    // Data is either expired or different, so proceed to save
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/educationplan`, planData);
    console.log('response', response);

    const dataToStore = {
      id: response.data.id,
      nickname: response.data.nickname,
      age: response.data.age,
      timestamp: now // Add timestamp
    };

    localStorage.setItem('saveEducationplan', JSON.stringify(dataToStore));
    console.log('Data in localStorage has been updated.');
  } catch (error) {
    console.error('Error saving Education Plan:', error);
  }
};
