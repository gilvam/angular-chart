import { SvgTextModel } from './svg-text.model';
import { ChartPosition } from './chart-position.enum';
import { SvgGeneric } from './svg-generic.model';

export class SvgTextList extends SvgGeneric {
	private _list: SvgTextModel[];

	constructor(list: SvgTextModel[] = []) {
		super();
		this._list = list;
	}

	get list() {
		return this._list;
	}

	findXByDescription(description: string): number {
		const svgText = this._list.find((it) => it.descriptionLowerCase === description.toLowerCase());
		return svgText?.x || 0;
	}

	calcX(width: number, height: number, gap: number, yLabelPosition: ChartPosition, xLabels: string[]): SvgTextList {
		const isRightPosition = yLabelPosition === ChartPosition.RIGHT;

		this._list = xLabels.map((desc, i) => {
			let x;
			if (isRightPosition) {
				x = gap + i * ((width - gap * 4 + gap / 2) / (xLabels.length - 1));
			} else {
				x = width - gap * 2 - ((xLabels.length - 1 - i) * (width - gap * 4)) / (xLabels.length - 1);
			}
			const y = height - gap + gap / 4;
			return new SvgTextModel(x, y, desc);
		});
		return this;
	}

	calcY(width: number, height: number, gap: number, yLabelPosition: ChartPosition, yLabels: number[]): SvgTextList {
		const isRightPosition = yLabelPosition === ChartPosition.RIGHT;
		this._list = yLabels.map((value) => {
			const x = isRightPosition ? width - gap - gap / 3 : gap * 2 - gap / 4;
			const y = this.yNormalize(value, yLabels, height, gap) + this.fontHeight;
			const textAnchor = isRightPosition ? 'start' : 'end';
			return new SvgTextModel(x, y, value, textAnchor);
		});
		return this;
	}
}
