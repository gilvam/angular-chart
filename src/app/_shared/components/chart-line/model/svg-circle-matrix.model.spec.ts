import { SvgCircleMatrix } from './svg-circle-matrix.model';
import { ChartCircleSizeEnum } from './chart-circle-size.enum';
import { SvgTextList } from './svg-text-matrix.model';
import { mockSvgCircles } from '@mock/tests/chart-line/svg-circle.mock';
import { mockSvgTextList } from '@mock/tests/chart-line/svg-text.mock';
import { mockChartDataSmall, mockChartConfig, mockChartData } from '@mock/tests/chart-line/chart-config.mock';
import { mockXLabels, mockXLabelsSmall } from '@mock/tests/chart-line/chart-x-text.mock';
import { mockYLabels } from '@mock/tests/chart-line/chart-y-text.mock';

describe('SvgCircleMatrix', () => {
	it('should be create default', () => {
		const test = new SvgCircleMatrix(mockSvgCircles);

		expect(test.matrix.length).toEqual(2);
		expect(test.matrix[0].length).toEqual(3);
		expect(test.matrix[1].length).toEqual(3);
	});

	it('should be setData correctly', () => {
		const test = new SvgCircleMatrix(mockSvgCircles);

		const response = test.setData(mockChartData, mockXLabels);

		expect(response.matrix.length).toEqual(3);
		expect(response.matrix[0].length).toEqual(3);
		expect(response.matrix[1].length).toEqual(3);
	});

	it('should be return a ERROR if xLabels does not match the data length', () => {
		const test = new SvgCircleMatrix(mockSvgCircles);

		const responseThrow = () => test.setData(mockChartDataSmall, mockXLabelsSmall);

		expect(responseThrow).toThrowMatching((error) => error.message.includes('The length of'));
	});

	it('should be setRadius correctly', () => {
		const test = new SvgCircleMatrix(mockSvgCircles);

		const response = test.setRadius(ChartCircleSizeEnum.SMALL);

		expect(response.matrix[0][0].r).toEqual(ChartCircleSizeEnum.SMALL);
		expect(response.matrix[0][1].r).toEqual(ChartCircleSizeEnum.SMALL);
		expect(response.matrix[0][2].r).toEqual(ChartCircleSizeEnum.SMALL);
		expect(response.matrix[1][0].r).toEqual(ChartCircleSizeEnum.SMALL);
		expect(response.matrix[1][1].r).toEqual(ChartCircleSizeEnum.SMALL);
		expect(response.matrix[1][2].r).toEqual(ChartCircleSizeEnum.SMALL);
	});

	it('should be setColorByArray correctly', () => {
		const test = new SvgCircleMatrix(mockSvgCircles);

		const response = test.setColorByArray(['blue', 'gray', 'black']);

		expect(response.matrix[0][0].color).toEqual('blue');
		expect(response.matrix[0][1].color).toEqual('blue');
		expect(response.matrix[0][2].color).toEqual('blue');
		expect(response.matrix[1][0].color).toEqual('gray');
	});

	it('should be calc correctly', () => {
		const test = new SvgCircleMatrix(mockSvgCircles);
		const svgTextX = new SvgTextList(mockSvgTextList);
		const response = test.calc(mockChartConfig, svgTextX, mockYLabels, 400, 20);

		expect(response.matrix[0][0].dataX).toEqual('jan');
		expect(response.matrix[0][0].dataY).toEqual(10);
		expect(response.matrix[0][0].strokeWidth).toEqual(10);
		expect(response.matrix[0][0].r).toEqual(ChartCircleSizeEnum.SMALL);
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
