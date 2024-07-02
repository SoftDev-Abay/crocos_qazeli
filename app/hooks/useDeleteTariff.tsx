import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";

const useDeleteTariff = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/api/v1/tariffs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tariffs"],
      });
      toast.success("Tariff deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting tariff");
      console.log("Error deleting tariff");
    },
  });
};

export default useDeleteTariff;
