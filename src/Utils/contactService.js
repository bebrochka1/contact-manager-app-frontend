import axios from 'axios';

const getContacts = async () => {
    const response = await 
    axios
    .get('https://localhost:7133/api/contacts');
    return response.data;
}

const updateContact = async (contact) => 
    axios
    .put(`https://localhost:7133/api/contacts/update/${contact.id}`, contact)
    .catch((error) => {
        if (error.response && error.response.data) {
            const errors = error.response.data.errors;
            let messages = [];

            for (let field in errors) {
                messages.push(...errors[field]);
            }
            alert(messages.join("\n"));
        } else {
            alert("Сталася невідома помилка");
        }
    });

const deleteContact = async (id) => 
    axios
    .delete(`https://localhost:7133/api/contacts/delete/${id}`); 

export default {getContacts, updateContact, deleteContact};