import React from 'react'

const EmptyState = ({ onCreateFamily }) => {
    return (
        <div className="empty-state">
            <div className="empty-card">
                <div className="tree-container">
                    <div className="tree-root"></div>

                    <div className="tree-line vertical"></div>

                    <div className="tree-line horizontal"></div>

                    <div className="family-node parent">
                        👨‍👩‍👧
                    </div>

                    <div className="family-node child child-1">
                        👦
                    </div>

                    <div className="family-node child child-2">
                        👧
                    </div>
                </div>

                <h2>Start Building Your Family Tree</h2>

                <p>
                    Your family tree is currently empty. Add your first family member
                    and begin preserving your family's history, stories, and legacy.
                </p>

                <button onClick={onCreateFamily}>
                    Add First Family Member
                </button>
            </div>
        </div>
    )
}

export default EmptyState