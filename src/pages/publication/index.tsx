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
import { DashboardLayout } from "../../components/DashboardSidebar/dashboard-layout";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import HeadComponent from "../../components/Head";
import { articleType } from "../../data/@types/articles";
import moment from "moment";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
	deleteArticle,
	getUsersArticles,
} from "../../store/api/articles";
import { ToolbarArticles } from "../../components/ToolbarArticles";
import { SeverityPill } from "../../components/DashboardSidebar/severity-pill";
import { switchColorStatus } from "../../utils/utilsPublications";
import { Loader } from "../../components/Loader";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormModal from "../../components/FormModal";
import { Alerts } from "../../components/Alert";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "../../components/Navigation/Link";
import { PublicationType } from "../../data/@types/publication";
import { getAllPublications } from "../../store/api/publication";
import { useRouter } from "next/router";

const Publications = () => {
	const router = useRouter();
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
	const [publications, setPublications] =
		useState<PublicationType[]>([]);
	const [loading, setLoading] =
		useState(false);
	const [page, setPage] = useState(0);
	const [
		rowsPerPage,
		setRowsPerPage,
	] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(
			+event.target.value,
		);
		setPage(0);
	};

	const getArticles = async () => {
		setLoading(true);
		const publication = await getAllPublications().finally(() => setLoading(false));
		if (publication) {
			const { data } = publication
			setPublications(data?.content);
		}
	};

	useEffect(() => { getArticles(); }, []);

	const Delete = async () => {
		const response = await deleteArticle(articleId);
		if (response?.status === 204) {
			setOpenModal(false);
			getArticles();
			setOpen(true);
			setAlertTxt(
				"Artigo deletado com sucesso!",
			);
			setAlertType("success");
		}
	};
	return (
		<DashboardLayout>
			<HeadComponent title="Publicações" />
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
									Publicações
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
									<AddCircleOutlineIcon />
								}
								onClick={() => router.push(`publication/${Math.floor(Date.now() * Math.random()).toString(36)}`)}

							>
								Criar publicação
							</Button>
						</Grid>
					</Grid>
					<ToolbarArticles />
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
										<TableHead sx={{ backgroundColor: "primary.main", }} >
											<TableRow>
												<TableCell >
													Title
												</TableCell>
												<TableCell>
													Data de criação
												</TableCell>
												<TableCell >
													Status
												</TableCell>
												<TableCell >
													Categoria
												</TableCell>
												<TableCell sx={{ width: "4%", pl: "27px", }} >
													Ações
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{publications?.length >
												0 ? (
												publications
													?.slice(
														page *
														rowsPerPage,
														page *
														rowsPerPage +
														rowsPerPage,
													)
													?.map(
														(
															article: PublicationType,
															key: number,
														) => (
															<TableRow
																hover
																key={
																	key
																}
															>
																<TableCell
																	sx={{ maxWidth: '150px' }}
																>
																	<Typography
																		color="textPrimary"
																		variant="body1"
																		component={"p"}
																		sx={{
																			whiteSpace: "nowrap",
																			textDecoration: "none",
																			textTransform: "none",
																			overflow: "hidden",
																			textOverflow: "ellipsis",
																		}}
																	>
																		{article?.title}
																		{/* {article?.title?.slice(
																			0,
																			25,
																		)} */}
																	</Typography>
																</TableCell>
																<TableCell>
																	{article?.createdAt &&
																		moment(
																			article?.createdAt,
																		).format(
																			"DD/MM/YYYY HH:mm",
																		)}
																</TableCell>
																<TableCell>
																	<SeverityPill
																		color={switchColorStatus(
																			article?.status!,
																		)}
																	>
																		{
																			article?.status
																		}
																	</SeverityPill>
																</TableCell>
																<TableCell>
																	{article?.category?.name ??
																		"Não definido"}
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
																		{/* <Tooltip
																			title="Editar artigo"
																			placement="top"
																		>
																			<IconButton
																				color="primary"
																				disabled={Boolean(
																					article?.status ===
																					"rejected",
																				)}
																			>
																				<Link
																					href={`/articles/${article?.id}`}
																					color="primary"
																					size="small"
																				>
																					<ModeEditOutlineIcon />
																				</Link>
																			</IconButton>
																		</Tooltip> */}
																		<Tooltip
																			title="Deletar artigo"
																			placement="top"
																		>
																			<IconButton
																				color="primary"
																			// onClick={() => {
																			// 	setOpenModal(
																			// 		true,
																			// 	);
																			// 	setArticleId(
																			// 		article?.,
																			// 	);
																			// }}
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
									publications?.length ||
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
			</Box >
		</DashboardLayout >
	);
};

export default Publications;


