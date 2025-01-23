import { useQuery } from "react-query";
import api from "../api/api.js";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    "my-shortenurls",
    async () => {
      return await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    {
      select: (data) => {
        return data.data.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    "url-totalclick",
    async () => {
      return await api.get(
        "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    {
      select: (data) => {
        //convert response data ToArray
        return Object.keys(data.data).map((key) => ({
          clickDate: key,
          count: data.data[key], // data.data[2024-01-01]
        }));
      },
      onError,
      staleTime: 5000,
    }
  );
};
