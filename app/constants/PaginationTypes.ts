interface IPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface IPaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export type { IPaginationLinks, IPaginationMeta };
