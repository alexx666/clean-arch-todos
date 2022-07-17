export interface Config {
	apiUrl: string;
}

export const config: Config = {
	apiUrl: String(process.env.API_URL),
}
