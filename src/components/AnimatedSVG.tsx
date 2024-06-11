import React, { useEffect } from 'react';
import anime from 'animejs';

const AnimatedSVG: React.FC = () => {
  useEffect(() => {
    // Animate path
    anime({
      targets: '.path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: true
    });

    // Animate stars
    anime({
      targets: '.stars path',
      translateY: -10,
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .8)',
      duration: 1000,
      delay: anime.stagger(200),
      loop: true
    });
  }, []);

  return (
    <svg width="100%" height="100%" viewBox="0 0 800 100">
      <path className="path" d="M 0,50 C 200,80 400,20 800,50" stroke="#f0f0f0" strokeWidth="2" fill="none" />
      <g className="stars">
        <path fill="#f8b26a" d="M50,20L60,40L80,40L65,55L75,75L50,65L25,75L35,55L20,40L40,40Z" />
        <path fill="#f8b26a" d="M150,10L155,20L165,20L157,27L162,37L150,32L138,37L143,27L135,20L145,20Z" />
        {/* เพิ่มดาวอื่นๆ ตามต้องการ */}
      </g>
    </svg>
  );
};

export default AnimatedSVG;