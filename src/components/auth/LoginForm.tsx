"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Attempting login with:", { mobile, password: "***" });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      console.log("Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (data.status === true || data.success === true) {
        // Store user data from API response
        if (data.data) {
          localStorage.setItem('token', data.data.token || data.token);
          localStorage.setItem('name', data.data.name || data.name);
          localStorage.setItem('email', data.data.email || data.email);
          localStorage.setItem('mobile', data.data.mobile || data.mobile);
          localStorage.setItem('created', data.data.created || data.created);
        }
        toast.success("Login successful!");
        router.push('/dashboard');
      } else {
        console.error("Login failed:", data);
        toast.error(data.msg || data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <Input
        label="Mobile"
        type="text"
        placeholder="Enter your mobile"
        maxLength={10}
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        icon={<Mail className="w-5 h-5" />}
        required
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock className="w-5 h-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
        required
      />

      <div className="text-right">
        <Link href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full gap-2 group"
      >
        Sign In
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};