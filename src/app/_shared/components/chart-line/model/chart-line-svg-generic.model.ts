export class ChartLineSvgGeneric {
	protected yNormalize(y: number, yTexts: number[], height: number, gap: number): number {
		const [minY, maxY] = [Math.min(...yTexts), Math.max(...yTexts)];
		const normalizedY = (y - minY) / (maxY - minY);
		const adjustedHeight = height - gap / 2;
		return adjustedHeight - normalizedY * (adjustedHeight - 2 * gap) - gap;
	}
}
