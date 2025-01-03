import axios from 'axios';

const getContacts = async () => {
    const response = await axios.get('https://localhost:7133/api/contacts');
    return response.data;
}

const updateContact = async (contact) => axios.put(`https://localhost:7133/api/contacts/update/${contact.id}`, contact);

const deleteContact = async (id) => axios.delete(`https://localhost:7133/api/contacts/delete/${id}`); 

export default {getContacts, updateContact, deleteContact};