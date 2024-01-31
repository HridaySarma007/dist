import React from "react";
import Container from '@mui/material/Container';

function Content({ children }) {

	return (
        <Container maxWidth="lg" sx={{mt:5}}>{children}</Container>
	);
}

export default Content;
