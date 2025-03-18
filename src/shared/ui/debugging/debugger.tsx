import React from "@rbxts/react";
import { ComponentStyledBase } from "../component/component_styledbase";
import { ComponentCollapsibleList } from "../component/component_collapsiblelist";
import { ComponentStyledButton } from "../component/component_styledbutton";
import { _UI_Window } from "../window/window";
import { ComponentStyledWindow } from "../component/component_styledwindow";

export class _UI_Debugger {
    public Root

    constructor() {
        const Window = new _UI_Window({
            Title: "Hello!",
            Size: new UDim2(.25, 0, .6, 0),
            Visible: false,
        })

        this.Root = <ComponentStyledWindow Title={"Debugger"} TextSize={25} TextScaled={false}>
            <uiaspectratioconstraint AspectRatio={.65} />
            <frame Size={new UDim2(1, 0, 1, -25)} AnchorPoint={new Vector2(.5, .5)} Position={new UDim2(.5, 0, .5, 25)} Transparency={1}>
                <uilistlayout HorizontalAlignment={"Center"} VerticalAlignment={"Top"} Padding={new UDim(0, 6)} />

                {/* Editable Configs & Value displays */}
                <ComponentCollapsibleList Size={new UDim2(1, 0, 1, 0)} Position={new UDim2(0, 0, 0, 0)} AnchorPoint={new Vector2(0, 0)} Text="Player Debug">

                </ComponentCollapsibleList>

                {/* Editable Configs & Value displays */}
                <ComponentCollapsibleList Text="Object Debug">

                </ComponentCollapsibleList>

                {/* Editable Configs & Value displays */}
                <ComponentCollapsibleList Text="Tick Stepping">
                    <ComponentStyledButton Text={"Pause Ticking"} Size={new UDim2(.85, 0, 0, 35)} />
                    <ComponentStyledButton Text={"Step Tick"} Size={new UDim2(.85, 0, 0, 35)} />
                    <ComponentStyledButton Text={"Undo Tick"} Size={new UDim2(.85, 0, 0, 35)} />
                </ComponentCollapsibleList>

            </frame>
        </ComponentStyledWindow>
    }
}