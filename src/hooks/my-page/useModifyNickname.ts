import { useMutation } from "@tanstack/react-query";
import myPageApis from "@/service/myPageApis";
import useGetProfile from "./useGetProfile";

export default function useModifyNickname({ currentNickname, userId }: { currentNickname: string; userId: number }) {
  const { reloadProfile } = useGetProfile(userId);
  const mutation = useMutation({
    mutationFn: async () => {
      await myPageApis.modifyNickname(userId, currentNickname);
    },
    onSuccess: () => reloadProfile(),
  });
  return { modifyNickname: mutation.mutate };
}
