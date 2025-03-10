import client from "@/utils/client";

const myPageApis = {
  getProfile: async (userId: number) => {
    const { data } = await client.get(`/user/${userId}`);
    return data;
  },
  modifyNickname: async (userId: number, nickname: string) => {
    const { data } = await client.put(`/user/nickname/${userId}`, { nickname: nickname });
    return data;
  },
  modifyProfileImg: async (userId: number, img: string) => {
    const formData = new FormData();
    formData.append("image", img);
    const { data } = await client.put(`/user/profile-image/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  getAvgStats: async (userId: number) => {
    const { data } = await client.get(`/user/study-stats/${userId}`);
    return data;
  },
  getUpcomingList: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`user/study-list/upcoming/${userId}`, {
      params: { page: pageParam },
    });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getOngoingList: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`user/study-list/ongoing/${userId}`, {
      params: { page: pageParam },
    });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
  getCompletedList: async (userId: number, pageParam: number) => {
    const { data: response } = await client.get(`user/study-list/completed/${userId}`, {
      params: { page: pageParam },
    });
    return {
      data: response.data,
      hasNextPage: response.hasNextPage,
    };
  },
};
export default myPageApis;
