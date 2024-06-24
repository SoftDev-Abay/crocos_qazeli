import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { IComfortType } from "../constants/AdditionalTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllComfortTypes hook

interface IAllComfortTypesResponse {
  data: IComfortType[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllComfortTypes props

interface IUseAllComfortTypesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllComfortTypes = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllComfortTypesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["comfort-room-type"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllComfortTypesResponse>(
        "/api/v1/comfort-room-items",
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

export default useAllComfortTypes;
