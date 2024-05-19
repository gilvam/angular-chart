import { SvgLine } from './svg-line.model';
import { mockChartConfig } from '@mock/tests/chart-line/chart-config.mock';

describe('SvgLine', () => {
	it('should be create default', () => {
		const test = new SvgLine();

		expect(test.x1).toEqual(0);
		expect(test.y1).toEqual(0);
		expect(test.x2).toEqual(0);
		expect(test.y2).toEqual(0);
		expect(test.color).toEqual('black');
		expect(test.strokeDasharray).toEqual(3);
		expect(test.strokeWidth).toEqual(2);
	});

	it('should be set strokeWidth', () => {
		const test = new SvgLine();

		test.setStrokeWidth(10);

		expect(test.strokeWidth).toEqual(10);
	});

	it('should be calc line matrix correctly', () => {
		const test = new SvgLine();
		const y = 10;

		const response = test.calc(mockChartConfig, y);

		expect(response.x1 | 0).toBeCloseTo(10);
		expect(response.y1 | 0).toBeCloseTo(6);
		expect(response.x2 | 0).toBeCloseTo(276);
		expect(response.y2 | 0).toBeCloseTo(6);
	});
});
