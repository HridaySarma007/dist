import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import UsersTable from "../components/Users/UsersTable";
import UsersListMobile from "../components/Users/UsersListMobile";
import Container from "../components/Container";

const Users = () => {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<>
			{isMatch ? (
				<UsersListMobile />
			) : (
				<Container>
					<UsersTable sx={{marginBottom: '30px'}}/>
				</Container>
			)}
		</>
	);
};

export default Users;
