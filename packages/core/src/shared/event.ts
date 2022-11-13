/**
 * An arbitrary Domain Object
 */
export interface Entity {
	/**
	 * Unique identifier
	 */
	id: string;
	[key: string]: any; // TODO: review if required
}

/**
 * A generic event event definition
 */
export interface DomainEvent<T extends Entity> {
	type: string;
	/**
	 * Event detail parameters
	 */
	details: T;
	/**
	 * Time of event creation in miliseconds
	 */
	timestamp: number;
	/**
	 * A reference to the aggregate object to which the event relates
	 */
	stream: string;
}

/**
 * Short alias for {@link DomainEvent}
 */
export type Event = DomainEvent<Entity>;

/**
 * An array of {@link Event} objects
 */
export class Events extends Array<Event> {
	constructor(...items: Event[]) {
		super(...items);
	}

	/**
	 * Groups all events in the array by the UUID held by the {@link Entity} details
	 * @returns an object of where each key is the unique Id of the {@link Entity} details
	 * and the value is an array of all {@link Event} objects related to it
	 */
	public groupById() {
		return this.reduce((rv: { [key: string]: Events }, x: Event) => {
			(rv[x.details.id] = rv[x.details.id] || []).push(x);
			return rv;
		}, {});
	}
}
