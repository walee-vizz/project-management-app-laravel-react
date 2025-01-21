import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectInput from '../SelectInput';

export default function UserSelectDropdown({ onSelectionChange, isMulti }) {
    const [options, setOptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(route('async.get_users')); // Adjust the URL as necessary
                const userOptions = response.data.map(user => ({ value: user.id, label: user.name }));
                setOptions(userOptions);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (selectedOptions) => {
        if (!isMulti) {
            selectedOptions = [selectedOptions];
        }
        setSelectedUsers(selectedOptions);
        console.log('selectedUsers', selectedOptions);
        let selectedUsers = selectedOptions.map(option => option.value);
        onSelectionChange(selectedUsers);
    };

    return (
        <SelectInput isMulti={isMulti}
            options={options}
            value={selectedUsers}
            onChange={handleChange}
            className="w-full"
            placeholder="Select user..." />

    );
}
