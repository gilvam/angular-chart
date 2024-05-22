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
	setData(data: (string | number)[][], xTexts: string[]): ChartLineSvgCircleMatrix {
		if (!data.every((row) => row.length <= xTexts.length)) {
			throw new Error('The length of @Input() xTexts does not match the length of the @Input() data');
		}
		const dataFilled = data.map((row) => [...row, ...Array(xTexts.length - row.length).fill(0)]);
		this._matrix = dataFilled.map((row) => row.map((it, i) => new ChartLineSvgCircle(xTexts[i], it)));
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
		yTexts: number[],
		height: number,
		gap: number,
	): ChartLineSvgCircleMatrix {
		this._matrix = this._matrix.map((row) =>
			row.map((circle) => {
				const TextX = svgTextX.findXByDescription(circle.dataX);
				const cx = TextX - conf.gap + conf.widthYText + conf.widthYText / 2;
				const cy = this.yNormalize(circle.dataY, yTexts, height, gap);
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
