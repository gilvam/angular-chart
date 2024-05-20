import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Segment {
	color: string;
	value: number;
	d: string;
	letters: { letter: string; position: PolarCoordinates; rotation: number }[];
}

interface PolarCoordinates {
	x: number;
	y: number;
}

@Component({
	selector: 'app-chart-donut-half',
	standalone: true,
	imports: [NgForOf],
	templateUrl: './chart-donut-half.component.html',
	styleUrl: './chart-donut-half.component.scss',
})
export class ChartDonutHalfComponent implements OnInit {
	@Input() values: { color: string; value: number }[] = [];
	@Input() width = 400;
	@Input() height = 200;
	@Input() thickness = 40;

	radius = 0;
	innerRadius = 0;
	centerTranslation = '';
	segments: Segment[] = [];

	ngOnInit() {
		this.calculateDimensions();
		this.calculateSegments();
	}

	calculateDimensions() {
		this.radius = this.width / 2 - this.thickness / 2;
		this.innerRadius = this.radius - this.thickness;
		this.centerTranslation = `translate(${this.width / 2}, ${this.height})`;
	}

	calculateSegments() {
		let startAngle = -90;
		for (const entry of this.values) {
			const endAngle = startAngle + (180 * entry.value) / 100;
			const letters = this.calculateLetterPositions(entry.value + '%', startAngle, endAngle);

			this.segments.push({
				color: entry.color,
				value: entry.value,
				d: this.describeArc(startAngle, endAngle),
				letters: letters,
			});
			startAngle = endAngle;
		}
	}

	polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): PolarCoordinates {
		const angleInRadians = this.degreesToRadians(angleInDegrees);
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians),
		};
	}

	degreesToRadians(degrees: number): number {
		return ((degrees - 90) * Math.PI) / 180.0;
	}

	describeArc(startAngle: number, endAngle: number): string {
		const start = this.polarToCartesian(0, 0, this.radius, endAngle);
		const end = this.polarToCartesian(0, 0, this.radius, startAngle);
		const innerStart = this.polarToCartesian(0, 0, this.innerRadius, endAngle);
		const innerEnd = this.polarToCartesian(0, 0, this.innerRadius, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
		const outerArc = `M${start.x},${start.y} A${this.radius},${this.radius} 0 ${largeArcFlag} 0 ${end.x},${end.y}`;
		const innerArc = `L${innerEnd.x},${innerEnd.y} A${this.innerRadius},${this.innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x},${innerStart.y} Z`;

		return `${outerArc} ${innerArc}`;
	}

	calculateLetterPositions(
		text: string,
		startAngle: number,
		endAngle: number,
	): { letter: string; position: PolarCoordinates; rotation: number }[] {
		const letters: { letter: string; position: PolarCoordinates; rotation: number }[] = [];
		const radius = this.radius - this.thickness / 2;
		const totalLetters = text.replace('%', '').length;
		const spaceBetweenLetters = 3.5;
		const midAngle = (startAngle + endAngle) / 2;
		let currentAngle = midAngle - ((totalLetters - 1) * spaceBetweenLetters) / 2;

		for (let i = 0; i < text.length; i++) {
			const position = this.polarToCartesian(0, 0, radius, currentAngle);

			letters.push({
				letter: text[i],
				position: position,
				rotation: currentAngle,
			});
			currentAngle += spaceBetweenLetters;
		}

		return letters;
	}
}
