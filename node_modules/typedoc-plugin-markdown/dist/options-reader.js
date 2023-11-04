"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownThemeOptionsReader = void 0;
class MarkdownThemeOptionsReader {
    constructor() {
        this.name = 'markdown-theme-reader';
        this.order = 1000;
        this.supportsPackages = false;
    }
    read(container) {
        if (container.getValue('theme') === 'default') {
            container.setValue('theme', 'markdown');
        }
    }
}
exports.MarkdownThemeOptionsReader = MarkdownThemeOptionsReader;
