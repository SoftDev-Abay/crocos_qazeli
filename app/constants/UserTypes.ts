interface IUser {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  email: string;
  status: string;
  created_at: string;
  full_name: string;
  gender: string;
  city: string;
  region: string;
  role: {
    id: number;
    slug: string;
    title: string;
    created_at: string;
    permission: [
      {
        id: number;
        slug: string;
        title: string;
        created_at: string;
      }
    ];
  };
}

export type { IUser };
