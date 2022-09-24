/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../../icons/bell";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { useState } from "react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const DashboardNavbarRoot = styled(
	AppBar,
)(({ theme }) => ({
	backgroundColor:
		theme.palette.background.paper,
	boxShadow: theme.shadows[3],
}));

export const DashboardNavbar =
	props => {
		const router = useRouter();
		const {
			onSidebarOpen,
			...other
		} = props;
		const [anchorEl, setAnchorEl] =
			useState(null);

		const handleChange = event => {
			setAuth(
				event.target.checked,
			);
		};

		const handleMenu = event => {
			setAnchorEl(
				event.currentTarget,
			);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		return (
			<>
				<DashboardNavbarRoot
					sx={{
						left: {
							lg: 280,
						},
						width: {
							lg: "calc(100% - 280px)",
						},
					}}
					{...other}
				>
					<Toolbar
						disableGutters
						sx={{
							minHeight: 64,
							left: 0,
							px: 2,
						}}
					>
						<IconButton
							onClick={
								onSidebarOpen
							}
							sx={{
								display:
									{
										xs: "inline-flex",
										lg: "none",
									},
							}}
						>
							<MenuIcon fontSize="small" />
						</IconButton>
						<Tooltip title="Search">
							<IconButton
								sx={{
									ml: 1,
								}}
							>
								<SearchIcon fontSize="small" />
							</IconButton>
						</Tooltip>
						<Box
							sx={{
								flexGrow: 1,
							}}
						/>
						<Tooltip title="Notifications">
							<IconButton
								sx={{
									ml: 1,
								}}
							>
								<Badge
									badgeContent={
										4
									}
									color="primary"
									variant="dot"
								>
									<BellIcon fontSize="small" />
								</Badge>
							</IconButton>
						</Tooltip>

						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={
									handleMenu
								}
								color="inherit"
							>
								<Avatar
									sx={{
										height: 40,
										width: 40,
										ml: 1,
									}}
									src="/static/images/avatars/avatar_11.png"
								>
									<UserCircleIcon fontSize="small" />
								</Avatar>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={
									anchorEl
								}
								anchorOrigin={{
									vertical:
										"bottom",
									horizontal:
										"right",
								}}
								keepMounted
								transformOrigin={{
									vertical:
										"top",
									horizontal:
										"right",
								}}
								open={Boolean(
									anchorEl,
								)}
								onClose={
									handleClose
								}
							>
								<MenuItem
									onClick={() => {
										router.push(
											"/account",
										);
									}}
								>
									<AccountCircleIcon
										fontSize="medium"
										color="primary"
										sx={{
											mr: 1,
										}}
									/>
									Perfil
								</MenuItem>
								<MenuItem
									onClick={() => {
										router.push(
											"/settings",
										);
									}}
								>
									<SettingsIcon
										fontSize="medium"
										color="primary"
										sx={{
											mr: 1,
										}}
									/>
									Configurações
								</MenuItem>
								<MenuItem
									onClick={() => {
										destroyCookie(
											null,
											"rica-adm.token",
										);
										router.push(
											"/auth",
										);
									}}
								>
									<MeetingRoomIcon
										fontSize="medium"
										color="primary"
										sx={{
											mr: 1,
										}}
									/>
									Sair
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</DashboardNavbarRoot>
			</>
		);
	};

DashboardNavbar.propTypes = {
	onSidebarOpen: PropTypes.func,
};
