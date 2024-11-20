import { inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Native {
	test: number;
	value: number;
}

interface NativeType {
	native: Native;
}

export interface WindowNative extends Window, NativeType {}

const native: NativeType = { native: { test: 1, value: 10 } };

export const WINDOW_NATIVE = new InjectionToken<WindowNative>('window', {
	providedIn: 'root',
	factory: () => {
		const window = inject(DOCUMENT).defaultView as Window;
		Object.assign(window, native);

		return window as WindowNative;
	}
});
