import Editor from '@monaco-editor/react';
import Monacto_Language_Map from '../utils/monacoLanguageMap.js';

function CodeEditor({ code, onChange, language, readOnly = false }) {
    return (
        <Editor
            height="100%"
            width="100%"
            language={Monacto_Language_Map[language] || 'plaintext'}
            value={code}
            onChange={(v) => onChange(v || " ")}
            theme="vs-dark"
            readOnly={readOnly}
            options={{
                fontSize: 14,
                fontFamily: 'Fira Code, monospace',
                minimap: { enabled: false },
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                readOnly,
                padding: { top: 14, bottom: 14 },
                automaticLayout: true,
                tabsize: 2,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                bracketPairColorization: { enabled: true },
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                matchBrackets: 'always',
                formatOnPaste: true,
                suggestOnTriggerCharacters: true,
                smoothScrolling: true,
                fixedOverflowWidgets: true,
            }}
            loading={<div className='loading-state'><p>Loading...</p></div>}
        />
    )
}
export default CodeEditor;