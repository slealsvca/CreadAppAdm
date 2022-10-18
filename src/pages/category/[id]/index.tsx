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
import { CategoryCreate } from "../../../store/api/publication/categories";
import { schemaCategory, initial } from "../../../utils/validation/schemaCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { Category } from "../../../data/@types/category";



const CreateCategory = () => {
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
		resolver: yupResolver(
			schemaCategory,
		),
		defaultValues: initial

	});

	const onSubmit = async (
		values: Category,
	) => {
		const response =
			await CategoryCreate({
				name: values.name,
				image: "/static/images/avatars/avatar_11.png",
			});

		if (response?.status === 201) {
			reset();
			setOpen(!open);
		}
	};	

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
					subTitle="Categoria cadastrada com sucesso"
				/>
				{isSubmitting && (
					<Loader
						loading={
							isSubmitting
						}
					/>
				)}
				<Grid xs={12} container marginBottom={1}>
					<Grid item xs={12} md={8} >
						<Box>
							<Typography
								variant="h5"
								component="h2"
								gutterBottom
							>
								Categorias
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						md={4}
						gap={2}
						xs={12}
						display="flex"
						justifyContent={"flex-end"}
					>
						<Button
							//fullWidth
							size="small"
							color="primary"
							variant="outlined"
							startIcon={
								<HighlightOffIcon  fontSize="small"/>
							}
							onClick={() => {
								router.back()
							}}
						>
							Voltar
						</Button>
						<Button
							size="small"
							//fullWidth
							color="primary"
							variant="contained"
							startIcon={
								<AddCircleOutlineIcon  fontSize="small"/>
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
											.name
											?.message
									}
									error={Boolean(errors.name)}
									{...register(
										"name",
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
											"image",
										)}
										{...register(
											"image",
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

export default CreateCategory;


