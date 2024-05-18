import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ChartPosition } from './model/chart-position.enum';
import { SvgCircleList } from './model/svg-circle-matrix.model';
import { SvgTextList } from './model/svg-text-matrix.model';
import { SvgLine } from './model/svg-line.model';
import { SvgLineList } from './model/svg-line-matrix.model';
import { ChartCircleSizeEnum } from './model/chart-circle-size.enum';

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
	@Input() xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	@Input() yLabels = [0, 100, 200, 300, 400, 500, 600];
	@Input() yLabelPosition = ChartPosition.RIGHT;
	@Input() circleSize = ChartCircleSizeEnum.SMALL;
	@Input() colors = [
		'#2d63d7',
		'#4bbd4b',
		'#FFA500',
		'#800080',
		'#40E0D0',
		'#A52A2A',
		'#808080',
		'#FF6F61',
		'#0F52BA',
		'#50C878',
		'#4B0082',
		'#FFBF00',
	];
	@Input() data: (string | number)[][] = [
		[0, 170.2, 180.1, 170.7, 200, 500, 600, 600],
		[50.01, 100.2, 280.1, 370.7, 360.8, 500.7, 0],
		[50, 100, 250, 300, 390, 300, 20, '10'],
	];
	gap = 30;
	svgTextX = new SvgTextList();
	svgTextY = new SvgTextList();
	svgLineDashed: SvgLine[] = [];
	svgCircleMatrix = new SvgCircleList();
	svgLineMatrix = new SvgLineList();

	ngOnInit(): void {
		this.init();
	}

	private init(): void {
		this.svgTextX.calcX(this.width, this.height, this.gap, this.yLabelPosition, this.xLabels);
		this.svgTextY.calcY(this.width, this.height, this.gap, this.yLabelPosition, this.yLabels);
		this.svgLineDashed = this.svgTextY.list.map((it) =>
			new SvgLine().calc(it.y, this.width, this.gap, this.yLabelPosition),
		);
		this.svgCircleMatrix = new SvgCircleList()
			.setData(this.data, this.xLabels)
			.setRadius(this.circleSize)
			.setColorByArray(this.colors)
			.calc(this.svgTextX, this.yLabels, this.height, this.gap);
		this.svgLineMatrix.calc(this.svgCircleMatrix);
	}
}
