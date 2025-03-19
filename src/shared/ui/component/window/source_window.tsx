import React, { Binding } from "@rbxts/react";
import { ComponentProperties } from "../properties";
import { ComponentStyledBase } from "../misc/component_styledbase";

export function SourceComponentWindow(Properties: ComponentProperties<Frame> & Partial<{ stroke: false | undefined }>) {
    return (
        <ComponentStyledBase {...Properties}>
            {Properties.children}
        </ComponentStyledBase>
    )
}