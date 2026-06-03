import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Bienvenido, {user?.name}</h1>
      <p>Este es tu dashboard.</p>
    </div>
  );
};

export default Dashboard;
