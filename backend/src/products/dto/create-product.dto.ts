export class CreateProductDto {
  title: string;
  compound: string;
  category_id: number;
  action: string;
  price: number;
  description: string;
  count: number;
  testimony: string;
  contraction: string;
  image: any;
  color: number;
  extra: any;
}
/*
id          Int    @id @default(autoincrement())
title       String
compound    String
category_id Int
action      String
price       Int
description String
count       Int
testimony   String
image       String


*/

// make me example

/*
title:"Product 1",
compound:"Compound 1",
category_id: 1,
action: "Action 1",
price: 100,
description:"Description 1",
count: 10,
testimony:"Testimony 1",
image: "Image 1",
*/

// make it json
