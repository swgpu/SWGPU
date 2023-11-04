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
exports.getPageTitle = exports.prependYAML = void 0;
const Handlebars = __importStar(require("handlebars"));
const prependYAML = (contents, vars) => {
    return contents
        .replace(/^/, toYAML(vars) + '\n\n')
        .replace(/[\r\n]{3,}/g, '\n\n');
};
exports.prependYAML = prependYAML;
const getPageTitle = (page) => {
    return Handlebars.helpers.reflectionTitle.call(page, false);
};
exports.getPageTitle = getPageTitle;
const toYAML = (vars) => {
    const yaml = `---
${Object.entries(vars)
        .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${escapeString(value)}"` : value}`)
        .join('\n')}
---`;
    return yaml;
};
const escapeString = (str) => str.replace(/"/g, '\\"');
