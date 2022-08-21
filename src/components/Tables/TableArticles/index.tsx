import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
	Box,
	Button,
	Card,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import moment from "moment";
import { tableRowProps } from "../../../data/@types/articles";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PageviewIcon from "@mui/icons-material/Pageview";
import SearchIcon from "@mui/icons-material/Search";

export const TableArticles: React.FC<
	tableRowProps
> = ({
	article,
	handleEdit,
	handleView,
}) => {
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

	return (
		<Card>
			<PerfectScrollbar>
				<Box
					sx={{
						minWidth: 1050,
					}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Title
								</TableCell>
								<TableCell>
									Categoria
								</TableCell>
								<TableCell>
									Status
								</TableCell>
								<TableCell>
									Data
									de
									criação
								</TableCell>
								<TableCell
									width={
										5
									}
									sx={{
										pl: "25px",
									}}
								>
									Ações
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{article
								?.slice(
									0,
									limit,
								)
								.map(
									article => (
										<TableRow
											hover
											key={
												article.id
											}
										>
											<TableCell>
												<Typography
													color="textPrimary"
													variant="body1"
												>
													{
														article?.title
													}
												</Typography>
											</TableCell>
											<TableCell>
												{article?.category ??
													"Não definido"}
											</TableCell>
											<TableCell>
												{
													article?.status
												}
											</TableCell>
											<TableCell>
												{moment(
													article?.created_at,
												).format(
													"DD/MM/YYYY",
												)}
											</TableCell>
											<TableCell
												width={
													5
												}
											>
												<Box
													alignItems="center"
													display={
														"flex"
													}
													width={
														"5%"
													}
												>
													<Box
														sx={{
															mr: 1,
														}}
													>
														<IconButton
															onClick={() =>
																handleEdit(
																	article,
																)
															}
															size="small"
															color="primary"
															sx={{
																borderColor:
																	"red",
															}}
														>
															<ModeEditOutlineIcon
																sx={{
																	color: "primary",
																	width: "23px",
																	height: "22px",
																}}
															/>
														</IconButton>
													</Box>
													<Box
														sx={{
															mr: 1,
														}}
													>
														<IconButton
															onClick={() =>
																handleView(
																	article?.id,
																)
															}
															size="small"
															color="primary"
														>
															<SearchIcon
																sx={{
																	color: "primary",
																}}
															/>
														</IconButton>
													</Box>
												</Box>
											</TableCell>
										</TableRow>
									),
								)}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={
					article?.length ?? 0
				}
				onPageChange={
					handlePageChange
				}
				onRowsPerPageChange={
					handleLimitChange
				}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[
					5, 10, 25,
				]}
			/>
		</Card>
	);
};

function useEffect(
	arg0: () => void,
	arg1: never[],
) {
	throw new Error(
		"Function not implemented.",
	);
}
