import 'reactjs-popup/dist/index.css';
import {СhromaticityCreatingCard} from "./ChromaticityCreatingCard";
import {DeleteEntryButton} from "../../../../components/DeleteEntryButton";
import {useFetchEntries} from "../../../../hooks/fetchEntries.hook";
import {useCallback, useEffect} from "react";
import {CatalogsTableCol} from "../../../../components/CatalogsTableCol";


export const Chromaticities = () => {

    const {entries, fetchEntries} = useFetchEntries()

    const fetchUnits = useCallback(async () => {
        fetchEntries('chromaticity')
    }, [])

    useEffect(() => {
        fetchUnits()
    }, [fetchUnits])


    if (!entries.length) {
        return <p className={'center'}>Цветностей пока нет
            <СhromaticityCreatingCard fetchEntries={fetchUnits}/>
        </p>
    }

    return (
        <div className={'container'}>
            <div className={'container'}>
                <h3>Цветность</h3>
                <СhromaticityCreatingCard  fetchEntries={fetchUnits}/>
            </div>
            <table className={'striped'}>
                <thead>
                <tr>
                    <th className={'center-align'}>Лицо</th>
                    <th className={'center-align'}></th>
                    <th className={'center-align'}>Оборот</th>
                </tr>
                </thead>

                <tbody>
                {entries.map((chromaticity) => {
                    return (
                        <tr key={chromaticity._id}>
                            <CatalogsTableCol value={chromaticity.front}
                                              inputType={'number'}
                                              endpoint={'chromaticity'}
                                              entryId={chromaticity._id}
                                              entryKey={'front'}
                            />
                            <td className={'center-align'}>+</td>
                            <CatalogsTableCol value={chromaticity.back}
                                              inputType={'number'}
                                              endpoint={'chromaticity'}
                                              entryId={chromaticity._id}
                                              entryKey={'back'}
                            />
                            <td>
                                <DeleteEntryButton fetchEntries={fetchUnits}
                                                   endpoint={'chromaticity'}
                                                   entryId={chromaticity._id}
                                                   entryName={`${chromaticity.front} + ${chromaticity.back}`}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}