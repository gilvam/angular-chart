import { ChartLineConfig } from './chart-line-config.model';
import { ChartLineCircleSizeEnum } from './chart-line-circle-size.enum';

describe('ChartLineConfig', () => {
	const width = 800;
	const height = 600;
	const circleSize = ChartLineCircleSizeEnum.SMALL;
	const colors = ['#000000', '#FFFFFF'];
	const gap = 30;
	const strokeWidth = 2;
	const yTexts = [0, 100, 200, 300];

	it('should be create default', () => {
		const responseWidthYText = 20.04;

		const test = new ChartLineConfig(width, height, circleSize, colors, gap, strokeWidth, yTexts);

		expect(test.width).toEqual(width);
		expect(test.height).toEqual(height);
		expect(test.circleSize).toEqual(circleSize);
		expect(test.colors).toEqual(colors);
		expect(test.gap).toEqual(gap);
		expect(test.strokeWidth).toEqual(strokeWidth);
		expect(test.widthYText).toEqual(responseWidthYText);
	});

	it('should be create a checkWidthYText', () => {
		const spy = spyOn(ChartLineConfig.prototype as any, 'checkWidthYText').and.callThrough();

		new ChartLineConfig(width, height, circleSize, colors, gap, strokeWidth, yTexts);

		expect(spy).toHaveBeenCalledWith(yTexts);
	});
});
