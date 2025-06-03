import { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.container}>
      <h2>Faça seu login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </label>
        
        <label className={styles.label}>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        
        {!loading ? (
          <button type="submit" className={styles.btn}>
            Entrar
          </button>
        ) : (
          <button className={styles.btn} disabled>
            Aguarde...
          </button>
        )}
        
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;