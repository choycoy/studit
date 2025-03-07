import { useMutation } from "@tanstack/react-query";
import pointApis from "@/service/pointApis";
import useGetPointHistory from "../point/useGetPointHistory";
import useGetUserPoints from "../point/useGetUserPoints";
import useGetProfile from "./useGetProfile";

export default function useChargePoint(amount: number, userId: number) {
  const { reloadProfile } = useGetProfile(userId);
  const { refetchUserPoints } = useGetUserPoints(userId);
  const { refetch: refetchAll } = useGetPointHistory(userId, "전체");
  const { refetch: refetchCharge } = useGetPointHistory(userId, "충전");

  const mutation = useMutation({
    mutationFn: async () => {
      await pointApis.chargePoint(userId, amount);
    },
    onSuccess: () => {
      reloadProfile();
      refetchUserPoints();
      refetchAll();
      refetchCharge();
    },
  });
  return { chargePoint: mutation.mutate };
}
