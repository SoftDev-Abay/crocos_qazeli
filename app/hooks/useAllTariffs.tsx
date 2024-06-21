import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { ITariff } from "../constants/TariffTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useAllTariffs hook

interface IAllTariffsResponse {
  data: ITariff[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllTariffs props

interface IUseAllTariffsProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllTariffs = ({
  per_page,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page = 1,
}: IUseAllTariffsProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["rooms"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllTariffsResponse>(
        "/api/v1/rooms-all",
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

export default useAllTariffs;