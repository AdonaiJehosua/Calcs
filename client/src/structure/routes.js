import {Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "./routes/AuthPage/AuthPage";
import {Catalogs} from "./routes/Catalogs/Catalogs";
import {Calcs} from "./routes/Calcs/Calcs"
import {Orders} from "./routes/Orders/Orders"
import {Test} from "./routes/Test/Test";
import {SideBar} from "../components/SideBar";
import {Formats} from "./routes/Catalogs/Formats/Format";
import {Units} from "./routes/Catalogs/Units/Units";
import {AmountOfPaper} from "./routes/Calcs/AmountOfPapper/AmountOfPaper";
import {Chromaticities} from "./routes/Catalogs/Chromaticities/Chromaticity";
import {Grid} from "@mui/material";
import { AllOrders } from "./routes/Orders/All/AllOrders";
import { ProductionTypes } from "./routes/Catalogs/ProductionTypes/ProductionTypes";
import { PrepressOrders } from "./routes/Orders/Prepress/PrepressOrders";
import { PressOrders } from "./routes/Orders/Press/PressOrders";
import { PostpressOrders } from "./routes/Orders/Postpress/PostpressOrders";
import { ComplitedOrders } from "./routes/Orders/Complited/ComplitedOrders";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Grid container sx={{height: '100%'}}>
                <SideBar/>
                <Grid item xs={10} sx={{justifyContent: 'center'}}>
                    <Routes>
                        <Route path={'/orders'} element={<Orders/>}>
                            <Route path={'all'} element={<AllOrders/>}/>
                            <Route path={'prepress'} element={<PrepressOrders/>}/>
                            <Route path={'postpress'} element={<PostpressOrders/>}/>
                            <Route path={'press'} element={<PressOrders/>}/>
                            <Route path={'complited'} element={<ComplitedOrders/>}/>
                        </Route>
                        <Route path={'/calcs'} element={<Calcs/>}>
                            <Route path={'amountofpapper'} element={<AmountOfPaper/>}/>
                        </Route>
                        <Route path={'/catalogs'} element={<Catalogs/>}>
                            <Route path={'productionTypes'} element={<ProductionTypes/>}/>
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