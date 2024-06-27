import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";

const useDeleteRoom = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
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
