import { SvgCircle } from './svg.circle.model';
import { SvgTextList } from './svg-text-matrix.model';

export class SvgCircleList {
	private _matrix: SvgCircle[][];

	constructor(svgCircleMatrix: SvgCircle[][] = []) {
		this._matrix = svgCircleMatrix;
	}

	setData(data: [key: string, value: number][][]): SvgCircleList {
		this._matrix = data.map((row) => row.map((it) => new SvgCircle(it.at(0), it.at(1))));
		return this;
	}

	setColorByArray(colors: string[]): SvgCircleList {
		const numColors = colors.length;
		let colorIndex = 0;

		this._matrix.forEach((row) => {
			row.forEach((circle) => {
				circle.setColor(colors[colorIndex]);
			});
			colorIndex = (colorIndex + 1) % numColors;
		});
		return this;
	}

	private yNormalize(y: number, yLabels: number[], height: number, gap: number): number {
		const minY = Math.min(...yLabels);
		const maxY = Math.max(...yLabels);
		const normalizedY = (y - minY) / (maxY - minY);
		return height - normalizedY * (height - gap * 2) - gap;
	}

	calc(svgTextX: SvgTextList, yLabels: number[], height: number, gap: number): SvgCircleList {
		const averageCharWidth = 8;

		this._matrix = this._matrix.map((row) =>
			row.map((circle) => {
				const labelX = svgTextX.findXByDescription(circle.dataX);
				const width = circle.dataX.length * averageCharWidth;
				const cx = labelX - width / 2 + averageCharWidth * circle.dataX.length;
				const cy = this.yNormalize(circle.dataY, yLabels, height, gap);
				return new SvgCircle(circle.dataX, circle.dataY, cx, cy, circle.r, circle.strokeWidth, circle.color);
			}),
		);

		return this;
	}
	get matrix() {
		return this._matrix;
	}
}
