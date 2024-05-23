import { mockChartDonutHalfLetter } from '@mock/tests/chart-donut-half/chart-donut-half-letter.mock';
import { mockChartDonutHalfChartCoordinate } from '@mock/tests/chart-donut-half/chart-donut-half-chart-coordinate.mock';

describe('ChartDonutHalfLetter', () => {
	it('should be create default', () => {
		const response = mockChartDonutHalfLetter();

		expect(response.text).toEqual('abc');
		expect(response.rotation).toEqual(20);
		expect(response.position).toEqual(mockChartDonutHalfChartCoordinate());
	});
});
