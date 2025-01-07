import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';

export const CsvForm = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if(file) {
            const formData = new FormData();

            formData.append('file', file);

            await axios.post('https://localhost:7133/api/contacts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((response) => {
                console.log('file uploaded successfully', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            alert('file uploaded successfully! Reload this page too see loaded data by pressing F5');
        }
    }

    return (
        <>
            <h3 className='d-flex justify-content-center align-items-center'>Load your CSV</h3>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="input-group w-50">
                    <input type="file" accept='.csv' onChange={e => setFile(e.target.files?.[0] || null )} className="form-control" id="inputGroupFile01" />
                    <button onClick={handleUpload} className='btn btn-primary'>Upload</button>
                </div>
            </div>
        </>
    );
}