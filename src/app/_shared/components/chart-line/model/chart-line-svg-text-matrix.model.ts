import { ChartLineSvgText } from './chart-line-svg-text.model';
import { ChartLineSvgGeneric } from './chart-line-svg-generic.model';
import { ChartLineConfig } from './chart-line-config.model';

export class ChartLineSvgTextList extends ChartLineSvgGeneric {
	private _list: ChartLineSvgText[];

	constructor(list: ChartLineSvgText[] = []) {
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

	calcX(conf: ChartLineConfig, xTexts: string[]): ChartLineSvgTextList {
		const availableWidth = conf.width - conf.gap * 2 - conf.widthYText;
		const step = availableWidth / (xTexts.length - 1);

		this._list = xTexts.map((desc, i) => {
			const x = conf.gap + i * step;
			const y = conf.height - conf.gap + conf.gap / 4;
			return new ChartLineSvgText(x, y, desc);
		});

		return this;
	}

	calcY(conf: ChartLineConfig, yTexts: number[]): ChartLineSvgTextList {
		this._list = yTexts.map((value) => {
			const x = conf.width - conf.gap - conf.gap / 3;
			const y = this.yNormalize(value, yTexts, conf.height, conf.gap) + conf.fontHeight;
			return new ChartLineSvgText(x, y, value);
		});
		return this;
	}
}
