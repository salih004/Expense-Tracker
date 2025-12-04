import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

// gonna learn about states now!

function ExpenseItem(props) {

  // const [title, setTitle] = useState(props.title);

  // const titleChangeHandler = () => {
  //   setTitle("Updated");
  // }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__controls">
          <div className="expense-item__price">${props.amount}</div>
          <button 
            className="expense-item__delete" 
            onClick={() => props.onDelete && props.onDelete(props.id)}
            title="Delete expense"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"/>
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
