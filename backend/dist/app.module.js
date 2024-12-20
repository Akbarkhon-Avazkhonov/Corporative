"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const category_module_1 = require("./category/category.module");
const referral_module_1 = require("./referral/referral.module");
const orders_module_1 = require("./orders/orders.module");
const super_category_module_1 = require("./super-category/super-category.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const admin_module_1 = require("./admin/admin.module");
const guides_module_1 = require("./guides/guides.module");
const bid_module_1 = require("./bid/bid.module");
const profile_module_1 = require("./profile/profile.module");
const prisma_service_1 = require("./prisma.service");
const onec_module_1 = require("./onec/onec.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            category_module_1.CategoryModule,
            referral_module_1.ReferralModule,
            orders_module_1.OrdersModule,
            super_category_module_1.SuperCategoryModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            admin_module_1.AdminModule,
            guides_module_1.GuidesModule,
            bid_module_1.BidModule,
            profile_module_1.ProfileModule,
            onec_module_1.OnecModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map