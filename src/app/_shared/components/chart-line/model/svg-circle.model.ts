export class SvgCircleModel {
	dataX: string;
	dataY: number;
	private _cx: number;
	private _cy: number;
	r: number;
	strokeWidth: number;
	color: string;

	constructor(dataX?: string | number, dataY?: string | number, cx = 0, cy = 0, r = 0, strokeWidth = 2, color = '') {
		this.dataX = String(dataX);
		this.dataY = Number(dataY);
		this._cx = cx;
		this._cy = cy;
		this.r = r;
		this.color = color;
		this.strokeWidth = strokeWidth;
	}

	get cx() {
		return this._cx;
	}

	get cy() {
		return this._cy;
	}

	setColor(color: string) {
		this.color = color;
	}

	setCx(value: number) {
		this._cx = value;
	}

	setCyCalc(yLabelDescriptions: number[], height: number, gap: number) {
		const minY = Math.min(...yLabelDescriptions);
		const maxY = Math.max(...yLabelDescriptions);
		const normalizedY = (this.dataY - minY) / (maxY - minY);
		return height - normalizedY * (height - gap * 2) - gap;
	}
}
