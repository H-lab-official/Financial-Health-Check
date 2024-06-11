import axios from 'axios';
import { questionsData } from '@/recoil/questionsState';
import { nameState,nameData } from '@/recoil/nameState';
interface SaveQuestionPlanData {
  data:  questionsData;
  nameData: nameData;
}

export const saveQuestionsState = async (planData: SaveQuestionPlanData) => {
  try {
   
    const savedData=localStorage.getItem('saveQuestionsState')
    if(savedData){
      const {nickname,age}=JSON.parse(savedData)
      if(nickname===planData.nameData.nickname&&age===planData.nameData.age){
        console.log('Data in localStorage is the same as the new data.');
      }else{
        const response= await axios.post(`http://localhost:3000/importance`, planData);
        console.log("response1"+response);
        const dataToStore = {
          id: response.data.id,
          nickname: response.data.nickname,
          age: response.data.age
        };
        localStorage.removeItem('saveQuestionsState')
        localStorage.setItem('saveQuestionsState',JSON.stringify(dataToStore))
        console.log('Data in localStorage has been updated.');
      }
    }else{
      const response= await axios.post(`http://localhost:3000/importance`, planData);
      console.log("response2"+response);
      const dataToStore = {
        id: response.data.id,
        nickname: response.data.nickname,
        age: response.data.age
      };
      localStorage.setItem('saveQuestionsState', JSON.stringify(dataToStore));
    }
    
  } catch (error) {
    console.error('Error saving Importance:', error);
  }
};