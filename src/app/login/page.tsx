"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('token')) {
            router.push('/dashboard');
        }
    }, [router]);

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your account"
        >
            <LoginForm />

            {/* Divider */}
            <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-sm text-gray-400">or</span>
                <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
                <p className="text-gray-300">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            <ToastContainer />
        </AuthLayout>
    );
}