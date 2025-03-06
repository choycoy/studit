import { useMutation } from "@tanstack/react-query";
import studyDetailApis from "@/service/studyDetailApis";
import { StudyDetail } from "@/types/interface";
import { useNavigate } from "react-router-dom";
// import useToastStore from '../../../store/useToastStore';

export default function useStudyMutation(editInfo: StudyDetail, studyId: number, refetchDetail: () => void) {
  const navigate = useNavigate();
  //   const { showToast } = useToastStore();
  const mutation = useMutation({
    mutationFn: async () => await studyDetailApis.updateStudyDetail(studyId, editInfo),
    onSuccess: () => {
      //   showToast('스터디 정보가 수정됐어요 !', false);
      navigate(-1);
      refetchDetail();
    },
  });
  return { editStudy: mutation.mutate };
}
