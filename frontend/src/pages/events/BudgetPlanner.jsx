import React, { useState } from "react";
import "./BudgetPlanner.css";

const categories = [
  { name: "Catering", spent: 12000, allocated: 15000 },
  { name: "Marketing", spent: 4500, allocated: 5000 },
  { name: "Venue", spent: 10200, allocated: 10000 },
  { name: "Logistics", spent: 5750, allocated: 15000 }
];

const initialExpenseTable = [
  { name: "Main Hall Rental", category: "Venue", date: "Oct 12, 2023", amount: 8500, status: "Paid" },
  { name: "Premium Hors D'oeuvres", category: "Catering", date: "Oct 14, 2023", amount: 4200, status: "Pending" },
  { name: "Social Media Ads Bundle", category: "Marketing", date: "Oct 15, 2023", amount: 1250, status: "Paid" },
  { name: "Audiovisual Equipment", category: "Logistics", date: "Oct 18, 2023", amount: 3100, status: "Pending" }
];

export default function BudgetPlanner() {
  const [expenses, setExpenses] = useState([{ category: "Catering", cost: "", note: "" }]);
  const [funds, setFunds] = useState([{ source: "Sponsor", amount: "", note: "" }]);
  const [expenseTable, setExpenseTable] = useState(initialExpenseTable);

  // Expense functions
  const addExpense = () => setExpenses([...expenses, { category: "", cost: "", note: "" }]);
  const deleteExpense = (i) => setExpenses(expenses.filter((_, index) => index !== i));
  const updateExpense = (i, field, value) => {
    const updated = [...expenses];
    updated[i][field] = value;
    setExpenses(updated);
  };

  // Fund functions
  const addFund = () => setFunds([...funds, { source: "", amount: "", note: "" }]);
  const deleteFund = (i) => setFunds(funds.filter((_, index) => index !== i));
  const updateFund = (i, field, value) => {
    const updated = [...funds];
    updated[i][field] = value;
    setFunds(updated);
  };

  // Table functions
  const togglePaid = (index) => {
    const updated = [...expenseTable];
    updated[index].status = updated[index].status === "Paid" ? "Pending" : "Paid";
    setExpenseTable(updated);
  };

  // Calculations
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.cost || 0), 0);
  const totalFunds = funds.reduce((sum, f) => sum + Number(f.amount || 0), 0);
  const totalBudget = totalFunds;
  const totalSpent = totalExpenses;
  const remaining = totalBudget - totalSpent;
  const utilization = totalBudget ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="bp-container">

      {/* Page Header */}
      <div className="bp-page-header">
        <h1>Budget Planner</h1>
        <button className="bp-back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      {/* Summary Cards */}
      <div className="bp-summary">
        <div className="bp-card">
          <div className="bp-card-header">
            <span className="bp-card-icon">💰</span>
            <span className="bp-card-label">Total Budget</span>
          </div>
          <h2>${totalBudget.toFixed(2)}</h2>
        </div>

        <div className="bp-card">
          <div className="bp-card-header">
            <span className="bp-card-icon">💸</span>
            <span className="bp-card-label">Total Spent</span>
          </div>
          <h2>${totalSpent.toFixed(2)}</h2>
        </div>

        <div className="bp-card">
          <div className="bp-card-header">
            <span className="bp-card-icon">📊</span>
            <span className="bp-card-label">Remaining</span>
          </div>
          <h2>${remaining.toFixed(2)}</h2>
        </div>
      </div>

      <div className="bp-progress-bar">
        <div className="bp-progress" style={{ width: `${utilization}%` }}></div>
      </div>

      {/* Expenses */}
      <div className="bp-allocation-section">
        <div className="bp-allocation-header">
          <h2>Expenses</h2>
          <button className="bp-add-btn" onClick={addExpense}>+ Add Expense</button>
        </div>
        {expenses.map((item, i) => (
          <div key={i} className="bp-allocation-row">
            <input type="text" placeholder="Category" value={item.category} onChange={(e) => updateExpense(i, "category", e.target.value)} />
            <input type="number" placeholder="$0.00" value={item.cost} onChange={(e) => updateExpense(i, "cost", e.target.value)} />
            <input type="text" placeholder="Notes" value={item.note} onChange={(e) => updateExpense(i, "note", e.target.value)} />
            <button className="bp-delete-btn" onClick={() => deleteExpense(i)}>🗑</button>
          </div>
        ))}
      </div>

      {/* Funds */}
      <div className="bp-allocation-section">
        <div className="bp-allocation-header">
          <h2>Funds</h2>
          <button className="bp-add-btn" onClick={addFund}>+ Add Fund</button>
        </div>
        {funds.map((item, i) => (
          <div key={i} className="bp-allocation-row">
            <input type="text" placeholder="Source" value={item.source} onChange={(e) => updateFund(i, "source", e.target.value)} />
            <input type="number" placeholder="$0.00" value={item.amount} onChange={(e) => updateFund(i, "amount", e.target.value)} />
            <input type="text" placeholder="Notes" value={item.note} onChange={(e) => updateFund(i, "note", e.target.value)} />
            <button className="bp-delete-btn" onClick={() => deleteFund(i)}>🗑</button>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h2>Expense Categories</h2>
      <div className="bp-categories">
        {categories.map((cat, index) => (
          <div key={index} className="bp-category-card">
            <div className="bp-category-header">
              <span className="bp-category-icon">📌</span>
              <span className="bp-category-label">{cat.name}</span>
            </div>
            <p>${cat.spent.toLocaleString()}</p>
            <small>Allocated: ${cat.allocated.toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* Detailed Table */}
      <h2>Detailed Expenses</h2>
      <table className="bp-table">
        <thead>
          <tr>
            <th>Paid</th>
            <th>Expense</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenseTable.map((exp, index) => (
            <tr key={index} className="bp-expense-row">
              <td>
                <input type="checkbox" checked={exp.status === "Paid"} onChange={() => togglePaid(index)} />
              </td>
              <td>{exp.name}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>${exp.amount.toLocaleString()}</td>
              <td className={exp.status === "Paid" ? "bp-paid" : "bp-pending"}>{exp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}