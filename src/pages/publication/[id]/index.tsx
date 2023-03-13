import {
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/DashboardSidebar/dashboard-layout";
import { parseCookies } from "nookies";
import HeadComponent from "../../../components/Head";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Controller,
	useForm,
} from "react-hook-form";

import { SchemaPublication, initial } from "../../../utils/validation/schemaPublication";
import DropZoneUpload from "../../../components/DropZoneUpload";
import { Loader } from "../../../components/Loader";
import {
	PublicationType,
} from "../../../data/@types/publication";
import {
	createPublication,
} from "../../../store/api/publication";
import { ModalConfirm } from "../../../components/Modal";
import {
	useEffect,
	useState,
} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { categories } from "../../../data/@types/categories";
import { categorys } from "../../../utils/utilsPublications";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { GetCategory } from "../../../store/api/publication/categories";
import InfoIcon from '@mui/icons-material/Info';
import { EditorWrapper } from "../../../components/EditorWrapper";

const Customers = () => {
	const { "interfin-id": id } =
		parseCookies();
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [category, setCategory] = useState<categories[]>(categorys);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		clearErrors,
		control,
		formState: {
			errors,
			isSubmitting,
		},
	} = useForm({
		mode: 'all',
		resolver: yupResolver(SchemaPublication),
		defaultValues: initial,
	});

	const onSubmit = async (
		values: PublicationType,
	) => {
		console.log(values);
		const response = await createPublication(values, id);
		if (response?.status === 201) {
			reset(initial);
			setOpen(!open);
		}
	};

	const getCategory = async () => {
		const res = await GetCategory();

		if (res?.status === 200) {
			setCategory(res?.data?.content);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

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
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography
						variant="h5"
						component="h2"
						gutterBottom
					>
						Publicações
					</Typography>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap={2}
					>
						<Button
							size="small"
							color="primary"
							variant="outlined"
							startIcon={
								<ArrowBackIcon />
							}
							onClick={() => {
								router.back()
							}}
						>
							Voltar
						</Button>
						<Button
							size="small"
							color="primary"
							variant="contained"
							startIcon={
								<FileDownloadDoneIcon />
							}
							type="submit"
						>
							Publicar
							artigo
						</Button>
					</Box>
				</Box>

				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Grid
							container
							spacing={3}
						>
							<Grid
								item
								lg={6}
								md={6}
								xs={12}
							>
								<TextField
									size="small"
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
								lg={4}
								md={4}
								xs={12}
							>
								<FormControl
									fullWidth
									size="small"
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
												{category?.map(item => (
													<MenuItem
														key={item?.id}
														value={item?.id}
													>
														{item?.name}

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
								lg={2}
								md={2}
								xs={12}
								display="flex"
								alignItems="baseline"
							>

								<FormGroup >
									<FormControlLabel
										control={
											<Checkbox />
										}
										{...register(
											"isBanners",
										)}
										label="Produto"
									/>

								</FormGroup>
								<Tooltip
									arrow
									title="Caixa de seleção definirá se a publicação  será um produto ou não"
									placement="top-start"
								>
									<InfoIcon />
								</Tooltip>
							</Grid>
							<Grid
								item
								md={12}
								xs={12}
							>
								<TextField
									fullWidth
									label="Url"
									size="small"
									disabled
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
								sx={{
									"jodit-status-bar a.jodit-status-bar-link:visited": {
										display: "none"
									}
								}}
							>
								<FormControl fullWidth>
									<Typography
										variant="h6"
										color={"textSecondary"}
									>
										Resumo
									</Typography>
									<TextField
										fullWidth
										placeholder="Digite um pequeno resumo sobre a publicação"
										helperText={errors.summary?.message}
										error={Boolean(errors.summary)}
										multiline
										rows={2}
										{...register("summary")}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								md={12}
								xs={12}
								sx={{
									"jodit-status-bar a.jodit-status-bar-link:visited": {
										display: "none"
									}
								}}
							>
								<FormControl fullWidth>
									<Typography
										variant="h6"
										color="textSecondary"
									>
										Conteúdo
									</Typography>
									<Controller
										render={({
											field: { onChange, value },
										}) => (
											<EditorWrapper
												onChange={onChange}
												value={value}
											/>
										)}
										control={control}
										name="content"
									/>
									<FormHelperText
										error
									>
										{
											errors
												.content
												?.message
										}
									</FormHelperText>

								</FormControl>
							</Grid>
							<Grid
								item
								md={12}
								xs={12}
							>
								<FormControl fullWidth>
									<DropZoneUpload
										name='file'
										clearErrors={() => clearErrors('file')}
										error={Boolean(errors.file)}
										helperText={Boolean(errors.file) ? `${errors.file?.message}` : ''}
										setValue={(value: string) => {
											console.log(value)
											setValue('file', value)
										}}

									/>
								</FormControl>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</DashboardLayout >
	);
};

export default Customers;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const {
		["interfin-token"]: token,
	} = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination:
					"/auth",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};


