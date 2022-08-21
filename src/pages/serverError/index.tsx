import Head from "next/head";
import NextLink from "next/link";
import {
	Box,
	Button,
	Container,
	Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeadComponent from "../../components/Head";

const NotFound = () => (
	<>
		<HeadComponent title="500" />
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
					<Box
						sx={{
							textAlign:
								"center",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Under development"
							src="/static/images/500Internal.svg"
							style={{
								marginTop: 20,
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
								mb: 4,
							}}
							variant="contained"
						>
							Voltar para
							o início
						</Button>
					</NextLink>
				</Box>
			</Container>
		</Box>
	</>
);

export default NotFound;
