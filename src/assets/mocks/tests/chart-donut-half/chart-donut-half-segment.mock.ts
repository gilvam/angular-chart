import { ChartDonutHalfSegment } from '@shared/components/chart-donut-half/model/chart-donut-half-segment.model';
import { mockChartDonutHalfLetterList } from '@mock/tests/chart-donut-half/chart-donut-half-letter.mock';

export const mockChartDonutHalfSegmentList = () => [
	new ChartDonutHalfSegment(10, mockChartDonutHalfLetterList(), '100'),
	new ChartDonutHalfSegment(30, mockChartDonutHalfLetterList(), '300'),
	new ChartDonutHalfSegment(60, mockChartDonutHalfLetterList(), '600'),
];
