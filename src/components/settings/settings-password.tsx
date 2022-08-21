import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SchemaUpdatedPassword, InitialValuesUpdatedPassword } from "../../utils/validation/utilsPassWord";
import Password from "../Password";
import { updatedPassword } from "../../store/api/user/updatedUser";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Alerts } from "../Alert";

type modalProps = {
	open: boolean;
	alertText?: string;
	alertType?: "success" | "error";

}

export const SettingsPassword = () => {
	const { ["rica-adm.id"]: id } = parseCookies();
	const [open, setOpen] = useState<modalProps>({
		open: false,
		alertText: "",
		alertType: "success",
	});

	const {
		handleSubmit,
		reset,
		register,
		formState: {
			errors,
		},
	} = useForm({
		resolver: yupResolver(
			SchemaUpdatedPassword,
		),
		defaultValues: InitialValuesUpdatedPassword,
	});

	const onSubmit = async (data: any) => {
		const { password } = data;
		const res = await updatedPassword(parseInt(id), password);
	
		if (res?.status === 204) {
			setOpen({
				open: true,
				alertText: "Senha atualizada com sucesso",
				alertType: "success",
			});
			reset();
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
					subheader="Atualize sua senha"
					title="Senha"
				/>
				<Divider />
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 3,
					}}
				>
					<Password
						register={register(
							"password",
						)}
						fullWidth
						size="small"
						label="Senha"
						margin="normal"
						type="password"
						variant="outlined"
						error={Boolean(errors.password)}
						helperText={errors.password?.message}
					/>
					<Password
						fullWidth
						size="small"
						label="Confirmar senha"
						margin="normal"
						register={register(
							"password_confirmation",
						)}
						error={Boolean(errors.password_confirmation)}
						helperText={errors.password_confirmation?.message}
						type="password"
						variant="outlined"
					/>
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
						Atualizar
					</Button>
				</Box>
			</Card>
		</form>
	);
};
