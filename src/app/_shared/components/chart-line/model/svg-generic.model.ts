export class SvgGeneric {
	protected readonly fontSize = 8.67;
	protected readonly fontHeight = 4;

	protected yNormalize(y: number, yLabels: number[], height: number, gap: number): number {
		const [minY, maxY] = [Math.min(...yLabels), Math.max(...yLabels)];
		const normalizedY = (y - minY) / (maxY - minY);
		const adjustedHeight = height - gap / 2;
		return adjustedHeight - normalizedY * (adjustedHeight - 2 * gap) - gap;
	}
}
