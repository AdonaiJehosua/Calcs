import {Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "./routes/AuthPage/AuthPage";
import {Catalogs} from "./routes/Catalogs/Catalogs";
import {Calcs} from "./routes/Calcs/Calcs"
import {Test} from "./routes/Test/Test";
import {SideBar} from "../components/SideBar";
import {Formats} from "./routes/Catalogs/Formats/Format";
import {Units} from "./routes/Catalogs/Units/Units";
import {AmountOfPaper} from "./routes/Calcs/AmountOfPapper/AmountOfPaper";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <div className={'row'}>
                <SideBar/>
                <div className={'container col s10'}>
                    <Routes>
                        <Route path={'/calcs'} element={<Calcs/>}>
                            <Route path={'amountofpapper'} element={<AmountOfPaper/>}/>
                        </Route>
                        <Route path={'/catalogs'} element={<Catalogs/>}>
                            <Route path={'formats'} element={<Formats/>}/>
                            <Route path={'units'} element={<Units/>}/>
                        </Route>
                        <Route path={'/test'} element={<Test/>}/>
                        {/*<Route path={'*'} element={<Navigate to={'/'}/>}/>*/}
                    </Routes>
                </div>
            </div>
        )

    }
    return (
        <Routes>
            <Route path={'/'} element={<AuthPage/>}/>
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>
    )
}