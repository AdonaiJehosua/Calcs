import {СhromaticityCreatingCard} from "./ChromaticityCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";


export const Chromaticities = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchUnits = useCallback(async () => {
        fetchEntries('chromaticity')
    }, [])

    useEffect(() => {
        fetchUnits()
    }, [fetchUnits])

    if (!entries.length) {
        return (
            <>
                <Typography variant={'h4'}>Цветностей пока нет</Typography>
                <СhromaticityCreatingCard fetchEntries={fetchUnits}/>
            </>)
    }

    return (
        <Container>
            <Container>
                <Typography variant={'h3'}>Цветность</Typography>
                <СhromaticityCreatingCard fetchEntries={fetchUnits}/>
            </Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}>Цветность</TableCell>
                            <TableCell align={'center'}>Редактировать</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((chromaticity) => {
                            return (
                                <TableRow key={chromaticity._id}>
                                    <TableCell align={'center'}>
                                        {chromaticity.name}
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <DeleteEntryButton fetchEntries={fetchUnits}
                                                           endpoint={'chromaticity'}
                                                           entryId={chromaticity._id}
                                                           entryName={chromaticity.name}/>
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