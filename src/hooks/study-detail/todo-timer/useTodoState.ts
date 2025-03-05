import { TodoListType } from "@/types/interface";
import { useEffect, useMemo, useState } from "react";

export default function useTodoState(todoList: TodoListType | undefined) {
  const todos = useMemo(() => todoList?.todos ?? [], [todoList?.todos]);
  const [todoStates, setTodoStates] = useState(
    todos.reduce((acc, todo) => {
      acc[todo.todoId] = todo.isCompleted;
      return acc;
    }, {} as Record<number, boolean>),
  );

  useEffect(() => {
    if (todos.length > 0) {
      setTodoStates((prev) => {
        const updateStates = { ...prev };
        todos.forEach((todo) => {
          if (updateStates[todo.todoId] === undefined) updateStates[todo.todoId] = todo.isCompleted;
        });
        return updateStates;
      });
    }
  }, [todos]);

  const toggleTodo = (todoId: number) => {
    setTodoStates((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };
  return { todoStates, toggleTodo };
}
