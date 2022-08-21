import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Typography,
	Grid,
	Divider,
} from "@mui/material";
import { Search as SearchIcon } from "../../../icons/search";
import { Download as DownloadIcon } from "../../../icons/download";

export const ToolbarArticles = (
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
								md={6}
								xs={12}
							>
								<TextField
									fullWidth
									InputProps={{
										startAdornment:
											(
												<InputAdornment position="start">
													<SvgIcon
														color="action"
														fontSize="small"
													>
														<SearchIcon />
													</SvgIcon>
												</InputAdornment>
											),
									}}
									placeholder="Search customer"
									variant="outlined"
								/>
							</Grid>
							<Grid
								item
								md={6}
								xs={12}
							>
								<TextField
									fullWidth
									InputProps={{
										startAdornment:
											(
												<InputAdornment position="start">
													<SvgIcon
														color="action"
														fontSize="small"
													>
														<SearchIcon />
													</SvgIcon>
												</InputAdornment>
											),
									}}
									placeholder="Search customer"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};
