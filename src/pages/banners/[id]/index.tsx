import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/DashboardSidebar/dashboard-layout";
import { parseCookies } from "nookies";
import HeadComponent from "../../../components/Head";
import {
	useForm,
} from "react-hook-form";

import DropZoneUpload from "../../../components/DropZoneUpload";
import { Loader } from "../../../components/Loader";
import { ModalConfirm } from "../../../components/Modal";
import {
	useState,
} from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRouter } from 'next/router'



const CreateBanners = () => {
	const { "interfin-id": id } =
		parseCookies();
	const [open, setOpen] = useState(false);
	const router = useRouter()

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {
			errors,
			isSubmitting,
		},
	} = useForm({
		mode: 'all',
		defaultValues: { title: '', image_url: '' }
	});

	const onSubmit = async (
		values: any,
	) => {
		// const response =
		// 	await createPublication(
		// 		values,
		// 		id
		// 	);
		// if (response?.status === 201) {
		// 	reset();
		// 	setOpen(!open);
		// }
	};

	// const getCategory = async () => {
	// 	const categories =
	// 		await GetCategories();
	// 	categories &&
	// 		setCategories(
	// 			categories?.data,
	// 		);
	// };

	// useEffect(() => {
	// 	getCategory();
	// }, []);

	const handleClose = () =>
		setOpen(!open);
	return (
		<DashboardLayout>
			<HeadComponent title="Publications" />
			<Box
				component="form"
				sx={{
					flexGrow: 1,
					py: 2,
					px: 3,
				}}
				onSubmit={handleSubmit(
					onSubmit,
				)}
			>
				<ModalConfirm
					open={open}
					onClose={
						handleClose
					}
					onSubmit={
						handleClose
					}
					subTitle="Publicação cadastrada com sucesso"
				/>
				{isSubmitting && (
					<Loader
						loading={
							isSubmitting
						}
					/>
				)}
				<Grid
					xs={12}
					container
					display="flex"
					justifyContent={"space-between"}
				>
					<Grid item xs={12} md={8}>
						<Box>
							<Typography
								variant="h5"
								component="h2"
								gutterBottom
							>
								Banners
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						md={3}
						gap={2}
						xs={12}
						display="flex"
						height={40}
					>
						<Button
							fullWidth
							color="primary"
							variant="outlined"
							startIcon={
								<HighlightOffIcon />
							}
							onClick={() => {
								router.back()
							}}
						>
							Voltar
						</Button>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							startIcon={
								<AddCircleOutlineIcon />
							}
							type="submit"
						>
							Salvar
						</Button>
					</Grid>

				</Grid>


				<Card sx={{ mb: 3 }}>
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
								<TextField
									fullWidth
									label="Título"
									variant="outlined"
									helperText={
										errors
											.title
											?.message
									}
									error={Boolean(errors.title)}
									{...register(
										"title",
									)}
								/>
							</Grid>

							<Grid
								item
								md={12}
								xs={12}
							>
								<FormControl
									fullWidth
								>
									<DropZoneUpload
										file={watch(
											"image_url",
										)}
										{...register(
											"image_url",
										)}
										title="Arraste e solte um arquivo ou selecione uma imagem"
										subTitle="Selecionar imagem"
									/>
								</FormControl>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</DashboardLayout>
	);
};

export default CreateBanners;


