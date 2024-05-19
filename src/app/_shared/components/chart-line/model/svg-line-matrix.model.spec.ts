import { SvgLineMatrix } from './svg-line-matrix.model';
import { SvgCircleMatrix } from './svg-circle-matrix.model';
import { mockSvgCircles } from '@mock/tests/chart-line/svg-circle.mock';
import { mockSvgLines } from '@mock/tests/chart-line/svg-line.mock';

describe('SvgLineMatrix', () => {
	it('should be create default', () => {
		const test = new SvgLineMatrix(mockSvgLines);

		expect(test.matrix.length).toEqual(2);
		expect(test.matrix[0].length).toEqual(4);
		expect(test.matrix[1].length).toEqual(4);
	});

	it('should be calc line matrix correctly', () => {
		const test = new SvgLineMatrix(mockSvgLines);
		const response = test.calc(new SvgCircleMatrix(mockSvgCircles));

		expect(response.matrix[0][0].x1).toEqual(100);
		expect(response.matrix[0][0].y1).toEqual(100);
		expect(response.matrix[0][0].x2).toEqual(100);
		expect(response.matrix[0][0].y2).toEqual(100);
		expect(response.matrix[0][0].color).toEqual('blue');
		expect(response.matrix[0][0].strokeDasharray).toEqual(3);
		expect(response.matrix[0][0].strokeWidth).toEqual(2);
	});
});
