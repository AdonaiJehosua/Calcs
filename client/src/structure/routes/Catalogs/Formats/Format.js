import 'reactjs-popup/dist/index.css';
import {FormatCreatingCard} from "./FormatCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {CatalogsTableRow} from "../../../../components/CatalogsTableRow";


export const Formats = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchFormats = useCallback(async () => {
        fetchEntries('format')
    }, [])

    useEffect(() => {
        fetchFormats()
    }, [fetchFormats])


    if (!entries.length) {
        return <p className={'center'}>Форматов пока нет <FormatCreatingCard fetchEntries={fetchFormats}/>
        </p>
    }

    return (
        <div className={'container'}>
            <FormatCreatingCard fetchEntries={fetchFormats}/>
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
                            <td className={'center-align'}>
                               <CatalogsTableRow value={format.formatName}
                                                 inputType={'text'}
                                                 endpoint={'format'}
                                                 entryId={format._id}
                                                 entryKey={'formatName'}
                               />
                            </td>
                            <td className={'center-align'}>{format.dimensions.height}</td>
                            <td className={'center-align'}>{format.dimensions.width}</td>
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