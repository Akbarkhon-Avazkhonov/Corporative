"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const prisma_service_1 = require("../prisma.service");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user_id, images, info) {
        const fileUrls = [];
        const uloadedPromises = images.map(async (file) => {
            const uploadDir = 'uploads';
            const filename = `${Date.now()}-${file.originalname}`;
            const filePath = uploadDir + `/` + filename;
            await fs_1.promises.writeFile(filePath, file.buffer);
            const fileUrl = `${process.env.BACKEND_URL}/${filePath}`;
            fileUrls.push(fileUrl);
        });
        await Promise.all(uloadedPromises);
        return await this.prisma.profile.upsert({
            where: { user_id: user_id },
            create: {
                user_id: user_id,
                images: fileUrls,
                info: info,
            },
            update: {
                images: fileUrls,
                info: info,
            },
        });
    }
    async findAll() {
        return await this.prisma.profile.findMany({
            orderBy: { id: 'desc' },
            include: {
                user: {
                    include: {
                        _count: {
                            select: { Links: true },
                        },
                    },
                },
            },
        });
    }
    async search(query) {
        return await this.prisma.profile.findMany({
            where: {
                OR: [
                    {
                        user: {
                            fullname: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        user: {
                            email: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        user: {
                            phone_number: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                    },
                ],
            },
            include: { user: true },
        });
    }
    async findSome(take, skip) {
        return await this.prisma.profile.findMany({
            take,
            skip,
            orderBy: { id: 'desc' },
            include: {
                user: {
                    include: {
                        _count: {
                            select: { Links: true },
                        },
                    },
                },
            },
        });
    }
    async findOne(user_id) {
        return await this.prisma.profile.findUnique({
            where: { user_id: user_id },
            include: { user: true },
        });
    }
    async update(id, isVerified) {
        if (isVerified == 'true') {
            isVerified = true;
        }
        if (isVerified == 'false') {
            isVerified = false;
        }
        return await this.prisma.user.update({
            where: { id: id },
            data: { isVerified: Boolean(isVerified) },
        });
    }
    async remove(id) {
        return await this.prisma.profile.delete({ where: { id: id } });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map