import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import update from 'immutability-helper';
import DraggableItem from './DraggableItem';

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
      <div className="flex flex-col justify-center items-center gap-3">
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

export default DragDropList;
