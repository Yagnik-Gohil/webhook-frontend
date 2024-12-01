import { ISubscription } from "@/types";
import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

export const getSubscription = async (
  limit: number = 10,
  offset: number = 0
): Promise<{
  status: number;
  message: string;
  total: number;
  limit: number;
  offset: number;
  data: ISubscription[];
}> => {
  return apiHelper(
    axiosInstance.get("/subscription", {
      params: {
        limit,
        offset,
      },
    })
  );
};

export const deleteSubscription = async (
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  return apiHelper(axiosInstance.delete(`/subscription/${id}`), true);
};
