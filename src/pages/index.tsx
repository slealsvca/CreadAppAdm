import { DashboardLayout } from "../components/DashboardSidebar/dashboard-layout";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import HeadComponent from "../components/Head";
import {
	Box,
	Container,
	Grid,
} from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { Sales } from "../components/dashboard/sales";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { Budget } from "../components/dashboard/budget";
import { LatestProducts } from "../components/dashboard/latest-products";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { parseCookies } from "nookies";
import { AllNotifications } from "../components/AllNotifications";
import { Welcome } from "../components/Welcome";

const Home: NextPage = () => {
	return (
		<DashboardLayout>
			<HeadComponent title="Dashboard" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container
					maxWidth={false}
				>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							sm={6}
							xs={12}
						>
							<AllNotifications />
						</Grid>
						<Grid
							item
							sm={6}
							xs={12}
						>
							<Welcome />
						</Grid>
						<Grid item xs={12}>
							<Sales />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</DashboardLayout>
	);
};

export default Home;


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



