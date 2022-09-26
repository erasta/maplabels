import { useState } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";
import L from 'leaflet';

export const TipLabel = ({ currLabel, labels, setLabels }) => {
    const { latlng, text, first } = currLabel;
    const [showControls, setShowControls] = useState(false);
    const changeText = (newText) => {
        const newValue = { latlng, text: newText };
        setLabels(labels.filter(lx => lx.latlng !== latlng).concat([newValue]));
    }

    return (
        <CircleMarker
            center={latlng}
            radius={2}
        >
            <Tooltip
                direction='top'
                permanent={true}
                autoClose={false}
                interactive={true}
                eventHandlers={{
                    mouseover: e => {
                        setShowControls(true);
                    },
                    mouseout: e => {
                        if (first) {
                            changeText(text);
                        }
                        setShowControls(false);
                    },
                }}
            >
                {showControls || first ?
                    <>
                        <input
                            type={'text'}
                            value={text}
                            onChange={e => changeText(e.target.value)}
                            onClick={e => e.stopPropagation()}
                        >
                        </input>
                        <button
                            style={{
                                borderRadius: '10px',
                                fontSize: 'small'
                            }}
                            onClick={e => {
                                L.DomEvent.stopPropagation(e);
                                setLabels(labels.filter(lx => lx.latlng !== latlng));
                            }}
                        >
                            X
                        </button>
                    </>
                    : text}
            </Tooltip>
        </CircleMarker>
    )
}