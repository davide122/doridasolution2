
import React, { useRef, useEffect, useState } from 'react';

const useMultipleViewportVisibility = (count, options = {}) => {
    // Create an array of refs
    const elementRefs = useRef([...Array(count)].map(() => React.createRef()));
    const [visibility, setVisibility] = useState(new Array(count).fill(false));

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const updatedVisibility = visibility.slice();
            entries.forEach(entry => {
                const index = elementRefs.current.findIndex(ref => ref.current === entry.target);
                updatedVisibility[index] = entry.isIntersecting;
            });
            setVisibility(updatedVisibility);
        }, options);

        elementRefs.current.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            elementRefs.current.forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, [elementRefs, visibility, options]);  // Include dependencies correctly

    return [visibility, elementRefs];
};

export default useMultipleViewportVisibility;
