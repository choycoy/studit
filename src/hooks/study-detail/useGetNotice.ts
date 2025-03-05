import { useQuery } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useGetNotice(studyId: number, hasNotice: boolean) {
  const {
    data,
    isLoading: isNoticeLoading,
    refetch: refetchNotice,
  } = useQuery({
    queryKey: ["getNotice"],
    queryFn: () => studyDetailApis.getNotice(studyId),
    enabled: hasNotice,
  });
  const notice = data?.data;

  return { notice, isNoticeLoading, refetchNotice };
}
