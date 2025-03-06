import { useMutation } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useDeleteNotice({
  studyId,
  close,
  refetchDetail,
}: {
  studyId: number;
  close: () => void;
  refetchDetail: () => void;
}) {
  const mutation = useMutation({
    mutationFn: () => studyDetailApis.deleteNotice(studyId),
    onSuccess: () => {
      refetchDetail();
      close();
    },
  });
  return { deleteNotice: mutation.mutate };
}
