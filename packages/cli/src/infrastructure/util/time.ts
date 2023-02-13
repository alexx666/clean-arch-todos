export class Time {

	public static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

}
