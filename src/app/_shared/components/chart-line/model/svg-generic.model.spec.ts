import { SvgGeneric } from './svg-generic.model';

describe('SvgGeneric', () => {
	it('should be has a yNormalize', () => {
		const test = new SvgGeneric();
		const responseYNormalize = 740;

		const response = (test as any).yNormalize(4, [10, 20], 500, 20);

		expect(response).toEqual(responseYNormalize);
	});
});
