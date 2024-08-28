"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fullname: { required: true, type: () => String }, email: { required: true, type: () => String }, phone_number: { required: true, type: () => String }, password: { required: true, type: () => String }, gender: { required: true, type: () => String }, age: { required: true, type: () => Number }, city: { required: true, type: () => String } };
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=auth-product.dto.js.map