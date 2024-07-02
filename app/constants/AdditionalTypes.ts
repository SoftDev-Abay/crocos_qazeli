// interface IFoodType {
//   id: 1;
//   slug: "not-included";
//   title: "Питание не включено";
//   created_at: "2024-06-21T06:20:49.000000Z";
// }

interface IFoodType {
  id: number;
  slug: string;
  title: string;
  created_at: string;
}

// {
//     "id": 3,
//     "comfort_room_type_id": 2,
//     "title": "Кровать",
//     "created_at": "2024-06-21T06:20:50.000000Z"
//   },

interface IComfortType {
  id: number;
  comfort_room_type_id: number;
  title: string;
  created_at: string;
}

// {
//   "id": 1,
//   "time": "1 день"
// }

interface ICancelationType {
  id: number;
  time: string;
}

interface IGalleryImage {
  id: number;
  disk: string;
  name: string;
  hash: string;
}

interface IServiceType {
  id: number;
  slug: string;
  title: string;
  created_at: string;
}

export type {
  IFoodType,
  IComfortType,
  ICancelationType,
  IGalleryImage,
  IServiceType,
};
