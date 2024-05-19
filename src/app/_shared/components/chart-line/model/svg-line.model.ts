import { SvgGeneric } from './svg-generic.model';
import { ChartConfig } from './chart-config.model';

export class SvgLine extends SvgGeneric {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	color: string;
	strokeDasharray: number;
	private _strokeWidth: number;

	constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = 'black', strokeDasharray = 3, strokeWidth = 2) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;
		this.strokeDasharray = strokeDasharray;
		this._strokeWidth = strokeWidth;
	}

	calc(conf: ChartConfig, y: number): SvgLine {
		this.x1 = conf.gap;
		this.x2 = conf.width - conf.gap - conf.gap / 2;
		this.y1 = y - this.fontHeight;
		this.y2 = y - this.fontHeight;
		return this;
	}

	get strokeWidth(): number {
		return this._strokeWidth;
	}

	setStrokeWidth(value: number): SvgLine {
		this._strokeWidth = value;
		return this;
	}
}
