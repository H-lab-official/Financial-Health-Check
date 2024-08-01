import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { Button } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sortedSelectedState, selectedState } from '@/recoil/progressState';
import { NavBar } from '@/components/navbar';
import pic1 from '@/assets/images/icons/1.png';
import pic2 from '@/assets/images/icons/2.png';
import pic3 from '@/assets/images/icons/3.png';
import pic4 from '@/assets/images/icons/4.png';
import { useNavigate } from "react-router";
import { nameState, nameData } from "@/recoil/nameState";
import { saveQuestionsState } from "@/components/api/saveQuestionsState";

import { questionsData } from '@/recoil/questionsState';

const ItemType = 'ITEM';
const imageMap = {
  '1': pic1,
  '2': pic2,
  '3': pic3,
  '4': pic4,
};

interface DraggableItemProps {
  item: string;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
  moveItemUp: (index: number) => void;
  moveItemDown: (index: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index, moveItem, moveItemUp, moveItemDown }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const image = imageMap[item as keyof typeof imageMap];

  return (
    <div ref={(node) => ref(drop(node))} className='cursor-move relative w-full flex flex-row items-center justify-start'>
      <img src={image} alt={`icon-${index}`} className='w-full' />
      <div className='absolute flex flex-col scale-150 right-1'>
        <button onClick={() => moveItemUp(index)} className=''>⬆️</button>
        <button onClick={() => moveItemDown(index)} className=''>⬇️</button>
      </div>
    </div>
  );
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
    <DndProvider backend={HTML5Backend}>
      <div>
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

  useEffect(() => {
    if (items.length === 1 && items[0] === '5') {
      setItems(['1', '2', '3', '4']);
    }
  }, [items]);
console.log(items);

const handleSave = async () => {
  setSelectedValue(items);
  const dataToSave = mapItemsToQuestionsData(items);

  // ดึงค่าจาก localStorage
  const beforeImport = JSON.parse(localStorage.getItem('beforeImport') || '{}');

  // รวมค่าใน beforeImport เข้าไปใน dataToSave
  const finalDataToSave = { ...dataToSave, ...beforeImport };

  console.log(finalDataToSave);
  
  await saveQuestionsState({ data: finalDataToSave, nameData: dataname });
  navigator("/showdata");
};
  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className="fixed top-0 z-40"><NavBar /></div>
      <div className="bg-white rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3">
        <DragDropList items={items} setItems={setItems} />
      </div>
      <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
        <Button className={`bg-white rounded-full w-[120px]`}>
          ย้อนกลับ
        </Button>
        <Button className={`bg-[#003781] text-white rounded-full w-[120px]`} onClick={handleSave}>
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
