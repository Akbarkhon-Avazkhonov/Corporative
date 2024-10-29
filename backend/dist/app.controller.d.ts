import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    search(search: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        compound: string;
        category_id: number;
        action: string;
        price: number;
        description: string;
        count: number;
        testimony: string;
        contraction: string;
        image: import(".prisma/client").Prisma.JsonValue;
        color: number;
        extra: import(".prisma/client").Prisma.JsonValue;
    }[]>;
}
