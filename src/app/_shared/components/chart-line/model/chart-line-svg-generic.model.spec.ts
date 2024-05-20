import { ChartLineSvgGeneric } from './chart-line-svg-generic.model';

describe('ChartLineSvgGeneric', () => {
	it('should be has a yNormalize', () => {
		const test = new ChartLineSvgGeneric();
		const responseYNormalize = 740;

		const response = (test as any).yNormalize(4, [10, 20], 500, 20);

		expect(response).toEqual(responseYNormalize);
	});
});
