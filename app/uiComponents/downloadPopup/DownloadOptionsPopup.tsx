import React from "react";
import styles from "./downloadOptionsPopup.module.css";

interface DownloadOption {
    link: string;
    kbps: string;
    size: string;
}

interface Props {
    options: DownloadOption[];
    onClose: () => void;
    name: string;
}

const DownloadOptionsPopup: React.FC<Props> = ({ options, onClose, name }) => {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <h3 className={styles.title}>Download Options</h3>
                <ul className={styles.optionList}>
                    {options.map((option, index) => (
                        <li key={index} className={styles.optionItem}>
                            <a href={option.link} className={styles.downloadLink} target="_blank" rel="noopener noreferrer" download={`${name}-${option.size}`}>
                                {option.kbps} - {option.size}
                            </a>
                        </li>
                    ))}
                </ul>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DownloadOptionsPopup;
