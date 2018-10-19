import React from 'react';

function InfoWindow(props) {
    const { currentMarker, photoContent } = props;

    return (
        <aside
            className='info-window'
            tabIndex={0}
        >
            <h2>{currentMarker.title}</h2>
            <article>
                <img
                    src={photoContent}
                    alt={"Most liked photo from " + currentMarker.title}
                />
                <p>{currentMarker.address}</p>
            </article>
            <p className='attribution'>Café Data Provided by FourSquare</p>
        </aside>
    );
}

export default InfoWindow;