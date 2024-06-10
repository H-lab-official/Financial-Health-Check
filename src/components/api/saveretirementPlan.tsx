import axios from 'axios';
import { RetirementPlanData } from '@/recoil/retirementPlanState';
import { nameState } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data: RetirementPlanData;
  nameData: nameState;
}

export const saveRetirementPlan = async (planData: SaveProtectionPlanData) => {
  try {
    await axios.post(`http://localhost:3000/retirementplan`, planData);
    console.log('Retirement Plan saved successfully');
  } catch (error) {
    console.error('Error saving retirement plan:', error);
  }
};