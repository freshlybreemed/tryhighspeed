export type File = {
  node: {
    id: string;
    name: string;
    relativeDirectory: string;
    childImageSharp: {
      id: string;
      fixed: any;
    };
  };
};
type ProductAttributes = { name: string; option: string };

export type ProductVariations = {
  attributes: ProductAttributes[];
  id: number;
  price: string;
};
export type AllWcProducts = {
  node: WooProduct;
};
export type WooProduct = {
  id: string;
  wordpress_id: string;
  name: string;
  price: string;
  slug: string;
  description: string;
  status: string;
  short_description: string;
  product_variations: ProductVariations[];
  images: [
    {
      src: string;
      localFile: {
        childImageSharp: {
          fluid: any;
          fixed: any;
        };
      };
    }
  ];
  categories: {
    wordpress_id: string;
  };
};
