import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";
import { useLoadingContext } from "../context/LoadingContext";

const useDeleteRoom = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  // const { setLoading } = useLoadingContext();

  return useMutation({
    mutationFn: (id: number) => {
      // setLoading(true); // Set loading to true before making the API call
      return axios.delete(`/api/v1/rooms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      toast.success("Room deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting room");
      console.log("Error deleting room");
    },
  });
};

export default useDeleteRoom;
