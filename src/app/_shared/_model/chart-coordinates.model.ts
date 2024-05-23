export class ChartCoordinates {
	private _x: number;
	private _y: number;
	private _angleStart: number;
	private _angleEnd: number;

	constructor(x = 0, y = 0) {
		this._x = x;
		this._y = y;
		this._angleStart = this._angleEnd = 0;
	}

	private static inPercentage(value: number): string {
		return `${value}%`;
	}

	calc(width: number, height: number, thickness: number, gap: number, radiusOut: number): void {
		this.setX(width / 2);
		this.setY((height + radiusOut + thickness / 2) / 2 - gap / 2);
	}

	setAngle(angleStart: number, angleEnd: number): ChartCoordinates {
		this._angleStart = angleStart;
		this._angleEnd = angleEnd;
		return this;
	}

	degreesToRadians(degrees: number): number {
		return ((degrees - this.angleStart) * Math.PI) / this.angleEnd;
	}

	polarToCartesian(radius: number, angleInDegrees: number): ChartCoordinates {
		const angleInRadians = this.degreesToRadians(angleInDegrees);
		return new ChartCoordinates(
			this.x + radius * Math.cos(angleInRadians),
			this.y + radius * Math.sin(angleInRadians),
		);
	}

	get angleStart(): number {
		return this._angleStart;
	}

	get angleEnd(): number {
		return this._angleEnd;
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

	get xInPercentage(): string {
		return ChartCoordinates.inPercentage(this.x);
	}

	get yInPercentage() {
		return ChartCoordinates.inPercentage(this.y);
	}
}
