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
		const response = await SignIn(
			values,
		).finally(() =>
			setIsLoading(false),
		);

		response?.status === 200 && Router.push("/");
		
		response?.internalCode === "ML-000"
			&& setError("email", { type: 'custom', message: response?.message })
	};

	return (
		<Grid
			container
			component="main"
			sx={{
				minHeight: '99vh',
				backgroundColor: "#d3d3d3"
				// background:
				// 	'url("/static/img/bg3.jpg") center top / cover transparent',

			}}
		>
			<HeadComponent title="Login" />
			{/* <CssBaseline /> */}

			<Grid
				item
				xs={12}
				sm={12}
				md={12}
				component={Paper}
				elevation={6}
				square
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				sx={{
					backgroundImage: 'url(/static/img/bg3.jpg)',
				}}
			>
				<Grid
					xs={12}
					sm={12}
					md={6}
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection:
							"column",
						borderRadius: '10px',
						alignItems:
							"center",
						border: '1px solid #dbdad9',
						backgroundColor: 'white',
						padding: '40px',
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
						INTERFIN
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
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Auth;
