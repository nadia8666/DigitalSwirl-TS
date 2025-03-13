import { Storybook } from "@rbxts/ui-labs";

const storybook: Storybook = {
    name: "Stories",

    storyRoots: [game.GetService("ReplicatedStorage").WaitForChild("TS").WaitForChild("ui")]
}

export = storybook