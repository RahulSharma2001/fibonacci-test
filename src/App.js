import { useEffect, useState } from "react";

function App() {
  const [limit, setLimit] = useState(20);
  const [loadMore, setLoadMore] = useState(true);
  const [todoItems, setTodoItems] = useState([]);

  const url = `https://dummyjson.com/todos?limit=${limit}&skip=0`;

  const fetchData = async () => {
    if (limit >= 100) {
      setLoadMore(false);
      return;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.todos);
        setTodoItems(data.todos);
      })
      .catch((e) => console.log(e));
  };

  const handleClick = () => {
    setLimit(limit + 20);
  };

  const markComplete = (index) => {
    const tempArray = [...todoItems];
    if (tempArray[index].completed === true) {
      tempArray[index].completed = false;
    } else {
      tempArray[index].completed = true;
    }

    setTodoItems(tempArray);
    console.log("after Updated", todoItems);
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <div className="App">
      <div className="top">
        <div className="item-number">
          <h2>Total : {limit}</h2>
        </div>
      </div>
      <div className="todo-container">
        {todoItems.map((item, index) => {
          return (
            <div className="todo" key={index}>
              <p>{item.todo}</p>
              <p>{item.completed === true ? "True" : "False"}</p>
              <button onClick={() => markComplete(index)}>
                {item.completed === true ? "Mark Incomplete" : "Mark Complete"}
              </button>
            </div>
          );
        })}

        <div className="next">
          {loadMore && <button onClick={handleClick}>Load More</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
