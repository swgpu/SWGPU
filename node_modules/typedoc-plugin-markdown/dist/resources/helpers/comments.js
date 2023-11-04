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
    Handlebars.registerHelper('comments', function (comment, showSummary = true, showTags = true) {
        var _a;
        const md = [];
        if (showSummary && comment.summary) {
            md.push(Handlebars.helpers.comment(comment.summary));
        }
        const filteredTags = comment.blockTags.filter((tag) => tag.tag !== '@returns');
        if (showTags && ((_a = comment.blockTags) === null || _a === void 0 ? void 0 : _a.length)) {
            const tags = filteredTags.map((tag) => `**\`${(0, utils_1.camelToTitleCase)(tag.tag.substring(1))}\`**\n\n${Handlebars.helpers.comment(tag.content)}`);
            md.push(tags.join('\n\n'));
        }
        return md.join('\n\n');
    });
}
exports.default = default_1;
