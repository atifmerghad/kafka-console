import React, { useState, useEffect } from 'react';
import './test.scss'
const Svg = () => {
    const [count, setCount] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => {
                if (count === 10) {
                    return 0;
                }
                return count + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const refreshAction = ()=>{
        setRefresh(!refresh)
    }


    return (

        <>
            <div className="refresh">
                <svg aria-hidden="true" focusable="false" role="img" className="base fade" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"

                    style={{ display: "inline-block", userSelect: "none", verticalAlign: "textBottom", overflow: "visible" }}>

                    <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path>
                </svg>

                <svg onClick={()=>{refreshAction()}} aria-hidden="true" focusable="false" role="img" className={refresh ==true ? 'base rotation' : 'base'}  viewBox="0 0 16 16" width="16" height="16"
                    fill="currentColor" style={{ display: "inline-block", userSelect: "none", verticalAlign: "textBottom", overflow: "visible" }} >
                    <path fillRule="evenodd" d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"></path>
                </svg>
                {refresh && <span> Refreshing in {count} secs</span>}
                {refresh && <span> Refresh data ... 1/3</span>}
            </div>
        </>
    )
}

export default Svg;

