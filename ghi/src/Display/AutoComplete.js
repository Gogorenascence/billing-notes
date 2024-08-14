import React, { useEffect, useRef } from 'react'


function AutoComplete({
    itemList,
    renderCondition,
    setNoneRenderFunction,
    onChangeFunction,
    name,
    value,
    placeholder,
    onClickFunction,
    displayContent,
    size
}) {

    const autoCompleteList = useRef(null)

    useOutsideAlerter(autoCompleteList)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setNoneRenderFunction();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }


    return(
        <div className="auto-complete-container" ref={autoCompleteList}>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChangeFunction}>
            </input>
            {renderCondition?
                <div
                    className="auto-complete-large"
                    style={{width: size}}
                >
                    {itemList.map(item => {
                        return(
                            <div className="auto-complete-item pointer"
                                onClick={() => onClickFunction(item)}
                            >
                                <p className="black ellipsis">{item[displayContent]}</p>
                            </div>
                        )
                    })}
                </div>
                :null}
        </div>
    )
}

export default AutoComplete
