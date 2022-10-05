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

export const CategoryCreate =
	async (body: { title: '', image_url: '' }) => {
		try {
			const res =
				await ApiService.post("category", {
					name: "Choque",
					"image": "2.211083221.1576170408.1664742113-772955760.1664742113"
				});
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
