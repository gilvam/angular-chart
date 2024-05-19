import { ChartCircleSizeEnum } from './chart-circle-size.enum';

export class ChartConfig {
	width: number;
	height: number;
	circleSize: ChartCircleSizeEnum;
	colors: string[];
	gap: number;
	strokeWidth: number;

	readonly fontWidthSize = 6.68;
	readonly fontHeight = 4;
	widthYText: number;

	constructor(
		width: number,
		height: number,
		circleSize: ChartCircleSizeEnum,
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
