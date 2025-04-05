
import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, GripHorizontal, Check, X, Pin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

function TodoList({ id }) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { toast } = useToast();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isPinned ? "sticky" : "relative",
    top: isPinned ? "100px" : "auto",
    zIndex: isPinned ? 40 : "auto",
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        text: newTodo, 
        completed: false,
        startTime,
        endTime,
        createdAt: new Date().toISOString()
      }]);
      setNewTodo("");
      setStartTime("");
      setEndTime("");
      toast({
        title: "Task added",
        description: "New task has been added to your list",
      });
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    toast({
      title: "Task removed",
      description: "Task has been removed from your list",
      variant: "destructive",
    });
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="bg-[#09080d]/80 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-[#fe6807]/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#FDFFFC]">Tasks</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`p-2 rounded-full transition-colors ${
              isPinned ? "text-[#fe6807]" : "text-[#FDFFFC]/50"
            } hover:text-[#fe6807]`}
          >
            <Pin className="w-5 h-5" />
          </button>
          <div {...attributes} {...listeners}>
            <GripHorizontal className="cursor-move text-[#FDFFFC]/50 hover:text-[#FDFFFC]" />
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          className="w-full bg-[#09080d] border border-[#fe6807]/20 rounded-lg px-4 py-2 text-[#FDFFFC] focus:outline-none focus:border-[#fe6807]"
          placeholder="Add new task..."
        />
        <div className="flex gap-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="flex-1 bg-[#09080d] border border-[#fe6807]/20 rounded-lg px-4 py-2 text-[#FDFFFC] focus:outline-none focus:border-[#fe6807]"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="flex-1 bg-[#09080d] border border-[#fe6807]/20 rounded-lg px-4 py-2 text-[#FDFFFC] focus:outline-none focus:border-[#fe6807]"
          />
          <Button
            onClick={addTodo}
            className="bg-[#fe6807] hover:bg-[#fe6807]/80 text-[#FDFFFC]"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {todos.map((todo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between bg-[#09080d]/50 rounded-lg p-3 border border-[#fe6807]/10"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", JSON.stringify(todo));
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTodo(index)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? "bg-[#53ff45] border-[#53ff45]"
                    : "border-[#fe6807]"
                }`}
              >
                {todo.completed && <Check className="w-4 h-4 text-[#09080d]" />}
              </button>
              <div className="flex flex-col">
                <span className={todo.completed ? "line-through text-[#FDFFFC]/50" : ""}>
                  {todo.text}
                </span>
                {todo.startTime && todo.endTime && (
                  <span className="text-xs text-[#FDFFFC]/50">
                    {todo.startTime} - {todo.endTime}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteTodo(index)}
              className="text-[#FDFFFC]/50 hover:text-[#cb04a5]"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TodoList;
