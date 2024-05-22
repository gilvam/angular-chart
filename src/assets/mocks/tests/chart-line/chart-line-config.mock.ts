import { ChartLineCircleSizeEnum } from '@shared/components/chart-line/model/chart-line-circle-size.enum';
import { ChartLineConfig } from '@shared/components/chart-line/model/chart-line-config.model';
import { mockYTexts } from './chart-line-y-text.mock';

export const mockChartData = [
	[0, 10, 20],
	[20, 30, 40],
	[40, 50, 60],
];
export const mockChartDataSmall = [[0, 10, 20]];

export const mockChartConfig = new ChartLineConfig(
	300,
	200,
	ChartLineCircleSizeEnum.LARGE,
	['blue'],
	10,
	3,
	mockYTexts,
);
