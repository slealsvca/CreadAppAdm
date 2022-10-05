import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/DashboardSidebar/dashboard-layout";
import { parseCookies } from "nookies";
import HeadComponent from "../../components/Head";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Controller,
	useForm,
} from "react-hook-form";

import { SchemaPublication, initial } from "../../utils/validation/schemaPublication";
import DropZoneUpload from "../../components/DropZoneUpload";
import { Loader } from "../../components/Loader";
import {
	PublicationType,
} from "../../data/@types/publication";
import {
	createPublication,
} from "../../store/api/publication";
import { ModalConfirm } from "../../components/Modal";
import {
	useEffect,
	useState,
} from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { GetCategories } from "../../store/api/publication/categories";
import { categories } from "../../data/@types/categories";
import { categorys } from "../../utils/utilsPublications";

const Customers = () => {
	const { "interfin-id": id } =
		parseCookies();
	const [open, setOpen] = useState(false);

	const [categories, setCategories] =
		useState<categories[]>(categorys);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		control,
		formState: {
			errors,
			isSubmitting,
		},
	} = useForm({
		mode: 'all',
		resolver: yupResolver(
			SchemaPublication,
		),
		defaultValues: {
			...initial,
		},
	});

	const onSubmit = async (
		values: PublicationType,
	) => {
		const response =
			await createPublication(
				values,
				id
			);
		if (response?.status === 201) {
			reset();
			setOpen(!open);
		}
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
				<Box>
					<Typography
						variant="h5"
						component="h2"
						gutterBottom
					>
						Publicações
					</Typography>
				</Box>

				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Grid
							container
							spacing={3}
						>
							<Grid
								item
								md={6}
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
								md={6}
								xs={12}
							>
								<FormControl
									fullWidth
								>
									<InputLabel
										error={Boolean(errors.category)}
									>
										Categoria
									</InputLabel>
									<Controller
										render={({
											field: {
												onChange,
												onBlur,
												value,
												name,
												ref,
											},
										}) => (
											<Select
												label="Categoria"
												value={
													value
												}
												name={
													name
												}
												onChange={
													onChange
												}
												onBlur={
													onBlur
												}
												inputRef={
													ref
												}
												error={Boolean(errors?.category)}
											>
												<MenuItem value="">
													<em>
														Selecione
														uma
														categoria
													</em>
												</MenuItem>
												{categories?.map(
													(
														item,
														key: number,
													) => (
														<MenuItem
															key={
																key
															}
															value={
																item?.name
															}
														>
															{
																item?.id
															}
														</MenuItem>
													),
												)}
											</Select>
										)}
										name="category"
										control={
											control
										}
									/>
									{errors.category && (
										<FormHelperText
											error
										>
											{
												errors
													.category
													?.message
											}
										</FormHelperText>
									)}
								</FormControl>
							</Grid>
							<Grid
								item
								md={12}
								xs={12}
							>
								<TextField
									fullWidth
									label="Url"
									placeholder="Adicione a url do vídeo"
									variant="outlined"
									helperText={errors.video_url?.message}
									error={
										Boolean(errors.video_url)
									}
									{...register(
										"video_url",
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
									<Typography
										variant="h6"
										color={
											"textSecondary"
										}
									>
										Resumo
									</Typography>
									<TextField
										fullWidth
										placeholder="Digite um pequeno resumo sobre a publicação"
										helperText={
											errors
												.summary
												?.message
										}
										error={Boolean(errors.summary)}
										multiline
										rows={
											10
										}
										{...register(
											"summary",
										)}
										defaultValue="Default Value"
									/>
								</FormControl>
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
									/>
								</FormControl>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				<Card
					sx={{
						p: 3,
					}}
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap={5}
						p={3}
					>
						<Button
							fullWidth
							color="primary"
							variant="outlined"
							startIcon={
								<HighlightOffIcon />
							}
							onClick={() => {
								reset();
							}}
						>
							Limpar
							campos
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
							Publicar
							artigo
						</Button>
					</Box>
				</Card>
			</Box>
		</DashboardLayout>
	);
};

export default Customers;


