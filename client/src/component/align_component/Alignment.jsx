import { useRef } from "react";
import ReactDiffViewer from "react-diff-viewer";
import SourceSection from "./SourceSection";
import TargetSection from "./TargetSection";
import CommentSection from "./CommentSection";
import ShowHideButton from "./ShowHideButton";

const ENDPOINT = 'http://localhost:3500';

export default function Alignment({ text, id }) {
    const source_target = useRef([]);
    const show_btn = useRef([]);
    const hide_btn = useRef([]);

    const role = localStorage.getItem('role');

    const showDiff = (id) => {
        if (source_target.current[id]) {
            const { source_alignement, target_alignement, source_target_after, source_target_before } = source_target.current[id];

            source_target_after.style.display = 'flex';
            source_target_before.style.display = 'none';
            show_btn.current[id].style.display = 'none';
            hide_btn.current[id].style.display = 'block';
        }
    };

    const hideDiff = (id) => {
        if (source_target.current[id]) {
            const { source_target_after, source_target_before } = source_target.current[id];

            source_target_after.style.display = 'none';
            source_target_before.style.display = 'flex';
            show_btn.current[id].style.display = 'block';
            hide_btn.current[id].style.display = 'none';
        }
    };

    const handleValidate = async (e, textId) => {
        const validate = e.target.checked;

        try {
            const response = await fetch(`${ENDPOINT}/validate`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ textId, validate }),
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error('Error validating:', error);
        }
    };

    return (
        <div className="div-table m-5 my-6 p-1 border shadow-xl relative rounded" ref={(el) => source_target.current[id] = el}>
            <span className="absolute top-0 left-0 bg-slate-600 p-4 rounde text-white text-xs">{id}</span>
            <div className="view-all flex max-md:flex-col" ref={(el) => source_target.current[id].source_target_before = el}>
                <SourceSection id={id} text={text} />
                <TargetSection id={id} text={text} />
            </div>

            <div className="view-diff max-md:flex-col" ref={(el) => source_target.current[id].source_target_after = el} style={{ display: 'none' }}>
                <SourceSection id={id} text={text} isAligned />
                <TargetSection id={id} text={text} isAligned />
            </div>

            <ReactDiffViewer
                oldValue={text.source_content}
                newValue={text.target_content}
                splitView={true}
            />

            <ShowHideButton id={id} showDiff={showDiff} hideDiff={hideDiff} show_btn={show_btn} hide_btn={hide_btn} />

            {text.email && (
                <div className="flex gap-3 items-center max-md:flex-col">
                    <label htmlFor={`check${id}`}>Valider</label>
                    <input
                        defaultChecked={text.validate}
                        type="checkbox"
                        id={`check${id}`}
                        className="checkbox-warning checkbox"
                        onChange={(e) => handleValidate(e, text.id)}
                    />
                </div>
            )}

            {role === 'Annotateur' && (
                <CommentSection id={id} text={text} />
            )}
        </div>
    );
}
