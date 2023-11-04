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
function default_1(theme) {
    Handlebars.registerHelper('toc', function () {
        var _a, _b;
        const md = [];
        const { hideInPageTOC } = theme;
        const isVisible = (_a = this.groups) === null || _a === void 0 ? void 0 : _a.some((group) => group.allChildrenHaveOwnDocument());
        function pushGroup(group, md) {
            const children = group.children.map((child) => `- [${(0, utils_1.escapeChars)(child.name)}](${Handlebars.helpers.relativeURL(child.url)})`);
            md.push(children.join('\n'));
        }
        if ((!hideInPageTOC && this.groups) || (isVisible && this.groups)) {
            if (!hideInPageTOC) {
                md.push(`## Table of contents\n\n`);
            }
            const headingLevel = hideInPageTOC ? `##` : `###`;
            (_b = this.groups) === null || _b === void 0 ? void 0 : _b.forEach((group) => {
                const groupTitle = group.title;
                if (group.categories) {
                    group.categories.forEach((category) => {
                        md.push(`${headingLevel} ${category.title} ${groupTitle}\n\n`);
                        pushGroup(category, md);
                        md.push('\n');
                    });
                }
                else {
                    if (!hideInPageTOC || group.allChildrenHaveOwnDocument()) {
                        md.push(`${headingLevel} ${groupTitle}\n\n`);
                        pushGroup(group, md);
                        md.push('\n');
                    }
                }
            });
        }
        return md.length > 0 ? md.join('\n') : null;
    });
}
exports.default = default_1;
