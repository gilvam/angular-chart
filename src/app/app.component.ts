import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartLineComponent } from '@shared/components/chart-line/chart-line.component';
import { ChartDonutHalfComponent } from '@shared/components/chart-donut-half/chart-donut-half.component';
import { ArrayUtil } from '@util/array.util';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ChartLineComponent, ChartDonutHalfComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	chartLineTextList: number[] = [];

	chartLineData = [
		[0, 170.2, 180.1, 170.7, 200, 500, 600, 600],
		[50.01, 100.2, 280.1, 370.7, 360.8, 500.7, 0],
		[50, 100, 250, 300, 390, 300, 20, '10']
	];

	flags = {
		dynamic: true,
		tree: false
	};

	ngOnInit() {
		this.chartLineTextList = ArrayUtil.scaled(this.chartLineData, 6);

		(Object.keys(this.flags) as Array<keyof typeof this.flags>).forEach((key) => {
			this.flags[key] = true;
		});
	}
}
