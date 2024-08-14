import React from 'react';

export default function ShowHideButton({ id, showDiff, hideDiff, show_btn, hide_btn }) {
    return (
        <div className="flex gap-1">
            <button className="btnShow btn btn-sm btn-outline w-52" onClick={() => showDiff(id)} ref={(el) => show_btn.current[id] = el}>
                Afficher la différence
            </button>
            <button className="btnHide btn btn-sm btn-outline hover:text-white w-52" onClick={() => hideDiff(id)} ref={(el) => hide_btn.current[id] = el} style={{ display: 'none' }}>
                Cacher la différence
            </button>
        </div>
    );
}
