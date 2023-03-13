/* eslint-disable */
import {
	useEffect,
	useState,
} from "react";
import React from "react";
import {
	Box,
	Button,
	FormHelperText,
	Grid,
	Input,
	Typography,
} from "@mui/material";
import { uploadImage } from "../../store/images";

interface IProps {
	name?: string;
	nameComponent?: string;
	helperText?: string;
	error?: boolean;
	setValue: (value: string) => void;
	clearErrors: (name?: string) => void;
}



const DropZoneUpload = React.forwardRef<HTMLInputElement, IProps>((props) => {
	const { error, helperText, setValue, clearErrors, nameComponent } = props;

	const [name, setName] = useState("Arraste e solte um arquivo ou selecione um arquivo");

	const handleUpload = (file: File) => {
		uploadImage(file).then((response) => {
			if (response?.success) {

				const { data } = response;
				setName(data?.title);
				setValue(data?.url);
				clearErrors(nameComponent);

			}
		})
	}

	const handleClick = () => {
		const fileUpload = document.getElementById("fileUpload");
		fileUpload?.click();
	};

	return (
		<Grid>
			<Button
				type="button"
				onClick={handleClick}
				fullWidth
				variant="contained"
			>
				Selecionar arquivo
			</Button>

			<Box
				width={"95%"}
				bgcolor="background.paper"
				m={"0 auto"}
				p={2}
			>
				<Box
					mt={2}
					border={"4px dashed"}
					borderColor={props?.error ? "red" : "primary.main"}
					position={"relative"}
				>
					<Input
						id="fileUpload"
						type="file"
						inputProps={{ accept: "*" }}
						sx={{
							position: "absolute",
							m: 0,
							p: 0,
							width: "100%",
							height: "100%",
							outline: "none",
							opacity: 0,
							cursor: "pointer",
							"#fileUpload": {
								height: "100%",
							},
						}}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.target.files) {
								handleUpload(e.target.files[0]);
							}
						}}
					/>
					<Typography
						variant="h6"
						color="primary"
						align="center"
						height={"210px"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						sx={{
							cursor: "pointer",
							textTransform: "uppercase",
						}}
					>
						{name}
					</Typography>
				</Box>
				<FormHelperText error={error}>
					{helperText}
				</FormHelperText>
			</Box>
		</Grid>
	);
});

export default DropZoneUpload;
