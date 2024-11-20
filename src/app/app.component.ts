import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartLineComponent } from '@shared/components/chart-line/chart-line.component';
import { ChartDonutHalfComponent } from '@shared/components/chart-donut-half/chart-donut-half.component';
import { ArrayUtil } from '@util/array.util';
import { WINDOW } from '@shared/injection-tokens/window';
import { WINDOW_NATIVE, WindowNative } from '@shared/injection-tokens/window-native';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: true,
	imports: [RouterOutlet, ChartLineComponent, ChartDonutHalfComponent]
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

	constructor(
		@Inject(WINDOW) private window: Window,
		@Inject(WINDOW_NATIVE) private windowNative: WindowNative
	) {}

	ngOnInit() {
		this.chartLineTextList = ArrayUtil.scaled(this.chartLineData, 6);

		(Object.keys(this.flags) as (keyof typeof this.flags)[]).forEach((key) => {
			this.flags[key] = true;
		});
		// console.log('window by document', this.document.defaultView);
		setTimeout(() => {
			console.info(`window: `, (this.window as any)?.native);
			console.info(`windowNative: `, this.windowNative.native);
		}, 500);
	}
}
