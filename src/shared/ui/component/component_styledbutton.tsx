import React from "@rbxts/react";
import { ComponentProperties } from "./properties";
import { ComponentStyledTextLabel } from "./component_styledlabel";
import { ComponentStyledBase } from "./component_styledbase";

export function ComponentStyledButton(Properties: ComponentProperties<TextLabel>) {
    return (
        <ComponentStyledBase Size={Properties.Size} Position={Properties.Position} AnchorPoint={Properties.AnchorPoint}>
            <textbutton Size={new UDim2(1, 0, 1, 0)} Text={""} Transparency={1} ZIndex={math.huge} Event={{
                MouseButton1Click: () => {
                    print("clicked")
                }
            }} />
            <ComponentStyledTextLabel Text={Properties.Text} Size={new UDim2(.8, 0, .8, 0)} Position={new UDim2(.5, 0, .5, 0)} />
        </ComponentStyledBase>
    )
}