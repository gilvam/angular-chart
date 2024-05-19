import { SvgLine } from './svg-line.model';
import { SvgCircleMatrix } from './svg-circle-matrix.model';
import { SvgCircle } from './svg-circle.model';

export class SvgLineMatrix {
	private _matrix: SvgLine[][];

	constructor(svgLineMatrix: SvgLine[][] = []) {
		this._matrix = svgLineMatrix;
	}

	get matrix() {
		return this._matrix;
	}

	calc(svgCircle: SvgCircleMatrix): SvgLineMatrix {
		this._matrix = svgCircle.matrix.map((row) =>
			row.slice(0, -1).map((circle, j) => {
				const nextCircle: SvgCircle = row[j + 1];
				return new SvgLine(circle.cx, circle.cy, nextCircle.cx, nextCircle.cy, circle.color);
			}),
		);
		return this;
	}
}
