import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ChartLineSvgCircleMatrix } from './model/chart-line-svg-circle-matrix.model';
import { ChartLineSvgTextList } from './model/chart-line-svg-text-matrix.model';
import { ChartLineSvgLine } from './model/chart-line-svg-line.model';
import { ChartLineSvgLineMatrix } from './model/chart-line-svg-line-matrix.model';
import { ChartLineCircleSizeEnum } from './model/chart-line-circle-size.enum';
import { ChartLineConfig } from './model/chart-line-config.model';

@Component({
	selector: 'app-chart-line',
	standalone: true,
	imports: [NgForOf],
	templateUrl: './chart-line.component.html',
	styleUrl: './chart-line.component.scss',
})
export class ChartLineComponent implements OnInit {
	@Input() width = 400;
	@Input() height = 300;
	@Input() yLabels = [0, 100, 200, 300, 400, 500, 600];
	@Input() circleSize: ChartLineCircleSizeEnum = ChartLineCircleSizeEnum.SMALL;
	@Input() xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	@Input() colors = ['#2d63d7', '#4bbd4b', '#FFA500', '#800080', '#A52A2A', '#FF6F61', '#0F52BA', '#50C878'];
	@Input() data: (string | number)[][] = [[0, 20]];

	svgTextX = new ChartLineSvgTextList();
	svgTextY = new ChartLineSvgTextList();
	svgLineDashed: ChartLineSvgLine[] = [];
	svgCircleMatrix = new ChartLineSvgCircleMatrix();
	svgLineMatrix = new ChartLineSvgLineMatrix();

	private gap = 30;
	private strokeWidth = 2;

	ngOnInit(): void {
		this.init();
	}

	private init(): void {
		const chartConfig = new ChartLineConfig(
			this.width,
			this.height,
			this.circleSize,
			this.colors,
			this.gap,
			this.strokeWidth,
			this.yLabels,
		);

		this.svgTextX.calcX(chartConfig, this.xLabels);
		this.svgTextY.calcY(chartConfig, this.yLabels);

		this.svgLineDashed = this.svgTextY.list.map((it) => new ChartLineSvgLine().calc(chartConfig, it.y));

		this.svgCircleMatrix = new ChartLineSvgCircleMatrix()
			.setData(this.data, this.xLabels)
			.setRadius(this.circleSize)
			.setStrokeWidth(this.strokeWidth)
			.setColorByArray(this.colors)
			.calc(chartConfig, this.svgTextX, this.yLabels, this.height, this.gap);

		this.svgLineMatrix.calc(this.svgCircleMatrix);
	}
}
