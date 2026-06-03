import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await AuthService.register(name, email, password);
      login(data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Registro</h2>
      <label>Nombre
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>Contraseña
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Registrar'}</button>
    </form>
  );
};

export default RegisterPage;
