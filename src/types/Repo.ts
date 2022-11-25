export type Repo = {
  name: string;
  description: string;
  owner: {
    login: string;
    id: number;
  };
};
