import { IEventHistory } from "@/types";
import apiHelper from "./apiHelper";
import axiosInstance from "./axiosInstance";

export const getEventHistory = async (
  limit: number = 10,
  offset: number = 0,
  source: string | undefined,
  event: string | undefined
): Promise<{
  status: number;
  message: string;
  total: number;
  limit: number;
  offset: number;
  data: IEventHistory[];
}> => {
  return apiHelper(
    axiosInstance.get("/event-history", {
      params: {
        limit,
        offset,
        source,
        event,
      },
    })
  );
};
