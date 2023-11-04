"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayName = exports.camelToTitleCase = exports.stripLineBreaks = exports.stripComments = exports.spaces = exports.memberSymbol = exports.escapeChars = exports.formatContents = void 0;
const typedoc_1 = require("typedoc");
function formatContents(contents) {
    return (contents
        .replace(/[\r\n]{3,}/g, '\n\n')
        .replace(/!spaces/g, '')
        .replace(/^\s+|\s+$/g, '') + '\n');
}
exports.formatContents = formatContents;
function escapeChars(str) {
    return str
        .replace(/>/g, '\\>')
        .replace(/_/g, '\\_')
        .replace(/`/g, '\\`')
        .replace(/\|/g, '\\|');
}
exports.escapeChars = escapeChars;
function memberSymbol(reflection) {
    const isStatic = reflection.flags && reflection.flags.isStatic;
    if (reflection.kind === typedoc_1.ReflectionKind.CallSignature) {
        return '▸';
    }
    if (reflection.kind === typedoc_1.ReflectionKind.TypeAlias) {
        return 'Ƭ';
    }
    if (reflection.kind === typedoc_1.ReflectionKind.Property && isStatic) {
        return '▪';
    }
    return '•';
}
exports.memberSymbol = memberSymbol;
function spaces(length) {
    return `!spaces${[...Array(length)].map(() => ' ').join('')}`;
}
exports.spaces = spaces;
function stripComments(str) {
    return str
        .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:^\s*\/\/(?:.*)$)/g, ' ')
        .replace(/\n/g, '')
        .replace(/^\s+|\s+$|(\s)+/g, '$1');
}
exports.stripComments = stripComments;
function stripLineBreaks(str) {
    return str
        ? str
            .replace(/\n/g, ' ')
            .replace(/\r/g, ' ')
            .replace(/\t/g, ' ')
            .replace(/[\s]{2,}/g, ' ')
            .trim()
        : '';
}
exports.stripLineBreaks = stripLineBreaks;
function camelToTitleCase(text) {
    return (text.substring(0, 1).toUpperCase() +
        text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`));
}
exports.camelToTitleCase = camelToTitleCase;
function getDisplayName(refl) {
    let version = '';
    if ((refl instanceof typedoc_1.DeclarationReflection ||
        refl instanceof typedoc_1.ProjectReflection) &&
        refl.packageVersion) {
        version = ` - v${refl.packageVersion}`;
    }
    return `${refl.name}${version}`;
}
exports.getDisplayName = getDisplayName;
