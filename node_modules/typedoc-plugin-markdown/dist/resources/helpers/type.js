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
exports.getFunctionType = exports.getReflectionType = void 0;
const Handlebars = __importStar(require("handlebars"));
const typedoc_1 = require("typedoc");
const utils_1 = require("../../utils");
function default_1() {
    Handlebars.registerHelper('type', function (collapse = 'none', emphasis = true) {
        if (this instanceof typedoc_1.ReferenceType) {
            return getReferenceType(this, emphasis);
        }
        if (this instanceof typedoc_1.ArrayType && this.elementType) {
            return getArrayType(this, emphasis);
        }
        if (this instanceof typedoc_1.UnionType && this.types) {
            return getUnionType(this, emphasis);
        }
        if (this instanceof typedoc_1.IntersectionType && this.types) {
            return getIntersectionType(this);
        }
        if (this instanceof typedoc_1.TupleType && this.elements) {
            return getTupleType(this);
        }
        if (this instanceof typedoc_1.IntrinsicType && this.name) {
            return getIntrinsicType(this, emphasis);
        }
        if (this instanceof typedoc_1.ReflectionType) {
            return getReflectionType(this, collapse);
        }
        if (this instanceof typedoc_1.DeclarationReflection) {
            return getReflectionType(this, collapse);
        }
        if (this instanceof typedoc_1.TypeOperatorType) {
            return getTypeOperatorType(this);
        }
        if (this instanceof typedoc_1.QueryType) {
            return getQueryType(this);
        }
        if (this instanceof typedoc_1.ConditionalType) {
            return getConditionalType(this);
        }
        if (this instanceof typedoc_1.IndexedAccessType) {
            return getIndexAccessType(this);
        }
        if (this instanceof typedoc_1.UnknownType) {
            return getUnknownType(this);
        }
        if (this instanceof typedoc_1.InferredType) {
            return getInferredType(this);
        }
        if (this instanceof typedoc_1.LiteralType) {
            return getLiteralType(this);
        }
        return this ? (0, utils_1.escapeChars)(this.toString()) : '';
    });
}
exports.default = default_1;
function getLiteralType(model) {
    if (typeof model.value === 'bigint') {
        return `\`${model.value}n\``;
    }
    return `\`\`${JSON.stringify(model.value)}\`\``;
}
function getReflectionType(model, collapse) {
    const root = model instanceof typedoc_1.ReflectionType ? model.declaration : model;
    if (root.signatures) {
        return collapse === 'function' || collapse === 'all'
            ? `\`fn\``
            : getFunctionType(root.signatures);
    }
    return collapse === 'object' || collapse === 'all'
        ? `\`Object\``
        : getDeclarationType(root);
}
exports.getReflectionType = getReflectionType;
function getDeclarationType(model) {
    if (model.indexSignature || model.children) {
        let indexSignature = '';
        const declarationIndexSignature = model.indexSignature;
        if (declarationIndexSignature) {
            const key = declarationIndexSignature.parameters
                ? declarationIndexSignature.parameters.map((param) => `\`[${param.name}: ${param.type}]\``)
                : '';
            const obj = Handlebars.helpers.type.call(declarationIndexSignature.type);
            indexSignature = `${key}: ${obj}; `;
        }
        const types = model.children &&
            model.children.map((obj) => {
                return `\`${obj.name}${obj.flags.isOptional ? '?' : ''}\`: ${Handlebars.helpers.type.call(obj.signatures || obj.children ? obj : obj.type)} ${obj.defaultValue && obj.defaultValue !== '...'
                    ? `= ${(0, utils_1.escapeChars)(obj.defaultValue)}`
                    : ''}`;
            });
        return `{ ${indexSignature ? indexSignature : ''}${types ? types.join('; ') : ''} }${model.defaultValue && model.defaultValue !== '...'
            ? `= ${(0, utils_1.escapeChars)(model.defaultValue)}`
            : ''}`;
    }
    return '{}';
}
function getFunctionType(modelSignatures) {
    const functions = modelSignatures.map((fn) => {
        const typeParams = fn.typeParameters
            ? `<${fn.typeParameters
                .map((typeParameter) => typeParameter.name)
                .join(', ')}\\>`
            : [];
        const params = fn.parameters
            ? fn.parameters.map((param) => {
                return `${param.flags.isRest ? '...' : ''}\`${param.name}${param.flags.isOptional ? '?' : ''}\`: ${Handlebars.helpers.type.call(param.type ? param.type : param)}`;
            })
            : [];
        const returns = Handlebars.helpers.type.call(fn.type);
        return typeParams + `(${params.join(', ')}) => ${returns}`;
    });
    return functions.join('');
}
exports.getFunctionType = getFunctionType;
function getReferenceType(model, emphasis) {
    var _a;
    if (model.reflection || (model.name && model.typeArguments)) {
        const reflection = [];
        if ((_a = model.reflection) === null || _a === void 0 ? void 0 : _a.url) {
            reflection.push(`[${`\`${model.reflection.name}\``}](${Handlebars.helpers.relativeURL(model.reflection.url)})`);
        }
        else {
            reflection.push(model.externalUrl
                ? `[${`\`${model.name}\``}]( ${model.externalUrl} )`
                : `\`${model.name}\``);
        }
        if (model.typeArguments && model.typeArguments.length > 0) {
            reflection.push(`<${model.typeArguments
                .map((typeArgument) => Handlebars.helpers.type.call(typeArgument))
                .join(', ')}\\>`);
        }
        return reflection.join('');
    }
    return emphasis
        ? model.externalUrl
            ? `[${`\`${model.name}\``}]( ${model.externalUrl} )`
            : `\`${model.name}\``
        : (0, utils_1.escapeChars)(model.name);
}
function getArrayType(model, emphasis) {
    const arrayType = Handlebars.helpers.type.call(model.elementType, 'none', emphasis);
    return model.elementType.type === 'union'
        ? `(${arrayType})[]`
        : `${arrayType}[]`;
}
function getUnionType(model, emphasis) {
    return model.types
        .map((unionType) => Handlebars.helpers.type.call(unionType, 'none', emphasis))
        .join(` \\| `);
}
function getIntersectionType(model) {
    return model.types
        .map((intersectionType) => Handlebars.helpers.type.call(intersectionType))
        .join(' & ');
}
function getTupleType(model) {
    return `[${model.elements
        .map((element) => Handlebars.helpers.type.call(element))
        .join(', ')}]`;
}
function getIntrinsicType(model, emphasis) {
    return emphasis ? `\`${model.name}\`` : (0, utils_1.escapeChars)(model.name);
}
function getTypeOperatorType(model) {
    return `${model.operator} ${Handlebars.helpers.type.call(model.target)}`;
}
function getQueryType(model) {
    return `typeof ${Handlebars.helpers.type.call(model.queryType)}`;
}
function getInferredType(model) {
    return `infer ${(0, utils_1.escapeChars)(model.name)}`;
}
function getUnknownType(model) {
    return (0, utils_1.escapeChars)(model.name);
}
function getConditionalType(model) {
    const md = [];
    if (model.checkType) {
        md.push(Handlebars.helpers.type.call(model.checkType));
    }
    md.push('extends');
    if (model.extendsType) {
        md.push(Handlebars.helpers.type.call(model.extendsType));
    }
    md.push('?');
    if (model.trueType) {
        md.push(Handlebars.helpers.type.call(model.trueType));
    }
    md.push(':');
    if (model.falseType) {
        md.push(Handlebars.helpers.type.call(model.falseType));
    }
    return md.join(' ');
}
function getIndexAccessType(model) {
    const md = [];
    if (model.objectType) {
        md.push(Handlebars.helpers.type.call(model.objectType));
    }
    if (model.indexType) {
        md.push(`[${Handlebars.helpers.type.call(model.indexType)}]`);
    }
    return md.join('');
}
