import {
	ChartDonutHalfSegmentDescription,
	IChartDonutHalfDataDescription,
} from '@shared/components/chart-donut-half/model/chart-donut-half-segment-description.model';

export interface IChartDonutHalfData {
	title: string;
	list: IChartDonutHalfDataDescription[];
}

export class ChartDonutHalfData implements IChartDonutHalfData {
	private readonly _title: string;
	private _list: ChartDonutHalfSegmentDescription[];

	constructor(title = '', list: IChartDonutHalfDataDescription[] = []) {
		this._title = title;
		this._list = this.checkList(list);
	}

	checkList(list: IChartDonutHalfDataDescription[]): ChartDonutHalfSegmentDescription[] {
		this._list = list.map((it) => new ChartDonutHalfSegmentDescription(it.percentage, it.text));
		return this._list;
	}

	sumText(): number {
		if (!this.list.length) {
			return 0;
		}
		return this._list.map((it) => Number(it.text)).reduce((sum, valI) => (!isNaN(valI) ? sum + valI : sum));
	}

	get title(): string {
		return this._title;
	}

	get list(): ChartDonutHalfSegmentDescription[] {
		return this._list;
	}
}
