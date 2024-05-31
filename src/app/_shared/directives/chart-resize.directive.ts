import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { debounceTime, Subject, take } from 'rxjs';

@Directive({
	selector: '[appChartResize]',
	standalone: true,
})
export class ChartResizeDirective implements AfterViewInit {
	@Output() resizeChanged = new EventEmitter<number>();
	@Input() resizeInitialWidth = 0;
	@Input() resizeEnable = false;

	private readonly WIDTH_GAP = 5;
	private readonly DEBOUNCE_TIME = 200;
	private previousWidth = 0;
	private emitFirst = new Subject<number>();
	private emitLast = new Subject<number>();

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		this.previousWidth = this.resizeInitialWidth || this.el.nativeElement.parentElement.offsetWidth;
		this.setupDebouncedStreamFirst();
		this.setupDebouncedStreamLast();
		this.init();
	}

	private setupDebouncedStreamLast() {
		this.emitLast.pipe(debounceTime(this.DEBOUNCE_TIME)).subscribe((width) => {
			this.setupDebouncedStreamFirst();
			this.resizeChanged.emit(width);
		});
	}

	private setupDebouncedStreamFirst() {
		this.emitFirst.pipe(take(1)).subscribe((width) => {
			this.resizeChanged.emit(width);
		});
	}

	private changeWidth(currentWidth: number): void {
		const widthDifference = Math.abs(this.previousWidth - currentWidth);
		const widthNoGap = currentWidth - this.WIDTH_GAP;
		const widthNew = widthNoGap < 0 ? 0 : widthNoGap;

		if (!currentWidth) {
			this.emitFirst.next(currentWidth);
			return;
		}

		if (widthDifference >= this.WIDTH_GAP) {
			this.emitLast.next(widthNew);
			this.previousWidth = currentWidth;
		}
	}

	private init() {
		if (!this.resizeEnable) {
			return;
		}
		const widthParent = this.el.nativeElement.parentElement.offsetWidth;
		this.changeWidth(0);
		this.changeWidth(widthParent);
	}

	@HostListener('window:resize')
	onWindowResize() {
		this.init();
	}
}
