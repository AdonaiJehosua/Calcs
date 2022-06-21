export const Test = () => {


    const selectAll = () => {
        let selectedText = document.getElementById('select')
        selectedText.select()
        // let range = new Range()
        // range.selectNode(selectedText)
        // console.log(selectedText)
        // console.log(range)
    }

    return (
        <div>
            <input id={'select'} type={'text'}/>
            <button onClick={selectAll}>SelectAll</button>
        </div>
    )
}