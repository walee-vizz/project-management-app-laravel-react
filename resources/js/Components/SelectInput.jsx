import { forwardRef, useRef, useState, useEffect } from 'react';
import Select from 'react-select';

export default forwardRef(function SelectInput(
    { className = '', options = [], isMulti = false, defaultValue, ...props }, ref
) {
    const localRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(isMulti ? [] : null)

    useEffect(() => {
        if (defaultValue) {
            const defaultOptions = isMulti
                ? options.filter(option => defaultValue.includes(option.value))
                : options.find(option => option.value === defaultValue);
            setSelectedOption(defaultOptions);
        }
    }, [defaultValue, options, isMulti]);


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
            isMulti={isMulti}
            classNamePrefix="react-select"
            value={selectedOption} // Controlled component with selectedOption state
            onChange={handleChange}
            className={`react-select-container ${className}`}
            ref={ref || localRef} // Use the forwarded ref or fallback to localRef
        />
    );
});
