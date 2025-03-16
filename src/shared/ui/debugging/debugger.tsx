import React from "@rbxts/react";
import { ComponentBase } from "../component/component_styledbase";
import { CollapsibleList } from "../component/component_collapsiblelist";

export class _UI_Debugger {
    public Root

    constructor() {
        this.Root = <ComponentBase Size={UDim2.fromScale(.25, .6)} Visible={false}>
            <CollapsibleList Text="PLAYER">
                <CollapsibleList Text="CONFIG" Size={UDim2.fromScale(1, 1)}>

                </CollapsibleList>
                <CollapsibleList Text="VALUES" Size={UDim2.fromScale(1, 1)}>

                </CollapsibleList>
            </CollapsibleList>
            <uiaspectratioconstraint AspectRatio={.65} />
        </ComponentBase>
    }
}