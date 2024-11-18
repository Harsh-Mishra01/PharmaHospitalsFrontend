import React from 'react';
import '../stylesheet/SlidePreloader.css'; // Make sure to create this CSS file

const SlidePreloader = () => {
  return (
    <div className="preloader">
      <div className="slide"></div>
      <div className="slide"></div>
      <div className="slide"></div>
    </div>
  );
};
export default SlidePreloader;