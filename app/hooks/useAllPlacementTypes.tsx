import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { ITariff } from "../constants/TariffTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";
import { IPlacementTypeWithImage } from "../constants/PlacementTypes";
// Define the return type of the useAllPlacementTypes hook

interface IAllPlacementTypesResponse {
  data: IPlacementTypeWithImage[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Define the useAllPlacementTypes props

interface IUseAllPlacementTypesProps {
  per_page?: number;
  filterFrom?: string;
  room_id?: number;
  placement_id?: number;
  filterUntil?: string;
  status?: string;
  page?: number;
}

const useAllPlacementTypes = ({
  per_page = 10000,
  filterFrom,
  room_id,
  placement_id,
  filterUntil,
  status,
  page,
}: IUseAllPlacementTypesProps) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["placement-types"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data } = await axios.get<IAllPlacementTypesResponse>(
        "/api/v1/placement-types",
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

export default useAllPlacementTypes;
