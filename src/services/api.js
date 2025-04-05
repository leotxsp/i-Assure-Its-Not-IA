
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = {
  async getTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) throw new Error("Failed to fetch todos");
      return await response.json();
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  async createTodo(todo) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error("Failed to create todo");
      return await response.json();
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  },

  async updateTodo(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      return await response.json();
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      return await response.json();
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },

  async getStreak() {
    try {
      const response = await fetch(`${API_BASE_URL}/streak`);
      if (!response.ok) throw new Error("Failed to fetch streak");
      return await response.json();
    } catch (error) {
      console.error("Error fetching streak:", error);
      throw error;
    }
  },

  async updateStreak(streak) {
    try {
      const response = await fetch(`${API_BASE_URL}/streak`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(streak),
      });
      if (!response.ok) throw new Error("Failed to update streak");
      return await response.json();
    } catch (error) {
      console.error("Error updating streak:", error);
      throw error;
    }
  },
};
