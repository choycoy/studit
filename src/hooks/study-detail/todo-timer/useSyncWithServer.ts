import { TodoListType, TimerType, TodoType } from "@/types/interface";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import studyDetailApis from "@/service/studyDetailApis";

export default function useSyncWithServer(
  studyId: number,
  localTodoList: TodoListType,
  setLocalTodoList: React.Dispatch<React.SetStateAction<TodoListType>>,
  setTimers: React.Dispatch<React.SetStateAction<TimerType[]>>,
  userId: number,
) {
  useEffect(() => {
    const syncWithServer = setInterval(async () => {
      try {
        const [todoResponse, timerResponse] = await Promise.all([
          studyDetailApis.getTodoList(studyId),
          studyDetailApis.getTimers(studyId),
        ]);
        const todoData = todoResponse.data;
        const timerData = timerResponse.data;
        if (!todoData || !todoData.todos || !timerData) return null;
        setLocalTodoList((prev) => {
          const totalTimeDiff = Math.abs(todoData.studyTotalTime - prev.studyTotalTime);
          return {
            ...prev,
            studyTotalTime: totalTimeDiff > 1 ? todoData.studyTotalTime : prev.studyTotalTime,
            todos: prev.todos.map((todo) => {
              const serverTodo = todoData.todos.find((sTodo: TodoType) => sTodo.todoId === todo.todoId);
              if (!serverTodo) return todo;
              const studyTimeDiff = Math.abs(serverTodo.studyTime - todo.studyTime);
              return {
                ...todo,
                studyTime: studyTimeDiff > 1 ? serverTodo.studyTime : todo.studyTime,
              };
            }),
          };
        });
        setTimers((prev) =>
          prev.map((clientTimer) => {
            const serverTimer = timerData.find((s: TimerType) => s.userId === clientTimer.userId);
            if (serverTimer) {
              if (clientTimer.userId === userId) {
                const totalTimeDiff = Math.abs(todoData.studyTotalTime - localTodoList.studyTotalTime);
                return {
                  ...clientTimer,
                  timerTime: totalTimeDiff > 1 ? todoData.studyTotalTime : localTodoList.studyTotalTime,
                };
              }
              if (Math.abs(serverTimer.timerTime - clientTimer.timerTime) > 1) {
                return { ...clientTimer, timerTime: serverTimer.timerTime };
              }
            }
            return clientTimer;
          }),
        );
      } catch (error) {
        Sentry.captureException(error);
      }
    }, 5000);
    return () => clearInterval(syncWithServer);
  }, [studyId, setLocalTodoList, setTimers, userId, localTodoList.studyTotalTime]);
}
