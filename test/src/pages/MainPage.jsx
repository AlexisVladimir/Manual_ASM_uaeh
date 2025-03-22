import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const MainPage = () => {
  const [selectedCode, setSelectedCode] = useState(null);

  return (
    <div className="main-page">
      <Sidebar onSelect={setSelectedCode} />
      <MainContent code={selectedCode} />
    </div>
  );
};

export default MainPage;