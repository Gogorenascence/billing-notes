import React, { useEffect } from 'react';

const ICD10Autocomplete = () => {

    useEffect(() => {
        if (window.Def && window.Def.Autocompleter) {
            new window.Def.Autocompleter.Search('icd10', 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name', {
                tableFormat: true,
                valueCols: [0],
                colHeaders: ['Code', 'Name']
            });
        }
    }, []);

    return (
        <div>
            <input type="text" id="icd10" placeholder="Code or name" />
        </div>
    );
};

export default ICD10Autocomplete;
