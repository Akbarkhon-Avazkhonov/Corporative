"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, compound: { required: true, type: () => String }, category_id: { required: true, type: () => Number }, action: { required: true, type: () => String }, price: { required: true, type: () => Number }, description: { required: true, type: () => String }, count: { required: true, type: () => Number }, testimony: { required: true, type: () => String }, contraction: { required: true, type: () => String }, image: { required: true, type: () => Object }, color: { required: true, type: () => Number }, extra: { required: true, type: () => Object } };
    }
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map