import { ChartConfig } from './chart-config.model';
import { ChartCircleSizeEnum } from './chart-circle-size.enum';

describe('ChartConfig', () => {
	const width = 800;
	const height = 600;
	const circleSize = ChartCircleSizeEnum.SMALL;
	const colors = ['#000000', '#FFFFFF'];
	const gap = 30;
	const strokeWidth = 2;
	const yLabels = [0, 100, 200, 300];

	it('should be create default', () => {
		const responseWidthYText = 20.04;

		const test = new ChartConfig(width, height, circleSize, colors, gap, strokeWidth, yLabels);

		expect(test.width).toEqual(width);
		expect(test.height).toEqual(height);
		expect(test.circleSize).toEqual(circleSize);
		expect(test.colors).toEqual(colors);
		expect(test.gap).toEqual(gap);
		expect(test.strokeWidth).toEqual(strokeWidth);
		expect(test.widthYText).toEqual(responseWidthYText);
	});

	it('should be create a checkWidthYText', () => {
		const spy = spyOn(ChartConfig.prototype as any, 'checkWidthYText').and.callThrough();

		new ChartConfig(width, height, circleSize, colors, gap, strokeWidth, yLabels);

		expect(spy).toHaveBeenCalledWith(yLabels);
	});
});
