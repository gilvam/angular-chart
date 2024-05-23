import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';

export const mockChartDonutHalfChartCoordinate = () => {
	return new ChartCoordinates(10, 20).setAngle(100, 200);
};
