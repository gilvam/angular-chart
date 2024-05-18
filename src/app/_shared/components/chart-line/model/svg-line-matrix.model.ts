import { SvgLine } from './svg-line.model';
import { SvgCircleList } from './svg-circle-matrix.model';
import { SvgCircle } from './svg.circle.model';

export class SvgLineList {
	private _matrix: SvgLine[][];

	constructor(svgLineMatrix: SvgLine[][] = []) {
		this._matrix = svgLineMatrix;
	}

	get matrix() {
		return this._matrix;
	}

	calc(svgCircle: SvgCircleList): SvgLineList {
		this._matrix = svgCircle.matrix.map((row) =>
			row.slice(0, -1).map((circle, j) => {
				const nextCircle: SvgCircle = row[j + 1];
				return new SvgLine(circle.cx, circle.cy, nextCircle.cx, nextCircle.cy, circle.color);
			}),
		);
		return this;
	}
}
