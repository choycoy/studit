import { useMutation } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useToggleTimer(studyId: number, userId: number) {
  const startMutation = useMutation({
    mutationFn: (todoId: number) => studyDetailApis.startTimer(studyId, userId, todoId),
  });

  const stopMutation = useMutation({
    mutationFn: (todoId: number) => studyDetailApis.stopTimer(studyId, userId, todoId),
  });

  return {
    postStartTimer: startMutation.mutate,
    postStopTimer: stopMutation.mutate,
  };
}
