import { Options, OptionsReader } from 'typedoc';
export declare class MarkdownThemeOptionsReader implements OptionsReader {
    name: string;
    readonly order = 1000;
    readonly supportsPackages = false;
    read(container: Options): void;
}
