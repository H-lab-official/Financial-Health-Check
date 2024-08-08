import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Up from '@/assets/images/up.png';
import Down from '@/assets/images/down.png';
import pic1 from '@/assets/images/icons/1.png';
import pic2 from '@/assets/images/icons/2.png';
import pic3 from '@/assets/images/icons/3.png';
import pic4 from '@/assets/images/icons/4.png';
import '@/components/css/DraggableItem.css'
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
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => ref(drop(node))} className="draggable-item" style={{ opacity }}>
      <img src={image} alt={`icon-${index}`} className="w-full draggable-item-image " />
      {/* <div className="draggable-item-controls">
        <button onClick={() => moveItemUp(index)} className="control-button"><img src={Up} alt="Up" className="control-icon" /></button>
        <button onClick={() => moveItemDown(index)} className="control-button"><img src={Down} alt="Down" className="control-icon" /></button>
      </div> */}
    </div>
  );
};

export default DraggableItem;
