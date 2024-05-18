import { SvgCircleModel } from './svg-circle.model';
import { ChartPosition } from './chart-position.enum';
import { SvgTextList } from './svg-text-list.model';

export class SvgCircleList {
	private _list: SvgCircleModel[][];

	constructor(list: SvgCircleModel[][] = []) {
		this._list = list;
	}

	setData(data: [key: string, value: number][][]): SvgCircleList {
		this._list = data.map((row) => row.map((it) => new SvgCircleModel(it.at(0), it.at(1))));
		return this;
	}

	setColorByArray(colors: string[]): SvgCircleList {
		const numColors = colors.length;
		let colorIndex = 0;

		this._list.forEach((row) => {
			row.forEach((circle) => {
				circle.setColor(colors[colorIndex]);
			});
			colorIndex = (colorIndex + 1) % numColors;
		});
		return this;
	}

	private yLabelValue(value: number, yLabelDescriptions: number[], height: number, gap: number): number {
		const minY = Math.min(...yLabelDescriptions);
		const maxY = Math.max(...yLabelDescriptions);
		const normalizedY = (value - minY) / (maxY - minY);
		return height - normalizedY * (height - gap * 2) - gap;
	}

	calcCircle(svgTextX: SvgTextList, yLabelDescriptions: number[], height: number, gap: number): SvgCircleList {
		const averageCharWidth = 8;

		this._list = this._list.map((row) =>
			row.map((circle) => {
				const labelX = svgTextX.findXByDescription(circle.dataX);
				const width = circle.dataX.length * averageCharWidth;
				const cx = labelX - width / 2 + averageCharWidth * circle.dataX.length;
				const cy = this.yLabelValue(circle.dataY, yLabelDescriptions, height, gap);
				return new SvgCircleModel(circle.dataX, circle.dataY, cx, cy, circle.r, circle.strokeWidth, circle.color);
			}),
		);

		return this;
	}

	add(items: SvgCircleModel[]) {
		this._list.push(items);
	}

	get list() {
		return this._list;
	}
}
