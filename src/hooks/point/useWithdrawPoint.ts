import { useMutation } from "@tanstack/react-query";
import pointApis from "@/service/pointApis";
import useGetUserPoints from "./useGetUserPoints";
import useGetPointHistory from "./useGetPointHistory";

export default function useWithdrawPoint(amount: number, userId: number) {
  const { refetchUserPoints } = useGetUserPoints(userId);
  const { refetch: refetchAll } = useGetPointHistory(userId, "전체");
  const { refetch: refetchWithdraw } = useGetPointHistory(userId, "출금");
  const mutation = useMutation({
    mutationFn: async () => {
      await pointApis.withdrawPoint(userId, amount);
    },
    onSuccess: () => {
      refetchUserPoints();
      refetchAll();
      refetchWithdraw();
    },
  });
  return { withdrawPoint: mutation.mutate };
}
