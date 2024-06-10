import axios from 'axios';
import {ProtectionPlanData} from '@/recoil/protectionPlanState'
import { nameState } from '@/recoil/nameState';

interface SaveProtectionPlanData {
  data: ProtectionPlanData;
  nameData: nameState;
}

export const saveProtectionPlan = async (planData: SaveProtectionPlanData) => {
  try {
    await axios.post(`http://localhost:3000/protection`, planData);
    console.log('Protection plan saved successfully');
  } catch (error) {
    console.error('Error saving protection plan:', error);
  }
};