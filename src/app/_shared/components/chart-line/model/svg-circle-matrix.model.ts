import { SvgCircle } from './svg-circle.model';
import { SvgTextList } from './svg-text-matrix.model';
import { ChartCircleSizeEnum } from './chart-circle-size.enum';
import { SvgGeneric } from './svg-generic.model';
import { ChartConfig } from './chart-config.model';

export class SvgCircleMatrix extends SvgGeneric {
	private _matrix: SvgCircle[][];

	constructor(svgCircleMatrix: SvgCircle[][] = []) {
		super();
		this._matrix = svgCircleMatrix;
	}

	get matrix() {
		return this._matrix;
	}
	setData(data: (string | number)[][], xLabels: string[]): SvgCircleMatrix {
		if (!data.every((row) => row.length <= xLabels.length)) {
			throw new Error('The length of @Input() xLabels does not match the length of the @Input() data');
		}
		const dataFilled = data.map((row) => [...row, ...Array(xLabels.length - row.length).fill(0)]);
		this._matrix = dataFilled.map((row) => row.map((it, i) => new SvgCircle(xLabels[i], it)));
		return this;
	}

	setRadius(radius: ChartCircleSizeEnum): SvgCircleMatrix {
		this._matrix.forEach((row) => row.forEach((circle) => circle.setR(radius)));
		return this;
	}

	setColorByArray(colors: string[]): SvgCircleMatrix {
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

	calc(conf: ChartConfig, svgTextX: SvgTextList, yLabels: number[], height: number, gap: number): SvgCircleMatrix {
		this._matrix = this._matrix.map((row) =>
			row.map((circle) => {
				const labelX = svgTextX.findXByDescription(circle.dataX);
				const cx = labelX - conf.gap + conf.widthYText + conf.widthYText / 2;
				const cy = this.yNormalize(circle.dataY, yLabels, height, gap);
				return new SvgCircle(circle.dataX, circle.dataY, cx, cy, circle.r, circle.strokeWidth, circle.color);
			}),
		);
		return this;
	}
}
