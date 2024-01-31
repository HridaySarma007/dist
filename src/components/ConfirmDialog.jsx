import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = (props) => {
	const { title, children, open, setOpen, onConfirm } = props;
	return (
		
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>

			<DialogTitle id="alert-dialog-title">
				{title}
			</DialogTitle>
			<DialogContent >
				{children}			
			</DialogContent>
			<div style={{display:"flex", justifyContent:"space-around",alignItems:"center"}}>
			<DialogActions >
				<Button variant="contained"  color="error" onClick={()=> setOpen(false) }>No</Button>
				<Button variant="contained"  color="success" onClick={()=> {setOpen(false); onConfirm();}} autoFocus>
					Yes
				</Button>
			</DialogActions>
			</div>
		</Dialog>
		
	);
}

export default ConfirmDialog;