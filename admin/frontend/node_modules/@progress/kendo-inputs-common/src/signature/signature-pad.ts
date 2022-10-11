import {
    exportImage,
    geometry,
    Group,
    ImageExportOptions,
    MultiPath,
    Path,
    Image,
    ShapeOptions,
    Surface,
    } from '@progress/kendo-drawing';
import { elementOffset, limitValue } from '../common';

const { Point, Rect, transform } = geometry;


const noop = () => { /* noop */ };

const DECIMAL_DIGITS = 3;
const DEFAULT_COLOR = '#000';
const DEFAULT_BACKGROUND_COLOR = '#fff';
const DEFAULT_PRECISION = 1;
const DEFAULT_SAMPLING_RATE = 200; // Updates per second
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_WIDTH = 750;
const DEFAULT_HEIGHT = 250;
const DEFAULT_SCALE = 1;

// Export images at maximized scale (3x) and 2x pixel density to cover HiDPI screens.
const DEFAULT_EXPORT_SCALE = 6;

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

export class SignaturePad {
    options: SignaturePadOptions;

    private pathOptions: ShapeOptions;
    private rootGroup: Group;
    private path: MultiPath;
    private background: Path;
    private surface: Surface;
    private points: geometry.Point[];
    private size: number[];
    private lastMoveTime = 0;

    constructor(public element: HTMLElement, options: SignaturePadOptions = {}) {
        this.options = Object.assign({
            scale: DEFAULT_SCALE,
            precision: DEFAULT_PRECISION,
            samplingRate: DEFAULT_SAMPLING_RATE,
            smooth: options.smooth !== false,
            color: options.color || DEFAULT_COLOR,
            backgroundColor: options.backgroundColor || DEFAULT_BACKGROUND_COLOR,
            strokeWidth: DEFAULT_STROKE_WIDTH,
            onChange: noop,
            onDraw: noop,
            onDrawEnd: noop
        }, options);

        this.pathOptions = {
            stroke: {
                color: this.options.color,
                width: this.options.strokeWidth,
                lineCap: 'round',
                lineJoin: 'round'
            }
        };

        this.initSurface();
        this.attachEvents();
    }

    destroy(): void {
        this.detachEvents();
    }

    clear(): void {
        this.rootGroup.clear();
        this.path = null;
    }

    get isDrawing(): boolean {
        return Boolean(this.points);
    }

    get pathData(): string {
        return this.path?.toString(DECIMAL_DIGITS);
    }

    set pathData(value: string) {
        this.clear();

        this.path = MultiPath.parse(value, this.pathOptions);
        this.rootGroup.append(this.path);
    }

    loadImage(data: string, size: number[] = []): void {
        if (!data) {
            this.clear();
            return;
        }

        const [width, height] = this.size;
        const contentWidth = width / this.options.scale;
        const contentHeight = height / this.options.scale;
        const importWidth = size[0] || contentWidth * DEFAULT_EXPORT_SCALE;
        const importHeight = size[1] || contentHeight * DEFAULT_EXPORT_SCALE;
        const scaleX = contentWidth / importWidth;
        const scaleY = contentHeight / importHeight;
        const scale = Math.min(scaleX, scaleY);

        const img = new Image(data, new geometry.Rect([0, 0], [importWidth, importHeight]));
        img.transform(transform().scale(scale, scale));

        this.clear();
        this.rootGroup.append(img);
    }

    exportImage(options?: ImageExportOptions): Promise<string> {
        const [width, height] = this.size;
        const contentWidth = width / this.options.scale;
        const contentHeight = height / this.options.scale;
        const exportWidth = options?.width || contentWidth * DEFAULT_EXPORT_SCALE;
        const exportHeight = options?.height || contentHeight * DEFAULT_EXPORT_SCALE;
        const scaleX = exportWidth / contentWidth;
        const scaleY = exportHeight / contentHeight;
        const scale = Math.min(scaleX, scaleY);

        const exportRect = new Rect([0, 0], [exportWidth, exportHeight]);
        const exportGroup = new Group({
            clip: Path.fromRect(exportRect)
        });

        const contentGroup = new Group({
            transform: transform().scale(scale, scale)
        });

        const frame = Path.fromRect(exportRect, {
            fill: {
                color: this.options.backgroundColor
            }
        });

        exportGroup.append(frame);
        exportGroup.append(contentGroup);

        contentGroup.children.push(...this.rootGroup.children);

        return exportImage(exportGroup,
            Object.assign({
                width: exportWidth,
                height: exportHeight
            }, options)
        );
    }

