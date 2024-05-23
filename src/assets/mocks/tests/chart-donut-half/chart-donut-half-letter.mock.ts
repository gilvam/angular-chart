import { ChartDonutHalfLetter } from '@shared/components/chart-donut-half/model/chart-donut-half-letter.model';
import { mockChartDonutHalfChartCoordinate } from '@mock/tests/chart-donut-half/chart-donut-half-chart-coordinate.mock';

export const mockChartDonutHalfLetter = () => new ChartDonutHalfLetter('abc', 20, mockChartDonutHalfChartCoordinate());

export const mockChartDonutHalfLetterList = () => [
	new ChartDonutHalfLetter('abc', 20, mockChartDonutHalfChartCoordinate()),
	new ChartDonutHalfLetter('def', 30, mockChartDonutHalfChartCoordinate()),
	new ChartDonutHalfLetter('ghij', 40, mockChartDonutHalfChartCoordinate()),
];
