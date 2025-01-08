import { forwardRef, useRef } from 'react';
import Select from 'react-select';

export default forwardRef(function SelectInput(
    { className = '', options = [], ...props }, ref
) {
    const localRef = useRef(null);

    return (
        <Select
            {...props}
            options={options}
            classNamePrefix="react-select"
            className={`react-select-container ${className}`}
            ref={ref || localRef} // Use the forwarded ref or fallback to localRef
        />
    );
});
