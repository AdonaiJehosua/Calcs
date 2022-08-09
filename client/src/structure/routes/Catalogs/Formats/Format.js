import {FormatCreatingCard} from "./FormatCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useGraphqlQuery} from "../../../../hooks/graphqlQuery.hook";
import {Loader} from "../../../../components/Loader";
import {FETCH_FORMATS} from "../../../../graphQL/queries/formatQueries";


export const Formats = () => {

    const {entries, loading, request} = useGraphqlQuery(FETCH_FORMATS)

    const fetchFormats = async () => {
        await request('formats')
    }

    useEffect(() => {
        fetchFormats()
    }, [fetchFormats])

    if (loading) {
        return (
            <Loader/>
        )
    }

    if (!loading && !entries.length) {
        return (
            <>
                <Typography variant={'h4'}>Форматов пока нет</Typography>
                <FormatCreatingCard fetchEntries={fetchFormats}/>
            </>)
    }

    return (
        <Container>
            <Container>
                <Typography variant={'h3'}>Форматы</Typography>
                <FormatCreatingCard fetchEntries={fetchFormats}/>
            </Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}>Название</TableCell>
                            <TableCell align={'center'}>Длинная сторона</TableCell>
                            <TableCell align={'center'}>Короткая сторона</TableCell>
                            <TableCell align={'center'}>Редактировать</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {entries.map((format) => {
                            return (
                                <TableRow key={format._id}>
                                    <CatalogsTableCol value={format.formatName}
                                                      inputType={'text'}
                                                      endpoint={'format'}
                                                      entryId={format._id}
                                                      entryKey={'formatName'}
                                    />
                                    <CatalogsTableCol value={format.dimensions.longSide}
                                                      inputType={'number'}
                                                      endpoint={'format'}
                                                      entryId={format._id}
                                                      entryKey={'longSide'}
                                    />
                                    <CatalogsTableCol value={format.dimensions.shortSide}
                                                      inputType={'number'}
                                                      endpoint={'format'}
                                                      entryId={format._id}
                                                      entryKey={'shortSide'}
                                    />
                                    <TableCell align={'center'}>
                                        <DeleteEntryButton fetchEntries={fetchFormats}
                                                           endpoint={'format'}
                                                           entryId={format._id}
                                                           entryName={format.formatName}/>
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