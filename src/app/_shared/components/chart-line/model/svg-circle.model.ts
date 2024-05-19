import { ChartCircleSizeEnum } from './chart-circle-size.enum';

export class SvgCircle {
	readonly dataX: string;
	readonly cx: number;
	readonly cy: number;
	readonly dataY: number;
	readonly strokeWidth: number;
	private _r: ChartCircleSizeEnum;
	private _color: string;

	constructor(
		dataX?: string | number,
		dataY?: string | number,
		cx = 0,
		cy = 0,
		r = ChartCircleSizeEnum.MEDIUM,
		strokeWidth = 2,
		color = 'gray',
	) {
		this.dataX = String(dataX || '');
		this.dataY = Number(dataY || 0);
		this.cx = cx;
		this.cy = cy;
		this._r = r;
		this._color = color;
		this.strokeWidth = strokeWidth;
	}

	setColor(color: string) {
		this._color = color;
	}

	setR(value: number) {
		this._r = value;
	}
	get r(): number {
		return this._r;
	}

	get color(): string {
		return this._color;
	}
}