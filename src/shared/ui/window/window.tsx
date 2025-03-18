import React from "@rbxts/react";
import { ComponentProperties } from "../component/properties";
import { ComponentStyledWindow } from "../component/component_styledwindow";
export const WindowConfig = {
    Title: "Example",
    TextSize: 15,
    TextScaled: true,
}

export class _UI_Window {
    public Root

    constructor(Config: Partial<typeof WindowConfig> & ComponentProperties<Frame>) {
        this.Root = <ComponentStyledWindow Title={Config.Title} TextScaled={Config.TextScaled} TextSize={Config.TextSize}>
            {Config.children}
        </ComponentStyledWindow>
    }
}