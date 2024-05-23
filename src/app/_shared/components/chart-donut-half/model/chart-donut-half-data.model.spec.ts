import { ChartDonutHalfData } from '@shared/components/chart-donut-half/model/chart-donut-half-data.model';
import { mockChartDonutHalfSegmentDescriptionList } from '@mock/tests/chart-donut-half/chart-donut-half-segment-description.mock';
import { IChartDonutHalfDataDescription } from '@shared/components/chart-donut-half/model/chart-donut-half-segment-description.model';

describe('ChartDonutHalfData', () => {
	it('should be create default', () => {
		const response = new ChartDonutHalfData();

		expect(response.list.length).toEqual(0);
		expect(response.title).toEqual('');
	});

	it('should be create with values', () => {
		const response = new ChartDonutHalfData('title', mockChartDonutHalfSegmentDescriptionList());

		expect(response.list.length).toEqual(3);
		expect(response.title).toEqual('title');
	});

	it('should be checkList', () => {
		const spy = spyOn(ChartDonutHalfData.prototype as any, 'checkList').and.callThrough();
		const list: IChartDonutHalfDataDescription[] = [
			{ percentage: 30, text: '3' },
			{ percentage: 70, text: '7' },
		];
		const response = new ChartDonutHalfData('title', list);

		expect(spy).toHaveBeenCalledWith(list);
		expect(response.list.length).toEqual(2);
		expect(response.list[0].percentage).toEqual(30);
		expect(response.list[0].text).toEqual('3');
		expect(response.list[1].percentage).toEqual(70);
		expect(response.list[1].text).toEqual('7');
	});

	it('should be sumText', () => {
		const list: IChartDonutHalfDataDescription[] = [
			{ percentage: 30, text: '3' },
			{ percentage: 70, text: '7' },
			{ percentage: 0, text: 'X' },
		];
		const data = new ChartDonutHalfData('title', list);

		const response = data.sumText();

		expect(response).toEqual(10);
	});
});
