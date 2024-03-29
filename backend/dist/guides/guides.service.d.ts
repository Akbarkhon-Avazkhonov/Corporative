import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from 'src/prisma.service';
export declare class GuidesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createGuideDto: CreateGuideDto): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
    update(id: number, updateGuideDto: UpdateGuideDto): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
}
