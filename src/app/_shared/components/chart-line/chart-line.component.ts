import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ChartLineSvgCircleMatrix } from './model/chart-line-svg-circle-matrix.model';
import { ChartLineSvgTextList } from './model/chart-line-svg-text-matrix.model';
import { ChartLineSvgLine } from './model/chart-line-svg-line.model';
import { ChartLineSvgLineMatrix } from './model/chart-line-svg-line-matrix.model';
import { ChartLineCircleSizeEnum } from './model/chart-line-circle-size.enum';
import { ChartLineConfig } from './model/chart-line-config.model';
import { ChartResizeDirective } from '@shared/directives/chart-resize.directive';

@Component({
	selector: 'app-chart-line',
	standalone: true,
	imports: [NgForOf, ChartResizeDirective],
	templateUrl: './chart-line.component.html',
	styleUrl: './chart-line.component.scss',
})
export class ChartLineComponent implements AfterViewInit {
	@Input() enableAutoWidth = false;
	@Input() width = 400;
	@Input() height = 300;
	@Input() gap = 30;
	@Input() circleSize: ChartLineCircleSizeEnum = ChartLineCircleSizeEnum.MEDIUM;
	@Input() yTexts = [0, 100, 200, 300, 400, 500, 600];
	@Input() xTexts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	@Input() colors = ['#2d63d7', '#4bbd4b', '#FFA500', '#800080', '#A52A2A', '#FF6F61', '#0F52BA', '#50C878'];
	@Input() data: (string | number)[][] = [[0, 20]];

	svgTextX = new ChartLineSvgTextList();
	svgTextY = new ChartLineSvgTextList();
	svgLineDashed: ChartLineSvgLine[] = [];
	svgCircleMatrix = new ChartLineSvgCircleMatrix();
	svgLineMatrix = new ChartLineSvgLineMatrix();
	private strokeWidth = 1;

	constructor(private cdr: ChangeDetectorRef) {}

	ngAfterViewInit(): void {
		this.init();
		this.cdr.detectChanges();
	}

	private init(): void {
		const chartConfig = new ChartLineConfig(
			this.width,
			this.height,
			this.circleSize,
			this.colors,
			this.gap,
			this.strokeWidth,
			this.yTexts,
		);

		this.svgTextX.calcX(chartConfig, this.xTexts);
		this.svgTextY.calcY(chartConfig, this.yTexts);

		this.svgLineDashed = this.svgTextY.list.map((it) => new ChartLineSvgLine().calc(chartConfig, it.y));

		this.svgCircleMatrix = new ChartLineSvgCircleMatrix()
			.setData(this.data, this.xTexts)
			.setRadius(this.circleSize)
			.setStrokeWidth(this.strokeWidth)
			.setColorByArray(this.colors)
			.calc(chartConfig, this.svgTextX, this.yTexts, this.height, this.gap);

		this.svgLineMatrix.calc(this.svgCircleMatrix);
	}

	onWidthChanged(eventWidth: number): void {
		this.width = eventWidth;
		this.init();
	}
}
