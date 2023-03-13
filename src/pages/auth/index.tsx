/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
				minHeight: '100vh',
				backgroundColor: "#f9fafc"

			}}
		>
			<HeadComponent title="Login" />
			{/* <CssBaseline /> */}

			<Grid
				container
				xs={12}
				component={Paper}
				square
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Grid
					item
					xs={12}
					sm={12}
					md={6}
					display={'flex'}
					alignItems={'center'}
					flexDirection={'column'}
					justifyContent={'space-between'}

				>

					<Grid
						component={Box}
						xs={11}
						sm={11}
						md={9}
						mb={3}
						width={'100%'}
					>
						<Typography
							component="h1"
							variant="h4"
							color={"#121828"}
						>
							Bem-vindo

						</Typography>

						<Typography
							color="textSecondary"
							gutterBottom
							variant="body2"
							mt={2}
						>
							Faça entre na plataforma interna
						</Typography>
					</Grid>

					<Grid
						xs={11}
						sm={11}
						md={9}
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
							<Grid item>
								{/* <Link
									href="/register"
									variant="body2"
								>
									{
										"Inscrever-se"
									}
								</Link> */}
							</Grid>
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
							Log In{" "}
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
					</Grid>
				</Grid>
				<Grid
					xs={12}
					sm={12}
					md={6}
					sx={{
						height: "100%",
						alignItems: 'center',
						background: 'radial-gradient(50% 50% at 50% 50%, rgb(18, 38, 71) 0%, rgb(9, 14, 35) 100%)',
						display: 'flex',
						justifyContent: 'center'
					}}

				>
					<img src="/static/svg/illustration.svg" />

				</Grid>
			</Grid>
		</Grid>
	);
};

export default Auth;
