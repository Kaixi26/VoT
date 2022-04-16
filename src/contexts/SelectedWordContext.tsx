import { createContext } from "react";

const SelectedWordContext = createContext([
    null as null | string,
    ((_: any) => { }) as React.Dispatch<React.SetStateAction<null | string>>
] as const);

export default SelectedWordContext