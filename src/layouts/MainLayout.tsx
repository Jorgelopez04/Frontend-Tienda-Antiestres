import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>{children}</main>
  </>
);

export default MainLayout;
