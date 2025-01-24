import { forwardRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

const SortIcon = forwardRef(function SortIcon(
    { sortByField, currentField, sortDir, className = '', ...props },
    ref
) {
    return (
        <div ref={ref} {...props} className={className}>
            {sortByField === currentField ? (
                sortDir === 'ASC' ? (
                    <ChevronUpIcon className="w-1 ms-1.5" />
                ) : (
                    <ChevronDownIcon className="w-1 ms-1.5" />
                )
            ) : (
                <div className='flex flex-col'>
                    <ChevronUpIcon className="w-1  ms-1.5" />
                    <ChevronDownIcon className="w-1  ms-1.5" />
                </div>
            )}
        </div>
    );
});

export default SortIcon;
