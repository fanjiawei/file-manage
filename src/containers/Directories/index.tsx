import {FC, ReactNode, useEffect, useState} from "react";

type Props = {
    directoryHandler: FileSystemDirectoryHandle
    onClickFile: (file: FileSystemHandle) => void
    hide: boolean
}
const Directories: FC<Props> = ({directoryHandler, onClickFile, hide}) => {
    const [result, setResult] = useState<ReactNode>([]);
    useEffect(() => {
        (async () => {
            const result = [];
            for await (const i of directoryHandler.values()) {
                if (i.kind === 'directory') {
                    result.push(<Directories directoryHandler={i} key={i.name}
                                             hide={false}
                                             onClickFile={(file) => onClickFile(file)}/>);
                } else {
                    result.push(<li className='p-1 cursor-pointer hover:text-blue-400' key={i.name}
                                    onClick={() => onClickFile(i)}>{i.name}</li>);
                }
            }
            return setResult(result);
        })();
    }, [directoryHandler, onClickFile]);

    if (hide) {
        return <li>
            <ul>
                {result}
            </ul>
        </li>;
    }
    return <li className='p-1'>
        <div>{directoryHandler.name}</div>
        <ul className='ml-5'>
            {result}
        </ul>
    </li>;
}

export default Directories;
