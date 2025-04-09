import React, { Binding, ReactComponent, useEffect, useState } from "@rbxts/react";
import { ComponentStyledBase } from "../misc/component_styledbase";
import { ComponentStyledTextLabel } from "../misc/component_styledlabel";
import { ComponentProperties } from "../properties";
import { useMotion } from "@rbxts/pretty-react-hooks";

function ListContainer(Properties: ComponentProperties<Frame> & { Text: string | Binding<string> | undefined }) {
    const [DropdownExecuted, SetDropdown] = useState(false)
    const [ListSize, SetListSize] = useMotion(0)
    const [Size, SetSize] = useMotion(35)

    const Padder = <frame Size={new UDim2(1, 0, 0, 1)} Position={new UDim2(0, 0, 0, 35)} AnchorPoint={new Vector2(0, 1)} BackgroundTransparency={.85} BackgroundColor3={new Color3(0, 0, 0)} />
    const List = <InteractableList Size={ListSize.map((y) => new UDim2(1, 0, 0, y))} >
        <uilistlayout HorizontalAlignment={"Center"} VerticalAlignment={"Top"} Padding={new UDim(0, 6)} />
        <uipadding PaddingTop={new UDim(0, 6)} />
        {Properties.children}
    </InteractableList>

    useEffect(() => {
        const Info = {
            time: .25,
            style: Enum.EasingStyle.Cubic,
            direction: Enum.EasingDirection.Out,
        }
        SetSize.tween(DropdownExecuted && 500 || 35, Info)
        SetListSize.tween(DropdownExecuted && (500 - 35) || 0, Info)
    }, [DropdownExecuted, ListSize, Size])

    return <ComponentStyledBase Size={Size.map((y) => new UDim2(1, 0, 0, y))} AnchorPoint={new Vector2(.5, 0)} Position={new UDim2(.5, 0, 0, 0)} >
        <textbutton Text={""} TextScaled={false} ZIndex={math.huge} BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 35)} Event={{
            MouseButton1Click: () => SetDropdown(!DropdownExecuted)
        }} />

        <ComponentStyledTextLabel ZIndex={-999} Position={new UDim2(0, 0, 0, 0)} Size={new UDim2(1, 0, 0, 35)} AnchorPoint={new Vector2(0, 0)} Text={Properties.Text} />

        {[Padder, List]}
    </ComponentStyledBase>
}

function InteractableList(Properties: ComponentProperties<Frame>) {
    return <ComponentStyledBase Size={Properties.Size || new UDim2(1, 0, 0, 0)} Position={new UDim2(0, 0, 1, 0)} AnchorPoint={new Vector2(0, 1)} stroke={false} BackgroundTransparency={1}>
        <scrollingframe Size={new UDim2(1, 0, 1, 0)} AutomaticCanvasSize={"Y"} ScrollBarThickness={0} BackgroundTransparency={1}>
            {Properties.children}
        </scrollingframe>
    </ComponentStyledBase>
}

export function ComponentCollapsibleList(Properties: ComponentProperties<TextLabel>) {
    return (
        <ListContainer Text={Properties.Text}>
            {Properties.children}
        </ListContainer>
    )
}