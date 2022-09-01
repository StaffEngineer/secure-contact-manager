export const SERVER_URL = `${import.meta.env.VITE_SERVER}/api/v1`

export function api(method: string, resource: string, data?: Record<string, unknown>) {
	return fetch(`${SERVER_URL}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}
