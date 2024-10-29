"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Admin, Referral and Corporative API')
        .setVersion('0.0.1')
        .addServer('/')
        .addServer('/api')
        .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: [
            'https://euphoria-group.uz/',
            'flashcloud.uz',
            '1c.corp.euphoriagroup.uz',
            'http://localhost:3000',
            'https://euphoria-admin.uz',
            'https://euphoria-admin.uz/',
            'https://euphoria-referral.uz',
            'https://euphoria-referral.uz/',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map