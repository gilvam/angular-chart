import { ChartDonutHalfLetter } from '@shared/components/chart-donut-half/model/chart-donut-half-letter.model';

export class ChartDonutHalfSegment {
	private readonly _dataType: string;
	value: number;
	letters: ChartDonutHalfLetter[];
	color: string;

	constructor(value = 0, letters: ChartDonutHalfLetter[] = [], dataType = '', color = 'gray') {
		this.value = value;
		this.letters = letters;
		this._dataType = dataType;
		this.color = color;
	}

	get dataType(): string {
		return this._dataType;
	}
}
