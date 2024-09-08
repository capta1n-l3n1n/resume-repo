interface ReviewDto {
  order_id: string;
  order_number: string;
  product_id: string;
  variant_id: string;
  product_name: string;
  customer_id: string;
  customer_name: string;
  star_number: number;
  title_review: string;
  content_review: string;
  images: [
    {
      src: string;
    }
  ];
  video_url: string;
  attributes: [];
  approved: false;
  published: false;
}
