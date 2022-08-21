import { getJestProjects } from '@nrwl/jest';

export default {
	projects: [
		...getJestProjects(),
		"<rootDir>/packages/*/jest.config.js"
	],
	reporters: [
		"default"
	]
};
