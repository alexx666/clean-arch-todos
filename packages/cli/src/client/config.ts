export interface Config {
	apiUrl: string;
}

export const config: Config = {
	apiUrl: process.env.API_URL ?? "http://localhost:3000",
};
