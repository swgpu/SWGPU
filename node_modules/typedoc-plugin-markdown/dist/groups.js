"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKindPlural = void 0;
const typedoc_1 = require("typedoc");
const PLURALS = {
    [typedoc_1.ReflectionKind.Class]: 'Classes',
    [typedoc_1.ReflectionKind.Property]: 'Properties',
    [typedoc_1.ReflectionKind.Enum]: 'Enumerations',
    [typedoc_1.ReflectionKind.EnumMember]: 'Enumeration members',
    [typedoc_1.ReflectionKind.TypeAlias]: 'Type aliases',
};
function getKindPlural(kind) {
    if (kind in PLURALS) {
        return PLURALS[kind];
    }
    else {
        return getKindString(kind) + 's';
    }
}
exports.getKindPlural = getKindPlural;
function getKindString(kind) {
    let str = typedoc_1.ReflectionKind[kind];
    str = str.replace(/(.)([A-Z])/g, (_m, a, b) => a + ' ' + b.toLowerCase());
    return str;
}
