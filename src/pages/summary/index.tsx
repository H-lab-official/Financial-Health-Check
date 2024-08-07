import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { Button } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import update from 'immutability-helper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sortedSelectedState, selectedState } from '@/recoil/progressState';
import { NavBar } from '@/components/navbar';
import { useNavigate } from "react-router";
import { nameState, nameData } from "@/recoil/nameState";
import { saveQuestionsState } from "@/components/api/saveQuestionsState";
import { questionsData } from '@/recoil/questionsState';
import axios from 'axios';
import usePlanNavigation from "@/components/usePlanNavigation";
import DraggableItem from '@/components/DraggableItem';

const getPlansFromLocalStorage = () => {
  const plans = [];
  const questionsState = localStorage.getItem('saveQuestionsState');
  if (questionsState) {
    try {
      const { id } = JSON.parse(questionsState);
      plans.push(`/view/conclusion/${id}`);
    } catch (e) {
      console.error("Error parsing summaryPlan:", e);
    }
  } else {
    console.log("saveQuestionsState not found in localStorage");
  }
  const protectionPlan = localStorage.getItem('saveProtectionPlan');
  if (protectionPlan) {
    try {
      const { id } = JSON.parse(protectionPlan);
      plans.push(`/view/protectionplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveProtectionPlan:", e);
    }
  } else {
    console.log("saveProtectionPlan not found in localStorage");
  }

  const healthPlan = localStorage.getItem('savehealthPlan');
  if (healthPlan) {
    try {
      const { id } = JSON.parse(healthPlan);
      plans.push(`/view/healthplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveHealthPlan:", e);
    }
  } else {
    console.log("saveHealthPlan not found in localStorage");
  }

  const retirementPlan = localStorage.getItem('saveRetirementPlan');
  if (retirementPlan) {
    try {
      const { id } = JSON.parse(retirementPlan);
      plans.push(`/view/retirementplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveRetirementPlan:", e);
    }
  } else {
    console.log("saveRetirementPlan not found in localStorage");
  }

  const educationPlan = localStorage.getItem('saveEducationplan');
  if (educationPlan) {
    try {
      const { id } = JSON.parse(educationPlan);
      plans.push(`/view/educationplan/${id}`);
    } catch (e) {
      console.error("Error parsing saveEducationplan:", e);
    }
  } else {
    console.log("saveEducationplan not found in localStorage");
  }

  console.log("Constructed plans array:", plans);
  try {
    localStorage.setItem('addressPlans', JSON.stringify(plans));
  } catch (e) {
    console.error("Error saving addressPlans to localStorage:", e);
  }

  return plans;
};

const saveAddressPlans = async (plans: string[]) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/addressplan`, { plans });
    console.log("Plans saved successfully:", response.data);
    return response.data.id; // Assuming the API returns an 'id'
  } catch (error) {
    console.error("Error saving plans:", error);
    throw error;
  }
};

const DragDropList: React.FC<{ items: string[], setItems: (items: string[]) => void }> = ({ items, setItems }) => {
  useEffect(() => {
    if (items.length === 1 && items[0] === '5') {
      setItems(['1', '2', '3', '4']);
    }
  }, [items, setItems]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = update(items, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, items[fromIndex]],
      ],
    });
    setItems(updatedItems);
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveItemDown = (index: number) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  };

  return (
    <DndProvider backend={window.innerWidth < 768 ? TouchBackend : HTML5Backend}>
      <div className='flex flex-col justify-center items-center gap-3'>
        {items.map((item, index) => (
          <DraggableItem
            key={index}
            index={index}
            item={item}
            moveItem={moveItem}
            moveItemUp={moveItemUp}
            moveItemDown={moveItemDown}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const Summary: React.FC = () => {
  const [selectedValue, setSelectedValue] = useRecoilState(selectedState);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [items, setItems] = useState<string[]>(sortedSelected);
  const dataname = useRecoilValue<nameData>(nameState);
  const navigator = useNavigate();
  const { plans, goBack, handleFetchPlans, handleSavePlans } = usePlanNavigation();
  const [, setPlans] = useState(plans);

  useEffect(() => {
    if (items.length === 1 && items[0] === '5') {
      setItems(['1', '2', '3', '4']);
    }
  }, [items]);

  console.log(items);

  const fullDetails = async () => {
    const plansFromLocalStorage = getPlansFromLocalStorage();
    console.log(plansFromLocalStorage);

    setPlans(plansFromLocalStorage);

    // Save plans to the database and get the id
    const id = await saveAddressPlans(plansFromLocalStorage);
    // Save the id to localStorage
    localStorage.setItem('linkshare', id);
  };

  const toone = () => {
    return new Promise<void>((resolve) => {
      const storedPlans = JSON.parse(localStorage.getItem('addressPlans') || '[]');
      if (storedPlans.length > 0) {
        const nextPlan = storedPlans[0];
        window.open(nextPlan, '_self');
        resolve();
      } else {
        console.log('No more plans to navigate to.');
        resolve();
      }
    });
  };

  const next = async () => {
    await fullDetails();
    toone();
  };

  const handleSave = async () => {
    setSelectedValue(items);
    const dataToSave = mapItemsToQuestionsData(items);

    // ดึงค่าจาก localStorage
    const beforeImport = JSON.parse(localStorage.getItem('beforeImport') || '{}');

    // รวมค่าใน beforeImport เข้าไปใน dataToSave
    const finalDataToSave = { ...dataToSave, ...beforeImport };

    console.log(finalDataToSave);

    await saveQuestionsState({ data: finalDataToSave, nameData: dataname });
    next();
  };

  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className="fixed top-0 z-40"><NavBar /></div>
      <div className="bg-white rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3">
        <div className='text-[#0E2B81] text-2xl flex justify-center'>กรุณาจัดลำดับความสำคัญ</div>
        <DragDropList items={items} setItems={setItems} />
      </div>
      <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
        <Button className={`bg-[#003781] text-white rounded-full w-[280px]`} onClick={handleSave}>
          สรุปผล
        </Button>
      </div>
    </div>
  );
};

export default Summary;

// ฟังก์ชัน mapItemsToQuestionsData
const mapItemsToQuestionsData = (items: string[]): questionsData => {
  const data: questionsData = {
    educationPlanOrder: 0,
    healthPlanOrder: 0,
    protectionPlanOrder: 0,
    retirementPlanOrder: 0,
  };

  items.forEach((item) => {
    const order = Number(item);
    switch (order) {
      case 1:
        data.protectionPlanOrder = items.indexOf(item) + 1;
        break;
      case 2:
        data.healthPlanOrder = items.indexOf(item) + 1;
        break;
      case 3:
        data.retirementPlanOrder = items.indexOf(item) + 1;
        break;
      case 4:
        data.educationPlanOrder = items.indexOf(item) + 1;
        break;
      default:
        break;
    }
  });

  return data;
};
