import { CurrencyUtil } from '@util/currency.util';

describe('Currency Util', () => {
	it('should return with a thousand separator every three digits and no decimal places.\n', () => {
		expect(CurrencyUtil.pointAndComma(-100)).toEqual('-100');
		expect(CurrencyUtil.pointAndComma(-100.1)).toEqual('-100');
		expect(CurrencyUtil.pointAndComma(1213)).toEqual('1.213');
		expect(CurrencyUtil.pointAndComma(1213.23)).toEqual('1.213');
		expect(CurrencyUtil.pointAndComma(101112131415.16)).toEqual('101.112.131.415');
		expect(CurrencyUtil.pointAndComma(0)).toEqual('0');
		expect(CurrencyUtil.pointAndComma('0.0')).toEqual('0');
		expect(CurrencyUtil.pointAndComma(0.5)).toEqual('0');
		expect(CurrencyUtil.pointAndComma('10.9')).toEqual('10');
		expect(CurrencyUtil.pointAndComma(99.9)).toEqual('99');
		expect(CurrencyUtil.pointAndComma(null as any)).toEqual('-');
		expect(CurrencyUtil.pointAndComma(undefined as any)).toEqual('-');
	});

	it('should return with a period for every thousand, a comma in the decimal place, and only one decimal', () => {
		expect(CurrencyUtil.pointAndComma(-100, 1)).toEqual('-100');
		expect(CurrencyUtil.pointAndComma(-100.1, 1)).toEqual('-100,1');
		expect(CurrencyUtil.pointAndComma(1213, 1)).toEqual('1.213');
		expect(CurrencyUtil.pointAndComma(1213.23, 1)).toEqual('1.213,2');
		expect(CurrencyUtil.pointAndComma(101112131415.16, 1)).toEqual('101.112.131.415,1');
		expect(CurrencyUtil.pointAndComma(0, 1)).toEqual('0');
		expect(CurrencyUtil.pointAndComma('0.0', 1)).toEqual('0');
		expect(CurrencyUtil.pointAndComma(0.5, 1)).toEqual('0,5');
		expect(CurrencyUtil.pointAndComma('10.9', 1)).toEqual('10,9');
		expect(CurrencyUtil.pointAndComma(99.9, 1)).toEqual('99,9');
		expect(CurrencyUtil.pointAndComma(null as any, 1)).toEqual('-');
		expect(CurrencyUtil.pointAndComma(undefined as any, 1)).toEqual('-');
	});

	it('should return with commas every thousand and a period for the decimal, with only one decimal', () => {
		expect(CurrencyUtil.commaAndPoint(-100, 1)).toEqual('-100');
		expect(CurrencyUtil.commaAndPoint(-100.1, 1)).toEqual('-100.1');
		expect(CurrencyUtil.commaAndPoint(1213, 1)).toEqual('1,213');
		expect(CurrencyUtil.commaAndPoint(1213.23, 1)).toEqual('1,213.2');
		expect(CurrencyUtil.commaAndPoint(101112131415.16, 1)).toEqual('101,112,131,415.1');
		expect(CurrencyUtil.commaAndPoint(0, 1)).toEqual('0');
		expect(CurrencyUtil.commaAndPoint('0.0', 1)).toEqual('0');
		expect(CurrencyUtil.commaAndPoint(0.5, 1)).toEqual('0.5');
		expect(CurrencyUtil.commaAndPoint('10.9', 1)).toEqual('10.9');
		expect(CurrencyUtil.commaAndPoint(99.9, 1)).toEqual('99.9');
		expect(CurrencyUtil.commaAndPoint(null as any, 1)).toEqual('-');
		expect(CurrencyUtil.commaAndPoint(undefined as any, 1)).toEqual('-');
	});
});
