import { SvgCircle } from './svg-circle.model';

describe('SvgCircle', () => {
	it('should be create default', () => {
		const test = new SvgCircle();

		expect(test.dataX).toEqual('');
		expect(test.cx).toEqual(0);
		expect(test.cy).toEqual(0);
		expect(test.dataY).toEqual(0);
		expect(test.r).toEqual(6);
		expect(test.strokeWidth).toEqual(2);
		expect(test.color).toEqual('gray');
	});

	it('should be set and get correct values', () => {
		const test = new SvgCircle();

		test.setR(10);
		test.setColor('black');

		expect(test.r).toEqual(10);
		expect(test.color).toEqual('black');
	});
});
