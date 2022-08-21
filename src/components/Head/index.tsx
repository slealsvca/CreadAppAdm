import Head from "next/head";

const HeadComponent = ({
	title,
}: {
	title: string;
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>
	);
};

export default HeadComponent;
