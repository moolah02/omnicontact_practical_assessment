import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import UserManagement from './components/UserManagement';

const root = createRoot(document.getElementById('app'));
root.render(<UserManagement />);
