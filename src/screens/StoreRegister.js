import { useState, useEffect } from 'react';
import styles from './StoreRegister.module.css';
import { useAuthentication } from '../hooks/useAuthentication';

const StoreRegister = () => {
  const [form, setForm] = useState({
    nomeLoja: '',
    endereco: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { registerStore, error: authError, loading } = useAuthentication();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (form.uf.length !== 2) {
      setError('UF deve ter 2 caracteres');
      return;
    }

    if (form.telefone.length < 11) {
      setError('Telefone inválido');
      return;
    }

    try {
      await registerStore(form);
      setSuccess(true);
      // Limpa o formulário após o sucesso
      setForm({
        nomeLoja: '',
        endereco: '',
        cidade: '',
        uf: '',
        telefone: '',
        email: ''
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.container}>
      <h2>Cadastro de Loja</h2>
      {success && (
        <div className={styles.success}>
          Loja cadastrada com sucesso!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome da Loja:</span>
          <input
            type="text"
            name="nomeLoja"
            value={form.nomeLoja}
            onChange={handleChange}
            required
            placeholder="Ex: Hamburgueria do Zé"
          />
        </label>

        <label>
          <span>Endereço:</span>
          <input
            type="text"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            required
            placeholder="Ex: Rua das Flores, 123"
          />
        </label>

        <label>
          <span>Cidade:</span>
          <input
            type="text"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            required
            placeholder="Ex: São Paulo"
          />
        </label>

        <div className={styles.row}>
          <label className={styles.half}>
            <span>UF:</span>
            <input
              type="text"
              name="uf"
              value={form.uf}
              onChange={handleChange}
              required
              maxLength={2}
              placeholder="Ex: SP"
            />
          </label>

          <label className={styles.half}>
            <span>Telefone:</span>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              required
              placeholder="Ex: (11) 99999-9999"
            />
          </label>
        </div>

        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Ex: contato@loja.com"
          />
        </label>

        {!loading && (
          <button className={styles.btn} type="submit">
            Cadastrar Loja
          </button>
        )}
        {loading && (
          <button className={styles.btn} disabled>
            Aguarde...
          </button>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default StoreRegister;