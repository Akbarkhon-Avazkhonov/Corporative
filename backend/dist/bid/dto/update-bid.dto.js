"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBidDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_bid_dto_1 = require("./create-bid.dto");
class UpdateBidDto extends (0, swagger_1.PartialType)(create_bid_dto_1.CreateBidDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBidDto = UpdateBidDto;
//# sourceMappingURL=update-bid.dto.js.map