"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReferralDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateReferralDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { product_id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, title: { required: true, type: () => String } };
    }
}
exports.CreateReferralDto = CreateReferralDto;
//# sourceMappingURL=create-referral.dto.js.map