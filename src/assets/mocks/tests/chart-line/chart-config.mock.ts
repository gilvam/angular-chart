import { ChartCircleSizeEnum } from '../../../../app/_shared/components/chart-line/model/chart-circle-size.enum';
import { ChartConfig } from '../../../../app/_shared/components/chart-line/model/chart-config.model';
import { mockYLabels } from './chart-y-text.mock';

export const mockChartData = [
	[0, 10, 20],
	[20, 30, 40],
	[40, 50, 60],
];
export const mockChartDataSmall = [[0, 10, 20]];

export const mockChartConfig = new ChartConfig(300, 200, ChartCircleSizeEnum.LARGE, ['blue'], 10, 3, mockYLabels);
