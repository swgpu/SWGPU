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
const utils_1 = require("../../utils");
function default_1(theme) {
    Handlebars.registerHelper('signatureTitle', function (accessor, standalone = true) {
        var _a, _b;
        const md = [];
        if (standalone && !theme.hideMembersSymbol) {
            md.push(`${(0, utils_1.memberSymbol)(this)} `);
        }
        if (this.parent && ((_a = this.parent.flags) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            md.push(this.parent.flags.map((flag) => `\`${flag}\``).join(' ') + ' ');
        }
        if (accessor) {
            md.push(`\`${accessor}\` **${this.name}**`);
        }
        else if (this.name !== '__call' && this.name !== '__type') {
            md.push(`**${this.name}**`);
        }
        if (this.typeParameters) {
            md.push(`<${this.typeParameters
                .map((typeParameter) => `\`${typeParameter.name}\``)
                .join(', ')}\\>`);
        }
        md.push(`(${getParameters(this.parameters)})`);
        if (this.type && !((_b = this.parent) === null || _b === void 0 ? void 0 : _b.kindOf(typedoc_1.ReflectionKind.Constructor))) {
            md.push(`: ${Handlebars.helpers.type.call(this.type, 'object')}`);
        }
        return md.join('') + (standalone ? '\n' : '');
    });
}
exports.default = default_1;
const getParameters = (parameters = [], backticks = true) => {
    return parameters
        .map((param) => {
        const isDestructuredParam = param.name == '__namedParameters';
        const paramItem = `${param.flags.isRest ? '...' : ''}${isDestructuredParam ? '«destructured»' : param.name}${param.flags.isOptional || param.defaultValue ? '?' : ''}`;
        return backticks ? `\`${paramItem}\`` : paramItem;
    })
        .join(', ');
};
