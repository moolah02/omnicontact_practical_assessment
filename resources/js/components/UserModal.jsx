import React, { useEffect } from 'react';

const UserModal = ({ user, onClose }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
                    onClick={onClose}
                ></div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">User Details</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="bg-white px-6 py-6">
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                                <p className="text-blue-600 mt-1">{user.username}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Email</p>
                                            <p className="text-gray-900 mt-1">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Phone</p>
                                            <p className="text-gray-900 mt-1">{user.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Website</p>
                                            <a
                                                href={`http://${user.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 mt-1 inline-block"
                                            >
                                                {user.website}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Address</h4>
                                    <div className="space-y-2">
                                        <p className="text-gray-900">{user.address.street}</p>
                                        <p className="text-gray-900">{user.address.suite}</p>
                                        <p className="text-gray-900">{user.address.city}, {user.address.zipcode}</p>
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-500 font-medium">Coordinates</p>
                                            <p className="text-gray-700 text-sm mt-1">
                                                Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Company</h4>
                                    <div className="space-y-2">
                                        <p className="text-lg font-semibold text-gray-900">{user.company.name}</p>
                                        <p className="text-gray-700 italic text-sm">"{user.company.catchPhrase}"</p>
                                        <p className="text-gray-600 text-sm">{user.company.bs}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
