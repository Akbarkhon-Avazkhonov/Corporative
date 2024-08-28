"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuideDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateGuideDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, subtitle: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.CreateGuideDto = CreateGuideDto;
//# sourceMappingURL=create-guide.dto.js.map