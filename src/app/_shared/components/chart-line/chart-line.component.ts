import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ChartPosition } from './model/chart-position.enum';
import { SvgCircleList } from './model/svg-circle-matrix.model';
import { SvgTextList } from './model/svg-text-matrix.model';
import { SvgLine } from './model/svg-line.model';
import { SvgLineList } from './model/svg-line-matrix.model';

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
	@Input() data: [string, number][][] = [
		[
			['jan', 0],
			['feb', 170.2],
			['mar', 180.1],
			['apr', 170.7],
			['may', 160.8],
			['jun', 160.7],
			['jul', 600],
		],
		[
			['apr', 270.2],
			['may', 280.1],
			['jun', 270.7],
			['jul', 260.8],
			['aug', 260.7],
		],
	];
	gap = 40;
	svgTextX = new SvgTextList();
	svgTextY = new SvgTextList();
	svgLineDashed: SvgLine[] = [];
	svgCircleMatrix = new SvgCircleList();
	svgLineMatrix = new SvgLineList();

	ngOnInit() {
		this.svgTextX.calcX(this.width, this.height, this.gap, this.yLabelPosition, this.xLabels);
		this.svgTextY.calcY(this.width, this.height, this.gap, this.yLabelPosition, this.yLabels);
		this.svgLineDashed = this.svgTextY.list.map((it) =>
			new SvgLine().calc(it.y, this.width, this.gap, this.yLabelPosition, this.yLabels),
		);

		this.svgCircleMatrix = new SvgCircleList()
			.setData(this.data)
			.setColorByArray(this.colors)
			.calc(this.svgTextX, this.yLabels, this.height, this.gap);

		this.svgLineMatrix.calc(this.svgCircleMatrix);
	}
}
