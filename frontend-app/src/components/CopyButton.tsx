import { useState } from "react";

interface CopyButtonProps {
    textToCopy: string;
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
    const [_, setCopied] = useState(false);
    const [copyText, setCopyText] = useState('Copy');
    const [copyIcon, setCopyIcon] = useState('📋');

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
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