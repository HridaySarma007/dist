import React, { useState } from "react";
import {
	Button,
	useMediaQuery,
	useTheme,
	Grid,
	TextField,
	Alert,
	Stack,
	Snackbar
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../utils/index";
import authHeader from "../../utils/auth-header";

const ChangePasswordForm = ({ sx }) => {
	const validationSchema = Yup.object().shape({
		old_password: Yup.string().required("enter your old password"),
		new_password: Yup.string().required("enter your new password"),
	});

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [msg, setMsg] = useState({ type: 'error', content: '' });
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const onSubmit = async (data) => {
		try {
			await api.post(
				"users/change-password",
				JSON.stringify(data),
				{ headers: authHeader() }
			);
			setMsg({ type: "success", content: "Password changed successfully" });
			setSnackBarOpen(true);
		} catch (error) {
			setMsg({ type: "error", content: "Unable to change password" });
			setSnackBarOpen(true);
		}
	};

	return (
		<>

			<Grid container sx={sx}>
				<Grid item xs={1} sm={1} md={3} lg={3}></Grid>
				<Grid xs={10} sm={10} md={6} lg={6}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={2}>
							<TextField
								fullWidth
								size="small"
								type="password"
								label="Old password"
								name="old_password"
								{...register("old_password")}
								error={errors.old_password ? true : false}
								helperText={errors.old_password?.message}
							/>
							<TextField
								fullWidth
								size="small"
								type="password"
								label="New Password"
								name="new_password"
								{...register("new_password")}
								error={errors.new_password ? true : false}
								helperText={errors.new_password?.message}
								variant="outlined"
							/>
							<div style={{ textAlign: "right", width: "100%" }}>
								{!isMatch && (
									<Button
										sx={{ mr: 2 }}
										type="reset"
										color="error"
										variant="contained"
										startIcon={<RotateLeftIcon />}
										fullWidth={isMatch}
									>
										Reset
									</Button>
								)}
								<Button
									type="submit"
									color="primary"
									variant="contained"
									startIcon={<SaveIcon />}
									fullWidth={isMatch}
								>
									Save
								</Button>
							</div>
						</Stack>
					</form>
				</Grid>
				<Grid item xs={1} sm={1} md={3} lg={3}></Grid>
			</Grid>
			<Snackbar
				open={snackBarOpen}
				onClose={() => setSnackBarOpen(false)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={msg.type}>{msg.content}</Alert>
			</Snackbar>
		</>
	);
};

export default ChangePasswordForm;
