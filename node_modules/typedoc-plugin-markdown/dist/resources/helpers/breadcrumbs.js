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
    Handlebars.registerHelper('breadcrumbs', function () {
        const { entryPoints, entryDocument, project, readme } = theme;
        if (!project) {
            return '';
        }
        const hasReadmeFile = !readme.endsWith('none');
        const breadcrumbs = [];
        const globalsName = entryPoints.length > 1 ? 'Modules' : 'Exports';
        breadcrumbs.push(this.url === entryDocument
            ? project.name
            : `[${(0, utils_1.getDisplayName)(project)}](${Handlebars.helpers.relativeURL(entryDocument)})`);
        if (hasReadmeFile) {
            breadcrumbs.push(this.url === project.url
                ? globalsName
                : `[${globalsName}](${Handlebars.helpers.relativeURL('modules.md')})`);
        }
        const breadcrumbsOut = breadcrumb(this, this.model, breadcrumbs);
        return breadcrumbsOut;
    });
}
exports.default = default_1;
function breadcrumb(page, model, md) {
    if (model && model.parent) {
        breadcrumb(page, model.parent, md);
        if (model.url) {
            md.push(page.url === model.url
                ? `${(0, utils_1.escapeChars)(model.name)}`
                : `[${(0, utils_1.escapeChars)(model.name)}](${Handlebars.helpers.relativeURL(model.url)})`);
        }
    }
    return md.join(' / ');
}
