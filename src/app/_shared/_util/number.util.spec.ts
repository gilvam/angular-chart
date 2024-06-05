import { NumberUtil } from '@util/number.util';

describe('NumberUtil', () => {
	it('should return', () => {
		expect(NumberUtil.simplify('0')).toEqual('0');
		expect(NumberUtil.simplify(0)).toEqual('0');
		expect(NumberUtil.simplify('5.0')).toEqual('5');
		expect(NumberUtil.simplify(5.0)).toEqual('5');
		expect(NumberUtil.simplify(5)).toEqual('5');
		expect(NumberUtil.simplify(999)).toEqual('999');
		expect(NumberUtil.simplify(1499)).toEqual('1.5 K');
		expect(NumberUtil.simplify(9999999)).toEqual('10 MM');
		expect(NumberUtil.simplify(16000000)).toEqual('16 MM');
		expect(NumberUtil.simplify(1600000)).toEqual('1.6 MM');
	});
});
