import { useQuery } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useGetTimers(studyId: number) {
  const {
    data,
    isLoading: isTimerLoading,
    refetch: refetchTimers,
  } = useQuery({
    queryKey: ["getTimers", studyId],
    queryFn: () => studyDetailApis.getTimers(studyId),
  });
  const timers = data?.data;
  return { timers, isTimerLoading, refetchTimers };
}
