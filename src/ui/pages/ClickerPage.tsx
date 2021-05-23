import React, { Fragment } from "react";
import ClickerPageVM from "../../viewmodels/pages/ClickerPageVM";
import { Box, CircularProgress, Typography, Button } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import { useRoutedViewModel } from "yuni-chanz-react";

const ClickerPage = () => {
    const model = useRoutedViewModel(ClickerPageVM);

    const profile = useBindable(model.profile);

    const onHomeButton = () => {
        model.toHome();
    };

    const onSaveButton = () => {
        model.saveProfile();
    };

    const onClickButton = () => {
        model.performClick();
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
            {
                profile === null &&
                <CircularProgress/>
            }
            {
                profile !== null &&
                <Fragment>
                    <Box style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        boxSizing: "border-box",
                        padding: "16px 32px",
                    }}>
                        <Button onClick={onHomeButton} variant="contained">
                            To Home
                        </Button>
                        <Box flex={1}/>
                        <Typography>
                            Points: {profile.points}
                        </Typography>
                        <Box width={16}/>
                        <Button onClick={onSaveButton} variant="contained">
                            Save
                        </Button>
                    </Box>
                    <Box style={{
                        width: "100%",
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button onClick={onClickButton} variant="contained">
                            Click me!
                        </Button>
                    </Box>
                </Fragment>
            }
        </Box>
    );
};
export default ClickerPage;