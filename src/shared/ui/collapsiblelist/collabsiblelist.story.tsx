import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { ComponentCollapsibleList } from "../component/component_collapsiblelist";
import { ComponentStyledTextLabel } from "../component/component_styledlabel";
import { ComponentStyledBase } from "../component/component_styledbase";

const _STORY_CollapsibleList = {
    react: React,
    reactRoblox: ReactRoblox,
    story: () => {
        return (<ComponentCollapsibleList Text={"List Title"}>
            <ComponentStyledBase>
                <ComponentStyledTextLabel Text={"Hello1"} />
            </ComponentStyledBase>
            <ComponentStyledBase>
                <ComponentStyledTextLabel Text={"Hello2"} TextColor3={new Color3(1, 0, 0)} />
            </ComponentStyledBase>
            <ComponentStyledBase>
                <ComponentStyledTextLabel Text={"Hello3"} />
            </ComponentStyledBase>
        </ComponentCollapsibleList>)
    }
}

export = _STORY_CollapsibleList