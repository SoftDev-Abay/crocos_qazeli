import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { IFoodType } from "../constants/AdditionalTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllFoodTypes hook

interface IAllFoodTypesResponse {
  data: IFoodType[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllFoodTypes props

interface IUseAllFoodTypesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllFoodTypes = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllFoodTypesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["food-type"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllFoodTypesResponse>(
        "/api/v1/food-types",
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

export default useAllFoodTypes;
