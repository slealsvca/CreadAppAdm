/* eslint-disable */
import {
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const Welcome = (props: any) => (
	<Card {...props}>
		<CardContent
			sx={{
				height: '292px',
				backgroundColor: "neutral.900",
			}}
		>
			<Grid container xs={12}>
				<Grid
					item xs={6}
					spacing={2}
				>
					<Typography
						sx={{ color: "primary.contrastText", }}
						gutterBottom
						variant="h5"
					>
						Bem-vindo, Chen!
					</Typography>
					<Typography
						sx={{
							color: "primary.contrastText",
							fontWeight: '400',
							fontSize: '1rem',
							lineHeight: '1.5',
						}}
						variant="caption"

					>
						Vamos completar as informações da sua conta para que possamos
						coletar dados mais precisos para você.
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 2,
							mb: 2,
						}}
						size="small"
						endIcon={<ArrowForwardIcon />}
					>
						Ir para a conta
					</Button>
				</Grid>
				<Grid item xs={6}>
					<img src="/static/svg/welcome-banner.svg" />
				</Grid>
			</Grid>

		</CardContent>
	</Card>
);
