import { ChartCircleSizeEnum } from './chart-circle-size.enum';

export class ChartConfig {
	width: number;
	height: number;
	circleSize: ChartCircleSizeEnum;
	colors: string[];
	gap: number;
	strokeWidth: number;

	constructor(
		width: number,
		height: number,
		circleSize: ChartCircleSizeEnum,
		colors: string[],
		gap: number,
		strokeWidth: number,
	) {
		this.width = width;
		this.height = height;
		this.circleSize = circleSize;
		this.colors = colors;
		this.gap = gap;
		this.strokeWidth = strokeWidth;
	}
}
