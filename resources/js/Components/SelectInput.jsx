import { forwardRef, useRef, useState, useEffect } from 'react';
import Select from 'react-select';

export default forwardRef(function SelectInput(
    { className = '', options = [], defaultValue, ...props }, ref
) {
    const localRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (defaultValue) {
            const defaultOption = options.find(option => option.value === defaultValue);
            setSelectedOption(defaultOption);
        }
    }, [defaultValue, options]);


    const handleChange = (option) => {
        setSelectedOption(option);
        if (props.onChange) {
            props.onChange(option);
        }
    };
    return (
        <Select
            {...props}
            options={options}
            classNamePrefix="react-select"
            value={selectedOption} // Controlled component with selectedOption state
            onChange={handleChange}
            className={`react-select-container ${className}`}
            ref={ref || localRef} // Use the forwarded ref or fallback to localRef
        />
    );
});
