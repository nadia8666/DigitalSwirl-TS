import React from "@rbxts/react";
import { ComponentBase } from "./component_styledbase";
import { StyledTextLabel } from "./component_styledlabel";
import { ComponentProperties } from "./properties";

export function CollapsibleList(Properties: ComponentProperties<TextLabel>) {
    return (
        <ComponentBase Size={Properties.Size || new UDim2(1, 0, 0, 35)} AnchorPoint={new Vector2(0, 0)} Position={UDim2.fromOffset(0, 0)}>
            <StyledTextLabel Text={Properties.Text || "MISSING"} />

            <ComponentBase Size={UDim2.fromScale(1, 0)} BackgroundTransparency={1} AnchorPoint={new Vector2(0, 0)} Position={UDim2.fromScale(0, 0)}>
                {Properties.children}
            </ComponentBase>
        </ComponentBase>
    )
}