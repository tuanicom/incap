export interface Comment {
  _id?: string;
  text: string;
  authorId: string;
  articleId: string;
  createdAt: string;
  updatedAt?: string;
}
