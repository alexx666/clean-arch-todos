export interface IdentityProvider {
	getIdentity(...args: any[]): string;
}
