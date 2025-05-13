import { useState, useEffect } from 'react';
import styles from './Register.module.css';
import { useAuthentication } from '../hooks/useAuthentication';

const Register = () => {
  const [displayName, setName] = useState('');
  const [displayEmail, setEmail] = useState('');
  const [displayPassword, setPassword] = useState('');
  const [displayConfirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: AuthError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (displayPassword !== displayConfirm) {
      setError('As senhas precisam ser iguais!');
      return;
    }

    const user = {
      displayName,
      email: displayEmail,
      password: displayPassword,
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
            value={displayEmail}
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
            value={displayPassword}
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
            value={displayConfirm}
            onChange={(e) => setConfirm(e.target.value)}
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
