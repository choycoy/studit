import client from "@/utils/client";
const pointApis = {
  getUserPoints: async (userId: number) => {
    const { data } = await client.get(`/point/${userId}`);
    return data;
  },
  chargePoint: async (userId: number, amount: number) => {
    const { data } = await client.post(`/point/charge/${userId}`, { amount: amount });
    return data;
  },
  getAllPoints: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`/point/all/${userId}`, { params: { page: pageParam } });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getChargedPoints: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`/point/charge/${userId}`, { params: { page: pageParam } });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getDeductedPoints: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`/point/deduct/${userId}`, { params: { page: pageParam } });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getWithdrawnPoints: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`/point/withdraw/${userId}`, { params: { page: pageParam } });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getRewardPoints: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`/point/reward/${userId}`, { params: { page: pageParam } });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getRefundPoints: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`/point/refund/${userId}`, { params: { page: pageParam } });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
};
export default pointApis;
