import { ChartLineSvgCircle } from '@shared/components/chart-line/model/chart-line-svg-circle.model';
import { ChartLineCircleSizeEnum } from '@shared/components/chart-line/model/chart-line-circle-size.enum';

export const mockSvgCircles = [
	[
		new ChartLineSvgCircle('jan', 10, 100, 100, ChartLineCircleSizeEnum.SMALL, 10, 'blue'),
		new ChartLineSvgCircle('feb', 10, 100, 100, ChartLineCircleSizeEnum.SMALL, 10, 'blue'),
		new ChartLineSvgCircle('mar', 10, 100, 100, ChartLineCircleSizeEnum.SMALL, 10, 'blue'),
	],
	[
		new ChartLineSvgCircle('jan', 10, 100, 100, ChartLineCircleSizeEnum.SMALL, 10, 'gray'),
		new ChartLineSvgCircle('feb', 10, 100, 100, ChartLineCircleSizeEnum.SMALL, 10, 'gray'),
		new ChartLineSvgCircle('mar', 10, 100, 100, ChartLineCircleSizeEnum.SMALL, 10, 'gray'),
	],
];
