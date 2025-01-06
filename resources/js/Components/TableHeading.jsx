import { forwardRef } from 'react';
import SortIcon from '@/Components/SortIcon';

const TableHeading = forwardRef(function TableHeading(
    { sortByField, currentField, sortDir, sortable = true, className = '', ...props },
    ref
) {
    return (

        <th ref={ref} {...props} className={"px-6 py-3 cursor-pointer " + className} scope="col">
            <div className="flex items-center">
                {props.children}
                {sortable ? (
                    <SortIcon sortByField={sortByField} currentField={currentField} sortDir={sortDir} />
                ) : null}

            </div>
        </th >
    );
});

export default TableHeading;
