import {DeleteEntryButton} from "../../../../components/DeleteEntryButton"
import {useEffect} from "react"
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol"
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material"
import {useToastedQuery} from "../../../../hooks/toastedQuery.hook"
import {Loader} from "../../../../components/Loader"
import { FETCH_PRODUCTION_TYPES } from "../../../../graphQL/queries/productionTypesQueries"
import { DELETE_PRODUCTION_TYPE } from "../../../../graphQL/mutations/productionTypeMutation"
import { ProductionTypeCreatingCard } from "./ProductionTypesCreatingCard"

export const ProductionTypes = () => {

    const {entries, loading, makeQuery} = useToastedQuery(FETCH_PRODUCTION_TYPES)

    const fetchProductionTypes = async () => {
        await makeQuery('productionTypes')
    }


    useEffect(() => {
        fetchProductionTypes()
    }, [fetchProductionTypes, entries])

    if (loading) {
        return (
            <Loader/>
        )
    }

    if (!entries.length) {
        return <p className={'center'}>Единиц измерения пока нет
            <ProductionTypeCreatingCard fetchEntries={fetchProductionTypes}/>
        </p>
    }

    return (
        <Container>
            <Container>
                <Typography variant={'h3'}>Единицы измерения</Typography>
                <ProductionTypeCreatingCard fetchEntries={fetchProductionTypes}/>
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
                {entries.map((prtype) => {
                    return (
                        <TableRow key={prtype.id}>
                            <CatalogsTableCol value={prtype.productionType}
                                              inputType={'text'}
                                              endpoint={'productionType'}
                                              entryId={prtype.id}
                                              entryKey={'productionType'}
                            />
                            <CatalogsTableCol value={prtype.description}
                                              inputType={'text'}
                                              endpoint={'productionType'}
                                              entryId={prtype.id}
                                              entryKey={'description'}
                            />
                            <TableCell align={'center'}>
                                <DeleteEntryButton gqlMutation={DELETE_PRODUCTION_TYPE}
                                                   gqlQuery={FETCH_PRODUCTION_TYPES}
                                                   queryName={'productionType'}
                                                   entryId={prtype.id}
                                                   entryName={prtype.productionType}/>
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