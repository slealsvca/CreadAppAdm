import { AxiosError } from "axios";
import {
	articleType,
	userArticleType,
} from "../../../data/@types/articles";
import { PublicationType } from "../../../data/@types/publication";
import { ApiService } from "../../../data/service/Api.Service";

export const getUsersArticles =
	async () => {
		try {
			const response =
				await ApiService.get(
					"/articles",
				);

			return (
				response.status ===
				200 &&
				response?.data
			);
		} catch (error) {
			return error;
		}
	};

export const getArticleById = async (
	id: string,
) => {
	try {
		const response =
			await ApiService.get(
				`/articles/${id}`,
			);

		return (
			response.status === 200 &&
			response?.data
		);
	} catch (error) {
		if (
			error instanceof AxiosError
		) {
			return error.response;
		}
	}
};

export const deleteArticle = async (
	id: string,
) => {
	try {
		const response =
			await ApiService.delete(
				`/articles/${id}`,
			);
		return response;
	} catch (error) {
		if (
			error instanceof AxiosError
		) {
			return error.response;
		}
	}
};

