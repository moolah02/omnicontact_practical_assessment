import React, { useState, useEffect } from 'react';
import UserModal from './UserModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const usersPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchQuery, users]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        if (!searchQuery.trim()) {
            setFilteredUsers(users);
            setCurrentPage(1);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );

        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const handleDeleteUser = (userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);

        if (isModalOpen && selectedUser?.id === userId) {
            setIsModalOpen(false);
            setSelectedUser(null);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h2 className="text-red-800 font-bold text-lg mb-2">Error</h2>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchUsers}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">User Management</h1>
                        <p className="text-blue-100 text-sm mt-1">Browse and manage users</p>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {currentUsers.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p className="mt-2 text-gray-500 font-medium">No users found</p>
                                <p className="text-gray-400 text-sm">Try adjusting your search</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    {currentUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <button
                                                        onClick={() => handleUserClick(user)}
                                                        className="text-left w-full"
                                                    >
                                                        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition">
                                                            {user.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                                                    title="Delete user"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                                    <div className="text-sm text-gray-600">
                                        Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                                        <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{' '}
                                        <span className="font-medium">{filteredUsers.length}</span> users
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={goToPreviousPage}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-medium">
                                            {currentPage} / {totalPages}
                                        </span>
                                        <button
                                            onClick={goToNextPage}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedUser && (
                <UserModal user={selectedUser} onClose={closeModal} />
            )}
        </div>
    );
};

export default UserManagement;
