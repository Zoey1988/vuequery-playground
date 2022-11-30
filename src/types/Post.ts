export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type Comment = {
  email: string;
  id: number;
  postId: number;
  name: string;
  body: string;
};
