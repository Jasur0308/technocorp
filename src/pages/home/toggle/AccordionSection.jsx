import { BsArrowRightShort } from "react-icons/bs";
import { BiMagnet } from "react-icons/bi";
import { useState } from "react";

const Accordion = ({ title, children, isOpen, onClick }) => {

    return (
        <div className="border border-gray-300 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 bg-gray-100 transition-colors duration-300 cursor-pointer"
            >
                <div className="flex items-center gap-2 text-gray-800 text-sm font-medium hover:text-gray-500">
                    <BiMagnet className="text-xl transition-transform duration-300 transform" />
                    <span className="hover:text-gray-800">{title}</span>
                </div>
            </button>
            <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100 py-4 px-5" : "max-h-0 opacity-0 px-5 py-0"
                    } bg-white text-sm text-gray-700`}
            >
                {children}
            </div>
        </div>
    );
};

const Toggle = ({ title, defaultOpen = false, children }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-300 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center cursor-pointer justify-between px-5 py-3 transition-colors duration-300 bg-gray-100`}
            >
                <div className="flex items-center gap-2 text-gray-800 text-sm font-medium hover:text-gray-500">
                    <span className="text-lg transition-transform duration-300 transform"><BsArrowRightShort /></span>
                    <span className="hover:text-gray-800">{title}</span>
                </div>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${open ? "max-h-96 opacity-100 py-4 px-5" : "max-h-0 opacity-0 px-5 py-0"} bg-white text-sm text-gray-700`}
            >
                {children}
            </div>
        </div>
    );
};

export default function AccordionSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="space-y-4 w-full">
            <div>
                <Accordion
                    title="Accordion Example 1"
                    isOpen={openIndex === 0}
                    onClick={() => handleToggle(0)}>
                    It has multiple paragraphs and is full of waffle to pad out the comment.
                    Usually, you just wish these sorts of comments would come to an end.
                </Accordion>
                <Accordion
                    title="Accordion Example 2"
                    isOpen={openIndex === 1}
                    onClick={() => handleToggle(1)}>
                    And is full of waffle to It has multiple paragraphs and is full of waffle to pad out the comment.
                    Usually, you just wish these sorts of comments would come to an end.
                </Accordion>
                <Accordion
                    title="Accordion Example 3"
                    isOpen={openIndex === 2}
                    onClick={() => handleToggle(2)}>
                    Waffle to It has multiple paragraphs and is full of waffle to pad out the comment. Usually, you just
                </Accordion>
            </div>

            <div>
                <Toggle title="Toggle, Open by default," defaultOpen>
                    This box is opened by default, paragraphs and is full of waffle to pad out the comment.
                    Usually, you just wish these sorts of comments would come to an end.
                </Toggle>
                <Toggle title="Toggle, closed by default">
                    This box is now open
                </Toggle>
                <Toggle title="Toggle, closed by default">
                    This box is now open
                </Toggle>
            </div>
        </div>
    );
}