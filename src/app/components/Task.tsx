'use client'
import React, { useState, useEffect } from 'react';
import * as Types from '@/app/components/Types';

export default function Task({ taskId, text, isDone, priority, category, onDelete, onUpdate }: Types.TaskProps) {
    const [isEditingText, setIsEditingText] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [editedText, setEditedText] = useState(text || '');
    const [editedCategory, setEditedCategory] = useState(category || Types.Category.GENERAL);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setEditedText(text || '');
    }, [text]);

    useEffect(() => {
        setEditedCategory(category || Types.Category.GENERAL);
    }, [category]);

    useEffect(() => {
        setIsChecked(isDone || false);
    }, [isDone]);

    const handleTextDoubleClick = () => {
        setIsEditingText(true);
        setEditedText(text);
    };

    const handleCategoryDoubleClick = () => {
        setIsEditingCategory(true);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value as Types.Category;
        setEditedCategory(selectedCategory);
        if (onUpdate) {
            onUpdate({ taskId, text, category: selectedCategory, isDone: isChecked });
        }
    };

    const handleTextBlur = () => {
        setIsEditingText(false);
        if (editedText.trim() === '') {
            if (onDelete) {
                onDelete(taskId);
            }
        } else if (onUpdate) {
            onUpdate({ taskId, text: editedText, category: editedCategory });
        }
    };

    const handleCategoryBlur = () => {
        setIsEditingCategory(false);
        if (onUpdate) {
            onUpdate({ taskId, text: editedText, category: editedCategory });
        }
    };

    const handleDeleteClick = () => {
        if (onDelete) {
            onDelete(taskId);
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);
        if (onUpdate) {
            onUpdate({ taskId, text, category: editedCategory, isDone: isChecked });
        }
    };

    return (
        <li data-task-id={taskId} className="flex items-center justify-between mx-auto w-1/2">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className='w-1/4 h-5' />
            {isEditingText ? (
                <input
                    className='rounded mr-4 bg-white text-black w-1/4 px-1 h-7 outline-none break-all'
                    value={editedText}
                    onChange={handleTextChange}
                    onBlur={handleTextBlur}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={handleTextDoubleClick} className={`mr-5 flex items-center w-1/4 ${isChecked ? "line-through italic" : ""} break-all`}>{text}</span>
            )}
            {isEditingCategory ? (
                <select
                    className='rounded mr-4 bg-white text-black w-1/4 px-1 h-7 outline-none'
                    value={editedCategory}
                    onChange={handleCategoryChange}
                    onBlur={handleCategoryBlur}
                >
                    {Object.values(Types.Category).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            ) : (
                <span onDoubleClick={handleCategoryDoubleClick} className='rounded mr-4 text-white bg-black w-1/4 px-2 h-7 outline-none'>{category}</span>
            )}
            <button onClick={handleDeleteClick} className="text-red-500 outline outline-1 rounded px-3 py-1">Delete</button>
        </li>
    );
}
