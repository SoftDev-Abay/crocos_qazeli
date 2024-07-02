import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { IPlacement } from "../constants/PlacementTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the usePlacement hook

interface IPlacementResponse {
  data: IPlacement;
}

// Define the usePlacement props

interface IUsePlacementProps {}

const usePlacement = (placementId: number) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["placement"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data: dataEng } = await axios.get<IPlacementResponse>(
        `/api/v1/placements/${placementId}`,
        {
          headers: { "Accept-Language": "en" },
        }
      );

      const { data: dataRu } = await axios.get<IPlacementResponse>(
        `/api/v1/placements/${placementId}`,
        {
          headers: { "Accept-Language": "ru" },
        }
      );

      const { data: dataKz } = await axios.get<IPlacementResponse>(
        `/api/v1/placements/${placementId}`,
        {
          headers: { "Accept-Language": "kz" },
        }
      );

      // Return the data from the Axios response
      return {
        en: dataEng.data,
        ru: dataRu.data,
        kz: dataKz.data,
      };
    },
  });
};

export default usePlacement;
