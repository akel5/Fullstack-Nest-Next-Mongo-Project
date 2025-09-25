'use client';

import { useState, useEffect } from 'react';

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:3001/todos');
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });
      setNewTodo('');
      fetchTodos(); // רענון הרשימה
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Todo App</h1>

      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="הוסף משימה חדשה"
          style={{ width: '80%', padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>הוסף</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </main>
  );
}