import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Library from "@/pages/library";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Library">
                <Library/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;