import { ChartLineSvgGeneric } from './chart-line-svg-generic.model';
import { ChartLineConfig } from './chart-line-config.model';

export class ChartLineSvgLine extends ChartLineSvgGeneric {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	color: string;
	strokeDasharray: number;
	private _strokeWidth: number;

	constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = '#eee', strokeDasharray = 2, strokeWidth = 1) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;
		this.strokeDasharray = strokeDasharray;
		this._strokeWidth = strokeWidth;
	}

	calc(conf: ChartLineConfig, y: number): ChartLineSvgLine {
		this.x1 = conf.gap;
		this.x2 = conf.width - conf.gap - conf.widthYText;
		this.y1 = y - conf.fontHeight;
		this.y2 = y - conf.fontHeight;
		return this;
	}

	get strokeWidth(): number {
		return this._strokeWidth;
	}

	setStrokeWidth(value: number): ChartLineSvgLine {
		this._strokeWidth = value;
		return this;
	}
}
