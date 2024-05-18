import { SvgTextModel } from './svg-text.model';
import { ChartPosition } from './chart-position.enum';

export class SvgTextList {
	private _list: SvgTextModel[];

	constructor(list: SvgTextModel[] = []) {
		this._list = list;
	}

	get list() {
		return this._list;
	}

	findXByDescription(description: string): number {
		const svgText = this._list.find((it) => it.descriptionLowerCase === description.toLowerCase());
		return svgText?.x || 0;
	}

	calcX(
		width: number,
		height: number,
		gap: number,
		yLabelPosition: ChartPosition,
		xLabelDescriptions: string[],
	): SvgTextList {
		const w = (width - gap * 2) / xLabelDescriptions.length;
		this._list = xLabelDescriptions.map((desc, i) => {
			const x = yLabelPosition === ChartPosition.LEFT ? i * w + w / 2 + gap : (i + 1) * w - w + gap;
			const y = height - gap / 2;
			return new SvgTextModel(x, y, desc);
		});
		return this;
	}

	calcY(
		width: number,
		height: number,
		gap: number,
		yLabelPosition: ChartPosition,
		yLabelDescriptions: number[],
	): SvgTextList {
		const labelHeight = (height - gap * 2) / (yLabelDescriptions.length - 1);
		this._list = yLabelDescriptions.map((value, i) => {
			const x = yLabelPosition === ChartPosition.LEFT ? gap / 2 : width - gap;
			const y = height - (i * labelHeight + gap);
			return new SvgTextModel(x, y, value);
		});
		return this;
	}
}
