import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDonutHalfComponent } from './chart-donut-half.component';

describe('ChartDonutHalfComponent', () => {
	let component: ChartDonutHalfComponent;
	let fixture: ComponentFixture<ChartDonutHalfComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ChartDonutHalfComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ChartDonutHalfComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
