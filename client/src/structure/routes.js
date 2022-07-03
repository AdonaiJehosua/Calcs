import {Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "./routes/AuthPage/AuthPage";
import {Catalogs} from "./routes/Catalogs/Catalogs";
import {Calcs} from "./routes/Calcs/Calcs"
import {Test} from "./routes/Test/Test";
import {SideBar} from "../components/SideBar";
import {Formats} from "./routes/Catalogs/Formats/Format";
import {Units} from "./routes/Catalogs/Units/Units";
import {AmountOfPaper} from "./routes/Calcs/AmountOfPapper/AmountOfPaper";
import {Chromaticities} from "./routes/Catalogs/Chromaticities/Chromaticity";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Grid container>
                <SideBar/>
                <Grid item xs={9} sx={{justifyItems: 'center'}}>
                    <Routes>
                        <Route path={'/calcs'} element={<Calcs/>}>
                            <Route path={'amountofpapper'} element={<AmountOfPaper/>}/>
                        </Route>
                        <Route path={'/catalogs'} element={<Catalogs/>}>
                            <Route path={'formats'} element={<Formats/>}/>
                            <Route path={'units'} element={<Units/>}/>
                            <Route path={'chromaticity'} element={<Chromaticities/>}/>
                        </Route>
                        <Route path={'/test'} element={<Test/>}/>
                        {/*<Route path={'*'} element={<Navigate to={'/'}/>}/>*/}
                    </Routes>
                </Grid>
            </Grid>
        )

    }
    return (
        <Routes>
            <Route path={'/'} element={<AuthPage/>}/>
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>
    )
}