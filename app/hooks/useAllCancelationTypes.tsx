import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { ICancelationType } from "../constants/AdditionalTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllCancelationTypes hook

interface IAllCancelationTypesResponse {
  data: ICancelationType[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllCancelationTypes props

interface IUseAllCancelationTypesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllCancelationTypes = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllCancelationTypesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["cancelation-type"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllCancelationTypesResponse>(
        "/api/v1/cancellation-conditions",
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

export default useAllCancelationTypes;
