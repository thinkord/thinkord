/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import appRuntime from "../appRuntime";

export const TabsContext = React.createContext({
    tabs: [],
});

const TabsContextProvider = (props) => {
    let [tabsList, setTabsList] = useState([]);

    const tabExisted = (collectionId) => {
        const targetIndex = tabsList.findIndex((tab) => {
            return tab.collectionId === collectionId;
        });
        return targetIndex >= 0;
    };

    const changeTab = (collectionId) => {
        if (tabExisted(collectionId)) {
            props.history.push(`/work/${collectionId}`);
        }
    };

    const loadTab = () => {
        let currentTabs = localStorage.getItem("current_tabs");
        let tabs = JSON.parse(currentTabs);
        setTabsList(tabs);
    };

    const addTab = (title, collectionId) => {
        setTabsList((currentTabList) => {
            const newTabId = uuid();
            let updatedTabs = [...currentTabList];
            if (!tabExisted(collectionId)) {
                //if the tab doesn't exists, add it.
                const newTab = {
                    id: newTabId,
                    title: title,
                    collectionId: collectionId,
                };
                updatedTabs = [...currentTabList, newTab];
            }

            localStorage.setItem("current_tabs", JSON.stringify(updatedTabs));
            return updatedTabs;
        });
    };

    const closeTab = (tabId) => {
        setTabsList((currentTabList) => {
            const updatedTabs = [...currentTabList];
            const targetIndex = updatedTabs.findIndex((tab) => {
                return tab.id === tabId;
            });
            updatedTabs.splice(targetIndex, 1);
            localStorage.setItem("current_tabs", JSON.stringify(updatedTabs));
            return updatedTabs;
        });
        appRuntime.invoke("window-channel", "close", { win: "controlWin" });
    };

    return (
        <TabsContext.Provider
            value={{
                test: "test",
                tabs: tabsList,
                addTab: addTab,
                closeTab: closeTab,
                changeTab: changeTab,
                loadTab: loadTab,
            }}
        >
            {props.children}
        </TabsContext.Provider>
    );
};

export default withRouter(TabsContextProvider);
