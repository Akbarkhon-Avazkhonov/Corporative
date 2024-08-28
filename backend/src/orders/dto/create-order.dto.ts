export class CreateOrderDto {
  name: string;
  surname: string;
  phone: string;
  city: string;
  product_id: number;
  count: number;
  link_id?: number;
  user_id?: number;
}

// id         Int         @id @default(autoincrement())
// name       String
// surname    String
// phone      String
// city       String
// product_id Int
// count      Int
// status     OrderStatus @default(NEW)
// link_id    Int?
// user_id    Int?
// USER       User?       @relation(fields: [user_id], references: [id])
// created_at DateTime    @default(now())
