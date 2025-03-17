import React from "@rbxts/react";
import { ComponentProperties } from "./properties";

export function ComponentStyledTextLabel(Properties: ComponentProperties<TextLabel>) {
    return (
        <textlabel
            Size={Properties.Size || UDim2.fromScale(.5, .5)}
            Position={Properties.Position || UDim2.fromScale(.5, .5)}
            AnchorPoint={Properties.AnchorPoint || new Vector2(.5, .5)}
            BackgroundTransparency={1}
            TextColor3={new Color3(1, 1, 1)}
            FontFace={Properties.FontFace || new Font("rbxasset://fonts/families/BuilderSans.json", Enum.FontWeight.Bold, Enum.FontStyle.Normal)}
            Text={Properties.Text || "DEFAULT"}
            TextScaled={true}
        >

            <uistroke
                Thickness={2}
                Color={Color3.fromRGB(0, 0, 0)}
                Transparency={.85}
            />

            {Properties.children}
        </textlabel>
    )
}