import React from "@rbxts/react";
import { ComponentWindow } from "../component/component_window";
import { ComponentStyledTextLabel } from "../component/component_styledlabel";
import { ComponentBase } from "../component/component_styledbase";
import { ComponentProperties } from "../component/properties";
export const WindowConfig = {
    Title: "Example"
}

export class _UI_Window {
    public Root

    constructor(Config: typeof WindowConfig & ComponentProperties<Frame>) {
        this.Root = <ComponentWindow>
            <ComponentBase Size={Config.Size || new UDim2(1, 0, 0, 25)} Position={Config.Position || new UDim2(.5, 0, 0, 0)} AnchorPoint={Config.AnchorPoint || new Vector2(.5, 0)}>
                <ComponentStyledTextLabel Text={Config.Title}>

                </ComponentStyledTextLabel>
            </ComponentBase>

            <frame>

            </frame>
        </ComponentWindow>
    }
}