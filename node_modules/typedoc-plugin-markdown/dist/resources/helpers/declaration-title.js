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
    Handlebars.registerHelper('declarationTitle', function () {
        const md = theme.hideMembersSymbol ? [] : [(0, utils_1.memberSymbol)(this)];
        function getType(reflection) {
            var _a, _b;
            const reflectionType = reflection.type;
            if (reflectionType && ((_a = reflectionType.declaration) === null || _a === void 0 ? void 0 : _a.children)) {
                return ': `Object`';
            }
            return ((((_b = reflection.parent) === null || _b === void 0 ? void 0 : _b.kindOf(typedoc_1.ReflectionKind.Enum)) ? ' = ' : ': ') +
                Handlebars.helpers.type.call(reflectionType ? reflectionType : reflection, 'object'));
        }
        if (this.flags && this.flags.length > 0 && !this.flags.isRest) {
            md.push(' ' + this.flags.map((flag) => `\`${flag}\``).join(' '));
        }
        md.push(`${this.flags.isRest ? '... ' : ''} **${(0, utils_1.escapeChars)(this.name)}**`);
        if (this instanceof typedoc_1.DeclarationReflection && this.typeParameters) {
            md.push(`<${this.typeParameters
                .map((typeParameter) => `\`${typeParameter.name}\``)
                .join(', ')}\\>`);
        }
        md.push(getType(this));
        if (!(this.type instanceof typedoc_1.LiteralType) &&
            this.defaultValue &&
            this.defaultValue !== '...') {
            md.push(` = \`${(0, utils_1.stripLineBreaks)((0, utils_1.stripComments)(this.defaultValue))}\``);
        }
        return md.join('');
    });
}
exports.default = default_1;
