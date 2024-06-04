export class CurrencyUtil {
	private static formatNumber(value: number | string, locale: string, float: number): string {
		if (value === undefined || value === null) {
			return '-';
		}

		let val = Number(value);
		const [partInteger, partDecimal] = val
			.toString()
			.split('.')
			.map((it) => Number(it));

		if (!float) {
			val = partInteger;
		}

		if (float && !partDecimal) {
			float = 0;
		}

		if (float && partDecimal) {
			val = Number(`${partInteger}.${String(partDecimal).substring(0, float)}`);
		}

		return val.toLocaleString(locale, {
			style: 'decimal',
			minimumFractionDigits: float,
			maximumFractionDigits: float,
		});
	}

	static pointAndComma(value: number | string, float = 0): string {
		return this.formatNumber(value, 'pt-BR', float);
	}

	static commaAndPoint(value: number | string, float = 0): string {
		return this.formatNumber(value, 'en-US', float);
	}
}
