import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { ICity } from "../constants/LocaionTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllCities hook

interface IAllCitiesResponse {
  data: ICity[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllCities props

interface IUseAllCitiesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllCities = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllCitiesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["cities"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllCitiesResponse>("/api/v1/cities", {
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

export default useAllCities;
