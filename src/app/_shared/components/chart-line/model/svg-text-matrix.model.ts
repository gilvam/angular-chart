import { SvgText } from './svg-text.model';
import { SvgGeneric } from './svg-generic.model';
import { ChartConfig } from './chart-config.model';

export class SvgTextList extends SvgGeneric {
	private _list: SvgText[];

	constructor(list: SvgText[] = []) {
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

	calcX(conf: ChartConfig, xLabels: string[]): SvgTextList {
		const availableWidth = conf.width - conf.gap * 2 - conf.widthYText;
		const step = availableWidth / (xLabels.length - 1);

		this._list = xLabels.map((desc, i) => {
			const x = conf.gap + i * step;
			const y = conf.height - conf.gap + conf.gap / 4;
			return new SvgText(x, y, desc);
		});

		return this;
	}

	calcY(conf: ChartConfig, yLabels: number[]): SvgTextList {
		this._list = yLabels.map((value) => {
			const x = conf.width - conf.gap - conf.gap / 3;
			const y = this.yNormalize(value, yLabels, conf.height, conf.gap) + conf.fontHeight;
			return new SvgText(x, y, value);
		});
		return this;
	}
}
