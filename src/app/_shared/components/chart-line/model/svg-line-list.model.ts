import { SvgLineModel } from './svg-line.model';
import { SvgCircleList } from './svg-circle-list.model';
import { SvgCircleModel } from './svg-circle.model';

export class SvgLineList {
	private _list: SvgLineModel[][];

	constructor(list: SvgLineModel[][] = []) {
		this._list = list;
	}

	get list() {
		return this._list;
	}

	calc(svgCircle: SvgCircleList): SvgLineList {
		// this._list =
		this._list = svgCircle.list.map((row) =>
			row.slice(0, -1).map((circle, j) => {
				const nextCircle: SvgCircleModel = row[j + 1];
				return new SvgLineModel(circle.cx, circle.cy, nextCircle.cx, nextCircle.cy, circle.color);
			}),
		);
		return this;
	}
}
