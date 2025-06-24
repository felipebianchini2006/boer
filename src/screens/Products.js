import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './Products.module.css';

const Products = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]); // Adicionado para armazenar as marcas
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const productCollection = collection(db, 'products');
  const brandCollection = collection(db, 'brands');

  // Carrega produtos e marcas
  useEffect(() => {
    const qProducts = query(productCollection, orderBy('createdAt', 'desc'));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    });

    const qBrands = query(brandCollection, orderBy('name'));
    const unsubscribeBrands = onSnapshot(qBrands, (snapshot) => {
      const brandList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrands(brandList);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeBrands();
    };
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim() || !brand.trim() || !unit.trim()) {
      setMessage('Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        const productRef = doc(db, 'products', editId);
        await updateDoc(productRef, { name, price, brand, unit });
        setMessage('Produto atualizado com sucesso!');
        setEditId(null);
      } else {
        await addDoc(productCollection, {
          name,
          price,
          brand,
          unit,
          createdAt: Timestamp.now(),
        });
        setMessage('Produto cadastrado com sucesso!');
      }

      setName('');
      setPrice('');
      setBrand('');
      setUnit('');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setMessage('Erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setUnit(product.unit);
    setEditId(product.id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmDelete) return;

    try {
      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);
      setMessage('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage('Erro ao excluir o produto.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.formWrapper}>
      <h2><center>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</center></h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        >
          <option value="">Selecione uma marca</option>
          {brands.map((brandItem) => (
            <option key={brandItem.id} value={brandItem.name}>
              {brandItem.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Unidade (ex: kg, un, l)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <button type="submit" className={styles.btn} disabled={loading}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {message && <p>{message}</p>}

      <h3>Produtos Cadastrados:</h3>
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} - R$ {product.price} por {product.unit} ({product.brand})
              {product.createdAt && (
                <small style={{ marginLeft: '10px', color: '#666' }}>
                  ({product.createdAt.toDate().toLocaleDateString()})
                </small>
              )}
            </span>
            <div>
              <button onClick={() => handleEdit(product)} className={styles.btnEdit}>Editar</button>
              <button onClick={() => handleDelete(product.id)} className={styles.btnDelete}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;