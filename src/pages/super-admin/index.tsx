'use client';

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import UserManagement from './components/UserManagement';
import AllSurveys from './components/AllSurveys';
import GlobalAnalytics from './components/GlobalAnalytics';
import { Users, FileText, BarChart3, ShieldCheck } from 'lucide-react';

/**
 * SuperAdmin Component
 * Refactored for a high-density, modern SaaS aesthetic.
 * Focus: Precision spacing, OKLCH color variables, and refined typography.
 */
const SuperAdmin: React.FC = () => {
	const { tab } = useParams();
	const navigate = useNavigate();
	const activeTab = tab || 'users';

	const handleTabChange = (val: string) => {
		navigate(`/superadmin/${val}`);
	};

	return (
		<div className='min-h-screen bg-background font-sans antialiased'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
				{/* Page Header */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4'>
					<div className='space-y-1'>
						<div className='flex items-center gap-2'>
							<div className='p-1.5 bg-primary/10 rounded-lg'>
								<ShieldCheck className='h-5 w-5 text-primary' />
							</div>
							<h2 className='text-2xl font-bold tracking-tight text-foreground'>
								Super Admin Console
							</h2>
						</div>
						<p className='text-muted-foreground text-sm max-w-2xl leading-relaxed'>
							Full system management, user control, and cross-survey analytics.
						</p>
					</div>
				</div>

				<Tabs
					value={activeTab}
					className='space-y-6'
					onValueChange={handleTabChange}
				>
					{/* Navigation - Compact & Professional */}
					<div className='border-b border-border'>
						<TabsList className='bg-transparent h-auto p-0 gap-6 w-full justify-start rounded-none border-none'>
							<TabsTrigger
								value='users'
								className='relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-all duration-200 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground'
							>
								<Users className='h-4 w-4 mr-2' />
								User Management
							</TabsTrigger>
							<TabsTrigger
								value='surveys'
								className='relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-all duration-200 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground'
							>
								<FileText className='h-4 w-4 mr-2' />
								System Surveys
							</TabsTrigger>
							<TabsTrigger
								value='analytics'
								className='relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-all duration-200 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground'
							>
								<BarChart3 className='h-4 w-4 mr-2' />
								Global Analytics
							</TabsTrigger>
						</TabsList>
					</div>

					{/* Content Sections */}
					<TabsContent
						value='users'
						className='mt-0 outline-none transition-all duration-200'
					>
						<Card className='border-border bg-card shadow-sm rounded-xs overflow-hidden'>
							<CardHeader className='px-6 py-4 border-b border-border/50'>
								<CardTitle className='text-lg font-semibold tracking-tight'>
									Platform Users
								</CardTitle>
								<CardDescription className='text-xs'>
									Manage all registered users. Create, update, or disable
									accounts from a central interface.
								</CardDescription>
							</CardHeader>
							<CardContent className='p-0'>
								<UserManagement />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent
						value='surveys'
						className='mt-0 outline-none transition-all duration-200'
					>
						<Card className='border-border bg-card shadow-sm rounded-xs overflow-hidden'>
							<CardHeader className='px-6 py-4 border-b border-border/50'>
								<CardTitle className='text-lg font-semibold tracking-tight'>
									Global Survey Registry
								</CardTitle>
								<CardDescription className='text-xs'>
									Comprehensive directory of all surveys across the system.
								</CardDescription>
							</CardHeader>
							<CardContent className='p-0'>
								<AllSurveys />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent
						value='analytics'
						className='mt-0 outline-none transition-all duration-200'
					>
						<Card className='border-border bg-card shadow-sm rounded-xs overflow-hidden transition-all hover:shadow-md'>
							<CardHeader className='px-6 py-4 border-b border-border/50'>
								<CardTitle className='text-lg font-semibold tracking-tight'>
									System-Wide Analytics
								</CardTitle>
								<CardDescription className='text-xs'>
									Aggregated data across all surveys and responses.
								</CardDescription>
							</CardHeader>
							<CardContent className='p-0'>
								<GlobalAnalytics />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
};

export default SuperAdmin;
