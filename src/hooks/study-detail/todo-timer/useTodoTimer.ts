import { Dispatch, SetStateAction } from "react";
import { TimerType, TodoListType } from "@/types/interface";
import { useState } from "react";
import useToggleTimer from "./useToggleTimer";

export default function useTodoTimer({
  studyId,
  userId,
  setTimers,
  setLocalTodoList,
}: {
  studyId: number;
  userId: number;
  setTimers: Dispatch<SetStateAction<TimerType[]>>;
  setLocalTodoList: Dispatch<SetStateAction<TodoListType>>;
}) {
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);
  const { postStartTimer, postStopTimer } = useToggleTimer(studyId, userId);
  const startTimer = (todoId: number) => {
    if (activeTodoId !== null) {
      stopTimer(activeTodoId);
    }

    setTimers((prev) => prev.map((timer) => (timer.userId === userId ? { ...timer, isRunning: true } : timer)));

    setLocalTodoList((prev) => ({
      ...prev,
      todos: prev.todos.map((todo) => (todo.todoId === todoId ? { ...todo, isRunning: true } : todo)),
    }));

    postStartTimer(todoId);
    setActiveTodoId(todoId);
  };
  const stopTimer = (todoId: number) => {
    if (activeTodoId !== todoId) return;

    postStopTimer(todoId);

    setTimers((prev) => prev.map((timer) => (timer.userId === userId ? { ...timer, isRunning: false } : timer)));

    setLocalTodoList((prev) => ({
      ...prev,
      todos: prev.todos.map((todo) => (todo.todoId === todoId ? { ...todo, isRunning: false } : todo)),
    }));

    setActiveTodoId(null);
  };
  return { startTimer, stopTimer, activeTodoId };
}
