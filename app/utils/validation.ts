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

const phoneRegExp = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export let ContactFormSchema = object({
  name: string()
    .min(2, "minField2")
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

// add room fileds

// this are the field that will on the fronetend

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
// Количество детских кроваток 6-12 лет
// Цена за детскую кроватку за день 6-12 лет
// Штраф
// Условия отмены
// Время заезда
// Время выезда
// Удобства номера
// Количество номеров подобного типа
// Галерея

// these are the fields that will be send to the backend

// cot is a really young baby
// fine is a penalty
// {
//     "placement_id": 1,
//     "room_type_id": 1,
//     "gallery_images": [
//       1,
//       2,
//       3
//     ],
//     "comforts": [
//       1,
//       2,
//       3
//     ],
//     "food_types": [
//       1,
//       2,
//       3
//     ],
//     "price": 150.75,
//     "quantity": 1, // should be a integer number, nullable
//     "square": 25, // should be a integer number, nullable
//     "min_booking_period": 10, // should be a integer number, nullable
//     "smoking": true,
//     "status": "active",
//     "cot_quantity": 2, // should be a integer number, nullable
//     "cot_price": 20.5,  // should be nullable
//     "fine": 100.5, // should be nullable
//     "cancellation_id": "1",
//     "check_in": "2025-01-01T15:00:00",
//     "check_out": "2025-01-01T15:00:00",
//     "ru": {
//       "title": "Заголовок на русском языке",
//       "description": "Описание на русском языке"
//     },
//     "en": {
//       "title": "Заголовок на английском языке",
//       "description": "Описание на английском языке"
//     },
//     "kz": {
//       "title": "Заголовок на казахском языке",
//       "description": "Описание на казахском языке"
//     }
//   }

// I need to test so that at least one of the fields is filled in the language fields, to do that I need to use the test method from yup

export let AddRoomFormSchema = object({
  title: object({
    ru: string()
      .min(2, "minField2")
      .max(50, "Maximum length is 50 characters")
      .required("Field is required"),
    en: string().min(2, "minField2").max(50, "Maximum length is 50 characters"),
    kz: string().min(2, "minField2").max(50, "Maximum length is 50 characters"),
  }).test(
    "at-least-one",
    "atLeastOne",
    (value) => value.ru !== null || value.ru !== null || value.ru !== null
  ),
  description: object({
    ru: string()
      .min(2, "minField2")
      .max(50, "Maximum length is 50 characters")
      .required("Field is required"),
    en: string().min(2, "minField2").max(50, "Maximum length is 50 characters"),
    kz: string().min(2, "minField2").max(50, "Maximum length is 50 characters"),
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
  cancellation_id: string().required("Field is required"),
  check_in: date().required("Field is required"),
  check_out: date().required("Field is required"),
});

export type AddRoomFormType = InferType<typeof AddRoomFormSchema>;
