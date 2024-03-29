import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
export declare class GuidesController {
    private readonly guidesService;
    constructor(guidesService: GuidesService);
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
    findOne(id: string): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
    update(id: string, updateGuideDto: UpdateGuideDto): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        created_at: Date;
    }>;
}
