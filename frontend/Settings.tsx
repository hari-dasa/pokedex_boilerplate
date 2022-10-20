import { base } from '@airtable/blocks';
import { FieldType } from '@airtable/blocks/models';
import { ColorPalette, colors, colorUtils, FieldPickerSynced, FormField, TablePickerSynced, useGlobalConfig, ViewPickerSynced } from '@airtable/blocks/ui';
import React, { useEffect } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import Header from './Header';
import './Settings.scss';
import './FormField.scss';

const Settings = () => {
    const globalConfig = useGlobalConfig();

    const selectedPokemonTableId = globalConfig.get('selectedPokemonTableId') as string;

    const pokemonTable = base.getTableByIdIfExists(selectedPokemonTableId);

    // Color config example
    const backgroundColor = globalConfig.get('backgroundColor') as string;
    useEffect(() => {
        const root = window.document.documentElement;
        if (backgroundColor) {
            root.style.setProperty('--backgroundColor', colorUtils.getHexForColor(backgroundColor))
        }
    }, [backgroundColor]);
    const headerColor = globalConfig.get('headerColor') as string;
    useEffect(() => {
        const root = window.document.documentElement;
        if (headerColor) {
            root.style.setProperty('--headerColor', colorUtils.getHexForColor(headerColor))
        }
    }, [headerColor]);
    // -- End color config example

    return (
        <>
            <Header title="App Settings" icon={<Sliders color="#5577AA" />} />
            <Tabs defaultActiveKey="table-configuration" className="configuration-tabs">

                <Tab eventKey="table-configuration" title="Tables">
                    <Card className="configuration">
                        <FormField label="Tables that will be used within the application" marginBottom={3} className="picker-formfield">
                            <TablePickerSynced 
                                globalConfigKey="selectedPokemonTableId" 
                                placeholder="Pick the Pokémon table"
                            />

                            <TablePickerSynced 
                                globalConfigKey="selectedAbilityTableId" 
                                placeholder="Pick the Ability table"
                            />

                            <TablePickerSynced 
                                globalConfigKey="selectedTypeTableId" 
                                placeholder="Pick the Type table"
                            />
                        </FormField>
                    </Card>
                </Tab>



                <Tab eventKey="field-configuration" title="Fields">
                    <Card className="configuration">
                        <FormField label="Fields that will be used within the application" marginBottom={3} className="picker-formfield">
                            <FieldPickerSynced
                            shouldAllowPickingNone={true}
                                table={pokemonTable}
                                allowedTypes={[FieldType.SINGLE_LINE_TEXT]}
                                globalConfigKey="selectedNameFieldId"
                                placeholder="Pick the Name field"
                            />
                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.MULTIPLE_ATTACHMENTS]}
                                globalConfigKey="selectedSpriteFieldId"
                                placeholder="Pick the Sprite field"
                            />

                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.SINGLE_SELECT]}
                                globalConfigKey="selectedGenerationFieldId"
                                placeholder="Pick the Generation field"
                            />

                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedHeightFieldId"
                                placeholder="Pick the Height field"
                            />    

                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedBaseExperienceFieldId"
                                placeholder="Pick the Base Experience field"
                            />             
                              
                             <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedOrderFieldId"
                                placeholder="Pick the Order field"
                            />                   
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedWeightFieldId"
                                placeholder="Pick the Weight field"
                            />                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedHPFieldId"
                                placeholder="Pick the HP field"
                            />                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedAttackFieldId"
                                placeholder="Pick the Attack field"
                            />                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.NUMBER]}
                                globalConfigKey="selectedDefenseFieldId"
                                placeholder="Pick the Defense field"
                            />                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.MULTIPLE_SELECTS]}
                                globalConfigKey="selectedGamesFieldId"
                                placeholder="Pick the Games field"
                            />                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.MULTIPLE_RECORD_LINKS]}
                                globalConfigKey="selectedTypesFieldId"
                                placeholder="Pick the Linked Types field"
                            />                            
                            <FieldPickerSynced
                                table={pokemonTable}
                                allowedTypes={[FieldType.MULTIPLE_RECORD_LINKS]}
                                globalConfigKey="selectedAbilityFieldId"
                                placeholder="Pick the Linked Ability  field"
                            />                       
                            
                        </FormField>
                    </Card>
                </Tab>

                <Tab eventKey="colors" title="Colors">
                    {/* Color config example */}
                    <Card className="configuration colors">
                        <FormField label="Background Color">
                            <ColorPalette
                                onChange={newColor => globalConfig.setAsync('backgroundColor', newColor)}
                                allowedColors={Object.values(colors)}
                                width="150px"
                            />
                        </FormField>
                        <FormField label="Header Color">
                            <ColorPalette
                                onChange={newColor => globalConfig.setAsync('headerColor', newColor)}
                                allowedColors={Object.values(colors)}
                                width="150px"
                            />
                        </FormField>
                    </Card>
                    {/* End color config example */}
                </Tab>

                <Tab eventKey="about" title="About">
                    <Card className="configuration">
                        <p>It is an app to handle features in the Pokédex base.</p>
                    </Card>
                </Tab>
                <Tab eventKey="license" title="License">
                    <Card className="configuration">
                        &copy; {new Date().getFullYear()} InAir Studio - Hari Dasa
                    </Card>
                </Tab>
            </Tabs>
        </>
    )
}

