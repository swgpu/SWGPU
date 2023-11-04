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
const utils_1 = require("../../utils");
function default_1() {
    Handlebars.registerHelper('hierarchy', function (level) {
        const md = [];
        const symbol = level > 0 ? getSymbol(level) : '-';
        this.types.forEach((hierarchyType) => {
            if (this.isTarget) {
                md.push(`${symbol} **\`${hierarchyType}\`**`);
            }
            else {
                md.push(`${symbol} ${Handlebars.helpers.type.call(hierarchyType)}`);
            }
        });
        if (this.next) {
            md.push(Handlebars.helpers.hierarchy.call(this.next, level + 1));
        }
        return md.join('\n\n');
    });
    function getSymbol(level) {
        return (0, utils_1.spaces)(2) + [...Array(level)].map(() => '↳').join('');
    }
}
exports.default = default_1;
