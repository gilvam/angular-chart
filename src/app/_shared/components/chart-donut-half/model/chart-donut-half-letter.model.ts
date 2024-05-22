import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';

export class ChartDonutHalfLetter {
	private readonly _text: string;
	private readonly _rotation: number;
	private readonly _position: ChartCoordinates;

	constructor(text: string, rotation: number, position: ChartCoordinates) {
		this._text = text;
		this._rotation = rotation;
		this._position = position;
	}

	get text(): string {
		return this._text;
	}

	get rotation(): number {
		return this._rotation;
	}

	get position(): ChartCoordinates {
		return this._position;
	}
}
