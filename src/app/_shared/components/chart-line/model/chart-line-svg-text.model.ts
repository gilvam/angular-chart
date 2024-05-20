export class ChartLineSvgText {
	x: number;
	y: number;
	description: string | number;
	textAnchor: 'middle' | 'start' | 'end';

	constructor(x = 0, y = 0, description: string | number = '', textAnchor: 'middle' | 'start' | 'end' = 'start') {
		this.x = x;
		this.y = y;
		this.description = description;
		this.textAnchor = textAnchor;
	}

	get descriptionLowerCase(): string {
		return this.description.toString().toLowerCase();
	}
}
