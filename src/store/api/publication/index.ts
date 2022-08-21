import { AxiosError } from "axios";
import { PublicationType } from "../../../data/@types/publication";
import { ApiService } from "../../../data/service/Api.Service";

export const createPublication = async (
	obj: PublicationType,
) => {
	//await new Promise(resolve => setTimeout(resolve, 10000));
	let {
		title,
		resume,
		user_id,
		category_id,
		file,
	} = obj;
	const body = {
		title,
		resume,
		user_id: parseInt(
			user_id as string,
		),
		category_id: parseInt(
			category_id,
		),
	};

	try {
		const response =
			await ApiService.post(
				"/articles",
				body,
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
