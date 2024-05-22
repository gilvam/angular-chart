import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import {
	IChartDonutHalfData,
	IChartDonutHalfLetter,
	ICoordinates,
	ISegment,
} from '@shared/components/chart-donut-half/model/chart-donut-half.interface';

@Component({
	selector: 'app-chart-donut-half',
	standalone: true,
	imports: [NgForOf, NgIf, JsonPipe],
	templateUrl: './chart-donut-half.component.html',
	styleUrls: ['./chart-donut-half.component.scss'],
})
export class ChartDonutHalfComponent implements AfterViewInit {
	@Input() width = 400;
	@Input() height = 300;
	@Input() thickness = 20;
	@Input() gapBetweenSegments = 4;
	@Input() showSegmentData = true;
	@Input() gap = 10;
	@Input() spaceBetweenLetters = 3;
	@Input() colors = ['#2d63d7', '#4bbd4b', '#FFA500', '#A52A2A', '#FF6F61', '#0F52BA', '#50C878'];
	@Input() data: IChartDonutHalfData = { title: '', list: [] };

	radius = 0;
	innerRadius = 0;
	center: ICoordinates = { x: 0, y: 0 };
	segments: ISegment[] = [];
	titlePositionY = 0;
	sumPositionY = 0;

	readonly angle = 180;
	readonly startAngle = 90;

	constructor(private cdr: ChangeDetectorRef) {}

	ngAfterViewInit() {
		this.calcDimensions();
		this.calcSegments();
		this.calcSegmentsColors(this.colors);
		this.calcTextPositions();
		this.cdr.detectChanges();
	}

	calcSegments() {
		const totalGapAngle = (this.gapBetweenSegments / this.radius) * (this.angle / Math.PI);
		let startAngle = -this.startAngle;

		for (const entry of this.data.list) {
			const adjustedStartAngle = startAngle + totalGapAngle / 2;
			const segmentAngle = (this.angle * entry.percentage) / 100 - totalGapAngle;
			const adjustedEndAngle = adjustedStartAngle + segmentAngle;
			const segment: ISegment = {
				color: '',
				value: entry.percentage,
				dataType: this.describeArc(adjustedStartAngle, adjustedEndAngle),
				letters: [],
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
		this.center.x = this.width / 2;
		this.center.y = (this.height + this.radius + this.thickness / 2) / 2 - this.gap / 2;
	}

	polarToCartesian(coordinates: ICoordinates, radius: number, angleInDegrees: number): ICoordinates {
		const angleInRadians = this.degreesToRadians(angleInDegrees);
		return {
			x: coordinates.x + radius * Math.cos(angleInRadians),
			y: coordinates.y + radius * Math.sin(angleInRadians),
		};
	}

	degreesToRadians(degrees: number): number {
		return ((degrees - this.startAngle) * Math.PI) / this.angle;
	}

	describeArc(startAngle: number, endAngle: number): string {
		const start = this.polarToCartesian(this.center, this.radius, endAngle);
		const end = this.polarToCartesian(this.center, this.radius, startAngle);
		const innerStart = this.polarToCartesian(this.center, this.innerRadius, endAngle);
		const innerEnd = this.polarToCartesian(this.center, this.innerRadius, startAngle);
		const largeArcFlag = endAngle - startAngle <= this.angle ? '0' : '1';
		const outerArc = `M${start.x},${start.y} A${this.radius},${this.radius} 0 ${largeArcFlag} 0 ${end.x},${end.y}`;
		const innerArc = `L${innerEnd.x},${innerEnd.y} A${this.innerRadius},${this.innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x},${innerStart.y} Z`;

		return `${outerArc} ${innerArc}`;
	}

	calLetterPositions(text: string, startAngle: number, endAngle: number): IChartDonutHalfLetter[] {
		const letters: IChartDonutHalfLetter[] = [];
		const radius = this.radius - this.thickness / 2 - 1;
		const midAngle = (startAngle + endAngle) / 2;
		let currentAngle = midAngle - ((text.length - 1) * this.spaceBetweenLetters) / 2;

		for (let i = 0; i < text.length; i++) {
			const position = this.polarToCartesian(this.center, radius, currentAngle);
			letters.push({
				text: text[i],
				position: position,
				rotation: currentAngle,
			});
			currentAngle += this.spaceBetweenLetters;
		}

		return letters;
	}

	calcTextPositions() {
		const offsetY = 30;
		const maxY = Math.max(...this.segments.flatMap((seg) => seg.letters.map((letter) => letter.position.y)));
		this.titlePositionY = maxY - offsetY;
		this.sumPositionY = this.titlePositionY + 29;
	}

	get sumValues(): number {
		if (!this.data.list.length) {
			return 0;
		}
		return this.data.list.map((it) => Number(it.text)).reduce((sum, value) => (!isNaN(value) ? sum + value : sum));
	}
}
