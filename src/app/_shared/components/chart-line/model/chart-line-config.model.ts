import { ChartLineCircleSizeEnum } from './chart-line-circle-size.enum';

export class ChartLineConfig {
	width: number;
	height: number;
	circleSize: ChartLineCircleSizeEnum;
	colors: string[];
	gap: number;
	strokeWidth: number;
	widthYText: number;

	readonly fontWidthSize = 6.68;
	readonly fontHeight = 4;

	constructor(
		width: number,
		height: number,
		circleSize: ChartLineCircleSizeEnum,
		colors: string[],
		gap: number,
		strokeWidth: number,
		yLabels: number[],
	) {
		this.width = width;
		this.height = height;
		this.circleSize = circleSize;
		this.colors = colors;
		this.gap = gap;
		this.strokeWidth = strokeWidth;
		this.widthYText = this.checkWidthYText(yLabels);
	}

	private checkWidthYText(list: (number | string)[]) {
		const countYLabel = list.reduce((max, str) => Math.max(Number(max), String(str).length), 0);
		return Number(countYLabel) * this.fontWidthSize;
	}
}
