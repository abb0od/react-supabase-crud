import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTodos, addTodo as addTodoService,deleteTodo } from "../Services/todosService";
import { supabase } from "../supabaseClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingOverlay from "./LoadingOverlay";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddTodo = async () => {
    try {
      setLoading(true);
      await addTodoService(title);
      setTitle("");
      loadTodos();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
const handleDeleteTodo = async (id) => {
    setLoading(true);
  const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
  if (!confirmDelete) return; // user canceled

  try {
    await deleteTodo(id); // call your service
    loadTodos();          // refresh the list
  } catch (err) {
    console.error(err);
  }setLoading(false);
};

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    navigate("/");
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="container mt-5">
       <LoadingOverlay show={loading} />
      {/* Input and Add Button */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button className="btn btn-primary" onClick={handleAddTodo}   disabled={!title.trim()}>
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="list-group mb-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <input
              type="text"
              className="form-control me-2"
              value={todo.title}
              readOnly
            />
            <span
              className={`badge ${
                todo.completed ? "bg-success" : "bg-warning text-dark"
              }`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
              <button
              className="btn btn-sm btn-danger m-4"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
          
        ))}
      </ul>

       <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
