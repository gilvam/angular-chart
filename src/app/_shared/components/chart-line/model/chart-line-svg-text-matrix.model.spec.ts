import { ChartLineSvgTextList } from './chart-line-svg-text-matrix.model';
import { mockSvgTextList } from '@mock/tests/chart-line/svg-text.mock';
import { mockChartConfig } from '@mock/tests/chart-line/chart-config.mock';
import { mockXLabels } from '@mock/tests/chart-line/chart-x-text.mock';
import { mockYLabels } from '@mock/tests/chart-line/chart-y-text.mock';

describe('ChartLineSvgTextList', () => {
	it('should be create default', () => {
		const test = new ChartLineSvgTextList(mockSvgTextList);

		expect(test.list).toEqual(mockSvgTextList);
	});

	it('should be find horizontal value "x" by description', () => {
		const test = new ChartLineSvgTextList(mockSvgTextList);

		const response = test.findXByDescription('description 1');

		expect(response).toEqual(10);
	});

	it('should be find horizontal value "x" by description without value', () => {
		const test = new ChartLineSvgTextList(mockSvgTextList);

		const response = test.findXByDescription('x');

		expect(response).toEqual(0);
	});

	it('should be calc x value correctly', () => {
		const test = new ChartLineSvgTextList(mockSvgTextList);

		const response = test.calcX(mockChartConfig, mockXLabels);

		expect(response.list.length).toEqual(3);
		expect(response.list[0].x | 0).toBeCloseTo(10);
		expect(response.list[1].x | 0).toBeCloseTo(143);
		expect(response.list[2].x | 0).toBeCloseTo(276);
		expect(response.list[0].y | 0).toBeCloseTo(192);
		expect(response.list[1].y | 0).toBeCloseTo(192);
		expect(response.list[2].y | 0).toBeCloseTo(192);
	});

	it('should be calc y value correctly', () => {
		const test = new ChartLineSvgTextList(mockSvgTextList);

		const response = test.calcY(mockChartConfig, mockYLabels);

		expect(response.list.length).toEqual(2);
		expect(response.list[0].x | 0).toBeCloseTo(286);
		expect(response.list[1].x | 0).toBeCloseTo(286);
		expect(response.list[0].y | 0).toBeCloseTo(189);
		expect(response.list[1].y | 0).toBeCloseTo(14);
	});
});
