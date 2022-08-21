import { getJestProjects } from '@nrwl/jest';

export default {
	projects: [
		...getJestProjects(),
		"<rootDir>/libs/todos/jest.config.js",
		"<rootDir>/apps/cli/jest.config.js",
		"<rootDir>/apps/api/jest.config.js"],
	reporters: [
		"default"
	]
};
