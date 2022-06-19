import 'reactjs-popup/dist/index.css';
import {UnitCreatingCard} from "./UnitCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";


export const Units = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchUnits = useCallback( async () => {
        fetchEntries('unit')
    }, [])

    useEffect( () => {
        fetchUnits()
    }, [fetchUnits])


    if (!entries.length) {
        return <p className={'center'}>Единиц измерения пока нет <UnitCreatingCard fetchEntries={fetchUnits}/>
        </p>
    }

    return (
        <div className={'container'}>
            <UnitCreatingCard fetchEntries={fetchUnits}/>
            <table className={'striped'}>
                <thead>
                <tr>
                    <th>Полное название</th>
                    <th>Сокращенное название</th>
                </tr>
                </thead>

                <tbody>
                {entries.map((unit) => {
                    return (
                        <tr key={unit._id}>
                            <td>{unit.fullName}</td>
                            <td>{unit.abbreviatedName}</td>
                            <td>
                                <DeleteEntryButton fetchEntries={fetchUnits}
                                                   endpoint={'unit'}
                                                   entryId={unit._id}
                                                   entryName={unit.fullName}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}