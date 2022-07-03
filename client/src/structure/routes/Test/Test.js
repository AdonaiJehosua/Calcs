import {SelectComponent} from "../../../components/SelectComponent";

export const Test = () => {

    return (
        <>

             <SelectComponent label={'Формат'} nameKey={'formatName'} endpoint={'format'}/>
             <SelectComponent label={'Цветность'} nameKey={'front'} endpoint={'chromaticity'}/>
        </>
    )
}