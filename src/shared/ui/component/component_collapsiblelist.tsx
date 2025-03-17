import React from "@rbxts/react";
import { ComponentBase } from "./component_styledbase";
import { ComponentStyledTextLabel } from "./component_styledlabel";
import { ComponentProperties } from "./properties";
import { ComponentWindow } from "./component_window";

function ListContainer() {
    return <ComponentWindow Size={new UDim2(1, 0, 0, 35)} >
            
    </ComponentWindow>
}

function InteractableList() {
    return <ComponentWindow>
            
    </ComponentWindow>
}

export function ComponentCollapsibleList(Properties: ComponentProperties<TextLabel>) {
    return (
        <ListContainer>
            <InteractableList>
                {Properties.children}
            </InteractableList>
        </ListContainer>
    )
}