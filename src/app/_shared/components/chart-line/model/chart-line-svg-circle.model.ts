import { ChartLineCircleSizeEnum } from './chart-line-circle-size.enum';

export class ChartLineSvgCircle {
	readonly dataX: string;
	readonly cx: number;
	readonly cy: number;
	readonly dataY: number;
	private _strokeWidth: number;
	private _r: ChartLineCircleSizeEnum;
	private _color: string;

	constructor(
		dataX?: string | number,
		dataY?: string | number,
		cx = 0,
		cy = 0,
		r = ChartLineCircleSizeEnum.MEDIUM,
		strokeWidth = 2,
		color = 'gray',
	) {
		this.dataX = String(dataX || '');
		this.dataY = Number(dataY || 0);
		this.cx = cx;
		this.cy = cy;
		this._r = r;
		this._color = color;
		this._strokeWidth = strokeWidth;
	}

	setColor(color: string) {
		this._color = color;
	}

	setR(value: number) {
		this._r = value;
	}

	get strokeWidth(): number {
		return this._strokeWidth;
	}

	setStrokeWidth(value: number) {
		this._strokeWidth = value;
	}

	get r(): number {
		return this._r;
	}

	get color(): string {
		return this._color;
	}
}
