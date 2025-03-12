import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { InferProps } from "@rbxts/ui-labs/src/Typing/Typing";
import { ComponentBase } from "./component/base";

const _STORY_Debugger = {
    react: React,
    reactRoblox: ReactRoblox,
    story: () => {
        const Root = ComponentBase(undefined)

        return Root
    }
}

export = _STORY_Debugger