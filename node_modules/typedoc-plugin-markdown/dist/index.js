"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTheme = exports.load = void 0;
const typedoc_1 = require("typedoc");
const options_reader_1 = require("./options-reader");
const theme_1 = require("./theme");
Object.defineProperty(exports, "MarkdownTheme", { enumerable: true, get: function () { return theme_1.MarkdownTheme; } });
function load(app) {
    app.renderer.defineTheme('markdown', theme_1.MarkdownTheme);
    app.options.addReader(new options_reader_1.MarkdownThemeOptionsReader());
    app.options.addDeclaration({
        help: '[Markdown Plugin] Do not render page title.',
        name: 'hidePageTitle',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Do not render breadcrumbs in template.',
        name: 'hideBreadcrumbs',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Specifies the base path that all links to be served from. If omitted all urls will be relative.',
        name: 'publicPath',
        type: typedoc_1.ParameterType.String,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Use HTML named anchors as fragment identifiers for engines that do not automatically assign header ids. Should be set for Bitbucket Server docs.',
        name: 'namedAnchors',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Output all reflections into seperate output files.',
        name: 'allReflectionsHaveOwnDocument',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Separator used to format filenames.',
        name: 'filenameSeparator',
        type: typedoc_1.ParameterType.String,
        defaultValue: '.',
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] The file name of the entry document.',
        name: 'entryDocument',
        type: typedoc_1.ParameterType.String,
        defaultValue: 'README.md',
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Do not render in-page table of contents items.',
        name: 'hideInPageTOC',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Customise the index page title.',
        name: 'indexTitle',
        type: typedoc_1.ParameterType.String,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Do not add special symbols for class members.',
        name: 'hideMembersSymbol',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Preserve anchor casing when generating links.',
        name: 'preserveAnchorCasing',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        help: '[Markdown Plugin] Specify the Type Declaration Render Style',
        name: 'objectLiteralTypeDeclarationStyle',
        type: typedoc_1.ParameterType.String,
        defaultValue: "table",
        validate: (x) => {
            const availableValues = ["table", "list"];
            if (!availableValues.includes(x)) {
                throw new Error(`Wrong value for objectLiteralTypeDeclarationStyle, the expected value is one of ${availableValues}`);
            }
        }
    });
}
exports.load = load;
