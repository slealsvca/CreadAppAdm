import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";
import { userType } from "../../data/@types/user";

const userMock = {
	avatar: "/static/images/avatars/avatar_1.png",
	city: "Vitoria da conquista",
	country: "BA",
	jobTitle: "Mestre ",
	name: "Carlos Silva",
	timezone: "GTM-3",
};

export const AccountProfile = (
	user: userType,
) => (
	<Card>
		<CardContent>
			<Box
				sx={{
					alignItems:
						"center",
					display: "flex",
					flexDirection:
						"column",
				}}
			>
				<Avatar
					src={user.avatar}
					sx={{
						height: 64,
						mb: 2,
						width: 64,
					}}
				/>
				<Typography
					color="textPrimary"
					gutterBottom
					variant="h5"
				>
					{
						user?.name.split(
							" ",
						)[0]
					}
				</Typography>
				<Typography
					color="textSecondary"
					variant="body2"
				>
					{`${user.name} ${userMock.timezone}`}
				</Typography>
				<Typography
					color="textSecondary"
					variant="body2"
				>
					{/* {user.institute} */}
					{userMock.city}
				</Typography>
			</Box>
		</CardContent>
		<Divider />
		<CardActions>
			<Button
				color="primary"
				fullWidth
				variant="text"
			>
				Upload picture
			</Button>
		</CardActions>
	</Card>
);
