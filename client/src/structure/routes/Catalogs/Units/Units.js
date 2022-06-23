import 'reactjs-popup/dist/index.css';
import {UnitCreatingCard} from "./UnitCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol";


export const Units = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchUnits = useCallback(async () => {
        fetchEntries('unit')
    }, [])

    useEffect(() => {
        fetchUnits()
    }, [fetchUnits])


    if (!entries.length) {
        return <p className={'center'}>Единиц измерения пока нет
            <UnitCreatingCard fetchEntries={fetchUnits}/>
        </p>
    }

    return (
        <div className={'container'}>
            <div className={'container'}>
                <h3>Единицы измерения</h3>
                <UnitCreatingCard fetchEntries={fetchUnits}/>
            </div>
            <table className={'striped'}>
                <thead>
                <tr>
                    <th className={'center-align'}>Полное название</th>
                    <th className={'center-align'}>Сокращенное название</th>
                </tr>
                </thead>

                <tbody>
                {entries.map((unit) => {
                    return (
                        <tr key={unit._id}>
                            <CatalogsTableCol value={unit.fullName}
                                              inputType={'text'}
                                              endpoint={'unit'}
                                              entryId={unit._id}
                                              entryKey={'fullName'}
                            />
                            <CatalogsTableCol value={unit.abbreviatedName}
                                              inputType={'text'}
                                              endpoint={'unit'}
                                              entryId={unit._id}
                                              entryKey={'abbreviatedName'}
                            />
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