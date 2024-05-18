export class SvgCircle {
	readonly dataX: string;
	readonly cx: number;
	readonly cy: number;
	readonly dataY: number;
	readonly r: number;
	readonly strokeWidth: number;
	private _color: string;

	constructor(dataX?: string | number, dataY?: string | number, cx = 0, cy = 0, r = 6, strokeWidth = 2, color = '') {
		this.dataX = String(dataX);
		this.dataY = Number(dataY);
		this.cx = cx;
		this.cy = cy;
		this.r = r;
		this._color = color;
		this.strokeWidth = strokeWidth;
	}

	setColor(color: string) {
		this._color = color;
	}

	get color(): string {
		return this._color;
	}
}
