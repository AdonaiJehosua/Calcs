import {UnitCreatingCard} from "./UnitCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useEffect} from "react";
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useToastedQuery} from "../../../../hooks/toastedQuery.hook";
import {FETCH_UNITS} from "../../../../graphQL/queries/unitQueries";
import {Loader} from "../../../../components/Loader";
import {DELETE_UNIT} from "../../../../graphQL/mutations/unitMutation";

export const Units = () => {

    const {entries, loading, makeQuery} = useToastedQuery(FETCH_UNITS)

    const fetchUnits = async () => {
        await makeQuery('units')
    }

    useEffect(() => {
        fetchUnits()
    }, [fetchUnits])

    if (loading) {
        return (
            <Loader/>
        )
    }

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
                                              entryId={unit.id}
                                              entryKey={'fullName'}
                            />
                            <CatalogsTableCol value={unit.abbreviatedName}
                                              inputType={'text'}
                                              endpoint={'unit'}
                                              entryId={unit.id}
                                              entryKey={'abbreviatedName'}
                            />
                            <TableCell align={'center'}>
                                <DeleteEntryButton query={DELETE_UNIT}
                                                   entryId={unit.id}
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