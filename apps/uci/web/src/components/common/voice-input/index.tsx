import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceRecognitionProps {
    onChange: any;
    maxLength: any;
}

export const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({
    onChange,
    maxLength,
}) => {
    const [isVoiceInput, setIsVoiceInput] = useState(false);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    const handleVoiceInput = useCallback(
        (transcript: string) => {
            if (onChange) {
                const shouldTrim = maxLength && transcript.length > maxLength;
                const val = shouldTrim
                    ? transcript.substr(0, maxLength)
                    : transcript;
                onChange(val, null); // Pass null for the event since it's not a user input event
            }
        },
        [maxLength, onChange],
    );

    recognition.onerror = event => {
        console.error('Speech recognition error:', event.error);
    };

    const startVoiceRecognition = () => {
        if (isVoiceInput) {
            console.log('stopping voice recognition');
            recognition.stop();
            recognition.onresult = null;
        } else {
            console.log('starting voice recognition');
            recognition.start();
            recognition.onresult = event => {
                const transcript =
                    event.results[event.results.length - 1][0].transcript;
                handleVoiceInput(transcript);
            };
        }
        setIsVoiceInput(!isVoiceInput);
    };

    return (
        <div className="voice-mic" onClick={startVoiceRecognition}>
            <FontAwesomeIcon
                icon={faMicrophone}
                color={isVoiceInput ? 'blue' : 'black'}
            />
        </div>
    );
};
