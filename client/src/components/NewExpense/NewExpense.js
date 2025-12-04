import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {

  const saveExpenseDataHandler = (enteredExpenseData) => {
    props.onAddExpense(enteredExpenseData);
  }

  const [vis, setVis] = useState(false);

  const AddNewExpenseButtonHandler = () => {
    setVis(true);
  };

  return (
    <div className="new-expense">

      {!vis && (<button onClick={AddNewExpenseButtonHandler}>Add New Expense</button>)}

      {vis && <ExpenseForm visibility={setVis} onSaveExpenseData={saveExpenseDataHandler} />}

    </div>
  );
};

export default NewExpense;

