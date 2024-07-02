import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";

const useDeletePlacement = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/api/v1/placements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["placements"],
      });
      toast.success("Placement deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting placement");
      console.log("Error deleting placement");
    },
  });
};

export default useDeletePlacement;
