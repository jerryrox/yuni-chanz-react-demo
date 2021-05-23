import { Box, Button } from "@material-ui/core";
import React from "react";
import { useRoutedViewModel } from "yuni-chanz-react";
import HomePageVM from "../../viewmodels/pages/HomePageVM";

const HomePage = () => {
    const model = useRoutedViewModel(HomePageVM);

    const onClickerButton = () => {
        model.toClicker();
    };

    return (
        <Box style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Button onClick={onClickerButton} variant="contained">
                Clicker game
            </Button>
        </Box>
    );
};
export default HomePage;