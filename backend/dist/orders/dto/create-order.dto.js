"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, surname: { required: true, type: () => String }, phone: { required: true, type: () => String }, city: { required: true, type: () => String }, product_id: { required: true, type: () => Number }, count: { required: true, type: () => Number }, link_id: { required: false, type: () => Number }, user_id: { required: false, type: () => Number } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map