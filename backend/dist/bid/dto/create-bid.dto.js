"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBidDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateBidDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, surname: { required: true, type: () => String }, phone: { required: true, type: () => String }, message: { required: true, type: () => String } };
    }
}
exports.CreateBidDto = CreateBidDto;
//# sourceMappingURL=create-bid.dto.js.map