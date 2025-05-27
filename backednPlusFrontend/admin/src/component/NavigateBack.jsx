import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './NavigateBack.scss'; // Make sure to create this file

const NavigateBack = ({pageName="Page"}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 👈 This correctly goes one step back in history
  };

  return (
    <div className='Back-main' >
    <div className="aware-div" onClick={handleGoBack}>
      <ArrowLeft className="back-icon"  />
    </div>
    <div className='Page-text'>{pageName}</div>
    </div>
  );
};

export default NavigateBack;
