import { PrismaService } from 'src/prisma.service';
export declare class OnecService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    handleCron(): Promise<void>;
}
