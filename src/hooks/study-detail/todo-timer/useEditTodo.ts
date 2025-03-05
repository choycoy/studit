import { useMutation } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";
import useGetTodoList from "./useGetTodoList";

export default function useEditTodo({
  studyId,
  todoName,
  todoId,
  setIsEditing,
  setEditingTodo,
}: {
  studyId: number;
  todoName: string;
  todoId: number;
  setIsEditing: (prev: boolean) => void;
  setEditingTodo: (prev: { todoName: string; todoId: number }) => void;
}) {
  const { refetchTodoList } = useGetTodoList(studyId);
  const mutation = useMutation({
    mutationFn: () => studyDetailApis.editTodo(studyId, todoName, todoId),
    onSuccess: () => {
      refetchTodoList();
      setIsEditing(false);
      setEditingTodo({ todoName: "", todoId: 1 });
    },
  });
  return { editTodo: mutation.mutate };
}
