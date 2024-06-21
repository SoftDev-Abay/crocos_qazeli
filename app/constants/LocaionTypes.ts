interface ICity {
  id: number;
  title: string;
  created_at: string;
}

interface IRegion {
  id: number;
  title: string;
  created_at: string;
  cities: ICity[];
}

export type { ICity, IRegion };
