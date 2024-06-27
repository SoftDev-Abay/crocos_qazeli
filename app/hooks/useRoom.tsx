import React from "react";
import { useAxios } from "../context/AxiosContext";
import { useQuery } from "@tanstack/react-query";
import { IRoom } from "../constants/RoomTypes";
import { AxiosResponse } from "axios";
import {
  IPaginationLinks,
  IPaginationMeta,
} from "../constants/PaginationTypes";

// Define the return type of the useRoom hook

interface IRoomResponse {
  data: IRoom;
}

// Define the useRoom props

interface IUseRoomProps {}

const useRoom = (roomId: number) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["rooms"], // Provide a valid QueryKey value
    queryFn: async () => {
      const { data: dataEng } = await axios.get<IRoomResponse>(
        `/api/v1/rooms-all/${roomId}`,
        {
          headers: { "Accept-Language": "en" },
        }
      );

      const { data: dataRu } = await axios.get<IRoomResponse>(
        `/api/v1/rooms-all/${roomId}`,
        {
          headers: { "Accept-Language": "ru" },
        }
      );

      const { data: dataKz } = await axios.get<IRoomResponse>(
        `/api/v1/rooms-all/${roomId}`,
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

export default useRoom;
