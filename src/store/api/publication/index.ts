import { AxiosError } from "axios";
import { PublicationType } from "../../../data/@types/publication";
import { ApiService } from "../../../data/service/Api.Service";

export const createPublication = async (
	obj: PublicationType,
	user_id: string,
) => {
	//await new Promise(resolve => setTimeout(resolve, 10000));
	try {
		const response =
			await ApiService.post(
				"/publication",
				{
					...obj,
					user_id: user_id && JSON.parse(user_id),
					image_url: "ttsefdfdsfd",
				},
			);
		return response;

	} catch (error) {
		if (
			error instanceof AxiosError
		) {
			return error.response?.data
				?.message;
		}
		return "Something went wrong";
	}
};

export const updatedFile = async (
	Id: string,
	file: [File],
) => {
	const formData = new FormData();
	formData.append(
		"document",
		file[0],
	);
	try {
		const response =
			await ApiService.patch(
				`/articles/document/${Id}`,
				formData,
			);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getAllPublications = async () => {
	try {
		return await ApiService.get("/publication");
	} catch (error) {
		if (
			error instanceof AxiosError
		) {
			return error.response?.data
				?.message;
		}
		return "Something went wrong";
	}
}
