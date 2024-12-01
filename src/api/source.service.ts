import { ISource } from "@/types";
import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

export const getSubscribedService = async (
  limit: number = 10,
  offset: number = 0
): Promise<{
  status: number;
  message: string;
  total: number;
  limit: number;
  offset: number;
  data: ISource[];
}> => {
  return apiHelper(
    axiosInstance.get("/source/subscribed", {
      params: {
        limit,
        offset,
      },
    })
  );
};

export const getUnSubscribedService = async (
  limit: number = 10,
  offset: number = 0
): Promise<{
  status: number;
  message: string;
  total: number;
  limit: number;
  offset: number;
  data: ISource[];
}> => {
  return apiHelper(
    axiosInstance.get("/source", {
      params: {
        limit,
        offset,
      },
    })
  );
};