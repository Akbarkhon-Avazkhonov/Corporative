export class CreateOrderDto {
  name: string;
  surname: string;
  phone: string;
  city: string;
  product_id: number;
  count: number;
}

/*
  id         Int      @id @default(autoincrement())
  name       String
  surname    String
  phone      String
  city       String
  product_id Int
  count      Int
  created_at DateTime @default(now())
  */
