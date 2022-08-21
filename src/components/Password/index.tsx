import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { OutlinedInput } from "@mui/material";

export default function Password(
	props: any,
) {
	const {
		fullWidth,
		label,
		register,
		error,
		helperText,
	} = props;

	const [
		showPassword,
		setShowPassword,
	] = React.useState(false);
	const handleClickShowPassword =
		() => {
			setShowPassword(
				!showPassword,
			);
		};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<FormControl
			fullWidth={fullWidth}
		>
			<InputLabel htmlFor="outlined-adornment-password">
				{label}
			</InputLabel>
			<OutlinedInput
				id="outlined-adornment-password"
				type={
					showPassword
						? "text"
						: "password"
				}
				{...register}
				error={error}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={() =>
								handleClickShowPassword()
							}
							onMouseDown={event =>
								handleMouseDownPassword(
									event,
								)
							}
							edge="end"
						>
							{showPassword ? (
								<VisibilityIcon />
							) : (
								<VisibilityOffIcon />
							)}
						</IconButton>
					</InputAdornment>
				}
				label={label}
			/>
			<FormHelperText
				error={error}
			>
				{helperText}
			</FormHelperText>
		</FormControl>
	);
}
