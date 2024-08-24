import React, { useState } from 'react';
import './MyStudents.css'; // Import the corresponding CSS file

const MyStudents = () => {
    const [students, setStudents] = useState([
        { name: 'Jane Cooper', course: 'Python 101', phone: '(225) 555-0118', email: 'jane@microsoft.com', country: 'United States', status: 'Active' },
        { name: 'Floyd Miles', course: 'Math', phone: '(205) 555-0100', email: 'floyd@yahoo.com', country: 'Kiribati', status: 'Inactive' },
        { name: 'Ronald Richards', course: 'Figma', phone: '(302) 555-0107', email: 'ronald@adobe.com', country: 'Israel', status: 'Inactive' },
        { name: 'Marvin McKinney', course: 'python 101', phone: '(252) 555-0126', email: 'marvin@tesla.com', country: 'Iran', status: 'Active' },
        { name: 'Jerome Bell', course: 'Python 101', phone: '(629) 555-0129', email: 'jerome@google.com', country: 'Réunion', status: 'Active' },
        { name: 'Kathryn Murphy', course: 'Python 101', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', country: 'Curaçao', status: 'Active' },
        { name: 'Jacob Jones', course: 'Python 101', phone: '(208) 555-0112', email: 'jacob@yahoo.com', country: 'Brazil', status: 'Active' },
        { name: 'Kristin Watson', course: 'Python 101', phone: '(704) 555-0127', email: 'kristin@facebook.com', country: 'Åland Islands', status: 'Inactive' }
    ]);

    const [sortBy, setSortBy] = useState('Newest');

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        // Implement sorting logic here if needed
    };

    return (
        <div className="my-students-container">
            <div className="statistics">
                <div className="stat-item">
                    <h3>Total Students</h3>
                    <p>23</p>
                    <span>16% this month</span>
                </div>
                <div className="stat-item">
                    <h3>Paused</h3>
                    <p>5</p>
                    <span style={{ color: 'red' }}>7% this month</span>
                </div>
                <div className="stat-item">
                    <h3>Active Now</h3>
                    <p>18</p>
                    <div className="active-students-images">
                        {/* Display active student images */}
                    </div>
                </div>
            </div>
            <div className="students-table">
                <div className="table-header">
                    <h2>All Students</h2>
                    <input type="text" placeholder="Search" />
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Course">Sort by course</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Students Name</th>
                            <th>Courses</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.course}</td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>{student.country}</td>
                                <td>
                                    <span className={`status ${student.status.toLowerCase()}`}>
                                        {student.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>&lt;</span>
                    <span className="page-number active">1</span>
                    <span className="page-number">2</span>
                    <span className="page-number">3</span>
                    <span className="page-number">4</span>
                    <span>...</span>
                    <span className="page-number">40</span>
                    <span>&gt;</span>
                </div>
            </div>
        </div>
    );
};

export default MyStudents;
