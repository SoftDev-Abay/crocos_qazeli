import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { IPlacement } from "../constants/PlacementTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllPlacements hook

interface IAllPlacementsResponse {
  data: IPlacement[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllPlacements props

interface IUseAllPlacementsProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllPlacements = ({
  per_page,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page = 1,
}: IUseAllPlacementsProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["placements"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllPlacementsResponse>(
        "/api/v1/placements",
        {
          params: {
            // per_page,
            // filterFrom,
            // room_id,
            // placement_id,
            // filterUntil,
            // status,
            page,
          },
        }
      );

      // Return the data from the Axios response
      return data.data;
    },
  });
};

export default useAllPlacements;
