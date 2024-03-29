"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGuideDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_guide_dto_1 = require("./create-guide.dto");
class UpdateGuideDto extends (0, swagger_1.PartialType)(create_guide_dto_1.CreateGuideDto) {
}
exports.UpdateGuideDto = UpdateGuideDto;
//# sourceMappingURL=update-guide.dto.js.map