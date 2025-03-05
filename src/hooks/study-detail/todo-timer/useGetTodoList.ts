import { useQuery } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useGetTodoList(studyId: number) {
  const {
    data,
    isLoading: todoListLoading,
    refetch: refetchTodoList,
  } = useQuery({
    queryKey: ["getTodoList", studyId],
    queryFn: () => studyDetailApis.getTodoList(studyId),
  });
  const todoList = data?.data;
  return { todoList, todoListLoading, refetchTodoList };
}
