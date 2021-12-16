import React, {useState} from 'react';
import './App.css';
import FileManager from './FileManager';

function App() {
    const [directoryHandler, setDirectoryHandler] = useState<FileSystemDirectoryHandle>();
    const readDir = async () => {
        setDirectoryHandler(await window.showDirectoryPicker());
    };
    return (
        <div className="grid grid-rows-1 grid-flow-col max-h-screen">
            {directoryHandler ? <FileManager directoryHandler={directoryHandler}/> :
                <button onClick={readDir}>读取目录</button>}
        </div>
    );
}

export default App;
