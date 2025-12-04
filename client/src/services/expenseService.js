import { apiFetch } from './api';

export const get = async (userId) => {
  const response = await apiFetch(`/expense/${userId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch expenses');
  }

  return data.items.map(x => {
    // server stores date as YYYY-MM-DD
    const [year, month, day] = x.date.split('-');
    return {
      id: x.expenseId,
      title: x.title,
      amount: Number(x.amount),
      date: new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    };
  });
};

export const add = async (userId, expense) => {
  const response = await apiFetch(`/expense/${userId}`, {
    method: 'POST',
    body: JSON.stringify(expense)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to add expense');
  }

  // server returns created expense in data.data
  return data;
};

export const deleteExpense = async (userId, expenseId) => {
  const response = await apiFetch(`/expense/${userId}/${expenseId}`, { method: 'DELETE' });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to add expense');
  }

  return data;
};