import axios from 'axios';
import { HealthPlanData } from '@/recoil/healthPlanState';
import { nameState } from '@/recoil/nameState';
interface SaveProtectionPlanData {
  data: HealthPlanData;
  nameData: nameState;
}

export const savehealthPlan = async (planData: SaveProtectionPlanData) => {
  try {
    await axios.post(`http://localhost:3000/healthplan`, planData);
    console.log('Health Plan saved successfully');
  } catch (error) {
    console.error('Error saving health plan:', error);
  }
};