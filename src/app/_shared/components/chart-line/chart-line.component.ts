import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ChartPosition } from './model/chart-position.enum';
import { SvgCircleList } from './model/svg-circle-list.model';
import { SvgTextList } from './model/svg-text-list.model';
import { SvgLineModel } from './model/svg-line.model';
import { SvgLineList } from './model/svg-line-list.model';

interface Circle {
	cx: number;
	cy: number;
	r: number;
	attr: { color: string; strokeWidth: number };
	data: { y: number; x: string };
}

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
	@Input() yLabelPosition = ChartPosition.RIGHT;
	@Input() xLabelDescriptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	@Input() yLabelDescriptions = [0, 100, 200, 300, 400, 500, 600];
	@Input() data: [key: string, value: number][][] = [
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

	svgCircle = new SvgCircleList();

	circleMatrix: Circle[][] = [
		[
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 0, x: 'jan' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 170.2, x: 'feb' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 180.1, x: 'mar' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 170.7, x: 'apr' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 160.8, x: 'may' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 160.7, x: 'jun' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'red', strokeWidth: 2 }, data: { y: 600, x: 'jul' } },
		],
		[
			{ cx: 0, cy: 0, r: 6, attr: { color: 'blue', strokeWidth: 2 }, data: { y: 270.2, x: 'apr' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'blue', strokeWidth: 2 }, data: { y: 280.1, x: 'may' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'blue', strokeWidth: 2 }, data: { y: 270.7, x: 'jun' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'blue', strokeWidth: 2 }, data: { y: 260.8, x: 'jul' } },
			{ cx: 0, cy: 0, r: 6, attr: { color: 'blue', strokeWidth: 2 }, data: { y: 260.7, x: 'aug' } },
		],
	];

	@Input() colors = [
		'#2d63d7',
		'#4bbd4b',
		'#FFA500',
		'#800080',
		'#FFC0CB',
		'#40E0D0',
		'#A52A2A',
		'#808080',
		'#FFD700',
		'#FF6F61',
		'#0F52BA',
		'#50C878',
		'#4B0082',
		'#FFBF00',
	];

	gap = 40;
	lineMatrix: { x1: number; y1: number; x2: number; y2: number; color: string }[][] = [];

	svgTextX = new SvgTextList();
	svgTextY = new SvgTextList();
	svgLine: SvgLineModel[] = [];
	svgLineMatrix = new SvgLineList();

	ngOnInit() {
		this.addColorsToCircleMatrix();
		this.svgTextX.calcX(this.width, this.height, this.gap, this.yLabelPosition, this.xLabelDescriptions);
		this.svgTextY.calcY(this.width, this.height, this.gap, this.yLabelPosition, this.yLabelDescriptions);
		this.svgLine = this.svgTextY.list.map((it) => new SvgLineModel(this.gap, it.y, this.width - this.gap, it.y));

		this.svgCircle = new SvgCircleList()
			.setData(this.data)
			.setColorByArray(this.colors)
			.calcCircle(this.svgTextX, this.yLabelDescriptions, this.height, this.gap);

		console.log(`this.svgCircle: `, this.svgCircle);

		this.svgLineMatrix.calc(this.svgCircle); //calcLineMatrix

		console.log(`this.svgLineMatrix: `, this.svgLineMatrix);
		console.log(`this.lineMatrix: `, this.lineMatrix);

		this.circleMatrix.map((row) =>
			row.slice(0, -1).map((circle, j) => {
				const nextCircle = row[j + 1];
				return { x1: circle.cx, y1: circle.cy, x2: nextCircle.cx, y2: nextCircle.cy, color: circle.attr.color };
			}),
		);

		this.calcCircleMatrix();

		console.log(`this.circle: `, this.svgCircle);
		console.log(`this.circleMatrix: `, this.circleMatrix);

		this.calcLineMatrix();
	}

	addColorsToCircleMatrix() {
		const numColors = this.colors.length;
		let colorIndex = 0;

		this.circleMatrix.forEach((row) => {
			row.forEach((circle) => {
				circle.attr.color = this.colors[colorIndex];
			});
			colorIndex = (colorIndex + 1) % numColors;
		});
	}

	private yLabelValue(value: number): number {
		const minY = Math.min(...this.yLabelDescriptions);
		const maxY = Math.max(...this.yLabelDescriptions);
		const normalizedY = (value - minY) / (maxY - minY);
		return this.height - normalizedY * (this.height - this.gap * 2) - this.gap;
	}

	calcCircleMatrix(): void {
		const averageCharWidth = 8;

		this.circleMatrix = this.circleMatrix.map((row) =>
			row.map((circle) => {
				const labelX = this.svgTextX.findXByDescription(circle.data.x);
				const width = circle.data.x.length * averageCharWidth;

				return {
					...circle,
					cx: labelX - width / 2 + averageCharWidth * circle.data.x.length,
					cy: this.yLabelValue(circle.data.y),
				};
			}),
		);
	}

	calcLineMatrix(): void {
		this.lineMatrix = this.circleMatrix.map((row) =>
			row.slice(0, -1).map((circle, j) => {
				const nextCircle = row[j + 1];
				return { x1: circle.cx, y1: circle.cy, x2: nextCircle.cx, y2: nextCircle.cy, color: circle.attr.color };
			}),
		);
	}
}
