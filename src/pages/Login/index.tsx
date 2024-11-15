import React, { useState } from 'react';

// Definindo os tipos para o estado do formulário
interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Função para lidar com a mudança de valores nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função de validação do formulário
  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setError('Todos os campos são obrigatórios.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido.');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return false;
    }

    setError('');
    return true;
  };

  // Função de login (simulação de autenticação)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    // Simulação de autenticação (substitua com lógica real)
    setTimeout(() => {
      if (formData.email === 'user@example.com' && formData.password === 'password123') {
        setIsAuthenticated(true);
        alert('Login realizado com sucesso!');
      } else {
        setError('Credenciais inválidas.');
      }
      setIsLoading(false);
    }, 1000); // Simula um delay de autenticação
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {isAuthenticated && <p>Bem-vindo de volta!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

