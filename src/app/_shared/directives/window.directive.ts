import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class WindowService {
	constructor(@Inject(PLATFORM_ID) private platformId: object) {
		console.log('this.platformId', this.platformId);
	}

	get window(): Window {
		if (isPlatformBrowser(this.platformId)) {
			return window;
		}
		return new Window();
	}
}
