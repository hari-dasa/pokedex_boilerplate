import {useBase, useGlobalConfig, useRecords} from '@airtable/blocks/ui';
import React from 'react';
import { Accessors} from './Accessors';

class PokemonTableDataHandle 
{
    public typesRecords;
    public abilitieRecords;
    public globalConfig;

    constructor(abilitieRecords, typesRecords, globalConfig) {
        this.typesRecords = typesRecords;
        this.abilitieRecords = abilitieRecords;
        this.globalConfig = globalConfig;
    }

    private getFieldsId(){

        return {
         selectedNameFieldId          : this.globalConfig.get('selectedNameFieldId') as string ,
         selectedSpriteFieldId        : this.globalConfig.get('selectedSpriteFieldId') as string ,
         selectedGenerationFieldId    : this.globalConfig.get('selectedGenerationFieldId') as string ,
         selectedHeightFieldId        : this.globalConfig.get('selectedHeightFieldId') as string ,
         selectedBaseExperienceFieldId: this.globalConfig.get('selectedBaseExperienceFieldId') as string ,
         selectedWeightFieldId        : this.globalConfig.get('selectedWeightFieldId') as string ,
         selectedHPFieldId            : this.globalConfig.get('selectedHPFieldId') as string ,
         selectedAttackFieldId        : this.globalConfig.get('selectedAttackFieldId') as string ,
         selectedDefenseFieldId       : this.globalConfig.get('selectedDefenseFieldId') as string ,
         selectedGamesFieldId         : this.globalConfig.get('selectedGamesFieldId') as string ,
         selectedTypesFieldId         : this.globalConfig.get('selectedTypesFieldId') as string ,
         selectedAbilityFieldId       : this.globalConfig.get('selectedAbilityFieldId') as string ,
         selectedOrderFieldId         : this.globalConfig.get('selectedOrderFieldId') as string ,
        };
    }

    public async formatData({id, name, height, weight, order, base_experience, stats, game_indices, sprites, types, abilities}){
        const {
            selectedNameFieldId,         
            selectedSpriteFieldId ,        
            selectedGenerationFieldId ,    
            selectedHeightFieldId ,        
            selectedBaseExperienceFieldId ,
            selectedWeightFieldId ,        
            selectedHPFieldId ,            
            selectedAttackFieldId ,        
            selectedDefenseFieldId ,       
            selectedGamesFieldId ,         
            selectedTypesFieldId ,         
            selectedAbilityFieldId, 
            selectedOrderFieldId       
        } = this.getFieldsId();

        return {
            [selectedNameFieldId]:   name,//Name
            [selectedHeightFieldId]:   height,
            [selectedBaseExperienceFieldId]:   base_experience,
            [selectedWeightFieldId]:   weight,
            [selectedHPFieldId]:   stats[0].base_stat,//HP
            [selectedAttackFieldId]:   stats[1].base_stat,//Attack
            [selectedDefenseFieldId]:   stats[2].base_stat,//Defense
            [selectedOrderFieldId]:   order,

            [selectedGenerationFieldId]:   this.defineGeneration(id),

            [selectedGamesFieldId]:   this.defineGames(game_indices),

            [selectedTypesFieldId]:    await this.getRecordsIdFromTable(types, 'type'),
            [selectedAbilityFieldId]:    await this.getRecordsIdFromTable(abilities, 'ability'),

            [selectedSpriteFieldId]:     this.getSprites(Object.values(sprites)),
        };
    }

    private getRecordsIdFromFilter(records, types, field)
    {
        let recordsIds = [];
        for(var x = 0; x < types.length; x++) {
            let right  = records.length - 1;
            let left = 0;
            let middle = 0;

            while(left <= right){
                middle = Math.floor((left+right) / 2);

                if (records[middle].name.toLowerCase() == types[x][field].name){
                    recordsIds.push({ id: records[middle].id});
                    types.slice(x, 1)//
                    break;
                }else if(records[middle].name.toLowerCase()  < types[x][field].name){
                    left = middle + 1;
                } else {
                    right = middle - 1;
                }
            }
        
        }
        return recordsIds;
    }

    async getRecordsIdFromTable(arrayToCompare, attributeName){
        if(attributeName == "ability")
            return this.getRecordsIdFromFilter( this.abilitieRecords, arrayToCompare, attributeName);

        if(attributeName == "type")
            return this.getRecordsIdFromFilter( this.typesRecords, arrayToCompare, attributeName);
    }

    private getSprites(sprites){
        return sprites.reduce(function(result, sprite) {
                if((typeof sprite) === 'string') 
                    result.push({url: sprite});
                return result;
            },
        []);
    }

    private defineGeneration(id)
    {
        if (id <= 151)
            return {name: 'Generation I'};
        return {name: 'Generation II'};
    }

    private defineGames(games)
    {
        return games.slice(0,4).map(game => {
            if(game.version.name.includes('-'))  
                return { name: game.version.name.replace('-', ' ').capitalize()};
            else 
                return { name: game.version.name.capitalize()};
        });    }

}

export default PokemonTableDataHandle;
