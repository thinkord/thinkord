import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuid } from "uuid";

export const TabsContext = React.createContext({
    tabs: []
});

const TabsContextProvider = props => {
    const [tabsList, setTabsList] = useState([]);

    const addTab = (title, collectionId) => {
        setTabsList(currentTabList => {
            const newTabId = uuid();
            let updatedTabs = [...currentTabList]
            const targetIndex = updatedTabs.findIndex(tab => {
                return tab.collectionId === collectionId;
            })
            console.log(targetIndex)
            if(targetIndex >= 0){ //if the tab already exists, don't add it.
                props.history.push(`/work/${collectionId}`)
            } else {
                const newTab = {
                    id: newTabId,
                    title: title,
                    collectionId: collectionId
                };
                updatedTabs = [...currentTabList, newTab]
            }
            return updatedTabs;
        });
    };

    const closeTab = (tabId) => {
        setTabsList(currentTabList => {
            const updatedTabs = [...currentTabList]
            const targetIndex = updatedTabs.findIndex(tab => {
                return tab.id === tabId;
            })
            updatedTabs.splice(targetIndex, 1)
            return updatedTabs;
        });
    }

    return (
        <TabsContext.Provider
            value={{ tabs: tabsList, addTab: addTab, closeTab: closeTab }}
        >
            {props.children}
        </TabsContext.Provider>
    );
};

export default withRouter(TabsContextProvider);