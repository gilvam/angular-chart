import { SvgText } from './svg-text.model';

describe('SvgText', () => {
	it('should be create default', () => {
		const test = new SvgText();

		expect(test.x).toEqual(0);
		expect(test.y).toEqual(0);
		expect(test.textAnchor).toEqual('start');
		expect(test.description).toEqual('');
	});

	it('should be description in lowerCase', () => {
		const test = new SvgText(1, 2, 'DESC');

		expect(test.descriptionLowerCase).toEqual('desc');
	});
});
