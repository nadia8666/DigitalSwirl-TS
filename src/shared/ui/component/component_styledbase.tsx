import React from "@rbxts/react";
import { ComponentProperties } from "./properties";

export function ComponentBase(Properties: ComponentProperties<Frame>) {
    return (
        <frame
            Size={Properties?.Size || UDim2.fromScale(.5, .5)}
            Position={Properties?.Position || UDim2.fromScale(.5, .5)}
            AnchorPoint={Properties?.AnchorPoint || new Vector2(.5, .5)}
            BackgroundTransparency={.5} 
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
        >
            <uistroke
                Thickness={2}
                Color={Color3.fromRGB(0, 0, 0)}
                Transparency={.85}
            />

            {Properties.children}
        </frame>
    )
}