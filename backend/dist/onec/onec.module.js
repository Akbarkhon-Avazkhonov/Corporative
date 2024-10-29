"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnecModule = void 0;
const common_1 = require("@nestjs/common");
const onec_service_1 = require("./onec.service");
const schedule_1 = require("@nestjs/schedule");
let OnecModule = class OnecModule {
};
exports.OnecModule = OnecModule;
exports.OnecModule = OnecModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot()],
        providers: [onec_service_1.OnecService],
    })
], OnecModule);
//# sourceMappingURL=onec.module.js.map