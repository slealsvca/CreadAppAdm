import {
	Box,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/DashboardSidebar/dashboard-layout";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import HeadComponent from "../../components/Head";
import {
	useEffect,
	useState,
} from "react";
import { userType } from "../../data/@types/user";
import { getUser } from "../../store/api/user/getUser";

const Account = () => {
	const [user, setUser] =
		useState<userType>({
			name: "",
			email: "",
			cpf: "", 
			password: "",
			confirmPassword: "",
			user_level: "",
			avatar: "",  
			id: "",
		});
	const [loading, setLoading] =
		useState(false);
	const { ["rica-adm.id"]: id } =
		parseCookies();

	useEffect(() => {
		id &&
			(async () => {
				setLoading(true);
				const { data } =
					await getUser(
						`${id}`,
					);
				data && setUser(data);
			})().finally(() =>
				setLoading(false),
			);
	}, [id]);

	return (
		<DashboardLayout>
			<HeadComponent title="Conta" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="lg">
					<Typography
						sx={{ mb: 3 }}
						variant="h4"
					>
						Conta
					</Typography>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							lg={4}
							md={6}
							xs={12}
						>
							<AccountProfile
								{...user}
							/>
						</Grid>
						<Grid
							item
							lg={8}
							md={6}
							xs={12}
						>
							<AccountProfileDetails
								user={
									user
								}
								loading={
									loading
								}
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</DashboardLayout>
	);
};

export default Account;


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


