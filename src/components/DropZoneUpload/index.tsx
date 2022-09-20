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

interface IProps {
	name?: string;
	file?: any;
	register?: any;
	helperText?: string;
	error?: boolean;
}

// eslint-disable-next-line react/display-name
const DropZoneUpload = React.forwardRef<
	HTMLInputElement,
	IProps
>((props, ref) => {
	const { file, ...rest } = props;

	const [name, setName] = useState(
		"Arraste e solte um arquivo ou selecione um vídeo",
	);

	useEffect(() => {
		{
			file &&
				setName(file[0]?.name);
		}
	}, [file]);

	const handleClick = () => {
		const fileUpload =
			document.getElementById(
				"fileUpload",
			);
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
				Selecionar vídeo
			</Button>

			<Box
				width={"95%"}
				bgcolor="background.paper"
				m={"0 auto"}
				p={2}
			>
				<Box
					mt={2}
					border={
						"4px dashed"
					}
					borderColor={
						props?.error
							? "red"
							: "primary.main"
					}
					position={
						"relative"
					}
				>
					<Input
						id="fileUpload"
						type="file"
						inputProps={{
							accept: "*",
						}}
						sx={{
							position:
								"absolute",
							m: 0,
							p: 0,
							width: "100%",
							height: "100%",
							outline:
								"none",
							opacity: 0,
							cursor: "pointer",
							"#fileUpload":
								{
									height: "100%",
								},
						}}
						{...rest}
						ref={ref}
					/>
					<Typography
						variant="h6"
						color="primary"
						align="center"
						height={"210px"}
						display={"flex"}
						justifyContent={
							"center"
						}
						alignItems={
							"center"
						}
						sx={{
							cursor: "pointer",
							textTransform:
								"uppercase",
						}}
					>
						{name}
					</Typography>
				</Box>
				<FormHelperText
					error={props?.error}
				>
					{props?.helperText}
				</FormHelperText>
			</Box>
		</Grid>
	);
});

export default DropZoneUpload;
