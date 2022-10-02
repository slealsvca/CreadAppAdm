import {
	Box,
	Card,
	CardContent,
	TextField,
	Grid,
	Button,
	Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export const Toolbar = (
	props: any,
) => {
	return (
		<Box>
			<Box>
				<Card>
					<CardContent>
						<Grid
							container
							spacing={3}
						>
							<Grid
								item
								xs={12}
							>
								<Typography
									variant="body2"
									gutterBottom
								>
									Opções
									de
									busca
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									fullWidth
									size="small"
									placeholder="Título"
									variant="outlined"
								/>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
							sx={{
								display:
									"flex",
								justifyContent:
									"flex-end",
								marginTop:
									"1rem",
							}}
						>
							<Grid
								item
								md={2}
								sm={12}
								xs={12}
							>
								<Button
									fullWidth
									variant="outlined"
									size="small"
									startIcon={
										<CancelIcon fontSize="small" />
									}
								>
									Limpar
								</Button>
							</Grid>
							<Grid
								item
								md={2}
								sm={12}
								xs={12}
							>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									size="small"
									startIcon={
										<ManageSearchIcon fontSize="small" />
									}
								>
									{
										"Buscar"
									}
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};
