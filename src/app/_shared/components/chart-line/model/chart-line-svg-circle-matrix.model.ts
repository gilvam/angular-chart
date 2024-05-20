import { ChartLineSvgCircle } from './chart-line-svg-circle.model';
import { ChartLineSvgTextList } from './chart-line-svg-text-matrix.model';
import { ChartLineCircleSizeEnum } from './chart-line-circle-size.enum';
import { ChartLineSvgGeneric } from './chart-line-svg-generic.model';
import { ChartLineConfig } from './chart-line-config.model';

export class ChartLineSvgCircleMatrix extends ChartLineSvgGeneric {
	private _matrix: ChartLineSvgCircle[][];

	constructor(svgCircleMatrix: ChartLineSvgCircle[][] = []) {
		super();
		this._matrix = svgCircleMatrix;
	}

	get matrix() {
		return this._matrix;
	}
	setData(data: (string | number)[][], xLabels: string[]): ChartLineSvgCircleMatrix {
		if (!data.every((row) => row.length <= xLabels.length)) {
			throw new Error('The length of @Input() xLabels does not match the length of the @Input() data');
		}
		const dataFilled = data.map((row) => [...row, ...Array(xLabels.length - row.length).fill(0)]);
		this._matrix = dataFilled.map((row) => row.map((it, i) => new ChartLineSvgCircle(xLabels[i], it)));
		return this;
	}

	setRadius(radius: ChartLineCircleSizeEnum): ChartLineSvgCircleMatrix {
		this._matrix.forEach((row) => row.forEach((circle) => circle.setR(radius)));
		return this;
	}

	setStrokeWidth(width: number): ChartLineSvgCircleMatrix {
		this._matrix.forEach((row) => row.forEach((circle) => circle.setStrokeWidth(width)));
		return this;
	}

	setColorByArray(colors: string[]): ChartLineSvgCircleMatrix {
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

	calc(
		conf: ChartLineConfig,
		svgTextX: ChartLineSvgTextList,
		yLabels: number[],
		height: number,
		gap: number,
	): ChartLineSvgCircleMatrix {
		this._matrix = this._matrix.map((row) =>
			row.map((circle) => {
				const labelX = svgTextX.findXByDescription(circle.dataX);
				const cx = labelX - conf.gap + conf.widthYText + conf.widthYText / 2;
				const cy = this.yNormalize(circle.dataY, yLabels, height, gap);
				return new ChartLineSvgCircle(
					circle.dataX,
					circle.dataY,
					cx,
					cy,
					circle.r,
					circle.strokeWidth,
					circle.color,
				);
			}),
		);
		return this;
	}
}
