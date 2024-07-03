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
import {
  AddPlacementFormSchema,
  AddPlacementFormType,
} from "@/app/utils/validation";
import useAllFoodTypes from "@/app/hooks/useAllFoodTypes";
import Button from "@/app/components/Button/Button";
import AdminSelect from "@/app/components/Select";
import TextEditor from "@/app/components/TextEditor/TextEditor";
import Documents from "@/app/components/AddImagesContainer/AddImagesContainer";
import DatePickerInput from "@/app/components/DatePickerInput/DatePickerInput";
import { useAxios } from "@/app/context/AxiosContext";
import { toast } from "react-toastify";
import useAllPlacementTypes from "@/app/hooks/useAllPlacementTypes";
import useAllServiceTypes from "@/app/hooks/useAllServiceTypes";
import useAllRegions from "@/app/hooks/useAllRegions";
import LocationInput from "@/app/components/LocationInput/LocationInput";
import { UseUserStore } from "@/app/store/useUserStore";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import usePlacement from "@/app/hooks/usePlacement";
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
        placementID: Number(slug),
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

const Page = ({ placementID }: { placementID: number }) => {
  const axios = useAxios();

  const {
    data: placement,
    isLoading: isLoadingPlacement,
    isSuccess: isSuccessPlacement,
  } = usePlacement(placementID);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<AddPlacementFormType>({
    resolver: yupResolver(AddPlacementFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (placement && isSuccessPlacement) {
      reset({
        title: {
          ru: placement.ru.title,
          kz: placement.kz.title,
          en: placement.en.title,
        },
        description: {
          ru: placement.ru.description,
          kz: placement.kz.description,
          en: placement.en.description,
        },
        address: {
          ru: placement.ru.address,
          kz: placement.kz.address,
          en: placement.en.address,
        },
        phone: placement.ru.phone,
        email: placement.ru.email,
        foods: placement.ru.food_types.map((food) => food.id),
        services: placement.ru.service_types.map((service) => service.id),
        rating: placement.ru.rating,
        lat: placement.ru.lat,
        lon: placement.ru.lon,
        placement_type_id: placement.ru.placement_type.id,
        region: placement.ru.region.id,
        city_id: placement.ru.city.id,
        gallery_images: placement.ru.gallery_images,
      });
    }
  }, [isSuccessPlacement]);

  const {
    data: foodTypes,
    isLoading: isLoadingFoodTypes,
    error: errorFoodTypes,
  } = useAllFoodTypes({});

  const {
    data: placementTypes,
    isLoading: isLoadingPlacementTypes,
    error: errorPlacementTypes,
  } = useAllPlacementTypes({});

  const {
    data: serviceTypes,
    isLoading: isLoadingServiceTypes,
    error: errorServiceTypes,
  } = useAllServiceTypes({});

  const {
    data: regions,
    isLoading: isLoadingRegions,
    error: errorRegions,
  } = useAllRegions({});

  const router = useRouter();

  const onSubmit: SubmitHandler<AddPlacementFormType> = async (data) => {
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
      const completeplacementData = {
        ru: {
          title: data.title.ru,
          description: data.description.ru,
          address: data.address.ru,
        },
        kz: {
          title: data.title.kz || data.title.ru,
          description: data.description.kz || data.description.ru,
          address: data.address.kz || data.address.ru,
        },
        en: {
          title: data.title.en || data.title.ru,
          description: data.description.en || data.description.ru,
          address: data.address.en || data.address.ru,
        },

        status: "active",
        gallery_images: images,
        foods: data.foods,
        services: data.services,
        rating: data.rating,
        lat: data.lat,
        lon: data.lon,
        phone: data.phone,
        email: data.email,
        placement_type_id: data.placement_type_id,
        regions: data.region,
        city_id: data.city_id,
        user_id: UseUserStore.getState().currentUser?.id,
        main_image_id: images[0],
      };

      const response = await axios.patch(
        `/api/v1/placements/${placementID}`,
        completeplacementData
      );

      toast.success("Место размещения успешно изменено");

      router.push("/admin-panel/hotel/placements");
    } catch (error) {
      console.log(error);

      if (
        error instanceof AxiosError &&
        error.response?.data &&
        error.response?.data.errors
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Произошла ошибка при измении места размещения");
      }
    }
  };

  const foodTypeOptions = foodTypes?.map((foodType) => ({
    label: foodType.title,
    value: foodType.id,
  }));

  const placementTypeOptions = placementTypes?.map((placementType) => ({
    label: placementType.title,
    value: placementType.id,
  }));

  const serviceTypeOptions = serviceTypes?.map((serviceType) => ({
    label: serviceType.title,
    value: serviceType.id,
  }));

  const ratingOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const regionOptions = regions?.map((region) => ({
    label: region.title,
    value: region.id,
  }));

  const [selectedRegion, setSelectedRegion] = React.useState(null);

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const cityOptions =
    regions && selectedRegion
      ? regions
          .find((region) => region.id === selectedRegion)
          ?.cities.map((city) => ({
            label: city.title,
            value: city.id,
          }))
      : [];

  console.log(errors);

  return (
    <AdminWrapper>
      <div className="placements-edit-page">
        <PageHeader
          title="Редактировать место размещения"
          goBack={true}
          goBackCount={2}
        />
        <Card>
          <div className="form-card-content">
            <div className="form-header">Добавление отеля</div>
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

              {placement?.ru.description && (
                <InputGroup label="Описание на русском">
                  <TextEditor
                    name="description.ru"
                    control={control}
                    error={errors.description?.kz?.message}
                    defaultValue={placement?.ru.description}
                  />
                </InputGroup>
              )}

              {placement?.kz.description && (
                <InputGroup label="Описание на казахском">
                  <TextEditor
                    name="description.kz"
                    control={control}
                    error={errors.description?.kz?.message}
                    defaultValue={placement?.kz.description}
                  />
                </InputGroup>
              )}

              {placement?.en.description && (
                <InputGroup label="Описание на английском">
                  <TextEditor
                    name="description.en"
                    control={control}
                    error={errors.description?.en?.message}
                    defaultValue={placement?.en.description}
                  />
                </InputGroup>
              )}

              <InputGroup label="Адрес на русском">
                <Input
                  className="admin-panel-input"
                  register={register("address.ru")}
                  error={errors.address?.ru?.message}
                />
              </InputGroup>
              <InputGroup label="Адрес на казахском">
                <Input
                  className="admin-panel-input"
                  register={register("address.kz")}
                  error={errors.address?.kz?.message}
                />
              </InputGroup>

              <InputGroup label="Адрес на английском">
                <Input
                  className="admin-panel-input"
                  register={register("address.en")}
                  error={errors.address?.en?.message}
                />
              </InputGroup>

              <InputGroup label="Телефон для бронирования">
                <Input
                  className="admin-panel-input"
                  register={register("phone")}
                  error={errors.phone && errors.phone.message}
                  type="phone"
                />
              </InputGroup>

              <InputGroup label="Email">
                <Input
                  className="admin-panel-input"
                  register={register("email")}
                  error={errors.email && errors.email.message}
                  type="email"
                />
              </InputGroup>

              <InputGroup label="Питание">
                <AdminSelect
                  options={foodTypeOptions}
                  name="foods"
                  control={control}
                  register={register("foods")}
                  error={errors.foods && errors.foods.message}
                  multiple
                />
              </InputGroup>

              <InputGroup label="Услуги">
                <AdminSelect
                  options={serviceTypeOptions}
                  name="services"
                  control={control}
                  register={register("services")}
                  error={errors.services && errors.services.message}
                  multiple
                />
              </InputGroup>

              <InputGroup label="Тип размещения">
                <AdminSelect
                  options={placementTypeOptions}
                  name="placement_type_id"
                  control={control}
                  register={register("placement_type_id")}
                  error={
                    errors.placement_type_id && errors.placement_type_id.message
                  }
                />
              </InputGroup>

              <InputGroup label="Рейтинг">
                <AdminSelect
                  options={ratingOptions}
                  name="rating"
                  control={control}
                  register={register("rating")}
                  error={errors.rating && errors.rating.message}
                />
              </InputGroup>

              <InputGroup label="Регион">
                <AdminSelect
                  options={regionOptions}
                  name="region"
                  control={control}
                  register={register("region")}
                  error={errors.region && errors.region.message}
                  additonalChangeHandler={handleRegionChange}
                />
              </InputGroup>

              <InputGroup label="Город">
                <AdminSelect
                  options={cityOptions}
                  name="city_id"
                  control={control}
                  register={register("city_id")}
                  error={errors.city_id && errors.city_id.message}
                />
              </InputGroup>

              <InputGroup label="Координаты">
                <LocationInput
                  latitude={0}
                  longitude={0}
                  onChangeLatitude={(value: number) => {
                    setValue("lat", value);
                  }}
                  onChangeLongitude={(value: number) => {
                    setValue("lon", value);
                  }}
                  error={
                    (errors.lat && errors.lat.message) ||
                    (errors.lon && errors.lon.message)
                  }
                />
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
