export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  code: string;
  brand: string;
  model: string;
  yearFrom: number | null;
  yearTo: number | null;
  image1Url: string | null;
  image2Url: string | null;
  brochureUrl: string | null;
  videoUrl: string | null;
};