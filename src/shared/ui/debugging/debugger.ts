import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { ComponentBase } from "../component/component_base";

export class _UI_Debugger {
    public Root

    constructor() {
        this.Root = ComponentBase({
            Size: UDim2.fromScale(.2, .5)
        })
    }
}