import { ReplicatedStorage } from "@rbxts/services";
import { Storybook } from "@rbxts/ui-labs";

const storybook: Storybook = {
    name: "Stories",

    storyRoots: [ReplicatedStorage.WaitForChild("TS").WaitForChild("ui")]
}

export = storybook