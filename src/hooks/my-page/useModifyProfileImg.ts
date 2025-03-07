import { useMutation } from "@tanstack/react-query";
import myPageApis from "@/service/myPageApis";
import useGetProfile from "./useGetProfile";

export default function useModifyProfileImg({ currentImg, userId }: { currentImg: string; userId: number }) {
  const { reloadProfile } = useGetProfile(userId);
  const mutation = useMutation({
    mutationFn: async () => {
      await myPageApis.modifyProfileImg(userId, currentImg);
    },
    onSuccess: () => reloadProfile(),
  });
  return { modifyProfileImg: mutation.mutate };
}
