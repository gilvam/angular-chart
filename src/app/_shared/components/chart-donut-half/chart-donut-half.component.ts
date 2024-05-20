import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

interface Segment {
	color: string;
	value: number;
	d: string;
	letters?: { letter: string; position: PolarCoordinates; rotation: number }[];
}

interface PolarCoordinates {
	x: number;
	y: number;
}

@Component({
	selector: 'app-chart-donut-half',
	standalone: true,
	imports: [NgForOf, NgIf],
	templateUrl: './chart-donut-half.component.html',
	styleUrl: './chart-donut-half.component.scss',
})
export class ChartDonutHalfComponent implements OnInit {
	@Input() data: { color: string; value: number; text: string }[] = [];
	@Input() width = 400;
	@Input() height = 300;
	@Input() thickness = 20;
	@Input() gapBetweenSegments = 4;
	@Input() showSegmentData = true;

	radius = 0;
	innerRadius = 0;
	centerX = 0;
	centerY = 0;
	segments: Segment[] = [];

	private gap = 10;

	ngOnInit() {
		this.calculateDimensions();
		this.calculateSegments();
	}

	calculateDimensions() {
		this.radius = Math.min(
			(this.width - this.gap * 2) / 2 - this.thickness / 2,
			this.height - this.gap - this.thickness / 2,
		);
		this.innerRadius = this.radius - this.thickness;
		this.centerX = this.width / 2;
		const totalChartHeight = this.radius + this.thickness / 2;
		this.centerY = (this.height + totalChartHeight) / 2 - this.gap / 2;
	}

	calculateSegments() {
		const totalGapAngle = (this.gapBetweenSegments / this.radius) * (180 / Math.PI);
		let startAngle = -90;

		for (const entry of this.data) {
			const adjustedStartAngle = startAngle + totalGapAngle / 2;
			const segmentAngle = (180 * entry.value) / 100 - totalGapAngle;
			const adjustedEndAngle = adjustedStartAngle + segmentAngle;

			const segment: Segment = {
				color: entry.color,
				value: entry.value,
				d: this.describeArc(adjustedStartAngle, adjustedEndAngle),
			};

			if (this.showSegmentData) {
				segment.letters = this.calculateLetterPositions(entry.text, adjustedStartAngle, adjustedEndAngle);
			}

			this.segments.push(segment);

			startAngle = adjustedEndAngle + totalGapAngle / 2;
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
		const start = this.polarToCartesian(this.centerX, this.centerY, this.radius, endAngle);
		const end = this.polarToCartesian(this.centerX, this.centerY, this.radius, startAngle);
		const innerStart = this.polarToCartesian(this.centerX, this.centerY, this.innerRadius, endAngle);
		const innerEnd = this.polarToCartesian(this.centerX, this.centerY, this.innerRadius, startAngle);

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
		const spaceBetweenLetters = 3.5;

		const midAngle = (startAngle + endAngle) / 2;
		let currentAngle = midAngle - ((text.length - 1) * spaceBetweenLetters) / 2;

		for (let i = 0; i < text.length; i++) {
			const position = this.polarToCartesian(this.centerX, this.centerY, radius, currentAngle);

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
