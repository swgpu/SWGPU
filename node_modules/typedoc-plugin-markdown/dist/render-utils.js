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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHelpers = exports.registerPartials = exports.reflectionMemberTemplate = exports.reflectionTemplate = exports.indexTemplate = void 0;
const fs = __importStar(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const path = __importStar(require("path"));
const breadcrumbs_1 = __importDefault(require("./resources/helpers/breadcrumbs"));
const comment_1 = __importDefault(require("./resources/helpers/comment"));
const comments_1 = __importDefault(require("./resources/helpers/comments"));
const declaration_title_1 = __importDefault(require("./resources/helpers/declaration-title"));
const escape_1 = __importDefault(require("./resources/helpers/escape"));
const hierarchy_1 = __importDefault(require("./resources/helpers/hierarchy"));
const if_is_reference_1 = __importDefault(require("./resources/helpers/if-is-reference"));
const if_named_anchors_1 = __importDefault(require("./resources/helpers/if-named-anchors"));
const if_show_breadcrumbs_1 = __importDefault(require("./resources/helpers/if-show-breadcrumbs"));
const if_show_named_anchors_1 = __importDefault(require("./resources/helpers/if-show-named-anchors"));
const if_show_page_title_1 = __importDefault(require("./resources/helpers/if-show-page-title"));
const if_show_returns_1 = __importDefault(require("./resources/helpers/if-show-returns"));
const if_show_type_hierarchy_1 = __importDefault(require("./resources/helpers/if-show-type-hierarchy"));
const index_signature_title_1 = __importDefault(require("./resources/helpers/index-signature-title"));
const parameter_table_1 = __importDefault(require("./resources/helpers/parameter-table"));
const type_declaration_object_literal_1 = __importDefault(require("./resources/helpers/type-declaration-object-literal"));
const reference_member_1 = __importDefault(require("./resources/helpers/reference-member"));
const reflection_path_1 = __importDefault(require("./resources/helpers/reflection-path"));
const reflection_title_1 = __importDefault(require("./resources/helpers/reflection-title"));
const relative_url_1 = __importDefault(require("./resources/helpers/relative-url"));
const returns_1 = __importDefault(require("./resources/helpers/returns"));
const signature_title_1 = __importDefault(require("./resources/helpers/signature-title"));
const toc_1 = __importDefault(require("./resources/helpers/toc"));
const type_1 = __importDefault(require("./resources/helpers/type"));
const type_and_parent_1 = __importDefault(require("./resources/helpers/type-and-parent"));
const type_parameter_table_1 = __importDefault(require("./resources/helpers/type-parameter-table"));
const TEMPLATE_PATH = path.join(__dirname, 'resources', 'templates');
exports.indexTemplate = Handlebars.compile(fs.readFileSync(path.join(TEMPLATE_PATH, 'index.hbs')).toString());
exports.reflectionTemplate = Handlebars.compile(fs.readFileSync(path.join(TEMPLATE_PATH, 'reflection.hbs')).toString());
exports.reflectionMemberTemplate = Handlebars.compile(fs.readFileSync(path.join(TEMPLATE_PATH, 'reflection.member.hbs')).toString());
function registerPartials() {
    const partialsFolder = path.join(__dirname, 'resources', 'partials');
    const partialFiles = fs.readdirSync(partialsFolder);
    partialFiles.forEach((partialFile) => {
        const partialName = path.basename(partialFile, '.hbs');
        const partialContent = fs
            .readFileSync(partialsFolder + '/' + partialFile)
            .toString();
        Handlebars.registerPartial(partialName, partialContent);
    });
}
exports.registerPartials = registerPartials;
function registerHelpers(theme) {
    (0, breadcrumbs_1.default)(theme);
    (0, comment_1.default)(theme);
    (0, comments_1.default)();
    (0, declaration_title_1.default)(theme);
    (0, escape_1.default)();
    (0, hierarchy_1.default)();
    (0, if_is_reference_1.default)();
    (0, if_named_anchors_1.default)(theme);
    (0, if_show_breadcrumbs_1.default)(theme);
    (0, if_show_named_anchors_1.default)(theme);
    (0, if_show_page_title_1.default)(theme);
    (0, if_show_returns_1.default)();
    (0, if_show_type_hierarchy_1.default)();
    (0, index_signature_title_1.default)();
    (0, parameter_table_1.default)();
    (0, type_declaration_object_literal_1.default)(theme);
    (0, reference_member_1.default)();
    (0, reflection_path_1.default)();
    (0, reflection_title_1.default)(theme);
    (0, relative_url_1.default)(theme);
    (0, returns_1.default)();
    (0, signature_title_1.default)(theme);
    (0, toc_1.default)(theme);
    (0, type_1.default)();
    (0, type_and_parent_1.default)();
    (0, type_parameter_table_1.default)();
}
exports.registerHelpers = registerHelpers;
