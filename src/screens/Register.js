import { useState, useEffect } from 'react';
import styles from './Register.module.css';
import { useAuthentication } from '../hooks/useAuthentication';

const Register = () => {
  const [displayName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: AuthError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!');
      return;
    }

    const user = {
      displayName,
      email,
      password
    };

    await createUser(user);
  };

  useEffect(() => {
    if (AuthError) {
      setError(AuthError);
    }
  }, [AuthError]);

  return (
    <div className={styles.container}>
      <h2>Cadastre-se para ter Acesso ao Site</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="name"
            value={displayName}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nome do Usuário"
          />
        </label>

        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="E-mail"
          />
        </label>

        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Senha"
          />
        </label>

        <label>
          <span>Confirmar Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Repetir Senha"
          />
        </label>

        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;