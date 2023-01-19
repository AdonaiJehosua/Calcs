import {FormatCreatingCard} from "./FormatCreatingCard"
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton"
import {useEffect} from "react"
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol"
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material"
import {useToastedQuery} from "../../../../hooks/toastedQuery.hook"
import {Loader} from "../../../../components/Loader"
import {FETCH_FORMATS} from "../../../../graphQL/queries/formatQueries"
import {DELETE_FORMAT, UPDATE_FORMAT} from "../../../../graphQL/mutations/formatsMutations"

export const Formats = () => {

    const {entries, loading, makeQuery} = useToastedQuery(FETCH_FORMATS)

    const fetchFormats = async () => {
        await makeQuery('formats')
    }

    useEffect(() => {
        fetchFormats()
    }, [fetchFormats, entries])

    if (loading) {
        return (
            <Loader/>
        )
    }

    if (!entries.length) {
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
                                <TableRow key={format.id}>
                                    <CatalogsTableCol value={format.formatName}
                                                      inputType={'text'}
                                                      endpoint={'format'}
                                                      entryId={format.id}
                                                      entryKey={'formatName'}
                                                      updateMutation={UPDATE_FORMAT}
                                                      fetchQuery={FETCH_FORMATS}
                                    />
                                    <CatalogsTableCol value={format.dimensions.longSide}
                                                      inputType={'number'}
                                                      endpoint={'format'}
                                                      entryId={format.id}
                                                      entryKey={'longSide'}
                                                      updateMutation={UPDATE_FORMAT}
                                                      fetchQuery={FETCH_FORMATS}
                                    />
                                    <CatalogsTableCol value={format.dimensions.shortSide}
                                                      inputType={'number'}
                                                      endpoint={'format'}
                                                      entryId={format.id}
                                                      entryKey={'shortSide'}
                                                      updateMutation={UPDATE_FORMAT}
                                                      fetchQuery={FETCH_FORMATS}
                                    />
                                    <TableCell align={'center'}>
                                        <DeleteEntryButton gqlMutation={DELETE_FORMAT}
                                                           gqlQuery={FETCH_FORMATS}
                                                           queryName={'formats'}
                                                           entryId={format.id}
                                                           entryName={format.formatName}
                                        />
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