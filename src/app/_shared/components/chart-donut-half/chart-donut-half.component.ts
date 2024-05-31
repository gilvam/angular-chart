import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';
import {
	ChartDonutHalfData,
	IChartDonutHalfData,
} from '@shared/components/chart-donut-half/model/chart-donut-half-data.model';
import { ChartDonutHalfSegmentData } from '@shared/components/chart-donut-half/model/chart-donut-half-segment-data.model';
import { ChartDonutHalfLetter } from '@shared/components/chart-donut-half/model/chart-donut-half-letter.model';
import { ChartResizeDirective } from '@shared/directives/chart-resize.directive';

@Component({
	selector: 'app-chart-donut-half',
	standalone: true,
	imports: [NgForOf, NgIf, JsonPipe, ChartResizeDirective],
	templateUrl: './chart-donut-half.component.html',
	styleUrls: ['./chart-donut-half.component.scss'],
})
export class ChartDonutHalfComponent implements AfterViewInit {
	@Input() enableAutoWidth = false;
	@Input() width = 400;
	@Input() height = 300;
	@Input() thickness = 20;
	@Input() gapBetweenSegments = 4;
	@Input() showSegmentData = true;
	@Input() gap = 10;
	@Input() spaceBetweenLetters = 3;
	@Input() colors = ['#2d63d7', '#4bbd4b', '#FFA500', '#A52A2A', '#FF6F61', '#0F52BA', '#50C878'];
	@Input() data: IChartDonutHalfData = { title: '', list: [] };

	segment = new ChartDonutHalfSegmentData();
	center = new ChartCoordinates().setAngle(90, 180);
	textTitle = new ChartCoordinates(50);
	textSum = new ChartCoordinates(50);
	private _data = new ChartDonutHalfData();

	constructor(private cdr: ChangeDetectorRef) {}

	ngAfterViewInit() {
		this.init();
	}

	init(): void {
		this.setData();

		this.segment.calcRadius(this.width, this.height, this.gap, this.thickness);
		this.center.calc(this.width, this.height, this.thickness, this.gap, this.segment.radiusOut);
		this.segment.calcSegments(
			this.center,
			this._data.list,
			this.gapBetweenSegments,
			this.spaceBetweenLetters,
			this.thickness,
		);
		this.segment.setColors(this.colors);
		this.calcTextPositions();

		this.cdr.detectChanges();
	}

	setData(): void {
		this._data = new ChartDonutHalfData(this.data.title, this.data.list);
	}

	calcTextPositions() {
		const offsetTittleY = 30;
		const maxY = this.segment.maxPositionYInLetters();

		this.textTitle.setY(maxY - offsetTittleY);
		this.textSum.setY(this.textSum.y + maxY);
	}

	get segmentSumText(): number {
		return this._data.sumText();
	}

	transformRotate(letter: ChartDonutHalfLetter): string {
		return `rotate(${letter.rotation} ${letter.position.x} ${letter.position.y})`;
	}
}
