import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SvgCircleList } from './model/svg-circle-matrix.model';
import { SvgTextList } from './model/svg-text-matrix.model';
import { SvgLine } from './model/svg-line.model';
import { SvgLineList } from './model/svg-line-matrix.model';
import { ChartCircleSizeEnum } from './model/chart-circle-size.enum';
import { ChartConfig } from './model/chart-config.model';

@Component({
	selector: 'app-chart-line',
	standalone: true,
	imports: [NgForOf],
	templateUrl: './chart-line.component.html',
	styleUrl: './chart-line.component.scss',
})
export class ChartLineComponent implements OnInit {
	@Input() width = 600;
	@Input() height = 400;
	@Input() yLabels = [0, 100, 200, 300, 400, 500, 600];
	@Input() circleSize: ChartCircleSizeEnum = ChartCircleSizeEnum.SMALL;
	@Input() xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	@Input() colors = ['#2d63d7', '#4bbd4b', '#FFA500', '#800080', '#A52A2A', '#FF6F61', '#0F52BA', '#50C878'];
	@Input() data: (string | number)[][] = [[0, 20]];

	private gap = 30;
	private strokeWidth = 1;

	svgTextX = new SvgTextList();
	svgTextY = new SvgTextList();
	svgLineDashed: SvgLine[] = [];
	svgCircleMatrix = new SvgCircleList();
	svgLineMatrix = new SvgLineList();

	ngOnInit(): void {
		this.init();
	}

	private init(): void {
		const chartConfig = new ChartConfig(
			this.width,
			this.height,
			this.circleSize,
			this.colors,
			this.gap,
			this.strokeWidth,
		);
		this.svgTextX.calcX(chartConfig, this.xLabels);
		this.svgTextY.calcY(chartConfig, this.yLabels);
		this.svgLineDashed = this.svgTextY.list.map((it) =>
			new SvgLine().setStrokeWidth(this.strokeWidth).calc(chartConfig, it.y),
		);
		this.svgCircleMatrix = new SvgCircleList()
			.setData(this.data, this.xLabels)
			.setRadius(this.circleSize)
			.setColorByArray(this.colors)
			.calc(this.svgTextX, this.yLabels, this.height, this.gap);
		this.svgLineMatrix.calc(this.svgCircleMatrix);
	}
}
