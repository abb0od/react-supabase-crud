import axios from "axios";
import { supabase } from "../supabaseClient";

const API_URL = "http://localhost:5000/todos";

// Get current access token
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

export const fetchTodos = async () => {
  const token = await getAuthToken();
  if (!token) throw new Error("No token found");

  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const addTodo = async (title) => {
  const token = await getAuthToken();
  if (!token) throw new Error("No token found");

  const res = await axios.post(
    API_URL,
    { title },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};


export const deleteTodo = async (id) => {
  const token = await getAuthToken();
  if (!token) throw new Error("No token found");

  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};