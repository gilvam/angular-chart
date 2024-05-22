import { ChartDonutHalfSegment } from '@shared/components/chart-donut-half/model/chart-donut-half-segment.model';
import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';
import { ChartDonutHalfSegmentDescription } from '@shared/components/chart-donut-half/model/chart-donut-half-segment-description.model';
import { ChartDonutHalfLetter } from '@shared/components/chart-donut-half/model/chart-donut-half-letter.model';

export class ChartDonutHalfSegmentData {
	private readonly _list: ChartDonutHalfSegment[];
	private _radiusOut: number;
	private _radiusIn: number;

	constructor(list: ChartDonutHalfSegment[] = [], radiusIn = 0, radiusOut = 0) {
		this._list = list;
		this._radiusOut = radiusOut;
		this._radiusIn = radiusIn;
	}

	calcRadius(width: number, height: number, gap: number, thickness: number): void {
		const min = Math.min((width - gap * 2) / 2 - thickness / 2, height - gap - thickness / 2);
		this.setRadiusOut(min);
		this.setRadiusIn(this.radiusOut - thickness);
	}

	describeArc(center: ChartCoordinates, startAngle: number, endAngle: number): string {
		const start = center.polarToCartesian(this.radiusOut, endAngle);
		const end = center.polarToCartesian(this.radiusOut, startAngle);
		const innerStart = center.polarToCartesian(this.radiusIn, endAngle);
		const innerEnd = center.polarToCartesian(this.radiusIn, startAngle);
		const largeArcFlag = endAngle - startAngle <= center.angleEnd ? '0' : '1';
		const outerArc = `M${start.x},${start.y} A${this.radiusOut},${this.radiusOut} 0 ${largeArcFlag} 0 ${end.x},${end.y}`;
		const innerArc = `L${innerEnd.x},${innerEnd.y} A${this.radiusIn},${this.radiusIn} 0 ${largeArcFlag} 1 ${innerStart.x},${innerStart.y} Z`;

		return `${outerArc} ${innerArc}`;
	}

	calcSegments(
		center: ChartCoordinates,
		segmentDescriptionList: ChartDonutHalfSegmentDescription[],
		gapBetweenSegments: number,
		spaceBetweenLetters: number,
		thickness: number,
	) {
		const totalGapAngle = (gapBetweenSegments / this.radiusOut) * (center.angleEnd / Math.PI);
		let startAngle = -center.angleStart;

		for (const entry of segmentDescriptionList) {
			const adjustedStartAngle = startAngle + totalGapAngle / 2;
			const segmentAngle = (center.angleEnd * entry.percentage) / 100 - totalGapAngle;
			const adjustedEndAngle = adjustedStartAngle + segmentAngle;
			const dataType = this.describeArc(center, adjustedStartAngle, adjustedEndAngle);
			const letters = this.calLetterPositions(
				center,
				entry.text,
				adjustedStartAngle,
				adjustedEndAngle,
				spaceBetweenLetters,
				thickness,
			);
			this.list.push(new ChartDonutHalfSegment(entry.percentage, letters, dataType));

			startAngle = adjustedEndAngle + totalGapAngle / 2;
		}
	}

	calLetterPositions(
		center: ChartCoordinates,
		text: string,
		startAngle: number,
		endAngle: number,
		spaceBetweenLetters: number,
		thickness: number,
	): ChartDonutHalfLetter[] {
		const letters: ChartDonutHalfLetter[] = [];
		const radius = this.radiusOut - thickness / 2 - 1;
		const midAngle = (startAngle + endAngle) / 2;
		let currentAngle = midAngle - ((text.length - 1) * spaceBetweenLetters) / 2;

		for (let i = 0; i < text.length; i++) {
			const position = center.polarToCartesian(radius, currentAngle);
			letters.push(new ChartDonutHalfLetter(text[i], currentAngle, position));
			currentAngle += spaceBetweenLetters;
		}

		return letters;
	}

	setColors(colors: string[]): void {
		const numColors = colors.length;
		let colorIndex = 0;

		this.list.forEach((it) => {
			it.color = colors[colorIndex];
			colorIndex = (colorIndex + 1) % numColors;
		});
	}

	maxPositionYInLetters(): number {
		return Math.max(...this.list.flatMap((seg) => seg.letters.map((letter) => letter.position.y)));
	}

	get list(): ChartDonutHalfSegment[] {
		return this._list;
	}

	get radiusOut(): number {
		return this._radiusOut;
	}

	setRadiusOut(value: number) {
		this._radiusOut = value;
	}

	get radiusIn(): number {
		return this._radiusIn;
	}

	setRadiusIn(value: number) {
		this._radiusIn = value;
	}
}
