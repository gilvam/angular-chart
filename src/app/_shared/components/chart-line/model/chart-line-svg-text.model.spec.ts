import { ChartLineSvgText } from './chart-line-svg-text.model';

describe('ChartLineSvgText', () => {
	it('should be create default', () => {
		const test = new ChartLineSvgText();

		expect(test.x).toEqual(0);
		expect(test.y).toEqual(0);
		expect(test.textAnchor).toEqual('start');
		expect(test.description).toEqual('');
	});

	it('should be description in lowerCase', () => {
		const test = new ChartLineSvgText(1, 2, 'DESC');

		expect(test.descriptionLowerCase).toEqual('desc');
	});
});
