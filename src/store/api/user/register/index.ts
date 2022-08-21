import { AxiosError } from "axios";
import { userType } from "../../../../data/@types/user";
import { ApiService } from "../../../../data/service/Api.Service";

export const createUser = async (
	obj: userType,
) => {
	try {
		const response =
			await ApiService.post(
				"/users",
				obj,
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
