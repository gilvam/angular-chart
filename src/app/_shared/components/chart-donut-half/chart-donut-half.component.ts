import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

interface ChartDonutHalfLetter {
	text: string;
	rotation: number;
	position: PolarCoordinates;
}

interface Segment {
	value: number;
	color: string;
	dataType: string;
	letters?: ChartDonutHalfLetter[];
}

interface PolarCoordinates {
	x: number;
	y: number;
}

interface ChartDonutHalfData {
	title: string;
	list: ChartDonutHalfDataX[];
}

interface ChartDonutHalfDataX {
	percentage: number;
	text: string;
}

@Component({
	selector: 'app-chart-donut-half',
	standalone: true,
	imports: [NgForOf, NgIf],
	templateUrl: './chart-donut-half.component.html',
	styleUrl: './chart-donut-half.component.scss',
})
export class ChartDonutHalfComponent implements OnInit {
	@Input() width = 400;
	@Input() height = 300;
	@Input() thickness = 20;
	@Input() gapBetweenSegments = 4;
	@Input() showSegmentData = true;
	@Input() gap = 10;
	@Input() spaceBetweenLetters = 3;
	@Input() colors = ['#2d63d7', '#4bbd4b', '#FFA500', '#A52A2A', '#FF6F61', '#0F52BA', '#50C878'];
	@Input() data: ChartDonutHalfData = { title: '', list: [] };

	radius = 0;
	innerRadius = 0;
	centerX = 0;
	centerY = 0;
	segments: Segment[] = [];

	readonly angle = 180;
	readonly startAngle = 90;

	ngOnInit() {
		this.calcDimensions();
		this.calcSegments();
		this.calcSegmentsColors(this.colors);
	}

	calcSegments() {
		const totalGapAngle = (this.gapBetweenSegments / this.radius) * (this.angle / Math.PI);
		let startAngle = -this.startAngle;

		for (const entry of this.data.list) {
			const adjustedStartAngle = startAngle + totalGapAngle / 2;
			const segmentAngle = (this.angle * entry.percentage) / 100 - totalGapAngle;
			const adjustedEndAngle = adjustedStartAngle + segmentAngle;
			const segment: Segment = {
				color: '',
				value: entry.percentage,
				dataType: this.describeArc(adjustedStartAngle, adjustedEndAngle),
			};

			if (this.showSegmentData) {
				segment.letters = this.calLetterPositions(entry.text, adjustedStartAngle, adjustedEndAngle);
			}
			this.segments.push(segment);

			startAngle = adjustedEndAngle + totalGapAngle / 2;
		}
	}

	calcSegmentsColors(colors: string[]): void {
		const numColors = colors.length;
		let colorIndex = 0;

		this.segments.forEach((it) => {
			it.color = colors[colorIndex];
			colorIndex = (colorIndex + 1) % numColors;
		});
	}

	calcDimensions() {
		this.radius = Math.min(
			(this.width - this.gap * 2) / 2 - this.thickness / 2,
			this.height - this.gap - this.thickness / 2,
		);
		this.innerRadius = this.radius - this.thickness;
		this.centerX = this.width / 2;
		this.centerY = (this.height + this.radius + this.thickness / 2) / 2 - this.gap / 2;
	}

	polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): PolarCoordinates {
		const angleInRadians = this.degreesToRadians(angleInDegrees);
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians),
		};
	}

	degreesToRadians(degrees: number): number {
		return ((degrees - this.startAngle) * Math.PI) / this.angle;
	}

	describeArc(startAngle: number, endAngle: number): string {
		const start = this.polarToCartesian(this.centerX, this.centerY, this.radius, endAngle);
		const end = this.polarToCartesian(this.centerX, this.centerY, this.radius, startAngle);
		const innerStart = this.polarToCartesian(this.centerX, this.centerY, this.innerRadius, endAngle);
		const innerEnd = this.polarToCartesian(this.centerX, this.centerY, this.innerRadius, startAngle);
		const largeArcFlag = endAngle - startAngle <= this.angle ? '0' : '1';
		const outerArc = `M${start.x},${start.y} A${this.radius},${this.radius} 0 ${largeArcFlag} 0 ${end.x},${end.y}`;
		const innerArc = `L${innerEnd.x},${innerEnd.y} A${this.innerRadius},${this.innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x},${innerStart.y} Z`;

		return `${outerArc} ${innerArc}`;
	}

	calLetterPositions(text: string, startAngle: number, endAngle: number): ChartDonutHalfLetter[] {
		const letters: ChartDonutHalfLetter[] = [];
		const radius = this.radius - this.thickness / 2 - 1;
		const midAngle = (startAngle + endAngle) / 2;
		let currentAngle = midAngle - ((text.length - 1) * this.spaceBetweenLetters) / 2;

		for (let i = 0; i < text.length; i++) {
			const position = this.polarToCartesian(this.centerX, this.centerY, radius, currentAngle);
			letters.push({
				text: text[i],
				position: position,
				rotation: currentAngle,
			});
			currentAngle += this.spaceBetweenLetters;
		}

		return letters;
	}

	sumValues(): number {
		let sum = 0;
		this.data.list.forEach((item) => {
			const number = Number(item.text);
			if (!isNaN(number)) {
				sum += number;
			}
		});
		return sum;
	}
}
