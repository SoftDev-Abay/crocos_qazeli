import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { ITariff } from "../constants/TariffTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";
import { IServiceType } from "../constants/AdditionalTypes";
// Define the return type of the useAllServiceTypes hook

interface IAllServiceTypesResponse {
  data: IServiceType[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllServiceTypes props

interface IUseAllServiceTypesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllServiceTypes = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllServiceTypesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["service-types"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllServiceTypesResponse>(
        "/api/v1/service-types",
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

export default useAllServiceTypes;
