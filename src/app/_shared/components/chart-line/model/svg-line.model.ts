import { ChartPosition } from './chart-position.enum';
import { SvgGeneric } from './svg-generic.model';

export class SvgLine extends SvgGeneric {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	color: string;
	strokeDasharray: number;

	constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = 'black', strokeDasharray = 3) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;
		this.strokeDasharray = strokeDasharray;
	}

	calc(y: number, width: number, gap: number, yLabelPosition: ChartPosition): SvgLine {
		this.x1 = yLabelPosition === ChartPosition.RIGHT ? gap : gap * 2;
		this.x2 = yLabelPosition === ChartPosition.RIGHT ? width - gap - gap / 2 : width - gap;
		this.y1 = y - this.fontHeight;
		this.y2 = y - this.fontHeight;

		return this;
	}
}
