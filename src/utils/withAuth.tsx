import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import {
	ElementType,
	useEffect,
} from "react";

export const withAuth = (
	WrappedComponent: ElementType,
) => {
	const Wrapper = (
		props: unknown,
	) => {
		const router = useRouter();

		useEffect(() => {
			const {
				["rica-adm.token"]:
					token,
			} = parseCookies();

			if (!token) {
				router.replace("/auth");
			}
		}, [router]);

		return (
			<WrappedComponent
				{...(props as any)}
			/>
		);
	};

	return Wrapper;
};
