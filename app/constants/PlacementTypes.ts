import { IRoom } from "./RoomTypes";
import { ICity, IRegion } from "./LocaionTypes";

// {
//     "data": {
//       "id": 3,
//       "title": "Заголовок на русском языке",
//       "description": "Описание на русском языке",
//       "address": "Адрес на русском языке",
//       "phone": "+77073219131",
//       "email": "seocndexample@mail.ru",
//       "rating": 1,
//       "lat": 40.71,
//       "lon": -74.01,
//       "placement_type": {
//         "id": 1,
//         "slug": "hotel",
//         "image": {
//           "id": 1,
//           "name": "hotel.jpg",
//           "path": "https://qazeli-new-back-dev.crocos.kz/storage/placementTypesImages/2120887380.jpg",
//           "size": 444485,
//           "hash": "a04289e7443267772bcae8ea85711c9e19c12300",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         },
//         "title": "Отель",
//         "created_at": "2024-06-21T06:20:49.000000Z"
//       },
//       "city": {
//         "id": 1,
//         "title": "Алматы",
//         "created_at": "2024-06-21T06:20:48.000000Z"
//       },
//       "region": {
//         "id": 2,
//         "title": "Алматы",
//         "created_at": "2024-06-21T06:20:48.000000Z",
//         "cities": [
//           {
//             "id": 1,
//             "title": "Алматы",
//             "created_at": "2024-06-21T06:20:48.000000Z"
//           }
//         ]
//       },
//       "main_image": {
//         "id": 1,
//         "name": "hotel.jpg",
//         "path": "https://qazeli-new-back-dev.crocos.kz/storage/placementTypesImages/2120887380.jpg",
//         "size": 444485,
//         "hash": "a04289e7443267772bcae8ea85711c9e19c12300",
//         "created_at": "2024-06-21T06:20:49.000000Z"
//       },
//       "gallery_images": [
//         {
//           "id": 1,
//           "name": "hotel.jpg",
//           "path": "https://qazeli-new-back-dev.crocos.kz/storage/placementTypesImages/2120887380.jpg",
//           "size": 444485,
//           "hash": "a04289e7443267772bcae8ea85711c9e19c12300",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         },
//         {
//           "id": 2,
//           "name": "cottage.jpeg",
//           "path": "https://qazeli-new-back-dev.crocos.kz/storage/placementTypesImages/2205578814.jpg",
//           "size": 147407,
//           "hash": "b9a40ac906ea803108f296336124093f6e892551",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         },
//         {
//           "id": 3,
//           "name": "guestHouse.jpg",
//           "path": "https://qazeli-new-back-dev.crocos.kz/storage/placementTypesImages/3308018693.jpg",
//           "size": 65818,
//           "hash": "153514d64afa2e3218f175e1190af8d327dd7a43",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         }
//       ],
//       "rooms": [],
//       "room_first": null,
//       "service_types": [
//         {
//           "id": 1,
//           "slug": "wi-fi",
//           "title": "Бесплатный Wi-Fi",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         },
//         {
//           "id": 2,
//           "slug": "parking",
//           "title": "Парковка",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         },
//         {
//           "id": 3,
//           "slug": "pool",
//           "title": "Бассейн",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         }
//       ],
//       "food_types": [
//         {
//           "id": 1,
//           "slug": "not-included",
//           "title": "Питание не включено",
//           "created_at": "2024-06-21T06:20:49.000000Z"
//         }
//       ],
//       "comforts": [],
//       "fines": [],
//       "status": "active",
//       "created_at": "2024-06-21T07:27:50.000000Z",
//       "freeze": 1
//     }
//   }

interface IImage {
  id: number;
  name: string;
  path: string;
  size: number;
  hash: string;
  created_at: string;
}

interface IPlacementType {
  id: number;
  slug: string;
  image: IImage;
  title: string;
  created_at: string;
}

interface IPlacementTypeWithImage extends IPlacementType {
  image: IImage;
}

interface ITypeItem {
  id: number;
  slug: string;
  title: string;
  created_at: string;
}

interface IPlacement {
  id: number;
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  lat: number;
  lon: number;
  placement_type: IPlacementType;
  city: ICity;
  region: IRegion;
  main_image: IImage;
  gallery_images: IImage[];
  rooms: IRoom[];
  room_first: null;
  service_types: ITypeItem[];
  food_types: ITypeItem[];
  comforts: ITypeItem[];
  fines: ITypeItem[];
  status: string;
  created_at: string;
  freeze: number;
}

// export interface IPlacementResponse {
//   data: IPlacement;
// }

export type {
  IPlacement,
  IPlacementType,
  IImage,
  ITypeItem,
  IPlacementTypeWithImage,
};
