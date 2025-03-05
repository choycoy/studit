import { useState } from "react";
import useCreateTodo from "./useCreateTodo";
import useEditTodo from "./useEditTodo";

export default function useTodoActions(studyId: number) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState({ todoName: "", todoId: 1 });

  const { createTodo } = useCreateTodo({ studyId, newTodo, setNewTodo, setIsAdding });
  const { editTodo } = useEditTodo({
    studyId,
    todoName: editingTodo.todoName,
    todoId: editingTodo.todoId,
    setIsEditing,
    setEditingTodo,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      createTodo();
    }
  };

  const startEditing = (todoId: number, todoName: string) => {
    setIsEditing(true);
    setEditingTodo({ todoName, todoId });
  };

  const saveEdit = () => {
    if (editingTodo.todoName.trim()) {
      editTodo();
    }
  };
  return {
    isAdding,
    setIsAdding,
    newTodo,
    setNewTodo,
    handleKeyDown,
    startEditing,
    isEditing,
    setIsEditing,
    saveEdit,
    editingTodo,
    setEditingTodo,
  };
}
