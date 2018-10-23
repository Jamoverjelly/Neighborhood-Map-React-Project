import React from 'react';

function InfoWindow(props) {
    const { currentMarker, photoContent } = props;

    return (
        <aside
            className='info-window'
            tabIndex={0}
        >
            <h2 className='info-window-title'>
                {currentMarker.title}
            </h2>
            <article>
                <img
                    src={photoContent}
                    alt={"Most liked photo from " + currentMarker.title}
                />
                <div className='info-window-address'>
                    <p>{currentMarker.streetAddress}</p>
                    <p>{currentMarker.municipalAddress}</p>
                </div>
            </article>
            <p className='source-attribution'>Café Data Provided by FourSquare</p>
        </aside>
    );
}

export default InfoWindow;