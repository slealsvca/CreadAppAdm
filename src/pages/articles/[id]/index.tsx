import React, {
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { withAuth } from "../../../utils/withAuth";

import {
	Box,
	Button,
	Card,
	CardContent,
	Fab,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/DashboardSidebar/dashboard-layout";
import HeadComponent from "../../../components/Head";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Controller,
	useForm,
} from "react-hook-form";
import {
	categorys,
	initial,
} from "../../../utils/utilsPublications";
import { SchemaPublication } from "../../../utils/validation/schemaPublication";
import DropZoneUpload from "../../../components/DropZoneUpload";
import { Loader } from "../../../components/Loader";
import {
	CategoryType,
	PublicationType,
} from "../../../data/@types/publication";
import {
	createPublication,
	updatedFile,
} from "../../../store/api/publication";
import { ModalConfirm } from "../../../components/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
	getArticleById,
	updatedArticle,
} from "../../../store/api/articles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "../../../components/Navigation/Link";
import { Alerts } from "../../../components/Alert";
import { GetCategories } from "../../../store/api/articles/categories";
import { categories } from "../../../data/@types/categories";

const EditUser: NextPage = () => {
	const [open, setOpen] =
		useState<boolean>(false);
	const [alertTxt, setAlertTxt] =
		useState("");
	const [alertType, setAlertType] =
		useState("");
	const [loading, setLoading] =
		useState(false);
	const [categories, setCategories] =
		useState<categories[]>();

	// *****************************************************************************************
	const router = useRouter();
	const { id } = router.query;

	const {
		handleSubmit,
		watch,
		reset,
		control,
		formState: {
			errors,
			isSubmitting,
		},
	} = useForm({
		resolver: yupResolver(
			SchemaPublication,
		),
		defaultValues: initial,
	});

	const onSubmit = async (
		values: PublicationType,
	) => {
		const response =
			await updatedArticle(
				values,
				id as string,
			);
		if (response?.status === 204) {
			reset();
			setOpen(true);
			setAlertTxt(
				"Os dados foram atualizados com sucesso!",
			);
			setAlertType("success");
		}
	};

	const getArticle = async () => {
		setLoading(true);
		const res =
			await getArticleById(
				id as string,
			).finally(() =>
				setLoading(false),
			);
		res &&
			reset({
				title: res?.title,
				category_id:
					res?.category_id ||
					"1",
				resume: res?.resume,
				file: res?.file,
				user_id:
					res?.UserArticles
						.user_id,
			});
	};

	const getCategory = async () => {
		const categories =
			await GetCategories();
		categories &&
			setCategories(
				categories?.data,
			);
	};

	const Download = async (
		url: string,
	) => {
		window.open(url, "_blank");
	};

	useEffect(() => {
		id &&
			Promise.all([
				getArticle(),
				getCategory(),
			]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<DashboardLayout>
			<HeadComponent title="Artigo" />
			<Loader loading={loading} />
			<Alerts
				open={open}
				text={alertTxt}
				vertical="top"
				horizontal="right"
				type={alertType}
				close={setOpen}
			/>
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
					sx={{
						flexWrap:
							"wrap",
					}}
				>
					<Typography
						variant="h5"
						component="h2"
						gutterBottom
					>
						Artigo
					</Typography>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap={1}
					>
						<Button
							fullWidth
							color="primary"
							size="small"
							variant="outlined"
							startIcon={
								<HighlightOffIcon />
							}
							onClick={() => {
								reset();
							}}
						>
							<Link
								href="/articles"
								color="secondary"
							>
								Cancelar
							</Link>
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
								md={6}
								xs={12}
							>
								<Controller
									render={({
										field: {
											onChange,
											value,
											name,
										},
									}) => (
										<TextField
											onChange={
												onChange
											}
											value={
												value
											}
											name={
												name
											}
											fullWidth
											size="small"
											label="Título"
											variant="outlined"
											helperText={
												errors
													.title
													?.message
											}
											error={
												errors.title !==
												undefined
											}
										/>
									)}
									control={
										control
									}
									name="title"
								/>
							</Grid>
							<Grid
								item
								md={6}
								xs={12}
							>
								<FormControl
									fullWidth
									size="small"
								>
									<InputLabel
										size="small"
										error={
											errors?.category_id !==
											undefined
										}
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
												size="small"
												onChange={
													onChange
												}
												onBlur={
													onBlur
												}
												inputRef={
													ref
												}
												error={
													errors?.category_id !==
													undefined
												}
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
																item?.id
															}
														>
															{
																item?.name
															}
														</MenuItem>
													),
												)}
											</Select>
										)}
										name="category_id"
										control={
											control
										}
										defaultValue={
											"1"
										}
									/>
									{errors.category_id && (
										<FormHelperText
											error
										>
											{
												errors
													.category_id
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
									<Controller
										render={({
											field: {
												onChange,
												value,
												name,
											},
										}) => (
											<TextField
												onChange={
													onChange
												}
												value={
													value
												}
												name={
													name
												}
												size="small"
												fullWidth
												placeholder="Digite um pequeno resumo sobre a publicação"
												helperText={
													errors
														.resume
														?.message
												}
												error={
													errors.resume !==
													undefined
												}
												multiline
												rows={
													10
												}
											/>
										)}
										control={
											control
										}
										name="resume"
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								md={12}
								xs={12}
							>
								{/* <FormControl fullWidth>
                                    <DropZoneUpload
                                        file={watch('file')}
                                        {...register("file")}
                                    />
                                </FormControl> */}
								<Grid
									item
									xs={
										12
									}
									sm={
										12
									}
								>
									<FormControl
										fullWidth
									>
										<label htmlFor="upload-photo">
											<Controller
												render={({
													field: {
														onChange,
														value,
														name,
													},
												}) => (
													<input
														onChange={
															onChange
														}
														value={
															value
																? value[0]
																		?.name
																: ""
														}
														name={
															name
														}
														style={{
															display:
																"none",
														}}
														// onChange={(e) => {
														//     if (e.target.files) {
														//         uploadFile(e.target.files[0] as unknown as File)
														//     }
														// }}
														id="upload-photo"
														type="file"
														// disabled={details === 'details' ? true : false}
													/>
												)}
												control={
													control
												}
												name="file"
											/>
											<Box
												gap={
													2
												}
												p={
													"0.5rem"
												}
												display={
													"flex"
												}
												borderRadius={
													4
												}
												bgcolor={
													"#e9e6e6"
												}
												justifyContent="space-between"
												sx={{
													flexWrap:
														"wrap",
												}}
											>
												<Box
													display={
														"flex"
													}
													alignItems={
														"center"
													}
												>
													<Fab
														size="medium"
														color="secondary"
														component="span"
														variant="extended"
														style={{
															gap: 4,
														}}
													>
														<AddCircleOutlineIcon />{" "}
														Adicionar
														arquivo
													</Fab>

													<Typography
														fontWeight={
															"bold"
														}
														color={
															"#0baf0b"
														}
														marginLeft={
															"0.5rem"
														}
													>
														{watch(
															"file",
														) ??
															"Adicione um arquivo"}
													</Typography>
												</Box>
												<Fab
													size="medium"
													color="secondary"
													component="span"
													variant="extended"
													style={{
														gap: 4,
													}}
													onClick={() => {
														//Download('https://gerministore.blob.core.windows.net/images/a17e0745-d6c5-40f9-9692-f0ae7bc77dc2.pdf')
														Download(
															"https://play-lh.googleusercontent.com/1nfAdJs2Ep2q1skM7QwJ1uHooWSbpFkbIBHhAX6EmdzEKmtk42713TiTU28mWlkcFKPA=w240-h480-rw",
														);
													}}
												>
													<VisibilityIcon />
													Visualizar
													arquivo
													salvo
												</Fab>
											</Box>
										</label>
										{errors.file && (
											<FormHelperText
												sx={{
													fontSize:
														"1rem",
													fontWeight: 600,
												}}
												error
											>
												{`${errors.file.message}`}
											</FormHelperText>
										)}
									</FormControl>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				<Card
					sx={{ p: 3 }}
				></Card>
			</Box>
		</DashboardLayout>
	);
};

export default withAuth(EditUser);
