import * as React from "react";
import Snackbar, {
	SnackbarOrigin,
} from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export interface State
	extends SnackbarOrigin {
	open: boolean;
	text: string;
	type: string;
	close: (open: boolean) => void;
}

export const Alerts: React.FC<
	State
> = ({
	horizontal,
	vertical,
	text,
	open,
	type,
	close,
}) => {
	React.useEffect(() => {
		if (open) {
			setTimeout(() => {
				close(false);
			}, 2000);
		}
	}, [close, open]);

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical,
					horizontal,
				}}
				open={open}
				autoHideDuration={6000}
				// onClose={handleClose}
				key={
					vertical +
					horizontal
				}
				sx={{
					transform:
						"translateY(71px) !important",
				}}
			>
				<Alert
					// onClose={handleClose}
					variant="filled"
					sx={{
						backgroundColor:
							type ===
							"success"
								? "#0a9227"
								: "red",
						color: "#f5f0f0",
						width: "100%",
					}}
					//severity={type === 'primary' ? 'primary' : 'error'}
				>
					{text}
				</Alert>
			</Snackbar>
		</div>
	);
};
