import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Segment {
	color: string;
	value: number;
	d: string;
	labelPosition: { x: number; y: number };
	rotation: number;
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
	@Input() width = 300;
	@Input() height = 150;
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
			const labelAngle = (startAngle + endAngle) / 2;
			const labelPosition = this.polarToCartesian(0, 0, this.radius - this.thickness / 2, labelAngle);
			const labelYOffset = this.thickness / 6;
			labelPosition.y += labelYOffset;
			this.segments.push({
				color: entry.color,
				value: entry.value,
				d: this.describeArc(startAngle, endAngle),
				labelPosition: labelPosition,
				rotation: labelAngle,
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
		labelPosition: PolarCoordinates,
		rotation: number,
	): { letter: string; position: PolarCoordinates; rotation: number }[] {
		const letterPositions: { letter: string; position: PolarCoordinates; rotation: number }[] = [];
		const letterCount = text.length;
		const letterAngleIncrement = 180 / (letterCount - 1);

		for (let i = 0; i < letterCount; i++) {
			const letter = text[i];
			const letterRotation = rotation - 90 + i * letterAngleIncrement;
			const letterPosition = this.polarToCartesian(labelPosition.x, labelPosition.y, 0, letterRotation);
			letterPositions.push({
				letter: letter,
				position: letterPosition,
				rotation: letterRotation,
			});
		}

		return letterPositions;
	}
}
