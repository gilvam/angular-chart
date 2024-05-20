import { ChartLineSvgCircleMatrix } from './chart-line-svg-circle-matrix.model';
import { ChartLineCircleSizeEnum } from './chart-line-circle-size.enum';
import { ChartLineSvgTextList } from './chart-line-svg-text-matrix.model';
import { mockSvgCircles } from '@mock/tests/chart-line/svg-circle.mock';
import { mockSvgTextList } from '@mock/tests/chart-line/svg-text.mock';
import { mockChartDataSmall, mockChartConfig, mockChartData } from '@mock/tests/chart-line/chart-config.mock';
import { mockXLabels, mockXLabelsSmall } from '@mock/tests/chart-line/chart-x-text.mock';
import { mockYLabels } from '@mock/tests/chart-line/chart-y-text.mock';

describe('ChartLineSvgCircleMatrix', () => {
	it('should be create default', () => {
		const test = new ChartLineSvgCircleMatrix(mockSvgCircles);

		expect(test.matrix.length).toEqual(2);
		expect(test.matrix[0].length).toEqual(3);
		expect(test.matrix[1].length).toEqual(3);
	});

	it('should be setData correctly', () => {
		const test = new ChartLineSvgCircleMatrix(mockSvgCircles);

		const response = test.setData(mockChartData, mockXLabels);

		expect(response.matrix.length).toEqual(3);
		expect(response.matrix[0].length).toEqual(3);
		expect(response.matrix[1].length).toEqual(3);
	});

	it('should be return a ERROR if xLabels does not match the data length', () => {
		const test = new ChartLineSvgCircleMatrix(mockSvgCircles);

		const responseThrow = () => test.setData(mockChartDataSmall, mockXLabelsSmall);

		expect(responseThrow).toThrowMatching((error) => error.message.includes('The length of'));
	});

	it('should be setRadius correctly', () => {
		const test = new ChartLineSvgCircleMatrix(mockSvgCircles);

		const response = test.setRadius(ChartLineCircleSizeEnum.SMALL);

		expect(response.matrix[0][0].r).toEqual(ChartLineCircleSizeEnum.SMALL);
		expect(response.matrix[0][1].r).toEqual(ChartLineCircleSizeEnum.SMALL);
		expect(response.matrix[0][2].r).toEqual(ChartLineCircleSizeEnum.SMALL);
		expect(response.matrix[1][0].r).toEqual(ChartLineCircleSizeEnum.SMALL);
		expect(response.matrix[1][1].r).toEqual(ChartLineCircleSizeEnum.SMALL);
		expect(response.matrix[1][2].r).toEqual(ChartLineCircleSizeEnum.SMALL);
	});

	it('should be setColorByArray correctly', () => {
		const test = new ChartLineSvgCircleMatrix(mockSvgCircles);

		const response = test.setColorByArray(['blue', 'gray', 'black']);

		expect(response.matrix[0][0].color).toEqual('blue');
		expect(response.matrix[0][1].color).toEqual('blue');
		expect(response.matrix[0][2].color).toEqual('blue');
		expect(response.matrix[1][0].color).toEqual('gray');
	});

	it('should be calc correctly', () => {
		const test = new ChartLineSvgCircleMatrix(mockSvgCircles);
		const svgTextX = new ChartLineSvgTextList(mockSvgTextList);
		const response = test.calc(mockChartConfig, svgTextX, mockYLabels, 400, 20);

		expect(response.matrix[0][0].dataX).toEqual('jan');
		expect(response.matrix[0][0].dataY).toEqual(10);
		expect(response.matrix[0][0].strokeWidth).toEqual(10);
		expect(response.matrix[0][0].r).toEqual(ChartLineCircleSizeEnum.SMALL);
		expect(response.matrix[0][0].color).toEqual('blue');
		expect(response.matrix[0][0].cx | 0).toBeCloseTo(10);
		expect(response.matrix[0][0].cy | 0).toBeCloseTo(370);
		expect(response.matrix[0][1].cx | 0).toBeCloseTo(10);
		expect(response.matrix[0][1].cy | 0).toBeCloseTo(370);
		expect(response.matrix[1][0].cx | 0).toBeCloseTo(10);
		expect(response.matrix[1][0].cy | 0).toBeCloseTo(370);
		expect(response.matrix[1][1].cx | 0).toBeCloseTo(10);
		expect(response.matrix[1][1].cy | 0).toBeCloseTo(370);
	});
});
