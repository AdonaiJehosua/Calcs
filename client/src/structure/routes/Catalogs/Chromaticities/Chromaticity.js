import {ChromaticityCreatingCard} from "./ChromaticityCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useEffect} from "react";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useToastedQuery} from "../../../../hooks/toastedQuery.hook";
import {FETCH_CHROMATICITIES} from "../../../../graphQL/queries/chromaticitiesQueries";
import {Loader} from "../../../../components/Loader";
import {DELETE_CHROMATICITY} from "../../../../graphQL/mutations/chromaticitiesMutation";


export const Chromaticities = () => {

    const {entries, loading, makeQuery} = useToastedQuery(FETCH_CHROMATICITIES)


    const fetchUnits = async () => {
        await makeQuery('chromaticities')
    }

    useEffect(() => {
        fetchUnits()
    }, [fetchUnits, entries])

    if (loading) {
        return (
            <Loader/>
        )
    }

    if (!entries.length) {
        return (
            <>
                <Typography variant={'h4'}>Цветностей пока нет</Typography>
                <ChromaticityCreatingCard fetchEntries={fetchUnits}/>
            </>)
    }

    return (
        <Container>
            <Container>
                <Typography variant={'h3'}>Цветность</Typography>
                <ChromaticityCreatingCard fetchEntries={fetchUnits}/>
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
                                <TableRow key={chromaticity.id}>
                                    <TableCell align={'center'}>
                                        {chromaticity.name}
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <DeleteEntryButton gqlMutation={DELETE_CHROMATICITY}
                                                           gqlQuery={FETCH_CHROMATICITIES}
                                                           queryName={'chromaticity'}
                                                           entryId={chromaticity.id}
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