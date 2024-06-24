import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { ITariff } from "../constants/TariffTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";
import { IRoomType } from "../constants/RoomTypes";
// Define the return type of the useAllToomTypes hook

interface IAllToomTypesResponse {
  data: IRoomType[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllToomTypes props

interface IUseAllToomTypesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllToomTypes = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllToomTypesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["room-types"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllToomTypesResponse>(
        "/api/v1/room-types",
        {
          params: {
            per_page,
            // filterFrom,
            // room_id,
            // placement_id,
            // filterUntil,
            // status,
            // page,
          },
        }
      );

      // Return the data from the Axios response
      return data.data;
    },
  });
};

export default useAllToomTypes;
