import { ImageExportOptions } from '@progress/kendo-drawing';
export interface SignaturePadOptions {
    scale?: number;
    precision?: number;
    samplingRate?: number;
    smooth?: boolean;
    color?: string;
    backgroundColor?: string;
    strokeWidth?: number;
    readonly?: boolean;
    onChange?: (value: string) => void;
    onDraw?: () => void;
    onDrawEnd?: () => void;
}
export declare class SignaturePad {
    element: HTMLElement;
    options: SignaturePadOptions;
    private pathOptions;
    private rootGroup;
    private path;
    private background;
    private surface;
    private points;
    private size;
    private lastMoveTime;
    constructor(element: HTMLElement, options?: SignaturePadOptions);
    destroy(): void;
    clear(): void;
    get isDrawing(): boolean;
    get pathData(): string;
    set pathData(value: string);
    loadImage(data: string, size?: number[]): void;
    exportImage(options?: ImageExportOptions): Promise<string>;
    resize(): void;
    setOptions(options: SignaturePadOptions): void;
    private initSurface;
    private attachEvents;
    private detachEvents;
    private touchPoint;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
}
