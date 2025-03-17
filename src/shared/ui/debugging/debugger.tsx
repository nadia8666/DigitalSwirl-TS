import React from "@rbxts/react";
import { ComponentBase } from "../component/component_styledbase";
import { ComponentCollapsibleList } from "../component/component_collapsiblelist";

export class _UI_Debugger {
    public Root

    constructor() {
        this.Root = <ComponentBase Size={UDim2.fromScale(.25, .6)} Visible={false}>
            <ComponentCollapsibleList Text="PLAYER">
                <ComponentCollapsibleList Text="CONFIG" Size={UDim2.fromScale(1, 1)}>

                </ComponentCollapsibleList>
                <ComponentCollapsibleList Text="VALUES" Size={UDim2.fromScale(1, 1)}>

                </ComponentCollapsibleList>
            </ComponentCollapsibleList>
            <uiaspectratioconstraint AspectRatio={.65} />
        </ComponentBase>
    }
}