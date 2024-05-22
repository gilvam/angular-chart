import { ChartLineSvgLine } from './chart-line-svg-line.model';
import { mockChartConfig } from '@mock/tests/chart-line/chart-line-config.mock';

describe('ChartLineSvgLine', () => {
	it('should be create default', () => {
		const test = new ChartLineSvgLine();

		expect(test.x1).toEqual(0);
		expect(test.y1).toEqual(0);
		expect(test.x2).toEqual(0);
		expect(test.y2).toEqual(0);
		expect(test.color).toEqual('#ddd');
		expect(test.strokeDasharray).toEqual(3);
		expect(test.strokeWidth).toEqual(1);
	});

	it('should be set strokeWidth', () => {
		const test = new ChartLineSvgLine();

		test.setStrokeWidth(10);

		expect(test.strokeWidth).toEqual(10);
	});

	it('should be calc line matrix correctly', () => {
		const test = new ChartLineSvgLine();
		const y = 10;

		const response = test.calc(mockChartConfig, y);

		expect(response.x1 | 0).toBeCloseTo(10);
		expect(response.y1 | 0).toBeCloseTo(6);
		expect(response.x2 | 0).toBeCloseTo(276);
		expect(response.y2 | 0).toBeCloseTo(6);
	});
});
