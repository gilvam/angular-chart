export class NumberUtil {
	static simplify(input: number | string): string {
		const num = Number(input);

		if (num === 0) {
			return '0';
		}

		const abbreviations = ['', 'K', 'MM', 'B', 'T'];
		const divisor = 1000;
		const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

		if (tier === 0) {
			return num.toString();
		}

		const suffix = abbreviations[tier];
		const scale = Math.pow(divisor, tier);
		const scaled = num / scale;
		let formatted = scaled.toFixed(1);

		if (formatted.endsWith('.0')) {
			formatted = formatted.slice(0, -2);
		}

		return `${formatted} ${suffix}`.trim();
	}
}
