// {
//     "data": {
//       "id": 1,
//       "tariff_id": null,
//       "parent": null,
//       "room_tariffs": any[],
//       "title": "Стандартный",
//       "placement_id": 1,
//       "percent": "0.00",
//       "created_at": "2024-06-21T06:20:50.000000Z"
//     }
//   }

interface ITariff {
  id: number;
  tariff_id: number;
  parent: number | null;
  room_tariffs: any[];
  title: string;
  placement_id: number;
  percent: string;
  created_at: string;
}

export type { ITariff };
