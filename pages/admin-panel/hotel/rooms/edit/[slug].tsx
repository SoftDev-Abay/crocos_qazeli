import React, { useEffect } from "react";
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
import { GetServerSideProps } from "next";
import useRoom from "@/app/hooks/useRoom";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let recordData;

  try {
    const { slug } = context.params as { slug: string };

    if (!slug || isNaN(Number(slug)) || slug === "") {
      return {
        props: {
          NotFound: true,
        },
      };
    }

    return {
      props: {
        roomID: Number(slug),
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        NotFound: true,
      },
    };
  }
};

const Page = ({ roomID }: { roomID: number }) => {
  const axios = useAxios();

  const {
    data: room,
    isLoading: isLoadingRoom,
    isSuccess: isSuccessRoom,
  } = useRoom(roomID);

  const { data: roomTypes, isLoading: isLoadingRoomTypes } = useAllToomTypes(
    {}
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<AddRoomFormType>({
    resolver: yupResolver(AddRoomFormSchema),
    defaultValues: {},
  });

  const router = useRouter();

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

  console.log("room", room?.ru);

  const onSubmit: SubmitHandler<AddRoomFormType> = async (data) => {
    let formData = new FormData();
    let images = [] as any[];

    try {
      const nonLocalImages = data.gallery_images
        ?.filter((item) => !item.local)
        .map((item) => item.id) as any[];

      const localImages = data.gallery_images?.filter(
        (item) => item.local
      ) as any[];

      images = nonLocalImages;

      if (localImages.length > 0) {
        data.gallery_images?.map((item) => {
          if (item.local) {
            formData.append("content[]", item.file);
          }
        });

        const responce = await axios.post("/api/v1/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const responceImgs = responce.data.data.map((item) => item.id) as any[];

        images = [...images, ...responceImgs];

        toast.success("Изображения успешно загружены");
      }
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

      console.log("completeRoomData", completeRoomData);

      const response = await axios.patch(
        `/api/v1/rooms/${roomID}`,
        completeRoomData
      );

      console.log("response patch room", response);

      toast.success("Номер успешно изменен");
      router.push("/admin-panel/hotel/rooms");
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data &&
        error.response?.data.errors
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Произошла ошибка при измении номера");
      }
    }
  };

  console.log("room.ru", room?.ru);

  useEffect(() => {
    if (room && isSuccessRoom) {
      reset({
        title: {
          ru: room.ru.title,
          kz: room.kz.title,
          en: room.en.title,
        },
        description: {
          ru: room.ru.description,
          kz: room.kz.description,
          en: room.en.description,
        },
        square: room.ru.square,
        price: Number(room.ru.price),
        min_booking_period: room.ru.min_booking_period,
        cot_price: Number(room.ru.childrenCot.price),
        cot_quantity: room.ru.childrenCot.quantity,
        fine: Number(room.ru.room_settlement.fine),
        quantity: room.ru.default_quantity,
        smoking: Boolean(room.ru.smoking),
        placement_id: room.ru.placement.id,
        room_type_id: room.ru.room_type.id,
        food_types: room.ru.food_types.map((item) => item.id),
        comforts: room.ru.comfort_rooms.map((item) => item.id),
        cancellation_id: room.ru.room_settlement.cancellation.id,
        check_in: new Date(room.ru.room_settlement.check_in),
        check_out: new Date(room.ru.room_settlement.check_out),
        gallery_images: room.ru.gallery_images,
      });
    }
  }, [isSuccessRoom]);

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

  console.log(errors);

  return (
    <AdminWrapper>
      <div className="rooms-add-page">
        <PageHeader
          title="Редактироание номера"
          goBack={true}
          goBackCount={2}
        />
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

              {room?.ru.description && (
                <InputGroup label="Описание на русском">
                  <TextEditor
                    name="description.ru"
                    control={control}
                    error={errors.description?.kz?.message}
                    defaultValue={room?.ru.description}
                  />
                </InputGroup>
              )}

              {room?.kz.description && (
                <InputGroup label="Описание на казахском">
                  <TextEditor
                    name="description.kz"
                    control={control}
                    error={errors.description?.kz?.message}
                    defaultValue={room?.kz.description}
                  />
                </InputGroup>
              )}

              {room?.en.description && (
                <InputGroup label="Описание на английском">
                  <TextEditor
                    name="description.en"
                    control={control}
                    error={errors.description?.en?.message}
                    defaultValue={room?.en.description}
                  />
                </InputGroup>
              )}

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
                <div>
                  <Button size="sm" type="submit">
                    Изменить
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
