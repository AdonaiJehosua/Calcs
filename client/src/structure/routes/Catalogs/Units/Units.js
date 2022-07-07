import 'reactjs-popup/dist/index.css';
import {UnitCreatingCard} from "./UnitCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";


export const Units = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchUnits = useCallback(async () => {
        fetchEntries('unit')
    }, [])

    useEffect(() => {
        fetchUnits()
    }, [fetchUnits])


    if (!entries.length) {
        return <p className={'center'}>Единиц измерения пока нет
            <UnitCreatingCard fetchEntries={fetchUnits}/>
        </p>
    }

    return (
        <Container>
            <Container>
                <Typography variant={'h3'}>Единицы измерения</Typography>
                <UnitCreatingCard fetchEntries={fetchUnits}/>
            </Container>
            <TableContainer>
                <Table>
                    <TableHead>
                <TableRow>
                    <TableCell align={'center'}>Полное название</TableCell>
                    <TableCell align={'center'}>Сокращенное название</TableCell>
                    <TableCell align={'center'}>Редактировать</TableCell>
                </TableRow>
                    </TableHead>

                <TableBody>
                {entries.map((unit) => {
                    return (
                        <TableRow key={unit._id}>
                            <CatalogsTableCol value={unit.fullName}
                                              inputType={'text'}
                                              endpoint={'unit'}
                                              entryId={unit._id}
                                              entryKey={'fullName'}
                            />
                            <CatalogsTableCol value={unit.abbreviatedName}
                                              inputType={'text'}
                                              endpoint={'unit'}
                                              entryId={unit._id}
                                              entryKey={'abbreviatedName'}
                            />
                            <TableCell align={'center'}>
                                <DeleteEntryButton fetchEntries={fetchUnits}
                                                   endpoint={'unit'}
                                                   entryId={unit._id}
                                                   entryName={unit.fullName}/>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}