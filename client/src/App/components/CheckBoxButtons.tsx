import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    
    onChange: (items: string[]) => void;
}

export default function CheckBoxButtons({items, checked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || [])

    function handeledChecked(value: string)
    {
        const currentIdenx = checkedItems.findIndex(item => item == value);
        let newChecked: string[] = []
        if (currentIdenx === -1 ) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return(
        <FormGroup>
        {items.map(item => (

          <FormControlLabel 
          control={<Checkbox 
                checked={checkedItems.indexOf(item) !== -1}
                onClick={() => handeledChecked(item)}
          />} 
          label={item} 
          key={item} />

        ))}
      </FormGroup>
    )
}