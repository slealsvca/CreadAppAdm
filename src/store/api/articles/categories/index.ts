import { ApiService } from "../../../../data/service/Api.Service";
import { AxiosError } from "axios";

export const GetCategories =
	async () => {
		try {
			const res =
				await ApiService.get(
					"categories",
				);
			return res;
		} catch (error) {
			if (
				error instanceof
				AxiosError
			) {
				return error.response;
			}
		}
	};
