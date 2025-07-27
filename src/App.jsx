import React, { useEffect, useState } from 'react';
import axios from 'axios';


const baseURL = 'https://crud-backend-ondb.onrender.com/api';


function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: '', title: '', content: '' });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseURL}/display`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${baseURL}/create`, form);
      fetchData();
      setForm({ id: '', title: '', content: '' });
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/delete/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`${baseURL}/modify/${form.id}`, form);
      fetchData();
      setForm({ id: '', title: '', content: '' });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛠️ Simple React CRUD</h1>

      <div style={styles.formContainer}>
        <input style={styles.input} placeholder="ID" name="id" value={form.id} onChange={handleChange} />
        <input style={styles.input} placeholder="Title" name="title" value={form.title} onChange={handleChange} />
        <textarea style={styles.textarea} placeholder="Content" name="content" value={form.content} onChange={handleChange}></textarea>

        <div style={styles.buttonGroup}>
          <button style={{ ...styles.button, backgroundColor: '#4CAF50' }} onClick={handleCreate}>Create</button>
          <button style={{ ...styles.button, backgroundColor: '#2196F3' }} onClick={handleUpdate}>Update</button>
        </div>
      </div>

      <h2 style={{ marginTop: '2rem' }}>📦 All Data:</h2>
      <div style={styles.cardContainer}>
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Content:</strong> {item.content}</p>
            <button style={{ ...styles.button, backgroundColor: '#f44336' }} onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginBottom: '2rem',
    padding: '1rem',
    borderRadius: '10px',
    background: '#f0f0f0',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    height: '80px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  button: {
    padding: '10px 16px',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    background: '#fafafa',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
};

export default App;
