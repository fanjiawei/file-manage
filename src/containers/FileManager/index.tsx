import {ComponentProps, FC, lazy, Suspense, useMemo, useState} from "react";
import Directories from "../Directories";

type Props = {
    directoryHandler: FileSystemDirectoryHandle
}
const FileManager: FC<Props> = ({directoryHandler}) => {
    const [fileHandler, setFileHandler] = useState<FileSystemHandle | null>(null);
    const onClickFile: ComponentProps<typeof Directories>['onClickFile'] = async (file) => {
        setFileHandler(file);
    };
    const fileExt = fileHandler?.name.substring(fileHandler?.name.lastIndexOf('.') + 1);
    const FileEditorComponent = useMemo(() => {
        return lazy(async () => {
            try {
                return await import(`../FileEditor/${fileExt}`);
            } catch (reason: any) {
                if (reason.code === "MODULE_NOT_FOUND") {
                    return await import('../FileEditor/NotSupport');
                }
                throw reason;
            }
        });
    }, [fileExt]);
    return <>
        <ul className="border-r overflow-auto">
            <Directories directoryHandler={directoryHandler} onClickFile={onClickFile}
                         hide={true}/>
        </ul>
        <div className='overflow-auto'>
            {fileExt ? <Suspense fallback={<div>Loading...</div>}>
                <FileEditorComponent fileHandler={fileHandler}/>
            </Suspense> : null}
        </div>
    </>;
};

export default FileManager;
