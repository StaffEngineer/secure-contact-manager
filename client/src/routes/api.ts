/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/
export const SERVER_URL = 'http://localhost:3001/api/v1'

export function api(method: string, resource: string, data?: Record<string, unknown>) {
	return fetch(`${SERVER_URL}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}
