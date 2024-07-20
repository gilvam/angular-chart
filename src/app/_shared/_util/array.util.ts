export class ArrayUtil {
	private static roundNearDecimalBase(value: number): number {
		if (!value) {
			return 0;
		}
		const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
		return Math.ceil(value / magnitude) * magnitude;
	}

	private static hasLessThan50PercentZeros(value: number): boolean {
		const valueStr = value.toString();
		return valueStr.split('0').length - 1 < valueStr.length / 2;
	}

	static scaled(values: unknown[] | unknown[][], max = 4): number[] {
		const maxValue = Math.max(...values.flat().map((it) => Number(it)));
		const maxValueScaled = ArrayUtil.roundNearDecimalBase(maxValue);
		const step = maxValueScaled / (max - 1);
		return Array.from({ length: max }, (_, i) => Math.round(step * i)).reverse();
	}
}
