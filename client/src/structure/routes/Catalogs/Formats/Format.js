import 'reactjs-popup/dist/index.css';
import {FormatCreatingCard} from "./FormatCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";


export const Formats = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchFormats = useCallback( async () => {
        fetchEntries('format')
    }, [])

    useEffect( () => {
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
                    <th>Название</th>
                    <th>Высота</th>
                    <th>Ширина</th>
                    <th>Редактировать</th>
                </tr>
                </thead>

                <tbody>
                {entries.map((format) => {
                    return (
                            <tr key={format._id}>
                                <td>{format.formatName}</td>
                                <td>{format.dimensions.height}</td>
                                <td>{format.dimensions.width}</td>
                                <td>
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