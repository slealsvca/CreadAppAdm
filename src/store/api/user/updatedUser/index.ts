import { AxiosError } from "axios";
import { userType } from "../../../../data/@types/user";
import { ApiService } from "../../../../data/service/Api.Service";
import { typeAccount } from "../../../../data/validations/schemaAccount";

export const updatedUser = async (
	obj: typeAccount,
	id: number,
) => {
	try {
		const response =
			await ApiService.put(
				`/user/updated/${id}`,
				{
					...obj,
					password: ""
				}

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

export const updatedPassword = async (
	id: number,
	passWord: string,
) => {
	try {
		const response =
			await ApiService.put(
				`/users/password/${id}`,
				{
					password: passWord,
				}
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
