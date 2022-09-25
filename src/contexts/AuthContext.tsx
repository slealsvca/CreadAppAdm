import {
	createContext,
	useEffect,
	useState,
} from "react";
import { ApiService } from "../data/service/Api.Service";
import axios, { AxiosError } from "axios";
import Router from "next/router";
import {
	setCookie,
	parseCookies,
} from "nookies";

import {
	AuthContextType,
	User,
	SignInData,
} from "./utils";

export const AuthContext =
	createContext(
		{} as AuthContextType,
	);

export function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] =
		useState<User | null>(null);
	const isAuthenticated = !!user;
	const cookies = parseCookies();
	const [userName, setUserName] =
		useState<string>(
			cookies.userName || "",
		);

	async function SignIn(
		signInData: SignInData,
	) {
		//fazer esperar 10 segundos para simular o loading
		//await new Promise(resolve => setTimeout(resolve, 100000))
		try {
			const user = await axios.post(
				`${process.env.API_APP_URL}/login`,
				signInData,
			)

			if (user.status === 200) {
				user.data &&
					setUser(
						user.data?.token,
					);
				setCookie(
					undefined,
					"interfin-token",
					user.data?.access_token,
					{
						maxAge:
							30 *
							24 *
							60 *
							60, // 30 days
					},
				);

				setCookie(
					undefined,
					"interfin-user",
					JSON.stringify(
						user.data?.user,
					),
					{
						maxAge:
							30 *
							24 *
							60 *
							60, // 30 days
					},
				);

				setCookie(
					undefined,
					"interfin-id",
					JSON.stringify(
						user.data?.id,
					),
					{
						maxAge:
							30 *
							24 *
							60 *
							60, // 30 days
					},
				);

				ApiService.defaults.headers.common[
					"Authorization"
				] = `Bearer ${user.data?.token}`;
				
				return user
			}

		} catch (error) {
			if (
				error instanceof
				AxiosError
			) {
				return error.response?.data;
			}
			return "Something went wrong";

		}
		// } catch (error) {
		// 	if (
		// 		error instanceof
		// 		AxiosError
		// 	) {
		// 		return error.response
		// 			?.data?.message;
		// 	}
		// 	return "Something went wrong";
		// }
		// const { data, status } =
		// 	await ApiService.post(
		// 		"/login",
		// 		signInData,
		// 	);

		// if (status === 400) {
		// 	return data.message;
		// }

		// if (status === 200) {
		// 	data &&
		// 		setUser(
		// 			data?.token,
		// 		);
		// 	setCookie(
		// 		undefined,
		// 		"rica-adm.token",
		// 		data?.token,
		// 		{
		// 			maxAge:
		// 				30 *
		// 				24 *
		// 				60 *
		// 				60, // 30 days
		// 		},
		// 	);

		// 	setCookie(
		// 		undefined,
		// 		"rica-adm.user",
		// 		JSON.stringify(
		// 			data?.user,
		// 		),
		// 		{
		// 			maxAge:
		// 				30 *
		// 				24 *
		// 				60 *
		// 				60, // 30 days
		// 		},
		// 	);

		// 	setCookie(
		// 		undefined,
		// 		"rica-adm.id",
		// 		JSON.stringify(
		// 			data?.user?.id,
		// 		),
		// 		{
		// 			maxAge:
		// 				30 *
		// 				24 *
		// 				60 *
		// 				60, // 30 days
		// 		},
		// 	);

		// 	ApiService.defaults.headers.common[
		// 		"Authorization"
		// 	] = `Bearer ${data?.token}`;
		// 	Router.push("/");
		//}

	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				SignIn,
				userName,
				setUserName,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
