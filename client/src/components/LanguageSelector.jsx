import { LANGUAGES } from '../constants/language.js';
import '../styles/components.css';

function LanguageSelector({ value, onChange, disabled = false }) {
    return (
        <select className="lang-select" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
            <option value=" ">Select Language</option>
            {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
        </select>
    );
}

export default LanguageSelector;