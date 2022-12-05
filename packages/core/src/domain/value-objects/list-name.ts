/**
 * Object which holds the string value of a lists name
 * and enforces the value to have at least 2 characters.
 */
export default class Name {
	private constructor(private name: string) { }

	/**
	 * String representation of the list name
	 */
	public get value(): string {
		return this.name;
	}

	/**
	 *
	 * @param name string value representing the name
	 * @returns an instance of {@link Name}
	 */
	public static create(name: string): Name {
		if (name === null || name === undefined)
			throw new Error("Name must have a value!");
		if (typeof name !== "string")
			throw new Error("Name must be a string value");
		if (name.length < 2)
			throw new Error("Name must have at least 2 characters");

		return new Name(name);
	}
}
