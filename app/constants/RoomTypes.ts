// {
//     "data": {
//       "id": 1,
//       "room_type": {
//         "id": 1,
//         "slug": "double",
//         "number_room": 2,
//         "sleeping_places": 2,
//         "title": "Стандартный двухместный",
//         "description": "",
//         "created_at": "2024-06-07T04:45:57.000000Z"
//       },
//       "title": "Стандартная комната",
//       "description": "",
//       "default_price": "1.00",
//       "default_quantity": 10,
//       "price": null,
//       "tariff_id": null,
//       "square": 10,
//       "smoking": 0,
//       "room_settlement": {
//         "id": 1,
//         "room_id": 1,
//         "fine": "50000.00",
//         "check_in": "12:00 утра",
//         "check_out": "12:00 вечера",
//         "cancellation": {
//           "id": 1,
//           "time": "1 день"
//         }
//       },
//       "gallery_images": [],
//       "comfort_rooms": [],
//       "food_types": [],
//       "best_tariff": null,
//       "min_booking_period": 1,
//       "roomTariffs": [
//         {
//           "id": 1,
//           "room_id": 1,
//           "tariff_id": 2,
//           "user_id": 2,
//           "status": "active",
//           "created_at": "2024-06-07T04:45:57.000000Z",
//           "updated_at": "2024-06-07T04:45:57.000000Z",
//           "deleted_at": null,
//           "prices": [
//             {
//               "id": 1,
//               "room_tariff_id": 1,
//               "price": "1.00",
//               "from_at": "2024-01-04",
//               "until_at": "2024-12-14",
//               "created_at": "2024-06-07T04:45:57.000000Z",
//               "updated_at": "2024-06-07T04:45:57.000000Z",
//               "deleted_at": null
//             }
//           ],
//           "quantities": [
//             {
//               "id": 1,
//               "room_tariff_id": 1,
//               "quantity": 62,
//               "from_at": "2024-01-04",
//               "until_at": "2024-12-14",
//               "created_at": "2024-06-07T04:45:57.000000Z",
//               "updated_at": "2024-06-07T04:45:57.000000Z",
//               "deleted_at": null
//             }
//           ],
//           "statuses": []
//         },
//         {
//           "id": 3,
//           "room_id": 1,
//           "tariff_id": 3,
//           "user_id": 2,
//           "status": "active",
//           "created_at": "2024-06-13T06:58:49.000000Z",
//           "updated_at": "2024-06-13T06:58:49.000000Z",
//           "deleted_at": null,
//           "prices": [],
//           "quantities": [],
//           "statuses": []
//         }
//       ],
//       "placement": null,
//       "childrenCot": {
//         "id": 1,
//         "room_id": 1,
//         "quantity": 3,
//         "price": "1.00",
//         "deleted_at": null,
//         "created_at": "2024-06-07T04:45:57.000000Z",
//         "updated_at": "2024-06-07T04:45:57.000000Z"
//       },
//       "children": [
//         {
//           "id": 1,
//           "price": "100.00",
//           "range": "3-6",
//           "quantity": 2,
//           "room_id": 1
//         },
//         {
//           "id": 2,
//           "price": "200.00",
//           "range": "6-12",
//           "quantity": 3,
//           "room_id": 1
//         }
//       ]
//     }
//   }
// }

interface IRoomType {
  id: number;
  slug: string;
  number_room: number;
  sleeping_places: number;
  title: string;
  description: string;
  created_at: string;
}

interface IRoomSettlement {
  id: number;
  room_id: number;
  fine: string;
  check_in: string;
  check_out: string;
  cancellation: {
    id: number;
    time: string;
  };
}

interface IRoomTariff {
  id: number;
  room_id: number;
  tariff_id: number;
  user_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  prices: {
    id: number;
    room_tariff_id: number;
    price: string;
    from_at: string;
    until_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }[];
  quantities: {
    id: number;
    room_tariff_id: number;
    quantity: number;
    from_at: string;
    until_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }[];
  statuses: any[];
}

interface IRoomChildrenCot {
  id: number;
  room_id: number;
  quantity: number;
  price: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

interface IRoomChildrenSpecial {
  id: number;
  price: string;
  range: string;
  quantity: number;
  room_id: number;
}

interface IRoom {
  id: number;
  room_type: IRoomType;
  title: string;
  description: string;
  default_price: string;
  default_quantity: number;
  price: string;
  tariff_id: number;
  square: number;
  smoking: number;
  room_settlement: IRoomSettlement;
  gallery_images: any[];
  comfort_rooms: any[];
  food_types: any[];
  best_tariff: any;
  min_booking_period: number;
  roomTariffs: IRoomTariff[];
  placement: any;
  childrenCot: IRoomChildrenCot;
  children: IRoomChildrenSpecial[];
}

export type {
  IRoomType,
  IRoomSettlement,
  IRoomTariff,
  IRoomChildrenCot,
  IRoomChildrenSpecial,
  IRoom,
};
