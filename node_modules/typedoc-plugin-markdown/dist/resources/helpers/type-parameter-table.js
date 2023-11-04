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
    Handlebars.registerHelper('typeParameterTable', function () {
        return table(this);
    });
}
exports.default = default_1;
function table(parameters) {
    const showTypeCol = hasTypes(parameters);
    const comments = parameters.map((param) => { var _a; return !!((_a = param.comment) === null || _a === void 0 ? void 0 : _a.hasVisibleComponent()); });
    const hasComments = !comments.every((value) => !value);
    const headers = ['Name'];
    if (showTypeCol) {
        headers.push('Type');
    }
    if (hasComments) {
        headers.push('Description');
    }
    const rows = parameters.map((parameter) => {
        var _a, _b;
        const row = [];
        row.push(`\`${parameter.name}\``);
        if (showTypeCol) {
            const typeCol = [];
            if (!parameter.type && !parameter.default) {
                typeCol.push(`\`${parameter.name}\``);
            }
            if (parameter.type) {
                typeCol.push(`extends ${Handlebars.helpers.type.call(parameter.type, 'object')}`);
            }
            if (parameter.default) {
                if (parameter.type) {
                    typeCol.push(' = ');
                }
                typeCol.push(Handlebars.helpers.type.call(parameter.default));
            }
            row.push(typeCol.join(''));
        }
        if (hasComments) {
            if ((_a = parameter.comment) === null || _a === void 0 ? void 0 : _a.summary) {
                row.push((0, utils_1.stripLineBreaks)(Handlebars.helpers.comment((_b = parameter.comment) === null || _b === void 0 ? void 0 : _b.summary)).replace(/\|/g, '\\|'));
            }
            else {
                row.push('-');
            }
        }
        return `| ${row.join(' | ')} |\n`;
    });
    const output = `\n| ${headers.join(' | ')} |\n| ${headers
        .map(() => ':------')
        .join(' | ')} |\n${rows.join('')}`;
    return output;
}
function hasTypes(parameters) {
    const types = parameters.map((param) => !!param.type || !!param.default);
    return !types.every((value) => !value);
}
