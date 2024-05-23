import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDonutHalfComponent } from './chart-donut-half.component';
import { ChartDonutHalfData } from '@shared/components/chart-donut-half/model/chart-donut-half-data.model';
import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';
import { ChartDonutHalfLetter } from '@shared/components/chart-donut-half/model/chart-donut-half-letter.model';
import { mockChartDonutHalfLetter } from '@mock/tests/chart-donut-half/chart-donut-half-letter.mock';
import { mockChartDonutHalfChartCoordinate } from '@mock/tests/chart-donut-half/chart-donut-half-chart-coordinate.mock';

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

	it('should be used ngAfterViewInit', () => {
		const spyOnSetData = spyOn(component, 'setData');
		const spyOnCalcTextPositions = spyOn(component, 'calcTextPositions');

		component.ngAfterViewInit();

		expect(spyOnSetData).toHaveBeenCalled();
		expect(spyOnCalcTextPositions).toHaveBeenCalled();
	});

	it('should be used setData', () => {
		component.data = {
			title: 'Better performance!',
			list: [
				{ percentage: 10, text: '100' },
				{ percentage: 20, text: '200' },
			],
		};

		component.setData();

		expect((component as any)._data).toEqual(new ChartDonutHalfData(component.data.title, component.data.list));
	});

	it('should be used calcTextPositions', () => {
		component.width = 400;
		component.height = 300;
		component.thickness = 30;
		component.gapBetweenSegments = 4;
		component.gap = 30;
		component.spaceBetweenLetters = 3;
		component.data = {
			title: 'Better performance!',
			list: [
				{ percentage: 10, text: '100' },
				{ percentage: 20, text: '200' },
			],
		};
		component.center = new ChartCoordinates().setAngle(90, 180);
		component.ngAfterViewInit();

		component.calcTextPositions();

		expect(component.textTitle.y | 0).toBeCloseTo(175);
		expect(component.textSum.y | 0).toBeCloseTo(0);
	});

	it('should be used segmentSumText', () => {
		component.data = {
			title: '',
			list: [
				{ percentage: 1, text: '100' },
				{ percentage: 2, text: '200' },
			],
		};

		component.ngAfterViewInit();
		const response = component.segmentSumText;

		expect(response).toEqual(300);
	});

	it('should be used transformRotate', () => {
		const coordinate = new ChartCoordinates(10, 20);
		const letter = new ChartDonutHalfLetter('abc', 30, coordinate);

		const response = component.transformRotate(letter);

		expect(response).toEqual('rotate(30 10 20)');
	});
});
