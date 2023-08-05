import { routes } from '$lib/routes.js';

export async function load({ url }) {
	const routeIndex = routes.findIndex((route) => route.path === url.pathname);

	return {
		url,
		nextPage: 0 === routeIndex ? routes[routes.length - 1] : routes[routeIndex - 1],
		beforePage: routes.length - 1 === routeIndex ? routes[0] : routes[routeIndex + 1]
	};
}
