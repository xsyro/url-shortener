import { useState } from "react";

export const CopyButton = () => {
    const [copied, setCopied] = useState(false);
    const [copyText, setCopyText] = useState('Copy');
    const [copyIcon, setCopyIcon] = useState('📋');

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setCopyText('Copied!');
        setCopyIcon('✅');
        setTimeout(() => {
            setCopied(false);
            setCopyText('Copy');
            setCopyIcon('📋');
        }, 2000);
    };

    return (
        <button onClick={handleCopy} className="copy-button bg-green-600 text-white px-2 py-1 text-xs rounded-sm font-semibold hover:bg-green-800">
            {copyIcon} {copyText}
        </button>
    );
}