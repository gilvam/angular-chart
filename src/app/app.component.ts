import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { ChartLineComponent } from './_shared/components/chart-line/chart-line.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, FlexModule, ChartLineComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'angular-chart';
}
