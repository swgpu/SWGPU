"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationItem = void 0;
class NavigationItem {
    constructor(title, url, parent, reflection) {
        this.title = title || '';
        this.url = url || '';
        this.parent = parent;
        this.reflection = reflection;
        if (!url) {
            this.isLabel = true;
        }
        if (this.parent) {
            if (!this.parent.children) {
                this.parent.children = [];
            }
            this.parent.children.push(this);
        }
    }
    static create(reflection, parent, useShortNames) {
        let name;
        if (useShortNames || (parent && parent.parent)) {
            name = reflection.name;
        }
        else {
            name = reflection.getFullName();
        }
        name = name.trim();
        return new NavigationItem(name, reflection.url, parent, reflection);
    }
}
exports.NavigationItem = NavigationItem;
