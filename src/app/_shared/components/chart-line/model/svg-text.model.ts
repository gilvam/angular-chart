export class SvgTextModel {
	x: number;
	y: number;
	description: string | number;

	constructor(x = 0, y = 0, description: string | number = '') {
		this.x = x;
		this.y = y;
		this.description = description;
	}

	get descriptionLowerCase(): string {
		return this.description.toString().toLowerCase();
	}
}
