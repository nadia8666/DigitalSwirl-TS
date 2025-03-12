import React from "@rbxts/react";
import { MergeProperties } from "../mergeprops";

export function ComponentBase(Properties:Partial<WritableInstanceProperties<Frame>>|undefined) {
    const Root = React.createElement(
        "Frame",
        MergeProperties({
            Size: UDim2.fromScale(.5, .5),
            Position: UDim2.fromScale(.5, .5),
            AnchorPoint: new Vector2(.5, .5),

            BackgroundTransparency: .5,
            BackgroundColor3: Color3.fromRGB(0, 0, 0),

            BorderSizePixel: 0,
        }, Properties || {}),
        React.createElement("UIStroke", {
            Thickness: 2,
            Color: Color3.fromRGB(0, 0, 0),
            Transparency: .85,
        })
    )

    return Root
}