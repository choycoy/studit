import { useMutation } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";
import useGetTodoList from "./useGetTodoList";

export default function useToggleTodo(studyId: number) {
  const { refetchTodoList } = useGetTodoList(studyId);

  const mutation = useMutation({
    mutationFn: ({ todoId, isCompleted }: { todoId: number; isCompleted: boolean }) =>
      studyDetailApis.toggleTodoStatus(studyId, todoId, isCompleted),
    onSuccess: () => refetchTodoList(),
  });

  return { mutateToggleTodo: mutation.mutate };
}
