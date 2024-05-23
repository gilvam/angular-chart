import { ChartCoordinates } from '@shared/_model/chart-coordinates.model';

describe('ChartCoordinates', () => {
	it('should be create default', () => {
		const response = new ChartCoordinates(10, 20);

		expect(response.x).toEqual(10);
		expect(response.y).toEqual(20);
		expect(response.angleStart).toEqual(0);
		expect(response.angleEnd).toEqual(0);
		expect(response.xInPercentage).toEqual('10%');
		expect(response.yInPercentage).toEqual('20%');
	});

	it('should be setAngle', () => {
		const response = new ChartCoordinates(10, 20);

		response.setAngle(50, 100);

		expect(response.angleStart).toEqual(50);
		expect(response.angleEnd).toEqual(100);
	});

	it('should be calc', () => {
		const response = new ChartCoordinates(10, 20).setAngle(100, 200);
		response.setAngle(100, 100);

		response.calc(10, 20, 30, 40, 60);

		expect(response.x).toEqual(5);
		expect(response.y).toEqual(27.5);
	});

	it('should be degreesToRadians', () => {
		const response = new ChartCoordinates(10, 20).setAngle(100, 200);

		response.degreesToRadians(100);

		expect(response.x).toEqual(10);
	});

	it('should be polarToCartesian', () => {
		const response = new ChartCoordinates(10, 20).setAngle(100, 20);

		const coordinates = response.polarToCartesian(10, 25);

		expect(coordinates.x | 0).toBeCloseTo(17);
		expect(coordinates.y | 0).toBeCloseTo(27);
	});

	it('should be setX', () => {
		const response = new ChartCoordinates(10, 20);

		response.setX(100);

		expect(response.x).toEqual(100);
	});

	it('should be setY', () => {
		const response = new ChartCoordinates(10, 20);

		response.setY(100);

		expect(response.y).toEqual(100);
	});
});
