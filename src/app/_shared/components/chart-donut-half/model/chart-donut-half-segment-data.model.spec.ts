import { ChartDonutHalfSegmentData } from '@shared/components/chart-donut-half/model/chart-donut-half-segment-data.model';
import { mockChartDonutHalfSegmentList } from '@mock/tests/chart-donut-half/chart-donut-half-segment.mock';
import { mockChartDonutHalfChartCoordinate } from '@mock/tests/chart-donut-half/chart-donut-half-chart-coordinate.mock';
import { mockChartDonutHalfSegmentDescriptionList } from '@mock/tests/chart-donut-half/chart-donut-half-segment-description.mock';
import { ChartDonutHalfSegment } from '@shared/components/chart-donut-half/model/chart-donut-half-segment.model';
import { ChartDonutHalfLetter } from '@shared/components/chart-donut-half/model/chart-donut-half-letter.model';
import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';

describe('ChartDonutHalfSegmentData', () => {
	it('should be create  default', () => {
		const response = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		expect(response.list).toEqual(mockChartDonutHalfSegmentList());
		expect(response.radiusIn).toEqual(20);
		expect(response.radiusOut).toEqual(30);
	});

	it('should be create calcRadius', () => {
		const response = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		response.calcRadius(400, 400, 20, 10);

		expect(response.radiusIn).toEqual(165);
		expect(response.radiusOut).toEqual(175);
	});

	it('should be create calcDataTypeArc default values', () => {
		const coordinate = new ChartCoordinates(1, 1).setAngle(500, 500);
		const letterList = [new ChartDonutHalfLetter('abc', 1, coordinate)];
		const segmentList = [new ChartDonutHalfSegment(10, letterList, '100')];
		const data = new ChartDonutHalfSegmentData(segmentList, 1, 1);

		const response = data.calcDataTypeArc(coordinate, 1, 1000);

		expect(response).toEqual(
			'M0,1.0000000000000002 A1,1 0 1 0 0.000019739143862884667,0.9937168560344408 L0.000019739143862884667,0.9937168560344408 A1,1 0 1 1 0,1.0000000000000002 Z',
		);
	});

	it('should be create calcSegments', () => {
		const response = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		response.calcSegments(mockChartDonutHalfChartCoordinate(), mockChartDonutHalfSegmentDescriptionList(), 40, 10, 5);

		expect(response.list[0].dataType).toEqual('100');
		expect(response.list[0].value).toEqual(10);
		expect(response.list[0].letters[0].text).toEqual('abc');
		expect(response.list[0].color).toEqual('gray');
	});

	it('should be create calLetterPositions', () => {
		const data = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		const response = data.calLetterPositions(mockChartDonutHalfChartCoordinate(), '35', 20, 30, 10, 5);

		expect(response.length).toEqual(2);
		expect(response[0].text).toEqual('3');
		expect(response[1].text).toEqual('5');
	});

	it('should be create setColors', () => {
		const response = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		response.setColors(['blue', 'gray']);

		expect(response.list[0].color).toEqual('blue');
		expect(response.list[1].color).toEqual('gray');
		expect(response.list[2].color).toEqual('blue');
	});

	it('should be create maxPositionYInLetters', () => {
		const chartDonutHalfLetterList = [
			new ChartDonutHalfLetter('abc', 20, new ChartCoordinates(1, 10)),
			new ChartDonutHalfLetter('def', 30, new ChartCoordinates(1, 20)),
		];
		const chartDonutHalfSegmentList = [new ChartDonutHalfSegment(1, chartDonutHalfLetterList, '1')];
		const data = new ChartDonutHalfSegmentData(chartDonutHalfSegmentList, 1, 1);

		const response = data.maxPositionYInLetters();

		expect(response).toEqual(20);
	});

	it('should be create setRadiusOut', () => {
		const response = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		response.setRadiusOut(10);

		expect(response.radiusOut).toEqual(10);
	});

	it('should be create setRadiusIn', () => {
		const response = new ChartDonutHalfSegmentData(mockChartDonutHalfSegmentList(), 20, 30);

		response.setRadiusIn(10);

		expect(response.radiusIn).toEqual(10);
	});
});
