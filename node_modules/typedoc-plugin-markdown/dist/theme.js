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
exports.MarkdownTheme = void 0;
const path = __importStar(require("path"));
const typedoc_1 = require("typedoc");
const groups_1 = require("./groups");
const navigation_item_1 = require("./navigation-item");
const render_utils_1 = require("./render-utils");
const utils_1 = require("./utils");
class MarkdownTheme extends typedoc_1.Theme {
    constructor(renderer) {
        super(renderer);
        this.anchorMap = {};
        this.allReflectionsHaveOwnDocument = this.getOption('allReflectionsHaveOwnDocument');
        this.entryDocument = this.getOption('entryDocument');
        this.entryPoints = this.getOption('entryPoints');
        this.filenameSeparator = this.getOption('filenameSeparator');
        this.hideBreadcrumbs = this.getOption('hideBreadcrumbs');
        this.hideInPageTOC = this.getOption('hideInPageTOC');
        this.hidePageTitle = this.getOption('hidePageTitle');
        this.hideMembersSymbol = this.getOption('hideMembersSymbol');
        this.includes = this.getOption('includes');
        this.indexTitle = this.getOption('indexTitle');
        this.mediaDirectory = this.getOption('media');
        this.namedAnchors = this.getOption('namedAnchors');
        this.readme = this.getOption('readme');
        this.out = this.getOption('out');
        this.publicPath = this.getOption('publicPath');
        this.preserveAnchorCasing = this.getOption('preserveAnchorCasing');
        this.objectLiteralTypeDeclarationStyle = this.getOption('objectLiteralTypeDeclarationStyle');
        this.listenTo(this.owner, {
            [typedoc_1.RendererEvent.BEGIN]: this.onBeginRenderer,
            [typedoc_1.PageEvent.BEGIN]: this.onBeginPage,
        });
        (0, render_utils_1.registerPartials)();
        (0, render_utils_1.registerHelpers)(this);
    }
    render(page, template) {
        return (0, utils_1.formatContents)(template(page));
    }
    getOption(key) {
        return this.application.options.getValue(key);
    }
    getUrls(project) {
        var _a;
        const urls = [];
        const noReadmeFile = this.readme.endsWith('none');
        if (noReadmeFile) {
            project.url = this.entryDocument;
            urls.push(new typedoc_1.UrlMapping(this.entryDocument, project, this.getReflectionTemplate()));
        }
        else {
            project.url = this.globalsFile;
            urls.push(new typedoc_1.UrlMapping(this.globalsFile, project, this.getReflectionTemplate()));
            urls.push(new typedoc_1.UrlMapping(this.entryDocument, project, this.getIndexTemplate()));
        }
        (_a = project.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
            if (child instanceof typedoc_1.DeclarationReflection) {
                this.buildUrls(child, urls);
            }
        });
        return urls;
    }
    buildUrls(reflection, urls) {
        const mapping = this.mappings.find((mapping) => reflection.kindOf(mapping.kind));
        if (mapping) {
            if (!reflection.url || !MarkdownTheme.URL_PREFIX.test(reflection.url)) {
                const url = this.toUrl(mapping, reflection);
                urls.push(new typedoc_1.UrlMapping(url, reflection, mapping.template));
                reflection.url = url;
                reflection.hasOwnDocument = true;
            }
            for (const child of reflection.children || []) {
                if (mapping.isLeaf) {
                    this.applyAnchorUrl(child, reflection);
                }
                else {
                    this.buildUrls(child, urls);
                }
            }
        }
        else if (reflection.parent) {
            this.applyAnchorUrl(reflection, reflection.parent, true);
        }
        return urls;
    }
    toUrl(mapping, reflection) {
        return mapping.directory + '/' + this.getUrl(reflection) + '.md';
    }
    getUrl(reflection, relative) {
        let url = reflection.getAlias();
        if (reflection.parent &&
            reflection.parent !== relative &&
            !(reflection.parent instanceof typedoc_1.ProjectReflection)) {
            url =
                this.getUrl(reflection.parent, relative) + this.filenameSeparator + url;
        }
        return url.replace(/^_/, '');
    }
    applyAnchorUrl(reflection, container, isSymbol = false) {
        var _a, _b;
        if (container.url &&
            (!reflection.url || !MarkdownTheme.URL_PREFIX.test(reflection.url))) {
            const reflectionId = this.preserveAnchorCasing
                ? reflection.name
                : reflection.name.toLowerCase();
            if (isSymbol) {
                this.anchorMap[container.url]
                    ? this.anchorMap[container.url].push(reflectionId)
                    : (this.anchorMap[container.url] = [reflectionId]);
            }
            const count = (_b = (_a = this.anchorMap[container.url]) === null || _a === void 0 ? void 0 : _a.filter((id) => id === reflectionId)) === null || _b === void 0 ? void 0 : _b.length;
            const anchor = this.toAnchorRef(reflectionId + (count > 1 ? '-' + (count - 1).toString() : ''));
            reflection.url = container.url + '#' + anchor;
            reflection.anchor = anchor;
            reflection.hasOwnDocument = false;
        }
        reflection.traverse((child) => {
            if (child instanceof typedoc_1.DeclarationReflection) {
                this.applyAnchorUrl(child, container);
            }
        });
    }
    toAnchorRef(reflectionId) {
        return reflectionId;
    }
    getRelativeUrl(absolute) {
        if (MarkdownTheme.URL_PREFIX.test(absolute)) {
            return absolute;
        }
        else {
            const relative = path.relative(path.dirname(this.location), path.dirname(absolute));
            return path.join(relative, path.basename(absolute)).replace(/\\/g, '/');
        }
    }
    getReflectionTemplate() {
        return (pageEvent) => {
            return (0, render_utils_1.reflectionTemplate)(pageEvent, {
                allowProtoMethodsByDefault: true,
                allowProtoPropertiesByDefault: true,
                data: { theme: this },
            });
        };
    }
    getReflectionMemberTemplate() {
        return (pageEvent) => {
            return (0, render_utils_1.reflectionMemberTemplate)(pageEvent, {
                allowProtoMethodsByDefault: true,
                allowProtoPropertiesByDefault: true,
                data: { theme: this },
            });
        };
    }
    getIndexTemplate() {
        return (pageEvent) => {
            return (0, render_utils_1.indexTemplate)(pageEvent, {
                allowProtoMethodsByDefault: true,
                allowProtoPropertiesByDefault: true,
                data: { theme: this },
            });
        };
    }
    getNavigation(project) {
        var _a, _b;
        const urls = this.getUrls(project);
        const getUrlMapping = (name) => {
            if (!name) {
                return '';
            }
            return urls.find((url) => url.model.name === name);
        };
        const createNavigationItem = (title, url, isLabel, children = []) => {
            const navigationItem = new navigation_item_1.NavigationItem(title, url);
            navigationItem.isLabel = isLabel;
            navigationItem.children = children;
            const { reflection, parent, ...filteredNavigationItem } = navigationItem;
            return filteredNavigationItem;
        };
        const navigation = createNavigationItem(project.name, undefined, false);
        const hasReadme = !this.readme.endsWith('none');
        if (hasReadme) {
            (_a = navigation.children) === null || _a === void 0 ? void 0 : _a.push(createNavigationItem('Readme', this.entryDocument, false));
        }
        if (this.entryPoints.length === 1) {
            (_b = navigation.children) === null || _b === void 0 ? void 0 : _b.push(createNavigationItem('Exports', hasReadme ? this.globalsFile : this.entryDocument, false));
        }
        this.mappings.forEach((mapping) => {
            var _a;
            const kind = mapping.kind[0];
            const items = project.getReflectionsByKind(kind);
            if (items.length > 0) {
                const children = items
                    .map((item) => {
                    var _a;
                    return createNavigationItem(item.getFullName(), (_a = getUrlMapping(item.name)) === null || _a === void 0 ? void 0 : _a.url, true);
                })
                    .sort((a, b) => (a.title > b.title ? 1 : -1));
                const group = createNavigationItem((0, groups_1.getKindPlural)(kind), undefined, true, children);
                (_a = navigation.children) === null || _a === void 0 ? void 0 : _a.push(group);
            }
        });
        return navigation;
    }
    get mappings() {
        return [
            {
                kind: [typedoc_1.ReflectionKind.Module],
                isLeaf: false,
                directory: 'modules',
                template: this.getReflectionTemplate(),
            },
            {
                kind: [typedoc_1.ReflectionKind.Namespace],
                isLeaf: false,
                directory: 'modules',
                template: this.getReflectionTemplate(),
            },
            {
                kind: [typedoc_1.ReflectionKind.Enum],
                isLeaf: false,
                directory: 'enums',
                template: this.getReflectionTemplate(),
            },
            {
                kind: [typedoc_1.ReflectionKind.Class],
                isLeaf: false,
                directory: 'classes',
                template: this.getReflectionTemplate(),
            },
            {
                kind: [typedoc_1.ReflectionKind.Interface],
                isLeaf: false,
                directory: 'interfaces',
                template: this.getReflectionTemplate(),
            },
            ...(this.allReflectionsHaveOwnDocument
                ? [
                    {
                        kind: [typedoc_1.ReflectionKind.TypeAlias],
                        isLeaf: true,
                        directory: 'types',
                        template: this.getReflectionMemberTemplate(),
                    },
                    {
                        kind: [typedoc_1.ReflectionKind.Variable],
                        isLeaf: true,
                        directory: 'variables',
                        template: this.getReflectionMemberTemplate(),
                    },
                    {
                        kind: [typedoc_1.ReflectionKind.Function],
                        isLeaf: true,
                        directory: 'functions',
                        template: this.getReflectionMemberTemplate(),
                    },
                ]
                : []),
        ];
    }
    onBeginRenderer(event) {
        this.project = event.project;
    }
    onBeginPage(page) {
        this.location = page.url;
        this.reflection =
            page.model instanceof typedoc_1.DeclarationReflection ? page.model : undefined;
    }
    get globalsFile() {
        return 'modules.md';
    }
}
exports.MarkdownTheme = MarkdownTheme;
MarkdownTheme.URL_PREFIX = /^(http|ftp)s?:\/\//;
