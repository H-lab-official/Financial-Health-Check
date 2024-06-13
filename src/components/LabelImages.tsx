import React from 'react';
import ImageButton from './ImageButton'; // Adjust the import path as needed

interface LabelImagesProps {
  selectedValue: string[];
  handleOptionChange: (value: string) => void;
  normalImage: string;
  hoverImage: string;
  activeImage: string;
  selectedImage: string;
  value: string;
  width: string; // e.g., "80px"
  height: string; // e.g., "80px"
}

const LabelImages: React.FC<LabelImagesProps> = ({
  selectedValue,
  handleOptionChange,
  normalImage,
  hoverImage,
  activeImage,
  selectedImage,
  value,
  width,
  height,
}) => {
  const isSelected = selectedValue.includes(value);

  return (
    <label className="custom-checkbox flex justify-start items-center cursor-pointer">
      <input
        type="checkbox"
        value={value}
        checked={isSelected}
        onChange={() => handleOptionChange(value)}
        className="hidden"
      />
      <div className="flex flex-col">
        <ImageButton
          normalImage={normalImage}
          hoverImage={hoverImage}
          activeImage={activeImage}
          selectedImage={selectedImage}
          selected={isSelected}
          width={width}
          height={height}
        />
      </div>
    </label>
  );
};

export default LabelImages;
