import Head from "next/head";
import NextLink from "next/link";
import {
	Box,
	Button,
	Container,
	Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeadComponent from "../components/Head";

const NotFound = () => (
	<>
		<HeadComponent title="404" />
		<Box
			component="main"
			sx={{
				alignItems: "center",
				display: "flex",
				flexGrow: 1,
				minHeight: "100%",
			}}
		>
			<Container maxWidth="md">
				<Box
					sx={{
						alignItems:
							"center",
						display: "flex",
						flexDirection:
							"column",
					}}
				>
					<Typography
						align="center"
						color="textPrimary"
						variant="h2"
					>
						404: A página
						que você está
						procurando não
						está aqui
					</Typography>
					<Typography
						align="center"
						color="textPrimary"
						variant="subtitle2"
					>
						Ou você tentou
						alguma rota
						obscura ou veio
						aqui por engano.
						Seja qual for,
						tente usar a
						navegação
					</Typography>
					<Box
						sx={{
							textAlign:
								"center",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Under development"
							src="/static/images/undraw_page_not_found_su7k.svg"
							style={{
								marginTop: 50,
								display:
									"inline-block",
								maxWidth:
									"100%",
								width: 560,
							}}
						/>
					</Box>
					<NextLink
						href="/"
						passHref
					>
						<Button
							component="a"
							startIcon={
								<ArrowBackIcon fontSize="small" />
							}
							sx={{
								mt: 3,
							}}
							variant="contained"
						>
							Go back to
							dashboard
						</Button>
					</NextLink>
				</Box>
			</Container>
		</Box>
	</>
);

export default NotFound;
