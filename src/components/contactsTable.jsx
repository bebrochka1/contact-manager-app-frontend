import React, { useEffect, useState } from 'react';
import contactService from '../Utils/contactService';

export const ContactTable = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContactId, setEditingContactId] = useState(null);
    const [editedContact, setEditedContact] = useState({});
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const fetchContacts = () => {
        contactService.getContacts()
            .then((data) => {
                setContacts(data);
            })
            .catch((error) => {
                console.log('An error occured during contact fetching', error);
            });
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleChange = (e, field) => {
        const { value } = e.target;
        setEditedContact({
            ...editedContact,
            [field]: field === "married" ? value === "Yes" : value,
        });
    };

    const handleEdit = (contact) => {
        setEditingContactId(contact.id);
        setEditedContact(contact);
    };

    const handleSave = async () => {
        try {
            const updatedContact = {
                id: editedContact.id,
                name: editedContact.name,
                dateOfBirth: editedContact.dateOfBirth,
                married: editedContact.married ? true : false,
                phone: editedContact.phone,
                salary: parseFloat(editedContact.salary),
            };

            await contactService.updateContact(updatedContact)
            .catch((error) => {
                console.log(error);
            });
            
            fetchContacts();
            setEditingContactId(null);
        } catch (error) {
            console.log("Error saving contact", error.stack);
        }
    };

    const handleSort = (column) => {
        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);
    };

    const sortedContacts = [...contacts].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleDelete = async (id) => {
        await contactService.deleteContact(id);
        fetchContacts();
    }

    if (contacts.length > 0) {
        return (
            <>
                <div className="d-flex pt-10 border border-dark m-5">
                    <table className="table caption-top">
                        <thead className='table-dark'>
                            <tr>
                                <th onClick={() => handleSort('name')} scope="col">Name</th>
                                <th onClick={() => handleSort('dateOfBirth')} scope="col">Date of Birth</th>
                                <th onClick={() => handleSort('married')} scope="col">Married</th>
                                <th onClick={() => handleSort('phone')} scope="col">Phone</th>
                                <th onClick={() => handleSort('salary')} scope="col">Salary</th>
                                <th scope="col">Actions</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedContacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>
                                        {editingContactId === contact.id ? (
                                            <input
                                                type="text"
                                                value={editedContact.name}
                                                onChange={(e) => handleChange(e, 'name')}
                                            />
                                        ) : (
                                            contact.name
                                        )}
                                    </td>
                                    <td>
                                        {editingContactId === contact.id ? (
                                            <input
                                                type="date"
                                                value={editedContact.dateOfBirth}
                                                onChange={(e) => handleChange(e, 'dateOfBirth')}
                                            />
                                        ) : (
                                            contact.dateOfBirth
                                        )}
                                    </td>
                                    <td>
                                        {editingContactId === contact.id ? (
                                            <select
                                                value={editedContact.married ? "Yes" : "No"}
                                                onChange={(e) => handleChange(e, 'married')}
                                            >
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        ) : (
                                            contact.married ? "Yes" : "No"
                                        )}
                                    </td>
                                    <td>
                                        {editingContactId === contact.id ? (
                                            <input
                                                type="text"
                                                value={editedContact.phone}
                                                onChange={(e) => handleChange(e, 'phone')}
                                            />
                                        ) : (
                                            contact.phone
                                        )}
                                    </td>
                                    <td>
                                        {editingContactId === contact.id ? (
                                            <input
                                                type="number"
                                                value={editedContact.salary}
                                                onChange={(e) => handleChange(e, 'salary')}
                                            />
                                        ) : (
                                            contact.salary
                                        )}
                                    </td>
                                    <td>
                                        {editingContactId === contact.id ? (
                                            <button className='btn btn-info' onClick={handleSave}>Save</button>
                                            
                                            
                                        ) : (
                                            <div>
                                                <button className='btn btn-secondary' onClick={() => handleEdit(contact)}>Edit</button>
                                                </div>
                                            
                                        )}
                                        
                                    </td>
                                    <td><button className='btn btn-danger' onClick={() => handleDelete(contact.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div className="d-flex justify-content-center m-5">
                    <h3><span className='badge text-bg-secondary'>There are no contacts available</span></h3>
                </div>
            </>
        );
    }
};
