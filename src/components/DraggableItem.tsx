import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Up from '@/assets/images/up.png';
import Down from '@/assets/images/down.png';
import pic1 from '@/assets/images/icons/1.png';
import pic2 from '@/assets/images/icons/2.png';
import pic3 from '@/assets/images/icons/3.png';
import pic4 from '@/assets/images/icons/4.png';

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
    <div ref={(node) => ref(drop(node))} className="relative w-full flex flex-row items-center justify-start p-2 border rounded-lg shadow-md cursor-move bg-white">
      <div className="flex-grow flex items-center">
        <img src={image} alt={`icon-${index}`} className="w-[90%]" />
       
      </div>
      <div className="absolute flex flex-col right-1">
        <button onClick={() => moveItemUp(index)} className="mb-1 p-1 bg-gray-200 rounded">
          <img src={Up} alt="Up" className="w-4 h-4" />
        </button>
        <button onClick={() => moveItemDown(index)} className="p-1 bg-gray-200 rounded">
          <img src={Down} alt="Down" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DraggableItem;
