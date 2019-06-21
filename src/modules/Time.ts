function calculateElapsedTime(time: [number, number]): number {
	if (typeof window === 'undefined') {
		const hrtime = process.hrtime(time);
		return Math.floor(hrtime[0] * 1000 + hrtime[1] / 1000000);
	} else {
		return performance.now() - time[0];
	}
}

export class Time {
	private unit: [number, number] | null = null;
	private UTCTimestamp: number | null = null;

	constructor(setDefaultValue: boolean = true) {
		if (setDefaultValue) {
			this.reset();
		}
		return this;
	}

	public getDifference(time: Time | null): number | null {
		const a = time == null ? null : time.elapsedMs();
		const b = this.elapsedMs();
		if (a === null || b === null) {
			return null;
		}
		return a - b;
 	}

	public reset() {
		this.unit = (typeof window === 'undefined') ? process.hrtime() : [ performance.now(), 0 ];
		this.UTCTimestamp = Date.now();
	}

	public get(): Date | null {
		return (this.unit == null) ? null : new Date(Date.now() - calculateElapsedTime(this.unit));
	}

	public elapsedMs(): number | null {
		return (this.unit == null) ? null : calculateElapsedTime(this.unit);
	}

	public isNull(): boolean {
		return (this.unit == null);
	}

	public setNull(): void {
		this.unit = null;
	}

	public getUTC(): Date | null {
		return this.UTCTimestamp === null ? null : new Date(this.UTCTimestamp);
	}
}
