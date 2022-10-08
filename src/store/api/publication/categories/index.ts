import { ApiService } from "../../../../data/service/Api.Service";
import { AxiosError } from "axios";
import { Category } from "../../../../data/@types/category";

export const GetCategory =
	async () => {
		try {
			const res =
				await ApiService.get(
					"category",
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

export const CategoryCreate =
	async (body: Category) => {
		try {
			const res =
				await ApiService.post("category", body);
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
