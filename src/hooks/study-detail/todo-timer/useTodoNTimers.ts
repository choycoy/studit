import useGetTodoList from "./useGetTodoList";
import useTodoState from "./useTodoState";
import useToggleTodo from "./useToggleTodo";
import { useState, useEffect } from "react";
import { TodoListType, TimerType } from "@/types/interface";
import useGetTimers from "./useGetTimers";
import useSyncWithServer from "./useSyncWithServer";

export default function useTodoNTimers(studyId: number, userId: number) {
  const { todoList, todoListLoading } = useGetTodoList(studyId);
  const { todoStates, toggleTodo } = useTodoState(todoList);
  const { mutateToggleTodo } = useToggleTodo(studyId);
  const { timers: initialTimers, isTimerLoading } = useGetTimers(studyId);

  const [localTodoList, setLocalTodoList] = useState<TodoListType>({ studyTotalTime: 0, todos: [] });
  const [timers, setTimers] = useState<TimerType[]>([]);

  useEffect(() => {
    if (todoList) setLocalTodoList(todoList);
  }, [todoList]);

  useEffect(() => {
    if (initialTimers) {
      setTimers(initialTimers);
    }
  }, [initialTimers]);

  useSyncWithServer(studyId, localTodoList, setLocalTodoList, setTimers, userId);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => (timer.isRunning ? { ...timer, timerTime: timer.timerTime + 1 } : timer)),
      );
      setLocalTodoList((prev) => {
        const hasRunningTodo = prev.todos.some((todo) => todo.isRunning);
        return {
          ...prev,
          studyTotalTime: hasRunningTodo ? prev.studyTotalTime + 1 : prev.studyTotalTime,
          todos: prev.todos.map((todo) => (todo.isRunning ? { ...todo, studyTime: todo.studyTime + 1 } : todo)),
        };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timers, localTodoList.todos]);

  const handleCheckboxChange = (todoId: number, isCompleted: boolean) => {
    mutateToggleTodo({ todoId, isCompleted });
    toggleTodo(todoId);
  };
  return {
    todoList: localTodoList,
    todoListLoading,
    timers,
    setTimers,
    isTimerLoading,
    todoStates,
    handleCheckboxChange,
    setLocalTodoList,
  };
}
