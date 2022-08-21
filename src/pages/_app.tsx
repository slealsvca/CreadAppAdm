import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { AuthProvider } from "../contexts/AuthContext";
import { parseCookies } from "nookies";
import HeadComponent from "../components/Head";
import { GetServerSideProps } from "next";
const clientSideEmotionCache =
	createEmotionCache();

const App = (props: any) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const getLayout =
		Component.getLayout ??
		((page: any) => page);

	return (
		<CacheProvider
			value={emotionCache}
		>
			<HeadComponent title="App" />
			<ThemeProvider
				theme={theme}
			>
				<AuthProvider>
					<CssBaseline />
					{getLayout(
						<Component
							{...pageProps}
						/>,
					)}
				</AuthProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default App;

export const getServerSideProps: GetServerSideProps =
	async ctx => {
		const {
			["rica-adm.token"]: token,
		} = parseCookies(ctx);

		if (!token) {
			return {
				redirect: {
					destination:
						"/auth",
					permanent: false,
				},
			};
		}
		return {
			props: {},
		};
	};
