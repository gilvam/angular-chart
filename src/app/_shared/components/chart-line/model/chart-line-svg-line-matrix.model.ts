import { ChartLineSvgLine } from './chart-line-svg-line.model';
import { ChartLineSvgCircleMatrix } from './chart-line-svg-circle-matrix.model';
import { ChartLineSvgCircle } from './chart-line-svg-circle.model';

export class ChartLineSvgLineMatrix {
	private _matrix: ChartLineSvgLine[][];

	constructor(svgLineMatrix: ChartLineSvgLine[][] = []) {
		this._matrix = svgLineMatrix;
	}

	get matrix() {
		return this._matrix;
	}

	calc(svgCircle: ChartLineSvgCircleMatrix): ChartLineSvgLineMatrix {
		this._matrix = svgCircle.matrix.map((row) =>
			row.slice(0, -1).map((circle, j) => {
				const nextCircle: ChartLineSvgCircle = row[j + 1];
				return new ChartLineSvgLine(
					circle.cx,
					circle.cy,
					nextCircle.cx,
					nextCircle.cy,
					circle.color,
					0,
					circle.strokeWidth,
				);
			}),
		);
		return this;
	}
}
