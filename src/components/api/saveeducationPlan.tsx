import axios from 'axios';
import { EducationPlanData } from '@/recoil/educationPlanState';
import { nameState } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data: EducationPlanData;
  nameData: nameState;
}

export const saveEducationplan = async (planData: SaveProtectionPlanData) => {
  try {
    await axios.post(`http://localhost:3000/educationplan`, planData);
    console.log('Education plan saved successfully');
  } catch (error) {
    console.error('Error saving Education Plan:', error);
  }
};