    resize(): void {
        this.surface.resize(true);
    }

    setOptions(options: SignaturePadOptions): void {
        Object.assign(this.options, options);

        this.pathOptions.stroke.color = this.options.color;
        this.pathOptions.stroke.width = this.options.strokeWidth;

        if (this.path) {
            this.path.options.set('stroke.color', this.options.color);
            this.path.options.set('stroke.width', this.options.strokeWidth);
        }

        this.background.options.set('fill.color', this.options.backgroundColor);
    }

    private initSurface() {
        this.surface = Surface.create(this.element, { type: 'canvas' });
        this.element.style.touchAction = 'none';
        const scale = this.options.scale;

        this.rootGroup = new Group({
            transform: transform().scale(scale, scale)
        });

        // The signature is not resizable, store initial dimensions.
        const width = this.element.offsetWidth || DEFAULT_WIDTH;
        const height = this.element.offsetHeight || DEFAULT_HEIGHT;
        this.size = [width, height];

        this.background = Path.fromRect(new Rect([0, 0], this.size), {
            fill: {
                color: this.options.backgroundColor
            }
        });

        this.surface.draw(this.background);
        this.surface.draw(this.rootGroup);
    }

    private attachEvents() {
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);

        this.element.addEventListener('pointerdown', this.onPointerDown);
        this.element.addEventListener('pointermove', this.onPointerMove);
        this.element.addEventListener('pointerup', this.onPointerUp);
    }

    private detachEvents() {
        this.element.removeEventListener('pointerdown', this.onPointerDown);
        this.element.removeEventListener('pointermove', this.onPointerMove);
        this.element.removeEventListener('pointerup', this.onPointerUp);
    }

    private touchPoint(e) {
        const offset = elementOffset(this.element);
        const pageX = e.pageX;
        const pageY = e.pageY;
        const scale = 1 / this.options.scale;
        return new Point(pageX - offset.left, pageY - offset.top).scale(scale, scale);
    }

    private onPointerDown(e) {
        if (this.options.readonly || !e.isPrimary || !isMainButton(e)) {
            return;
        }

        if (!this.path) {
            this.path = new MultiPath(this.pathOptions);
            this.rootGroup.append(this.path);
        }

        this.options.onDraw();
        this.element.setPointerCapture(e.pointerId);

        const point = this.touchPoint(e);
        this.points = [point];
        this.path.moveTo(point);
    }

    private onPointerMove(e) {
        if (!this.points || !e.isPrimary) {
            return;
        }

        const now = (new Date()).getTime();
        const elapsed = now - this.lastMoveTime;
        const minTimeDelta = 1000 / limitValue(this.options.samplingRate, 1, 10000);

        if (elapsed < minTimeDelta) {
            return;
        } else {
            this.lastMoveTime = now;
        }


        const point = this.touchPoint(e);
        const lastPoint = this.points[this.points.length - 1];
        const minDelta = 1 / limitValue(this.options.precision, 0.01, 100);
        if (point.distanceTo(lastPoint) < minDelta) {
            return;
        }

        this.points.push(point);
        this.path.lineTo(point);
    }

    private onPointerUp(e) {
        if (!e.isPrimary || !this.path || !this.points || this.options.readonly) {
            return;
        }

        if (this.options.smooth) {
            const segments = Path.curveFromPoints(this.points);
            this.path.paths.splice(this.path.paths.length - 1, 1, segments);
        }

        this.points = null;
        this.options.onDrawEnd();
        this.options.onChange(this.pathData);
    }
}

function isMainButton(e) {
    return typeof(e.button) !== 'number' || e.button === 0;
}
