export type Repo = {
  name: string;
  description: string;
  updated_at: string;
  owner: {
    login: string;
    id: number;
  };
};
