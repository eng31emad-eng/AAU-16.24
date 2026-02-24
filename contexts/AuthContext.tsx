'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'admin' | 'doctor' | 'student' | null;

interface User {
    id: string;
    name: string;
    role: UserRole;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (role: UserRole) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for saved session in sessionStorage
        const savedUser = sessionStorage.getItem('university_auth_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (role: UserRole) => {
        setIsLoading(true);
        // Mock login delay
        await new Promise(resolve => setTimeout(resolve, 800));

        let mockUser: User | null = null;

        if (role === 'admin') {
            mockUser = { id: '1', name: 'مدير النظام', role: 'admin', email: 'admin@ngu.edu' };
        } else if (role === 'doctor') {
            mockUser = { id: '2', name: 'الأستاذ الدكتور', role: 'doctor', email: 'doctor@ngu.edu' };
        } else if (role === 'student') {
            mockUser = { id: '3', name: 'الطالب الجامعي', role: 'student', email: 'student@ngu.edu' };
        }

        if (mockUser) {
            setUser(mockUser);
            sessionStorage.setItem('university_auth_user', JSON.stringify(mockUser));
        }
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('university_auth_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
