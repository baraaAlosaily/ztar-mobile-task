export interface IBook {
  [key: string]: unknown;
  title: string;
  description: string;
  id?: string;
  category?: string;
  author?: string;
  name?: string;
}

export interface IBookDetails{
  [key: string]: unknown;
  title: string;
  authors: string[];
  imageLinks: {thumbnail:string};
  description: string;
  averageRating: number;
  publisher: string;
  publishedDate: string;
  ratingsCount: number;
  infoLink: string;

}
