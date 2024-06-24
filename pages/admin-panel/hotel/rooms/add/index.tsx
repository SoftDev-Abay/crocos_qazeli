import React from "react";
import Card from "@/app/components/Card/Card";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import InputGroup from "@/app/components/InputGroup/InputGroup";
import Input from "@/app/components/Input/Input";
import "./style.scss";
import { useForm, SubmitHandler, set, Controller } from "react-hook-form";

import "../../../../../styles/global.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddRoomFormSchema, AddRoomFormType } from "@/app/utils/validation";
import useAllToomTypes from "@/app/hooks/useAllRoomTypes";
import useAllFoodTypes from "@/app/hooks/useAllFoodTypes";
import useAllComfortTypes from "@/app/hooks/useAllComfortTypes";
import useAllCancelationTypes from "@/app/hooks/useAllCancelationTypes";
import useAllPlacements from "@/app/hooks/useAlPlacements";
import Button from "@/app/components/Button/Button";
import AdminSelect from "@/app/components/Select";
import TextArea from "@/app/components/TextArea";
import Notepad from "@/app/components/TextEditor/TextEditor";
import TextEditor from "@/app/components/TextEditor/TextEditor";

// Наименование на русском
// Наименование на казахском
// Наименование на английском
// Описание на русском
// Описание на казахском
// Описание на английском
// Размещение
// Тип
// Питание
// Площадь номера
// Стоимость
// Минимальное кол-во дней для
// бронирования
// Комната для курящих
// Количество детских кроваток О-3 лет
// Цена за детскую кроватку за день 3-б лет
// Штраф
// Условия отмены
// Время заезда
// Время выезда
// Удобства номера
// Количество номеров подобного типа
// Галерея

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddRoomFormType>({
    resolver: yupResolver(AddRoomFormSchema),
  });

  const { data: roomTypes, isLoading: isLoadingRoomTypes } = useAllToomTypes(
    {}
  );

  const {
    data: foodTypes,
    isLoading: isLoadingFoodTypes,
    error: errorFoodTypes,
  } = useAllFoodTypes({});

  const {
    data: comfortTypes,
    isLoading: isLoadingComfortTypes,
    error: errorComfortTypes,
  } = useAllComfortTypes({});

  const {
    data: cancelationTypes,
    isLoading: isLoadingCancelationTypes,
    error: errorCancelationTypes,
  } = useAllCancelationTypes({});

  const {
    data: placements,
    isLoading: isLoadingPlacements,
    error: errorPlacements,
  } = useAllPlacements({});

  const onSubmit: SubmitHandler<AddRoomFormType> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const placementOptions = placements?.map((placement) => ({
    label: placement.title,
    value: placement.id,
  }));

  const roomTypeOptions = roomTypes?.map((roomType) => ({
    label: roomType.title,
    value: roomType.id,
  }));

  const foodTypeOptions = foodTypes?.map((foodType) => ({
    label: foodType.title,
    value: foodType.id,
  }));

  const comfortTypeOptions = comfortTypes?.map((comfortType) => ({
    label: comfortType.title,
    value: comfortType.id,
  }));

  const cancelationTypeOptions = cancelationTypes?.map((cancelationType) => ({
    label: cancelationType.time,
    value: cancelationType.id,
  }));

  console.log({ errorFoodTypes });

  console.log({
    roomTypes,
    foodTypes,
    comfortTypes,
    cancelationTypes,
    placements,
  });

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

              <InputGroup label="Описание на русском">
                <TextEditor name="description.ru" control={control} />
              </InputGroup>

              <InputGroup label="Описание на казахском">
                <TextEditor name="description.kz" control={control} />
              </InputGroup>

              <InputGroup label="Описание на английском">
                <TextEditor name="description.en" control={control} />
              </InputGroup>

              <InputGroup label="Площадь">
                <Input
                  className="admin-panel-input"
                  register={register("square")}
                  error={errors.square?.message}
                  type="number"
                />
              </InputGroup>
              <InputGroup label="Стоимость">
                <Input
                  className="admin-panel-input"
                  register={register("price")}
                  error={errors.price?.message}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Минимальное кол-во дней для бронирования">
                <Input
                  className="admin-panel-input"
                  register={register("min_booking_period")}
                  error={errors.min_booking_period?.message}
                  defaultValue={0}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Цена за детскую кроватку за день 3-б лет">
                <Input
                  className="admin-panel-input"
                  register={register("cot_price")}
                  error={errors.cot_price?.message}
                  defaultValue={0}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Количество детских кроваток О-3 лет">
                <Input
                  className="admin-panel-input"
                  register={register("cot_quantity")}
                  error={errors.cot_quantity?.message}
                  defaultValue={0}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Штраф">
                <Input
                  className="admin-panel-input"
                  register={register("fine")}
                  error={errors.fine?.message}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Количество номеров подобного типа">
                <Input
                  className="admin-panel-input"
                  register={register("quantity")}
                  error={errors.quantity?.message}
                  type="number"
                />
              </InputGroup>

              <InputGroup label="Комната для курящих">
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    gap: "10px",
                  }}
                >
                  <Input
                    register={register("smoking")}
                    error={errors.smoking?.message}
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </InputGroup>

              <InputGroup label="Размещение">
                <AdminSelect
                  options={placementOptions}
                  name="placement_id"
                  control={control}
                  register={register("placement_id")}
                />
              </InputGroup>

              <InputGroup label="Тип">
                <AdminSelect
                  options={roomTypeOptions}
                  name="room_type_id"
                  control={control}
                  register={register("room_type_id")}
                />
              </InputGroup>

              <InputGroup label="Питание">
                <AdminSelect
                  options={foodTypeOptions}
                  name="food_types"
                  control={control}
                  register={register("food_types")}
                  multiple
                />
              </InputGroup>

              <InputGroup label="Условия отмены">
                <AdminSelect
                  options={cancelationTypeOptions}
                  name="cancellation_id"
                  control={control}
                  register={register("cancellation_id")}
                />
              </InputGroup>

              <InputGroup label="Удобства номера">
                <AdminSelect
                  options={comfortTypeOptions}
                  name="comforts"
                  control={control}
                  register={register("comforts")}
                  multiple
                />
              </InputGroup>

              <InputGroup label="">
                Примечание: Можно загрузить максимум 5 изображений
              </InputGroup>
              <InputGroup label="">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <Button size="sm">Добавить</Button>
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
