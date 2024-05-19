import { SvgCircle } from '../../../../app/_shared/components/chart-line/model/svg-circle.model';
import { ChartCircleSizeEnum } from '../../../../app/_shared/components/chart-line/model/chart-circle-size.enum';

export const mockSvgCircles = [
	[
		new SvgCircle('jan', 10, 100, 100, ChartCircleSizeEnum.SMALL, 10, 'blue'),
		new SvgCircle('feb', 10, 100, 100, ChartCircleSizeEnum.SMALL, 10, 'blue'),
		new SvgCircle('mar', 10, 100, 100, ChartCircleSizeEnum.SMALL, 10, 'blue'),
	],
	[
		new SvgCircle('jan', 10, 100, 100, ChartCircleSizeEnum.SMALL, 10, 'gray'),
		new SvgCircle('feb', 10, 100, 100, ChartCircleSizeEnum.SMALL, 10, 'gray'),
		new SvgCircle('mar', 10, 100, 100, ChartCircleSizeEnum.SMALL, 10, 'gray'),
	],
];
