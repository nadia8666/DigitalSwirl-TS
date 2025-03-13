import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { _UI_Debugger } from "./debugger";

const _STORY_Debugger = {
    react: React,
    reactRoblox: ReactRoblox,
    story: () => {
        return new _UI_Debugger()
    }
}

export = _STORY_Debugger