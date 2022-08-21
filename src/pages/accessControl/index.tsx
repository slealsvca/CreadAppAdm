import { DashboardLayout } from "../../components/dashboard-layout";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import HeadComponent from "../../components/Head";
import { ToolbarAccessControl } from "../../components/ToolbarAccessControl";
import {
	useEffect,
	useState,
} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
	Container,
	Avatar,
	Box,
	Card,
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
import { getInitials } from "../../utils/get-initials";
import SearchIcon from "@mui/icons-material/Search";
import { userType } from "../../data/@types/user";
import {
	accessControl,
	deleteUsers,
} from "../../store/api/accessControl";
import { SeverityPill } from "../../components/severity-pill";
import { Loader } from "../../components/Loader";
import FormModal from "../../components/FormModal";
import { Alerts } from "../../components/Alert";

const AccessControl = () => {
	const [openModal, setOpenModal] =
		useState<boolean>(false);
	const [userId, setUserId] =
		useState<string>("");
	const [open, setOpen] =
		useState<boolean>(false);
	const [alertTxt, setAlertTxt] =
		useState("");
	const [alertType, setAlertType] =
		useState("");

	// *****************************************************************************************
	const [users, setUsers] = useState<
		userType[]
	>([]);
	const [loading, setLoading] =
		useState(false);
	const [limit, setLimit] =
		useState(10);
	const [page, setPage] = useState(0);

	const handleLimitChange = (
		event: any,
	) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (
		event: any,
		newPage: any,
	) => {
		setPage(newPage);
	};

	const getUsers = async () => {
		setLoading(true);
		const res =
			await accessControl().finally(
				() => setLoading(false),
			);
		res.length > 0 && setUsers(res);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const Delete = async () => {
		const response =
			await deleteUsers(userId);
		console.log(response);
		if (response?.status === 204) {
			setOpenModal(false);
			getUsers();
			setOpen(true);
			setAlertTxt(
				"Usuário deletado com sucesso!",
			);
			setAlertType("success");
		}
	};

	return (
		<>
			<HeadComponent title="Publicações" />
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
					pt: 2,
				}}
			>
				<Loader
					loading={loading}
				/>
				<Container
					maxWidth={false}
				>
					<Box>
						<Typography
							variant="h5"
							component="h2"
							gutterBottom
						>
							Controle de
							acesso
						</Typography>
					</Box>
					<ToolbarAccessControl />
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
													"#42AF59",
												color: "#ffffff",
											}}
										>
											<TableRow>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Nome
												</TableCell>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													CPF
												</TableCell>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Email
												</TableCell>

												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Nome
													do
													usuário
												</TableCell>
												<TableCell
													sx={{
														color: "#ffffff !important",
													}}
												>
													Nível
													de
													acesso
												</TableCell>
												<TableCell
													width={
														5
													}
													sx={{
														pl: "25px",
														color: "#ffffff !important",
													}}
												>
													Ações
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{users.length >
											0 ? (
												users
													.slice(
														0,
														limit,
													)
													.map(
														(
															user: userType,
															index: number,
														) => (
															<TableRow
																hover
																key={
																	index
																}
															>
																<TableCell>
																	<Box
																		sx={{
																			alignItems:
																				"center",
																			display:
																				"flex",
																		}}
																	>
																		<Avatar
																			src={
																				user?.avatar
																			}
																			sx={{
																				mr: 2,
																			}}
																		>
																			{getInitials(
																				user.name,
																			)}
																		</Avatar>
																		<Typography
																			color="textPrimary"
																			variant="body1"
																		>
																			{
																				user.name
																			}
																		</Typography>
																	</Box>
																</TableCell>
																<TableCell>
																	{
																		user.cpf
																	}
																</TableCell>
																<TableCell>
																	{
																		user.email
																	}
																</TableCell>
																<TableCell>
																	{
																		user.username
																	}
																</TableCell>
																<TableCell>
																	<SeverityPill
																		color={
																			"success"
																		}
																	>
																		{
																			user.user_level
																		}
																	</SeverityPill>
																</TableCell>
																<TableCell
																	width={
																		5
																	}
																>
																	<Stack direction="row">
																		<Tooltip
																			title="Delete usuário"
																			placement="top"
																		>
																			<IconButton
																				color="primary"
																				onClick={() => {
																					setUserId(
																						user.id as string,
																					);
																					setOpenModal(
																						true,
																					);
																				}}
																			>
																				<DeleteForeverIcon />
																			</IconButton>
																		</Tooltip>
																		<Tooltip
																			title="Visualizar usuário"
																			placement="top"
																		>
																			<IconButton color="primary">
																				<SearchIcon />
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
								component="div"
								count={
									users.length
								}
								onPageChange={
									handlePageChange
								}
								onRowsPerPageChange={
									handleLimitChange
								}
								page={
									page
								}
								rowsPerPage={
									limit
								}
								rowsPerPageOptions={[
									5,
									10,
									25,
								]}
							/>
						</Card>
					</Box>
				</Container>
			</Box>
		</>
	);
};
AccessControl.getLayout = (
	page: any,
) => (
	<DashboardLayout>
		{page}
	</DashboardLayout>
);

export default AccessControl;


