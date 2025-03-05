import { useQuery } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useGetStudyDetail(studyId: number) {
  const {
    data: response,
    isLoading: isDetailLoading,
    refetch: refetchDetail,
  } = useQuery({
    queryKey: ["getStudy", studyId],
    queryFn: () => studyDetailApis.getStudyDetail(studyId),
  });
  const studyDetail = response?.data;
  return {
    studyDetail,
    isDetailLoading,
    refetchDetail,
  };
}
