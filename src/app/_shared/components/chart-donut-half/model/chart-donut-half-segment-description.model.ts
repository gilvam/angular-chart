export interface IChartDonutHalfDataDescription {
	percentage: number;
	text: string;
}

export class ChartDonutHalfSegmentDescription implements IChartDonutHalfDataDescription {
	private readonly _percentage: number;
	private readonly _text: string;

	constructor(percentage: number, text: string) {
		this._percentage = percentage;
		this._text = text;
	}

	get percentage(): number {
		return this._percentage;
	}

	get text(): string {
		return this._text;
	}
}
