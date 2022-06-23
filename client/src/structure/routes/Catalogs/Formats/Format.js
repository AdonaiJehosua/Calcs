import 'reactjs-popup/dist/index.css';
import {FormatCreatingCard} from "./FormatCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol";


export const Formats = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchFormats = useCallback(async () => {
        fetchEntries('format')
    }, [])

    useEffect(() => {
        fetchFormats()
    }, [fetchFormats])


    if (!entries.length) {
        return <p className={'center'}>Форматов пока нет
            <FormatCreatingCard fetchEntries={fetchFormats}/>
        </p>
    }

    return (
        <div className={'container'}>
            <div className={'container'}>
                    <h3>Форматы</h3>
                    <FormatCreatingCard fetchEntries={fetchFormats}/>
            </div>
            <table className={'striped'}>
                <thead>
                <tr>
                    <th className={'center-align'}>Название</th>
                    <th className={'center-align'}>Высота</th>
                    <th className={'center-align'}>Ширина</th>
                    <th className={'center-align'}>Редактировать</th>
                </tr>
                </thead>

                <tbody>
                {entries.map((format) => {
                    return (
                        <tr key={format._id}>
                            <CatalogsTableCol value={format.formatName}
                                              inputType={'text'}
                                              endpoint={'format'}
                                              entryId={format._id}
                                              entryKey={'formatName'}
                            />
                            <CatalogsTableCol value={format.dimensions.height}
                                              inputType={'number'}
                                              endpoint={'format'}
                                              entryId={format._id}
                                              entryKey={'height'}
                            />
                            <CatalogsTableCol value={format.dimensions.width}
                                              inputType={'number'}
                                              endpoint={'format'}
                                              entryId={format._id}
                                              entryKey={'width'}
                            />
                            <td className={'center-align'}>
                                <DeleteEntryButton fetchEntries={fetchFormats}
                                                   endpoint={'format'}
                                                   entryId={format._id}
                                                   entryName={format.formatName}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}