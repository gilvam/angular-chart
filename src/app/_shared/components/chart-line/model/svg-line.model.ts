export class SvgLineModel {
	readonly x1: number;
	readonly y1: number;
	readonly x2: number;
	readonly y2: number;
	readonly color: string;
	readonly strokeDasharray: number;

	constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = 'black', strokeDasharray = 3) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;
		this.strokeDasharray = strokeDasharray;
	}
}
