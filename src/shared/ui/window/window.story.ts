import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { _UI_Window, WindowConfig } from "./window";
import { InferProps } from "@rbxts/ui-labs/src/Typing/Typing";

const _STORY_Window = {
    react: React,
    reactRoblox: ReactRoblox,
    controls: WindowConfig,
    story: (Controls: InferProps<typeof WindowConfig>) => {
        return new _UI_Window(Controls.controls)
    }
}

export = _STORY_Window