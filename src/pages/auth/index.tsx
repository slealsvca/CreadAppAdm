// import { useRouter } from 'next/router';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Router from "next/router";
import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	CircularProgress,
	Container,
	CssBaseline,
	Grid,
	Link,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	useContext,
	useState,
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { schema } from "../../data/validations/schemaAuth";
import {
	initialValues,
	SignInData,
} from "../../utils/utilsAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HeadComponent from "../../components/Head";
//import { theme } from '../../theme';
import GoogleIcon from "@mui/icons-material/Google";
import Password from "../../components/Password";

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link
				color="inherit"
				href="*"
			>
				INTERFIN
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const Auth = () => {
	const { SignIn } = useContext(
		AuthContext,
	);

	const [isLoading, setIsLoading] =
		useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm({
		mode: "all",
		reValidateMode: "onSubmit",
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const onSubmit = async (
		values: SignInData,
	) => {
		setIsLoading(true);
		Router.push("/");
		// const response = await SignIn(
		// 	values,
		// ).finally(() =>
		// 	setIsLoading(false),
		// );
	};

	return (
		<Grid
			container
			component="main"
			sx={{ height: "100%" }}
		>
			<HeadComponent title="Login" />
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={12}
				md={7}
				sx={{
					backgroundImage:
						"url(/static/img/bg2.jpg)",
					color: "#ffffff",
					backgroundRepeat:
						"no-repeat",
					backgroundSize:
						"cover",
					backgroundPosition:
						"center",
					opacity: 0.9,
				}}
				component={Paper}
			>
				<Box
					component="main"
					sx={{
						alignItems:
							"center",
						display: "flex",
						flexGrow: 1,
						minHeight:
							"100%",
						flexDirection:
							"column",
						justifyContent:
							"center",
						gap: "4rem",
					}}
				>
					<Container maxWidth="sm">
						<Typography
							variant="h1"
							align="center"
							fontSize={
								40
							}
							sx={{
								fontWeight: 700,
							}}
							gutterBottom
						>
							{/* INTERFIN */}
							Interfin - Gestão e Negócios Ltda.
						</Typography>
						<Stack
							direction="row"
							spacing={2}
							alignItems="center"
							style={{
								width: "100%",
								display:
									"flex",
								justifyContent:
									"center",
							}}
						>
							<AvatarGroup
								max={5}
								spacing={
									2
								}
								total={
									25
								}
							>
								<Avatar
									alt="Cindy Baker"
									src="/static/images/avatars/avatar_3.png"
									sx={{
										width: 50,
										height: 50,
									}}
								/>
								<Avatar
									alt="Agnes Walker"
									src="/static/images/avatars/avatar_4.png"
									sx={{
										width: 50,
										height: 50,
									}}
								/>
								<Avatar
									alt="Trevor Henderson"
									src="/static/images/avatars/avatar_5.png"
									sx={{
										width: 50,
										height: 50,
									}}
								/>
								<Avatar
									alt="Trevor Henderson"
									src="/static/images/avatars/avatar_6.png"
									sx={{
										width: 50,
										height: 50,
									}}
								/>
							</AvatarGroup>
						</Stack>
					</Container>
				</Box>
			</Grid>
			<Grid
				item
				xs={12}
				sm={12}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection:
							"column",
						alignItems:
							"center",
					}}
				>
					<Avatar
						sx={{
							m: 1,
							bgcolor:
								"secondary.main",
						}}
					>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component="h1"
						variant="h5"
					>
						Sign in
					</Typography>

					<Typography
						color="textSecondary"
						gutterBottom
						variant="body2"
						align="center"
					>
						Faça login em
						sua conta
					</Typography>

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit(
							onSubmit,
						)}
						sx={{
							mt: 1,
							gap: "1.5rem",
							display: "flex",
							flexDirection: "column",
							width: "100%",
							height: "100%",
						}}
					>
						<TextField
							error={Boolean(
								errors
									?.email
									?.message,
							)}
							fullWidth
							helperText={
								errors
									?.email
									?.message
							}
							label="Email Address"
							margin="normal"
							{...register(
								"email",
							)}
							variant="outlined"
							autoComplete="email"
							focused={
								true
							}
						/>
						<Password
							register={register(
								"password",
							)}
							error={Boolean(
								errors
									?.password
									?.message,
							)}
							fullWidth
							helperText={
								errors
									?.password
									?.message
							}
							label="Password"
							margin="normal"
							{...register(
								"password",
							)}
							type="password"
							variant="outlined"
							autoComplete="current-password"
						/>
						<Grid
							container
							sx={{
								mt: 3,
							}}
						>
							<Grid
								item
								xs
							>
								<Link
									href="#"
									variant="body2"
								>
									Esqueceu
									a
									senha?
								</Link>
							</Grid>
							{/* <Grid item>
								<Link
									href="/register"
									variant="body2"
								>
									{
										"Inscrever-se"
									}
								</Link>
							</Grid> */}
						</Grid>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
							}}
							size="large"
							disabled={
								isLoading
							}
						>
							Sign In{" "}
							{isLoading && (
								<CircularProgress
									size={
										30
									}
									style={{
										position:
											"absolute",
									}}
								/>
							)}
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Auth;
