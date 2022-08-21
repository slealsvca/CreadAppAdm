import { AxiosError } from "axios";
import { userType } from "../../../../data/@types/user";
import { ApiService } from "../../../../data/service/Api.Service";

export const getUser = async (
	id: string,
) => {
	try {
		const response =
			await ApiService.get(
				`/users/${id}`,
			);
		return response;
	} catch (error) {
		if (
			error instanceof AxiosError
		) {
			return error.response?.data
				?.message;
		}
	}
};
