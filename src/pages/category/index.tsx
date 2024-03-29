import {
	useState,
	useEffect,
} from "react";
import {
	Box,
	Button,
	Card,
	Container,
	Grid,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";


import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { DashboardLayout } from "../../components/DashboardSidebar/dashboard-layout";



import { Alerts } from "../../components/Alert";
import { Loader } from "../../components/Loader";
import HeadComponent from "../../components/Head";
import FormModal from "../../components/FormModal";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "../../components/Navigation/Link";
import { articleType } from "../../data/@types/articles";
import PerfectScrollbar from "react-perfect-scrollbar";

import moment from "moment";

import { switchColorStatus } from "../../utils/utilsPublications";
import { SeverityPill } from "../../components/DashboardSidebar/severity-pill";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { GetCategory } from "../../store/api/publication/categories";


import {
	deleteArticle,
} from "../../store/api/articles";
import { useRouter } from "next/router";
import { Toolbar } from "../../components/Toolbar";
import { Category } from "../../data/@types/category";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";



const Category = () => {
	const router = useRouter();

	const [categories, setCategories] =
		useState<Category[]>([]);

	const [openModal, setOpenModal] =
		useState<boolean>(false);
	const [articleId, setArticleId] =
		useState<string>("");
	const [open, setOpen] =
		useState<boolean>(false);
	const [alertTxt, setAlertTxt] =
		useState("");
	const [alertType, setAlertType] =
		useState("");
	const [articles, setArticles] =
		useState<articleType[]>([]);
	const [loading, setLoading] =
		useState(false);
	const [page, setPage] = useState(0);
	const [
		rowsPerPage,
		setRowsPerPage,
	] = useState(10);

	const handleChangePage = (
		event: unknown,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(
			+event.target.value,
		);
		setPage(0);
	};


	const getCategory = async () => {
		const categories = await GetCategory();
		categories && setCategories(categories?.data.content);
	};

	useEffect(() => {
		getCategory();
	}, []);

	const Delete = async () => {
		// const response =
		// 	await deleteArticle(
		// 		articleId,
		// 	);
		// if (response?.status === 204) {
		// 	setOpenModal(false);
		// 	getArticles();
		// 	setOpen(true);
		// 	setAlertTxt(
		// 		"Artigo deletado com sucesso!",
		// 	);
		// 	setAlertType("success");
		// }
	};
	return (
		<DashboardLayout>
			<HeadComponent title="Categorias" />
			<Loader loading={loading} />
			<FormModal
				open={openModal}
				onClose={() =>
					setOpenModal(false)
				}
				onOpen={() =>
					setOpenModal(true)
				}
				onConfirm={Delete}
				type={"delete"}
			/>
			<Alerts
				open={open}
				text={alertTxt}
				vertical="top"
				horizontal="right"
				type={alertType}
				close={setOpen}
			/>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
					pt: 1,
				}}
			>
				<Container
					maxWidth={false}
				>
					<Grid xs={12} mt={"4px"} mb={"8px"} container>
						<Grid item xs={12} md={10}>
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
							md={2}
							display="flex"
							justifyContent={"flex-end"}
						>
							<Button
								variant="contained"
								size="small"
								startIcon={
									<AddCircleOutlineIcon fontSize="small" />
								}
								onClick={() => router.push(`category/${Math.floor(Date.now() * Math.random()).toString(36)}`)}

							>
								Criar categoria
							</Button>
						</Grid>
					</Grid>
					<Toolbar />
					<Box sx={{ mt: 3 }}>
						<Card>
							<PerfectScrollbar>
								<Box
									width={
										"100%"
									}
									display="flex"
									overflow="auto"
								>
									<Table>
										<TableHead
											sx={{
												backgroundColor:
													"primary.main",
												color: "#ffffff",
											}}
										>
											<TableRow>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Title
												</TableCell>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Status
												</TableCell>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Data
													de
													criação
												</TableCell>
												<TableCell
													sx={{
														width: "4%",
														pl: "27px",
														color: "#ffffff !important",
													}}
												>
													Ações
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{categories.length >
												0 ? (
												categories
													?.slice(
														page *
														rowsPerPage,
														page *
														rowsPerPage +
														rowsPerPage,
													)
													.map(
														(
															category: Category,
															key: number,
														) => (
															<TableRow
																hover
																key={
																	key
																}
															>
																<TableCell>
																	<Typography
																		color="textPrimary"
																		variant="body1"
																	>
																		{
																			category?.name
																		}
																	</Typography>
																</TableCell>
																<TableCell>
																	<SeverityPill
																		color={switchColorStatus(
																			category?.status as string,
																		)}
																	>
																		{
																			category?.status
																		}
																	</SeverityPill>
																</TableCell>
																<TableCell>
																	{category?.createdAt &&
																		moment(
																			category?.createdAt,
																		).format(
																			"DD/MM/YYYY HH:mm,ss",
																		)}
																	{/* {category?.image} */}
																</TableCell>
																<TableCell
																	size="small"
																	sx={{
																		pr: "0px",
																	}}
																>
																	<Stack
																		direction="row"
																		justifyContent={
																			"flex-end"
																		}
																	>
																		<Tooltip
																			title="Editar artigo"
																			placement="top"
																		>
																			<IconButton
																				color="primary"
																				disabled={Boolean(
																					category?.status ===
																					"rejected",
																				)}
																			>
																				<Link
																					href={`/articles/${category?.id}`}
																					color="primary"
																					size="small"
																				>
																					<ModeEditOutlineIcon />
																				</Link>
																			</IconButton>
																		</Tooltip>
																		<Tooltip
																			title="Deletar artigo"
																			placement="top"
																		>
																			<IconButton
																				color="primary"
																				onClick={() => {
																					setOpenModal(
																						true,
																					);
																					setArticleId(
																						category.id as string,
																					);
																				}}
																			>
																				<DeleteForeverIcon />
																			</IconButton>
																		</Tooltip>
																		<Tooltip
																			title="Detalhes do artigo"
																			placement="top"
																		>
																			<IconButton color="primary">
																				<ArticleIcon />
																			</IconButton>
																		</Tooltip>
																	</Stack>
																</TableCell>
															</TableRow>
														),
													)
											) : (
												<TableRow>
													<TableCell
														colSpan={
															8
														}
														align="center"
													>
														<InfoOutlinedIcon
															color="warning"
															fontSize="large"
														/>
														<Typography
															color="textPrimary"
															variant="body1"
														>
															Nenhum
															registro
															para
															exibir
														</Typography>
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</Box>
							</PerfectScrollbar>
							<TablePagination
								rowsPerPageOptions={[
									5,
									10,
									25,
									100,
								]}
								component="div"
								count={
									articles?.length ||
									0
								}
								rowsPerPage={
									rowsPerPage
								}
								page={
									page
								}
								onPageChange={
									handleChangePage
								}
								onRowsPerPageChange={
									handleChangeRowsPerPage
								}
							/>
						</Card>
					</Box>
				</Container>
			</Box>
		</DashboardLayout>
	);
};

export default Category;

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



