"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSuperCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_super_category_dto_1 = require("./create-super-category.dto");
class UpdateSuperCategoryDto extends (0, swagger_1.PartialType)(create_super_category_dto_1.CreateSuperCategoryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSuperCategoryDto = UpdateSuperCategoryDto;
//# sourceMappingURL=update-super-category.dto.js.map