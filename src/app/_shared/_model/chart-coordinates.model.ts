import { ChartDonutHalfConfig } from '@shared/components/chart-donut-half/model/chart-donut-half-config.model';

export class ChartCoordinates extends ChartDonutHalfConfig {
	private _x: number;
	private _y: number;

	constructor(x = 0, y = 0) {
		super();
		this._x = x;
		this._y = y;
	}

	get x(): number {
		return this._x;
	}

	setX(value: number) {
		this._x = value;
	}

	get y(): number {
		return this._y;
	}

	setY(value: number) {
		this._y = value;
	}

	degreesToRadians(degrees: number): number {
		return ((degrees - this.startAngle) * Math.PI) / this.angle;
	}

	polarToCartesian(radius: number, angleInDegrees: number): ChartCoordinates {
		const angleInRadians = this.degreesToRadians(angleInDegrees);
		return new ChartCoordinates(
			this.x + radius * Math.cos(angleInRadians),
			this.y + radius * Math.sin(angleInRadians),
		);
	}
}
