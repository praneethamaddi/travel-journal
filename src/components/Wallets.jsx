import React, { useState } from 'react';
import backgroundImage from '../assets/4.jpg'; // Import the image

const Wallets = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState({ food: 0, accommodation: 0, transport: 0 });
  const [totalSpent, setTotalSpent] = useState(0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = { amount: parseFloat(amount), category, description, date: new Date().toLocaleDateString() };
    setExpenses([...expenses, newExpense]);
    setTotalSpent(totalSpent + parseFloat(amount));
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const handleBudgetChange = (category) => (e) => {
    setBudget({ ...budget, [category]: parseFloat(e.target.value) });
  };

  const calculateBudgetUsed = (category) => {
    return expenses.filter(exp => exp.category === category).reduce((acc, exp) => acc + exp.amount, 0);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Adjust height as necessary
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        color: 'white' // Text color for better visibility
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h1>Travel Wallet</h1>
        <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px' }}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ flex: 1, padding: '10px' }}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required style={{ padding: '10px' }}>
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="accommodation">Accommodation</option>
              <option value="transport">Transport</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ flex: 1, padding: '10px' }}
            />
            <button type="submit" style={{
              backgroundColor: '#007BFF',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Add Expense</button>
          </div>
        </form>
      </div>

      <div style={{ marginBottom: '20px', width: '100%', maxWidth: '600px' }}>
        <h2>Budgeting Tool</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['food', 'accommodation', 'transport'].map((cat) => (
            <div key={cat} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px' }}>
              <label>{cat.charAt(0).toUpperCase() + cat.slice(1)} Budget:</label>
              <input
                type="number"
                onChange={handleBudgetChange(cat)}
                placeholder="Set Budget"
                style={{ padding: '5px' }}
              />
              <p>Spent: {calculateBudgetUsed(cat)} / {budget[cat]}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2>Expense Summary</h2>
        <p>Total Spent: ${totalSpent.toFixed(2)}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {expenses.map((exp, index) => (
            <div key={index} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
              <p>Date: {exp.date}</p>
              <p>Amount: ${exp.amount}</p>
              <p>Category: {exp.category}</p>
              <p>Description: {exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallets;
