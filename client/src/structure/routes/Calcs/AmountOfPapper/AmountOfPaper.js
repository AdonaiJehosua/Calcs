import {useState} from "react";
import {calculateNumberOfSheets} from "../../../../formulas/calculateNumberOfSheets";

export const AmountOfPaper = () => {

    const initialState = {
        numberOfSheets: '',
        numberOfCopies: '',
        listWidth: '',
        listHeight: '',
        paperWidth: '',
        paperHeight: '',
        result: 0
    }

    const [form, setForm] = useState(initialState)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const calculate = () => {
        const result = calculateNumberOfSheets(form.numberOfSheets, form.numberOfCopies, form.listWidth, form.listHeight, form.paperWidth, form.paperHeight)
        setForm({...form, result: result})

    }

    const clear = () => {
        setForm(initialState)
    }

    return (
        <div className="App">
            <div className={'container'}>
                <div>Количество листов
                    <input id={'numberOfSheets'}
                           name={'numberOfSheets'}
                           type={'number'}
                           value={form.numberOfSheets}
                           onChange={changeHandler}/>
                </div>
                <div>Тираж
                    <input id={'numberOfCopies'}
                           name={'numberOfCopies'}
                           type={'number'}
                           value={form.numberOfCopies}
                           onChange={changeHandler}/>
                </div>
                <div>Формат листа<br/>
                    <input placeholder={'width'}
                           id={'listWidth'}
                           name={'listWidth'}
                           type={'number'}
                           value={form.listWidth}
                           onChange={changeHandler}/><br/>
                    <input placeholder={'height'}
                           id={'listHeight'}
                           name={'listHeight'}
                           type={'number'}
                           value={form.listHeight}
                           onChange={changeHandler}/>
                </div>
                <div>Формат бумаги<br/>
                    <input placeholder={'width'}
                           id={'paperWidth'}
                           name={'paperWidth'}
                           type={'number'}
                           value={form.paperWidth}
                           onChange={changeHandler}/><br/>
                    <input placeholder={'height'}
                           id={'paperHeight'}
                           name={'paperHeight'}
                           type={'number'}
                           value={form.paperHeight}
                           onChange={changeHandler}/>
                </div>
                <button onClick={calculate}>Calculate</button>
                <button onClick={clear}>Clear</button>
                <div>Листов понадобится: {form.result}</div>
            </div>
        </div>
    )
}