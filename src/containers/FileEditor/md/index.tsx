import React, {ElementRef, FC, useEffect, useRef, useState} from 'react';
import {defaultValueCtx, Editor, rootCtx} from '@milkdown/core';
import {listener, listenerCtx} from '@milkdown/plugin-listener';
import {nord} from '@milkdown/theme-nord';
import {ReactEditor, useEditor} from '@milkdown/react';
import {commonmark} from '@milkdown/preset-commonmark';
import Button from "../../../components/Button";

type Props = {
    defaultValue: string
    onSave: (v: string) => void
}

export const MarkdownEditor: React.FC<Props> = ({defaultValue, onSave}) => {
    const [value, setValue] = useState(defaultValue);
    const editorRef = useRef<ElementRef<typeof ReactEditor>>(null);
    const editor = useEditor((root) =>
        Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, defaultValue);
                ctx.set(listenerCtx, {
                    markdown: [getMarkdown => setValue(getMarkdown())]
                })
            })
            .use(nord)
            .use(commonmark)
            .use(listener),
    );

    return <div className=''>
        <nav className='bg-gray-300 sticky top-0 z-10'>
            <Button onClick={() => onSave(value)}>保存</Button>
        </nav>
        <ReactEditor ref={editorRef} editor={editor}/>
    </div>;
};

const MarkdownEditorWrapper: FC<{ fileHandler: FileSystemFileHandle }> = ({fileHandler}) => {
    const [fileContent, setFileContent] = useState<string>();
    useEffect(() => {
        (async () => {
            const file = await fileHandler.getFile();
            setFileContent(await file.text());
        })();
        return () => {
            setFileContent('');
        }
    }, [fileHandler]);

    const onSave = async (v: string) => {
        const writable = await fileHandler.createWritable();
        await writable.write(v);
        await writable.close();
    };

    if (!fileContent) {
        return null;
    }
    return <MarkdownEditor defaultValue={fileContent} onSave={onSave}/>
};

export default MarkdownEditorWrapper;
