export interface Blog {
  id?: number;
  title: string;
  description: string;
  content: string;
  image: string;
  isFeatured: boolean;
  categoryId: number;
}
