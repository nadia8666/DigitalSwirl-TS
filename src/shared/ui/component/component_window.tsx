import React from "@rbxts/react";
import { ComponentProperties } from "./properties";
import { ComponentBase } from "./component_styledbase";

export function ComponentWindow(Properties: ComponentProperties<Frame>) {
    return (
        <ComponentBase>
            {Properties.children}
        </ComponentBase>
    )
}