export function capitalizePrototypeConfig() {
    Object.defineProperty(String.prototype, 'capitalize', {
        value: function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        configurable: true,
        enumerable: false
    });
};


export function isMainKeysSetted(globalConfig) {
    
    const selectedPokemonTableId = globalConfig.get('selectedPokemonTableId') as string;
    const selectedAbilityTableId = globalConfig.get('selectedAbilityTableId') as string;
    const selectedTypeTableId    = globalConfig.get('selectedTypeTableId') as string;

    const selectedNameFieldId          = globalConfig.get('selectedNameFieldId') as string ;
    const selectedSpriteFieldId        = globalConfig.get('selectedSpriteFieldId') as string ;
    const selectedGenerationFieldId    = globalConfig.get('selectedGenerationFieldId') as string ;
    const selectedHeightFieldId        = globalConfig.get('selectedHeightFieldId') as string ;
    const selectedBaseExperienceFieldId= globalConfig.get('selectedBaseExperienceFieldId') as string ;
    const selectedWeightFieldId        = globalConfig.get('selectedWeightFieldId') as string ;
    const selectedHPFieldId            = globalConfig.get('selectedHPFieldId') as string ;
    const selectedAttackFieldId        = globalConfig.get('selectedAttackFieldId') as string ;
    const selectedDefenseFieldId       = globalConfig.get('selectedDefenseFieldId') as string ;
    const selectedGamesFieldId         = globalConfig.get('selectedGamesFieldId') as string ;
    const selectedTypesFieldId         = globalConfig.get('selectedTypesFieldId') as string ;
    const selectedAbilityFieldId       = globalConfig.get('selectedAbilityFieldId') as string ;
    const selectedOrderFieldId         = globalConfig.get('selectedOrderFieldId') as string ;

    if(
        selectedPokemonTableId  &&
        selectedAbilityTableId  &&
        selectedTypeTableId     &&

        selectedSpriteFieldId &&
        selectedNameFieldId  &&
        selectedGenerationFieldId &&
        selectedHeightFieldId   &&
        selectedBaseExperienceFieldId   &&
        selectedWeightFieldId   &&        
        selectedHPFieldId   &&            
        selectedAttackFieldId   &&        
        selectedDefenseFieldId   &&       
        selectedGamesFieldId   &&         
        selectedTypesFieldId   &&         
        selectedAbilityFieldId   &&       
        selectedOrderFieldId         
    )
        return true;
    return false;
};

export default Settings;