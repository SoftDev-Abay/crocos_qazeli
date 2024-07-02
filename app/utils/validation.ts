import {
  object,
  string,
  number,
  date,
  InferType,
  boolean,
  mixed,
  array,
} from "yup";

// +7 (654) 564 65 56

const phoneRegExp = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;

export let SignInSchema = object({
  email: string()
    .email("Please enter a valid email address")
    .min(5, "Minimum length is 5 characters")
    .max(50, "Maximum length is 50 characters")
    .required("Field is required"),
  password: string()
    .min(5, "Minimum length is 5 characters")
    .max(50, "Maximum length is 50 characters")
    .required("Field is required"),
});

export type SignInType = InferType<typeof SignInSchema>;

export let ContactFormSchema = object({
  name: string()
    .min(2, "Minimum length is 2 characters")
    .max(50, "Maximum length is 50 characters")
    .required("Field is required"),
  email: string()
    .email("Please enter a valid email address")
    .min(5, "Minimum length is 5 characters")
    .max(50, "Maximum length is 50 characters")
    .required("Field is required"),
  phone_number: string()
    .matches(phoneRegExp, "phone")
    .required("Field is required"),
  agree: boolean()
    .test("is-true", "agree", (value) => value === true)
    .required("Field is required"),
});

export type ContactFormType = InferType<typeof ContactFormSchema>;

export let AddRoomFormSchema = object({
  title: object({
    ru: string()
      .required("Field is required")
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    en: string(),
    kz: string(),
  }),
  description: object({
    ru: string()
      .required("Field is required")
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    en: string(),
    kz: string(),
  }),
  placement_id: number().required("Field is required"),
  room_type_id: number().required("Field is required"),
  // max imgs is 5 and they are files
  gallery_images: array()
    .min(1, "At least 1 image is required")
    .max(5, "No more than 5 images are allowed"),
  comforts: array().required("Field is required"),
  // food types is an array of numbers
  food_types: array().required("Field is required"),
  price: number().nullable().required("Field is required"),
  quantity: number().integer().nullable().required("Field is required"),
  square: number().integer().nullable().required("Field is required"),
  min_booking_period: number()
    .integer()
    .nullable()
    .required("Field is required"),
  smoking: boolean().required("Field is required"),
  status: string(),
  cot_quantity: number().integer().nullable().required("Field is required"),
  cot_price: number().nullable().required("Field is required"),
  fine: number().nullable().required("Field is required"),
  cancellation_id: number().required("Field is required"),
  check_in: date().required("Field is required"),
  check_out: date().required("Field is required"),
});

export type AddRoomFormType = InferType<typeof AddRoomFormSchema>;

export let AddTariffFormSchema = object({
  title: object({
    ru: string()
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    en: string()
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    kz: string()
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
  }).test(
    "at-least-one",
    "atLeastOne",
    (value) => value.ru !== null || value.ru !== null || value.ru !== null
  ),
  percent: number().nullable().required("Field is required"),
  rooms: array().required("Field is required"),
  placement_id: number().required("Field is required"),
});

export type AddTariffFormType = InferType<typeof AddTariffFormSchema>;

export let AddPlacementFormSchema = object({
  title: object({
    ru: string()
      .required("Field is required")
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    en: string(),
    kz: string(),
  }),
  description: object({
    ru: string()
      .required("Field is required")
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    en: string(),
    kz: string(),
  }),
  address: object({
    ru: string()
      .required("Field is required")
      .min(2, "Minimum length is 2 characters")
      .max(50, "Maximum length is 50 characters"),
    en: string(),
    kz: string(),
  }),
  rating: number().nullable().required("Field is required"),
  lat: number().nullable().required("Field is required"),
  lon: number().nullable().required("Field is required"),
  phone: string()
    .matches(
      phoneRegExp,
      "Must be a valid phone number, e.g. +7 (777) 777-77-77"
    )
    .required("requiredField"),
  email: string().email("Invalid email").required("requiredField"),
  gallery_images: array()
    .min(1, "At least 1 image is required")
    .max(5, "No more than 5 images are allowed"),
  placement_type_id: number().required("Field is required"),
  foods: array().required("Field is required"),
  services: array().required("Field is required"),
  city_id: number().required("Field is required"),
  region: number().required("Field is required"),
});

export type AddPlacementFormType = InferType<typeof AddPlacementFormSchema>;
