import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card/Card";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import InputGroup from "@/app/components/InputGroup/InputGroup";
import Input from "@/app/components/Input/Input";
import "./style.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../styles/global.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddTariffFormSchema, AddTariffFormType } from "@/app/utils/validation";
import useAllPlacements from "@/app/hooks/useAlPlacements";
import Button from "@/app/components/Button/Button";
import AdminSelect from "@/app/components/Select";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";
import useAllRooms from "@/app/hooks/useAllRooms";

const Page = () => {
  const axios = useAxios();
  const [selectedPlacementId, setSelectedPlacementId] = useState<
    number | undefined
  >();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<AddTariffFormType>({
    resolver: yupResolver(AddTariffFormSchema),
  });

  const placementId = watch("placement_id");

  useEffect(() => {
    setSelectedPlacementId(placementId);
  }, [placementId]);

  const {
    data: rooms,
    isLoading: isLoadingRooms,
    error: errorRooms,
  } = useAllRooms({
    placement_id: selectedPlacementId,
  });

  const {
    data: placements,
    isLoading: isLoadingPlacements,
    error: errorPlacements,
  } = useAllPlacements({});

  const onSubmit: SubmitHandler<AddTariffFormType> = async (data) => {
    try {
      const completeRoomData = {
        ru: {
          title: data.title.ru,
        },
        kz: {
          title: data.title.kz || data.title.ru,
        },
        en: {
          title: data.title.en || data.title.ru,
        },
        placement_id: data.placement_id,
        percent: data.percent,
        rooms: data.rooms,
      };

      const response = await axios.post("/api/v1/tariffs", completeRoomData);

      toast.success("Тарифф успешно добавлен");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при добавлении тариффа");
    }
  };

  const placementOptions = placements?.map((placement) => ({
    label: placement.title,
    value: placement.id,
  }));

  const roomOptions = rooms?.map((room) => ({
    label: room.title,
    value: room.id,
  }));

  console.log("rooms", rooms);

  console.log("selectedPlacementId", selectedPlacementId);

  return (
    <AdminWrapper>
      <div className="rooms-add-page">
        <PageHeader title="Добавить номер" goBack={true} />
        <Card>
          <div className="form-card-content">
            <div className="form-header">Добавление нового номера</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup label="Название на русском">
                <Input
                  className="admin-panel-input"
                  register={register("title.ru")}
                  error={errors.title?.ru?.message}
                />
              </InputGroup>
              <InputGroup label="Название на казахском">
                <Input
                  className="admin-panel-input"
                  register={register("title.kz")}
                  error={errors.title?.kz?.message}
                />
              </InputGroup>
              <InputGroup label="Название на английском">
                <Input
                  className="admin-panel-input"
                  register={register("title.en")}
                  error={errors.title?.en?.message}
                />
              </InputGroup>

              <InputGroup label="Процент">
                <Input
                  className="admin-panel-input"
                  register={register("percent")}
                  error={errors.percent?.message}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Отель">
                <AdminSelect
                  options={placementOptions}
                  name="placement_id"
                  control={control}
                  register={register("placement_id")}
                  error={errors.placement_id && errors.placement_id.message}
                />
              </InputGroup>

              <InputGroup label="Номера">
                <AdminSelect
                  options={roomOptions}
                  name="rooms"
                  control={control}
                  register={register("rooms")}
                  error={errors.rooms && errors.rooms.message}
                  multiple
                  disabled={isLoadingRooms || !selectedPlacementId}
                />
              </InputGroup>

              <InputGroup label="">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <Button size="sm" type="submit">
                    Добавить
                  </Button>
                  <Button size="sm" color="dark">
                    Сохранить и добавить еще
                  </Button>
                </div>
              </InputGroup>
            </form>
          </div>
        </Card>
      </div>
    </AdminWrapper>
  );
};

export default Page;
