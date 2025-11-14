import { useState, useEffect } from "react";
import DisplayExpenses from "./components/Expenses/DisplayExpenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Login from "./components/Auth/Login";
import * as expenseService from "./services/expenseService";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      const pasredUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(pasredUser);

      expenseService.get(pasredUser.user_id)
        .then(expenses => setExpenses(expenses))
        .catch(err => console.error(err));
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  const addExpenseHandler = expense => {
    console.log(expense)

    expenseService.add(user.user_id, expense)
      .then(() => {
        const [year, month, day] = expense.date.split('-');
        const expenseWithDateObj = {
          ...expense,
          date: new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        };
        setExpenses([expenseWithDateObj, ...expenses]);
      })
      .catch(err => console.error(err));
  };

  if (!user || !token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <span>Welcome, {user.name}! </span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <DisplayExpenses expenses_list={expenses} />
    </div>
  );
};

export default App;
