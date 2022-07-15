import {FormControlLabel} from "@mui/material";
import {StyledSwitchComponent} from "../muiThemes/StyledSwitchComponent";



export const SwitchComponent = ({label, handleChange, name, checked}) => {
    return (
        <FormControlLabel control={<StyledSwitchComponent checked={checked} onChange={handleChange}/>} label={label} labelPlacement="start" name={name} />
    )
}