import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 300,
	bgcolor: "background.paper",
	borderRadius: "5px",
	p: 1,
	justifyContent: "space-around",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};
type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: any) => void;
	initialValues?: any;
	title?: string;
	subTitle?: string;
	children?: React.ReactNode;
};

export const ModalConfirm = ({
	open,
	onClose,
	onSubmit,
	initialValues,
	title,
	children,
	subTitle,
}: Props) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						color="textSecondary"
					>
						{title}
					</Typography>
					<Box
						justifyContent="center"
						alignItems="center"
						display="flex"
					>
						<CheckCircleIcon
							sx={{
								fontSize: 100,
							}}
							color="primary"
						/>
					</Box>

					<Typography
						variant="h6"
						component="h2"
						color="textSecondary"
						textAlign={
							"center"
						}
					>
						{subTitle}
					</Typography>
					<Box
						justifyContent="center"
						alignItems="center"
						display="flex"
					>
						<Button
							color="primary"
							variant="contained"
							onClick={
								onSubmit
							}
							sx={{
								mb: 2,
							}}
						>
							Confirmar
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};
