import axios from 'axios';
import { questionsData } from '@/recoil/questionsState';
import { nameState } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data:  questionsData;
  nameData: nameState;
}

export const saveQuestionsState = async (planData: SaveProtectionPlanData) => {
  try {
    await axios.post(`http://localhost:3000/importance`, planData);
    console.log('Importance saved successfully');
  } catch (error) {
    console.error('Error saving Importance:', error);
  }
};