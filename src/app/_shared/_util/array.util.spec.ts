import { ArrayUtil } from '@util/array.util';

describe('ArrayUtil.roundToNearestDecimalBase', () => {
	it('should return 0 if value is falsy', () => {
		expect((ArrayUtil as any).roundNearDecimalBase(0)).toEqual(0);
		expect((ArrayUtil as any).roundNearDecimalBase(null)).toEqual(0);
	});

	it('should round value to the nearest decimal base', () => {
		expect((ArrayUtil as any).roundNearDecimalBase(123)).toEqual(200);
		expect((ArrayUtil as any).roundNearDecimalBase(5678)).toEqual(6000);
	});
});

describe('ArrayUtil.hasLessThan50PercentZeros', () => {
	it('should return true if the number has less than 50% zeros', () => {
		expect((ArrayUtil as any).hasLessThan50PercentZeros(123)).toBe(true);
	});

	it('should return false if the number has exactly 50% zeros', () => {
		expect((ArrayUtil as any).hasLessThan50PercentZeros(1002)).toBe(false);
	});

	it('should return false if the number has more than 50% zeros', () => {
		expect((ArrayUtil as any).hasLessThan50PercentZeros(5000)).toBe(false);
	});
});

describe('ArrayUtil', () => {
	it('should return', () => {
		expect(ArrayUtil.scaled([1934849, 66], 6)).toEqual([2000000, 1600000, 1200000, 800000, 400000, 0]);
		expect(ArrayUtil.scaled([493, 348, 102, 30, 0], 6)).toEqual([500, 400, 300, 200, 100, 0]);
		expect(ArrayUtil.scaled([923, 394, 99], 6)).toEqual([1000, 800, 600, 400, 200, 0]);
		expect(ArrayUtil.scaled([23433, 231, 102, 10], 6)).toEqual([30000, 24000, 18000, 12000, 6000, 0]);
		expect(ArrayUtil.scaled([83, 75, 40, 44, 42, 41], 6)).toEqual([90, 72, 54, 36, 18, 0]);

		expect(ArrayUtil.scaled([1934849, 66])).toEqual([2000000, 1333333, 666667, 0]);
		expect(ArrayUtil.scaled([493, 348, 102, 30, 0])).toEqual([500, 333, 167, 0]);
		expect(ArrayUtil.scaled([923, 394, 99])).toEqual([1000, 667, 333, 0]);
		expect(ArrayUtil.scaled([23433, 231, 102, 10])).toEqual([30000, 20000, 10000, 0]);
		expect(ArrayUtil.scaled([83, 75, 40, 44, 42, 41])).toEqual([90, 60, 30, 0]);
		expect(ArrayUtil.scaled([1934849, 66], 3)).toEqual([2000000, 1000000, 0]);

		expect(ArrayUtil.scaled([1934849, 66], 3)).toEqual([2000000, 1000000, 0]);
		expect(ArrayUtil.scaled([493, 348, 102, 30, 0], 3)).toEqual([500, 250, 0]);
		expect(ArrayUtil.scaled([923, 394, 99], 3)).toEqual([1000, 500, 0]);
		expect(ArrayUtil.scaled([23433, 231, 102, 10], 3)).toEqual([30000, 15000, 0]);
		expect(ArrayUtil.scaled([83, 75, 40, 44, 42, 41], 3)).toEqual([90, 45, 0]);

		expect(ArrayUtil.scaled([1934849, 66], 2)).toEqual([2000000, 0]);
		expect(ArrayUtil.scaled([493, 348, 102, 30, 0], 2)).toEqual([500, 0]);
		expect(ArrayUtil.scaled([923, 394, 99], 2)).toEqual([1000, 0]);
		expect(ArrayUtil.scaled([23433, 231, 102, 10], 2)).toEqual([30000, 0]);
		expect(ArrayUtil.scaled([83, 75, 40, 44, 42, 41], 2)).toEqual([90, 0]);
	});
});
