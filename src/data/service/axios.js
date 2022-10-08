import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx) {
	const { "interfin-token": token } =
		parseCookies(ctx);

	const api = axios.create({
		baseURL:
			process.env.API_APP_URL,
	});

	if (token) {
		console.log(token)
		api.defaults.headers[
			"Authorization"
		] = `Bearer ${token}`;
	}

	api.interceptors.response.use(
		{
			status: function (
				response,
			) {
				return response;
			},
		},
		function (error) {
			switch (
				error.response.status
			) {
				case 401:
					window.location.href =
						"/auth";
					break;
				case 403:
					window.location.href =
						"/auth";
					break;
			}

			return Promise.reject(
				error,
			);
		},
	);

	return api;
}
