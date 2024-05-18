import { ChartPosition } from './chart-position.enum';
import { SvgTextModel } from './svg-text.model';

export class SvgLine {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	color: string;
	strokeDasharray: number;

	constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = 'black', strokeDasharray = 3) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;
		this.strokeDasharray = strokeDasharray;
		// ChartPosition.RIGHT -> X2
		// ChartPosition.LEFT -> X1
	}

	calc(y: number, width: number, gap: number, yLabelPosition: ChartPosition, yLabels: number[]): SvgLine {
		const averageCharWidth = 8;
		const maxN = yLabels.map((str) => String(str).length).reduce((max, length) => Math.max(max, length), 0);

		this.x1 = yLabelPosition === ChartPosition.RIGHT ? gap : maxN * averageCharWidth + gap / 1.5;
		this.y1 = y;
		this.x2 = yLabelPosition === ChartPosition.RIGHT ? width - gap - gap / 4 : width - gap;
		this.y2 = y;

		return this;
	}
	// calcY(
	// 	width: number,
	// 	height: number,
	// 	gap: number,
	// 	yLabelPosition: ChartPosition,
	// 	yLabels: number[],
	// ) {
	// 	const labelHeight = (height - gap * 2) / (yLabels.length - 1);
	// 	this._list = yLabels.map((value, i) => {
	// 		const x = yLabelPosition === ChartPosition.LEFT ? gap / 2 : width - gap;
	// 		const y = height - (i * labelHeight + gap);
	// 		return new SvgTextModel(x, y, value);
	// 	});
	// }
}
