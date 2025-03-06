import { useMutation } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";

export default function useEditNotice({
  studyId,
  content,
  close,
  refetchNotice,
}: {
  studyId: number;
  content: string;
  close: () => void;
  refetchNotice: () => void;
}) {
  const mutation = useMutation({
    mutationFn: () => studyDetailApis.editNotice(studyId, content),
    onSuccess: () => {
      refetchNotice();
      close();
    },
  });
  return { editNotice: mutation.mutate };
}
