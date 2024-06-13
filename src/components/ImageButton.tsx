import React, { useState, useEffect } from 'react';

interface ImageButtonProps {
  normalImage: string;
  hoverImage: string;
  activeImage: string;
  selectedImage: string;
  selected: boolean;
  width: string; // e.g., "80px"
  height: string; // e.g., "80px"
}

const ImageButton: React.FC<ImageButtonProps> = ({ 
  normalImage, 
  hoverImage, 
  activeImage, 
  selectedImage, 
  selected, 
  width, 
  height 
}) => {
  const [image, setImage] = useState<string>(normalImage);

  useEffect(() => {
    if (selected) {
      setImage(selectedImage);
    } else {
      setImage(normalImage);
    }
  }, [selected, normalImage, selectedImage]);

  return (
    <div
      className=" rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: width,
        height: height,
      }}
      onMouseEnter={() => !selected && setImage(hoverImage)}
      onMouseLeave={() => !selected && setImage(normalImage)}
      onMouseDown={() => !selected && setImage(activeImage)}
      onMouseUp={() => !selected && setImage(hoverImage)}
    >
    </div>
  );
};

export default ImageButton;
