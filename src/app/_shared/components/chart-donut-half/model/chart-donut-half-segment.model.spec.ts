import { mockChartDonutHalfLetterList } from '@mock/tests/chart-donut-half/chart-donut-half-letter.mock';
import { ChartDonutHalfSegment } from '@shared/components/chart-donut-half/model/chart-donut-half-segment.model';

describe('ChartDonutHalfSegment', () => {
	it('should be create default', () => {
		const response = new ChartDonutHalfSegment();

		expect(response.value).toEqual(0);
		expect(response.color).toEqual('gray');
		expect(response.letters).toEqual([]);
		expect(response.dataType).toEqual('');
	});

	it('should be create with values', () => {
		const response = new ChartDonutHalfSegment(10, mockChartDonutHalfLetterList(), 'xpto');

		expect(response.value).toEqual(10);
		expect(response.color).toEqual('gray');
		expect(response.letters).toEqual(mockChartDonutHalfLetterList());
		expect(response.dataType).toEqual('xpto');
	});
});
