import React from "@rbxts/react";
import { ComponentStyledBase } from "../misc/component_styledbase";
import { ComponentStyledTextLabel } from "../misc/component_styledlabel";
import { SourceComponentWindow } from "./source_window";
import { WindowConfig } from "./window";
import { ComponentProperties } from "../properties";

export function ComponentStyledWindow(Config: Partial<typeof WindowConfig> & ComponentProperties<Frame> & ComponentProperties<TextLabel>) {
    print(Config.TextSize)
    return (
        <SourceComponentWindow>
            <ComponentStyledBase Size={Config.Size || new UDim2(1, 0, 0, 25)} Position={Config.Position || new UDim2(.5, 0, 0, 0)} AnchorPoint={Config.AnchorPoint || new Vector2(.5, 0)}>
                <ComponentStyledTextLabel Text={Config.Title} TextSize={Config.TextSize} TextScaled={Config.TextScaled}>
                </ComponentStyledTextLabel>
            </ComponentStyledBase>

            {Config.children}
        </SourceComponentWindow>
    )
}