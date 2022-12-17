import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from "@mui/material";
import {
	Controller,
	useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaskCpf } from "../../utils/masks";
import { userType } from "../../data/@types/user";
import { Loader } from "../Loader";
import {
	initialAccount,
	SchemaAccount,
	typeAccount,
} from "../../data/validations/schemaAccount";
import { updatedUser } from "../../store/api/user/updatedUser";
import { Alerts } from "../Alert";
import { parseCookies } from "nookies";

type FormData = {
	user: userType;
	loading: boolean;
};

type modalProps = {
	open: boolean;
	alertText?: string;
	alertType?: "success" | "error";

}

export const AccountProfileDetails = (
	props: FormData,
) => {
	const { user, loading } = props;
	const { "interfin-id": id } = parseCookies();
	const [open, setOpen] = useState<modalProps>({
		open: false,
		alertText: "",
		alertType: "success",
	});

	const {
		reset,
		handleSubmit,
		control,
		formState: {
			errors,
			touchedFields,
		},
	} = useForm({
		mode: "all",
		resolver: yupResolver(
			SchemaAccount,
		),
		defaultValues: initialAccount,
	});

	const onSubmit = async (
		value: typeAccount,
	) => {
		const res = await updatedUser(
			value,
			parseInt(JSON.parse(id)),
		);

		if (res?.status === 204) {
			setOpen({
				open: true,
				alertText: "Perfil atualizado com sucesso",
				alertType: "success",
			});
		}
	};

	const onError = (error: any) => {
		console.log(error);
	};

	useEffect(() => {
		user &&
			reset({
				name: user?.name,
				email: user?.email,
				cpf: user?.cpf,
			});
	}, [reset, user]);

	return (
		<form
			autoComplete="off"
			noValidate
			onSubmit={handleSubmit(
				onSubmit,
				onError,
			)}
		>
			<Loader loading={loading} />
			<Alerts
				open={open.open}
				text={open.alertText!}
				vertical="top"
				horizontal="right"
				type={open.alertType!}
				close={() => setOpen({ ...open, open: false })}
			/>
			<Card>
				<CardHeader
					subheader="As informações podem ser editadas"
					title="Perfil"
				/>
				<Divider />
				<CardContent>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							md={12}
							xs={12}
						>
							{" "}
							<Controller
								render={({
									field: {
										onChange,
										value,
									},
								}) => (
									<TextField
										value={
											value
										}
										size="small"
										onChange={
											onChange
										}
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
										variant="outlined"
									/>
								)}
								name="name"
								control={
									control
								}
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<Controller
								render={({
									field: {
										onChange,
										value,
									},
								}) => (
									<TextField
										value={MaskCpf(
											value,
										)}
										size="small"
										onChange={
											onChange
										}
										error={
											errors.cpf &&
											touchedFields.cpf
										}
										fullWidth
										helperText={
											errors.cpf &&
											touchedFields.cpf &&
											errors
												.cpf
												.message
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
							md={12}
							xs={12}
						>
							<Controller
								render={({
									field: {
										onChange,
										value,
									},
								}) => (
									<TextField
										value={
											value
										}
										size="small"
										onChange={
											onChange
										}
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
										label="Email"
										variant="outlined"
									/>
								)}
								name="email"
								control={
									control
								}
								defaultValue=""
							/>
						</Grid>

					</Grid>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: "flex",
						justifyContent:
							"flex-end",
						p: 2,
					}}
				>
					<Button
						color="primary"
						variant="contained"
						type="submit"
					>
						Salvar detalhes
					</Button>
				</Box>
			</Card>
		</form>
	);
};
