import {Button, expandRecordPickerAsync, FormField, RecordCardList, Box, useBase, useRecords, useGlobalConfig, Icon} from '@airtable/blocks/ui';
import React, { useEffect, useState } from 'react';
import { Alert, Card, Tab } from 'react-bootstrap';
import { Accessors } from './Accessors';
import PokemonTableDataHandle from './PokemonDataHandle';
import "./PokemonView.scss";
import "./FormField.scss";

function PokemonView({}) {

    const PokeApi = "https://pokeapi.co/api/v2/";

    const [showRecords, setShowRecords] = useState(false);
    const [successAction, setSuccessAction] = useState(false);
    const globalConfig = useGlobalConfig();

    const tableId               = globalConfig.get('selectedPokemonTableId') as string;
    const selectedAbilityTableId= globalConfig.get('selectedAbilityTableId') as string;
    const selectedTypeTableId   = globalConfig.get('selectedTypeTableId') as string;
    
    const pokemonAcessor = new Accessors(tableId);
    const dataHandler    = new PokemonTableDataHandle(
            (new Accessors(selectedAbilityTableId)).getRecords()
            ,
            (new Accessors(selectedTypeTableId)).getRecords(),
            globalConfig
        );

    const fetchdata = async (record) => {
        let response = await fetch(`${PokeApi}pokemon/${record.name.toLowerCase()}`);
        return await response.json();
    }

    const createPokemon = async (record) => {
        setShowRecords(!showRecords);
        const payload     = await fetchdata(record);
        await pokemonAcessor.table.createRecordAsync( await dataHandler.formatData(payload));
        succesAlert();
    }

    const succesAlert = () => {
        setSuccessAction(!successAction);
        setTimeout(() => {
                setSuccessAction(false);
            }, 3000);
    }

    const pokemonRecords       = pokemonAcessor.getRecords();
    const pokemonEnabledFields  = pokemonAcessor.getFields([
                                    globalConfig.get('selectedNameFieldId') as string,//"Name", 
                                    globalConfig.get('selectedSpriteFieldId') as string,//"Sprites", 
                                    globalConfig.get('selectedGenerationFieldId') as string,//"Generation"
                                ]);

    return (
        <>
            <Card className='pokemon'>
                {successAction ?
                        <Alert variant="success" className='alert-success'>
                           <Icon name="check"/>Action executed with success!
                        </Alert>
                    :
                        <></>
                }
                <Box>
                    <FormField label=" Pokemons Duplicate " className='picker-formfield'>
                        <Button
                            icon="link"
                            className="pokemon-list-button"
                            onClick={() => setShowRecords(!showRecords)}
                        >
                            Click to list the records and pick one to duplicate
                        </Button>
                        { showRecords ?
                                <Box className='pokemon-list-box' height="350px" border="thick" backgroundColor="lightGray1">
                                    <RecordCardList 
                                        records={pokemonRecords} 
                                        fields={pokemonEnabledFields}
                                        onRecordClick={(record) => {
                                            createPokemon(record);
                                        }}
                                    />
                                </Box>
                                :<></>
                        }
                    </FormField>
                </Box>
            </Card>
        </>
    );

}

export default PokemonView;