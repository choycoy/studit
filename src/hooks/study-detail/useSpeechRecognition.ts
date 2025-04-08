import { TodoListType } from "@/types/interface";
import { useEffect, useRef } from "react";

type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
  ? typeof window.webkitSpeechRecognition
  : typeof window.SpeechRecognition;

export default function useSpeechRecognition({
  startTimer,
  stopTimer,
  activeTodoId,
  todoListLoading,
  todoList,
}: {
  startTimer: (todoId: number) => void;
  stopTimer: (todoId: number) => void;
  activeTodoId: number | null;
  todoListLoading: boolean;
  todoList: TodoListType;
}) {
  const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition || todoListLoading || todoList?.todos.length === 0) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "ko-KR";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      if (transcript.includes("켜") || transcript.includes("재생") || transcript.includes("시작")) {
        for (const todo of todoList.todos) {
          if (transcript.includes(todo.todoName)) {
            startTimer(todo.todoId);
            return;
          }
        }
      } else if (
        (transcript.includes("꺼") || transcript.includes("중지") || transcript.includes("종료")) &&
        activeTodoId
      ) {
        stopTimer(activeTodoId);
      }
    };

    recognition.onend = () => {
      recognition.start();
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      recognition.onend = null;
      recognition.stop();
    };
  }, [todoListLoading, todoList?.todos]);
}
