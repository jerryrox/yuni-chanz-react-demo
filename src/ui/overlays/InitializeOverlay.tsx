import React from "react";
import InitializeOverlayVM from "../../viewmodels/overlays/InitializeOverlayVM";
import { Box, Typography } from "@material-ui/core";
import { useViewModel } from "yuni-chanz-react";

const InitializeOverlay = () => {
    useViewModel(InitializeOverlayVM);

    return (
        <Box style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography>
                Initializing
            </Typography>
        </Box>
    );
};
export default InitializeOverlay;