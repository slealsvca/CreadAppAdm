import { useRouter } from "next/router";
import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import {
	Schema,
	initialValues,
} from "../../data/validations/schemaRegisterUser";
import {
	Controller,
	useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HeadComponent from "../../components/Head";
import Password from "../../components/Password";
import { Link } from "../../components/Navigation/Link";
import { MaskCpf } from "../../utils/masks";
import { userType } from "../../data/@types/user";
import { createUser } from "../../store/api/user/register";
import { Loader } from "../../components/Loader";
import { ModalConfirm } from "../../components/Modal";
import { useState } from "react";

const Register = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: {
			errors,
			isSubmitting,
			touchedFields,
		},
		watch,
	} = useForm({
		mode: "all",
		resolver: yupResolver(Schema),
		defaultValues: initialValues,
	});

	const onSubmit = async (
		value: userType,
	) => {
		await new Promise(resolve => setTimeout(resolve, 1000))
		const res = await createUser(
			value,
		);

		res.status === 201 && setOpen(true);

	};

	return (
		<Box
			padding={
				"20px 100px 20px 100px"
			}
			height="100vw"
			display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{
				backgroundImage:
					"url(/static/images/figura/FUNDO.png)",
			}}
		>
			{isSubmitting && (
				<Loader
					loading={
						isSubmitting
					}
				/>
			)}

			<ModalConfirm
				open={open}
				onClose={() => setOpen(false)}
				onSubmit={() => router.push("/auth")}
				subTitle="Publicação cadastrada com sucesso"
			/>
			<form
				onSubmit={handleSubmit(
					onSubmit,
				)}
				style={{
					background:
						" #ffffff ",
					display: "flex",
					padding:
						"40px 20px 40px 20px",
					borderRadius:
						"10px",
					flexDirection:
						"column",
					height: "fit-content",
					alignItems:
						"center",
					justifyContent:
						"center",
					maxWidth: "810px",
				}}
			>
				<HeadComponent title="Cadastro" />
				<Box
					sx={{
						mb: 3,
						display: "flex",
						justifyContent:
							"center",
						gap: 3,
					}}
				>
					<Box
						sx={{
							textAlign:
								"center",
						}}
					>
						<Typography
							color="textPrimary"
							variant="h4"
						>
							Inscrever-se
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="body2"
							sx={{
								whiteSpace: 'nowrap',
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<Typography
								component="span"
								sx={{
									mr: 1,
									mt: 0.6,
									fontSize: "0.8rem",
								}}
							>
								Já tem uma conta?
							</Typography>
							<Link
								href="/auth"
								color="secondary"
							>
								Entrar
							</Link>
						</Typography>
					</Box>
				</Box>
				<Grid
					container
					spacing={2}
				>
					<Grid item xs={12}>
						<TextField
							error={
								errors.name &&
								touchedFields.name
							}
							fullWidth
							helperText={
								errors.name &&
								touchedFields.name &&
								errors
									.name
									.message
							}
							label="Nome"
							{...register(
								"name",
							)}
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={
								errors.email &&
								touchedFields.email
							}
							fullWidth
							helperText={
								errors.email &&
								touchedFields.email &&
								errors
									.email
									.message
							}
							label="E-mail"
							{...register(
								"email",
							)}
							variant="outlined"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<Controller
							render={({
								field: {
									onChange,
									value,
									ref,
								},
							}) => (
								<TextField
									value={MaskCpf(
										value,
									)}
									onChange={
										onChange
									}
									error={
										Boolean(errors.cpf)
									}
									fullWidth
									helperText={
										Boolean(errors.cpf) &&
										errors
											.cpf
											?.message
									}
									label="CPF"
									variant="outlined"
								/>
							)}
							name="cpf"
							control={
								control
							}
							defaultValue=""
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<TextField
							error={
								errors.username &&
								touchedFields.username
							}
							fullWidth
							helperText={
								errors.username &&
								touchedFields.username &&
								errors
									.username
									.message
							}
							label="Nome de usuário"
							{...register(
								"username",
							)}
							variant="outlined"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<TextField
							error={
								errors.titration &&
								touchedFields.titration
							}
							fullWidth
							helperText={
								errors.titration &&
								touchedFields.titration &&
								errors
									.titration
									.message
							}
							label="Titulação"
							{...register(
								"titration",
							)}
							variant="outlined"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<TextField
							error={
								errors.institute &&
								touchedFields.institute
							}
							fullWidth
							helperText={
								errors.institute &&
								touchedFields.institute &&
								errors
									.institute
									.message
							}
							label="Instituição"
							{...register(
								"institute",
							)}
							variant="outlined"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<Password
							error={
								errors.password &&
								touchedFields.password
							}
							fullWidth
							helperText={
								errors.password &&
								touchedFields.password &&
								errors
									.password
									.message
							}
							label="Senha"
							register={register(
								"password",
							)}
							variant="outlined"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
					>
						<Password
							fullWidth
							label={
								"Confirmar senha"
							}
							margin="normal"
							register={register(
								"confirmPassword",
							)}
							error={
								errors.confirmPassword
							}
							helperText={
								errors
									.confirmPassword
									?.message
							}
							type="password"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
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
								isSubmitting
							}
						>
							Registrar{" "}
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default Register;
