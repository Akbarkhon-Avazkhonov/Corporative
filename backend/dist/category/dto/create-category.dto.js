"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, super_category_id: { required: false, type: () => Number } };
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=create-category.dto.js.map