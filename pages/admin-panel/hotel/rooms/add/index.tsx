import React, { useRef } from "react";
import Card from "@/app/components/Card/Card";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import InputGroup from "@/app/components/InputGroup/InputGroup";
import Input from "@/app/components/Input/Input";
import "./style.scss";
import { useForm, SubmitHandler, set, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import Documents from "@/app/components/AddImagesContainer/AddImagesContainer";
import DatePickerInput from "@/app/components/DatePickerInput/DatePickerInput";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import useFormSuccessAction from "@/app/hooks/useFormSuccessAction";

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

// {
//   "placement_id": 1,
//   "room_type_id": 1,
//   "gallery_images": [
//     1,
//     2,
//     3
//   ],
//   "comforts": [
//     1,
//     2,
//     3
//   ],
//   "food_types": [
//     1,
//     2,
//     3
//   ],
//   "price": 150.75,
//   "quantity": 1,
//   "square": 25,
//   "min_booking_period": 10,
//   "smoking": true,
//   "status": "active",
//   "cot_quantity": 2,
//   "cot_price": 20.5,
//   "fine": 100.5,
//   "cancellation_id": "1",
//   "check_in": "2025-01-01T15:00:00",
//   "check_out": "2025-01-01T15:00:00",
//   "ru": {
//     "title": "Заголовок на русском языке",
//     "description": "Описание на русском языке"
//   },
//   "en": {
//     "title": "Заголовок на английском языке",
//     "description": "Описание на английском языке"
//   },
//   "kz": {
//     "title": "Заголовок на казахском языке",
//     "description": "Описание на казахском языке"
//   }
// }

const Page = () => {
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AddRoomFormType>({
    resolver: yupResolver(AddRoomFormSchema),
    defaultValues: {
      title: {
        ru: "",
        en: "",
        kz: "",
      },
      description: {
        ru: "",
        en: "",
        kz: "",
      },
      placement_id: undefined,
      room_type_id: undefined,
      gallery_images: [],
      price: 0,
      quantity: 0,
      square: 0,
      min_booking_period: 0,
      smoking: false,
      status: "active",
      cot_quantity: 0,
      cot_price: 0,
      fine: 0,
      cancellation_id: undefined,
      check_in: undefined,
      check_out: undefined,
    },
  });

  const router = useRouter();

  const { setButtonAction, handleSuccessAction } = useFormSuccessAction({
    reset,
    toastText: "Номер успешно добавлен",
    fallBackUrl: "/admin-panel/hotel/rooms",
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
    let formData = new FormData();
    let images = [];

    try {
      data.gallery_images?.map((item) => {
        formData.append("content[]", item.file);
      });

      const responce = await axios.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      images = responce.data.data.map((item) => item.id);

      toast.success("Изображения успешно загружены");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при загрузке изображений");
      return;
    }

    try {
      const completeRoomData = {
        ru: {
          title: data.title.ru,
          description: data.description.ru,
        },
        kz: {
          title: data.title.kz || data.title.ru,
          description: data.description.kz || data.description.ru,
        },
        en: {
          title: data.title.en || data.title.ru,
          description: data.description.en || data.description.ru,
        },
        placement_id: data.placement_id,
        room_type_id: data.room_type_id,
        food_types: data.food_types,
        price: data.price,
        quantity: data.quantity,
        square: data.square,
        min_booking_period: data.min_booking_period,
        smoking: data.smoking,
        status: "active",
        cot_quantity: data.cot_quantity,
        cot_price: data.cot_price,
        fine: data.fine,
        cancellation_id: data.cancellation_id,
        check_in: data.check_in,
        check_out: data.check_out,
        comforts: data.comforts,
        gallery_images: images,
      };

      const response = await axios.post("/api/v1/rooms", completeRoomData);

      handleSuccessAction();
    } catch (error) {
      console.log(error);

      if (
        error instanceof AxiosError &&
        error.response?.data &&
        error.response?.data.errors
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Произошла ошибка при добавлении номера");
      }
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
                <TextEditor
                  name="description.ru"
                  control={control}
                  error={errors.description?.ru?.message}
                />
              </InputGroup>

              <InputGroup label="Описание на казахском">
                <TextEditor
                  name="description.kz"
                  control={control}
                  error={errors.description?.kz?.message}
                />
              </InputGroup>

              <InputGroup label="Описание на английском">
                <TextEditor
                  name="description.en"
                  control={control}
                  error={errors.description?.en?.message}
                />
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
                  <div>
                    <Input
                      register={register("smoking")}
                      error={errors.smoking?.message}
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                      defaultChecked={false}
                    />
                    {errors.smoking && (
                      <span style={{ color: "red" }}>
                        {errors.smoking.message}
                      </span>
                    )}
                  </div>
                </div>
              </InputGroup>

              <InputGroup label="Размещение">
                <div>
                  <AdminSelect
                    options={placementOptions}
                    name="placement_id"
                    control={control}
                    register={register("placement_id")}
                    error={errors.placement_id && errors.placement_id.message}
                  />
                </div>
              </InputGroup>

              <InputGroup label="Тип">
                <AdminSelect
                  options={roomTypeOptions}
                  name="room_type_id"
                  control={control}
                  register={register("room_type_id")}
                  error={errors.room_type_id && errors.room_type_id.message}
                />
              </InputGroup>

              <InputGroup label="Питание">
                <AdminSelect
                  options={foodTypeOptions}
                  name="food_types"
                  control={control}
                  register={register("food_types")}
                  error={errors.food_types && errors.food_types.message}
                  multiple
                />
              </InputGroup>

              <InputGroup label="Условия отмены">
                <AdminSelect
                  options={cancelationTypeOptions}
                  name="cancellation_id"
                  control={control}
                  register={register("cancellation_id")}
                  error={
                    errors.cancellation_id && errors.cancellation_id.message
                  }
                />
              </InputGroup>

              <InputGroup label="Удобства номера">
                <AdminSelect
                  options={comfortTypeOptions}
                  name="comforts"
                  control={control}
                  register={register("comforts")}
                  multiple
                  error={errors.comforts && errors.comforts.message}
                />
              </InputGroup>

              <InputGroup label="Время заезда">
                <DatePickerInput control={control} name="check_in" />
              </InputGroup>

              <InputGroup label="Время выезда">
                <DatePickerInput control={control} name="check_out" />
              </InputGroup>

              <InputGroup label="Галерея">
                <div>
                  <Documents
                    control={control}
                    error={
                      errors.gallery_images && errors.gallery_images.message
                    }
                  />
                </div>
              </InputGroup>

              <InputGroup label="">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    size="sm"
                    type="submit"
                    onClick={() => {
                      setButtonAction("save");
                    }}
                  >
                    Добавить
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    onClick={() => {
                      setButtonAction("saveMore");
                    }}
                  >
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
