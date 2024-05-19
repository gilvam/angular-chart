import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartLineComponent } from '@shared/components/chart-line/chart-line.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ChartLineComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'angular-chart';
}
