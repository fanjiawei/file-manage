import React, {useState} from 'react';
import './App.css';
import FileManager from './FileManager';

function App() {
    const [directoryHandler, setDirectoryHandler] = useState<FileSystemDirectoryHandle>();
    const readDir = async () => {
        setDirectoryHandler(await window.showDirectoryPicker());
    };
    return directoryHandler ?
        <div className="grid h-full grid-rows-1" style={{gridTemplateColumns: '320px 1fr'}}>
            <FileManager directoryHandler={directoryHandler}/>
        </div> :
        <div className='flex h-full'>
            <button className='m-auto' onClick={readDir}>读取目录</button>
        </div>;
}

export default App;
