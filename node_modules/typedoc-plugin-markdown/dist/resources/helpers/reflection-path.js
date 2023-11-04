"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = __importStar(require("handlebars"));
const typedoc_1 = require("typedoc");
function default_1() {
    Handlebars.registerHelper('reflectionPath', function () {
        var _a, _b;
        if (this.model) {
            if (this.model.kind && this.model.kind !== typedoc_1.ReflectionKind.Module) {
                const title = [];
                if (this.model.parent && this.model.parent.parent) {
                    if (this.model.parent.parent.parent) {
                        title.push(`[${this.model.parent.parent.name}](${Handlebars.helpers.relativeURL((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent.url)})`);
                    }
                    title.push(`[${this.model.parent.name}](${Handlebars.helpers.relativeURL(this.model.parent.url)})`);
                }
                title.push(this.model.name);
                return title.length > 1 ? `${title.join('.')}` : null;
            }
        }
        return null;
    });
}
exports.default = default_1;
