import { ChartDonutHalfSegmentDescription } from '@shared/components/chart-donut-half/model/chart-donut-half-segment-description.model';

describe('ChartDonutHalfSegmentDescription', () => {
	it('should be create default', () => {
		const response = new ChartDonutHalfSegmentDescription(0, '');

		expect(response.text).toEqual('');
		expect(response.percentage).toEqual(0);
	});
});
