import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { IRegion } from "../constants/LocaionTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllRegions hook

interface IAllRegionsResponse {
  data: IRegion[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllRegions props

interface IUseAllRegionsProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllRegions = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllRegionsProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["regions"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllRegionsResponse>("/api/v1/regions", {
        params: {
          per_page,
          // filterFrom,
          // room_id,
          // placement_id,
          // filterUntil,
          // status,
          // page,
        },
      });

      // Return the data from the Axios response
      return data.data;
    },
  });
};

export default useAllRegions;
