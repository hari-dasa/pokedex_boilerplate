import React, { useEffect } from "react";
import { Icon, useGlobalConfig, useSettingsButton } from "@airtable/blocks/ui";
import { useState } from "react";
import Settings, {capitalizePrototypeConfig, isMainKeysSetted}  from "./Settings";
import { CupStraw, PersonWorkspace } from "react-bootstrap-icons";
import Header from "./Header";
import './App.scss';
import { globalConfig } from "@airtable/blocks";
import useCustomColors from "./useCustomColors";
import PokemonView from "./PokemonView";
import { Alert, Card, Tab, Tabs } from "react-bootstrap";

const App = () => {
    const [configSetted, setConfigSetted] = useState(false);
    const globalConfig = useGlobalConfig();

    useEffect(() => {
        capitalizePrototypeConfig();

        setConfigSetted(isMainKeysSetted(globalConfig));
    });
    // Show settings button
    const [isShowingSettings, setIsShowingSettings] = useState(false);
    useSettingsButton(function () {
        setIsShowingSettings(!isShowingSettings);
    });

    // Example of Bootstrap icons
    const icons = <div className="icons"><PersonWorkspace color="#5577AA" /><CupStraw color="#55AA77" /></div>;

    // Example of Globalconfig and use of custom hook
    const backgroundColor = globalConfig.get('backgroundColor') as string;
    const headerColor = globalConfig.get('headerColor') as string;
    useCustomColors({backgroundColor, headerColor});

    return (
        <div className="container">
            {isShowingSettings ? 
                <Settings /> 
                : 
                <>
                    <Header title="Pokédex Handle Features!" icon={icons} />
                    <p>Let's handle Pokédex base!</p>
                    {configSetted ?
                            <Tabs defaultActiveKey="pokemon" className="tables-tabs">
                                <Tab eventKey="pokemon" title="Pokémon Table">
                                    <PokemonView />
                                </Tab>                        
                                <Tab eventKey="types" title="Types Table">

                                </Tab>                              
                                <Tab eventKey="abilities" title="Abilities Table">

                                </Tab>              
                            </Tabs>
                        :
                        <>            

                            <>
                                <Alert variant="warning">
                                    <Alert.Heading>Check the settings!</Alert.Heading>
                                    <p>
                                        Define all settings before using the extension.
                                    </p>
                                    <hr />
                                    <p className="mb-0">
                                        Go to the settings interface, click on the engine
                                        icon  (
                                            <Icon name="cog" size={16} />
                                        ) and define all settings from 
                                        tables and fields that will be used.
                                    </p>
                                </Alert>
                            </>
                        </>
                    }
                </>
            }

        </div>
    );
}

export default App;