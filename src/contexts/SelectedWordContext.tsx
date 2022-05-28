import { createContext } from "react";
import { WordKnowledge } from "util/db";

const SelectedWordContext = createContext([
    { word: "", knowledge: 0 } as WordKnowledge,
    ((_: any) => { }) as React.Dispatch<React.SetStateAction<WordKnowledge>>
] as const);

export default SelectedWordContext