import {useRecords, useBase} from '@airtable/blocks/ui';

export class Accessors
{
    public table;
    public tableName;

    constructor(tableName)
    {
        this.tableName = tableName;
        this.table = this.geBaseTable(tableName);
    }
    
    getBase(){
        return useBase();
    };
      
    geBaseTable(tableName){
        if(tableName.startsWith('tbl'))
            return this.getBase().getTableByIdIfExists(tableName)
        return this.getBase().getTableByNameIfExists(tableName);
    };
    
    getRecords() {
        return useRecords(this.table);
    };
    
      SelectRecords(fieldName) {
        const queryResult = this.table.selectRecords({
            sorts: [{field: fieldName}],
            fields: [fieldName]
        });
        return useRecords(queryResult);
    };
    
    getFields(fields = null){
        if(!fields)
            return this.table.fields;
    
        return this.table.fields.reduce(function(result, field) {
                if(fields.includes(field.name) || fields.includes(field.id) ) 
                    result.push(field);
                return result;
            },
        []);
    };
}