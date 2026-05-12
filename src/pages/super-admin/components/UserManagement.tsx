'use client';

import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	useGetAllUsers,
	useUpdateUser,
	useUpdatePasswordByAdmin,
	useCreateUser,
} from '@/queries/admin.query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { userQueryAuth } from '@/queries/auth.query';
import {
	Edit,
	Key,
	UserPlus,
	UserMinus,
	UserCheck,
	Search,
	AlertTriangle,
	ShieldCheck,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from '@/components/ui/select';
import { toast } from 'sonner';

/**
 * UserManagement Component
 * Refactored for a high-density, professional SaaS dashboard.
 * Focus: Neutral tokens, compact rows, and refined micro-interactions.
 */
const UserManagement: React.FC = () => {
	const { data: usersData, isLoading } = useGetAllUsers();
	const users = (usersData?.data?.data as UserType[]) || [];
	const { mutate: updateUser } = useUpdateUser();
	const { mutate: updatePassword } = useUpdatePasswordByAdmin();
	const { mutate: createUser } = useCreateUser();
	const { data: authData } = useQuery(userQueryAuth());
	const currentUser = authData?.user;

	const [searchTerm, setSearchTerm] = useState('');
	const [adminPage, setAdminPage] = useState(1);
	const [userPage, setUserPage] = useState(1);
	const itemsPerPage = 5;
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState<
		string | null
	>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState<UserType | null>(
		null,
	);
	const [userToToggle, setUserToToggle] = useState<UserType | null>(null);

	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: 'student',
	});

	const [passwords, setPasswords] = useState({
		newPassword: '',
		passwordConfirm: '',
	});

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const adminUsers = filteredUsers.filter((u) => u.role === 'superadmin');
	const regularUsers = filteredUsers.filter((u) => u.role !== 'superadmin');

	const paginatedAdmins = adminUsers.slice(
		(adminPage - 1) * itemsPerPage,
		adminPage * itemsPerPage,
	);
	const paginatedUsers = regularUsers.slice(
		(userPage - 1) * itemsPerPage,
		userPage * itemsPerPage,
	);

	const handleToggleActive = (user: UserType) => {
		if (String(user._id) === String(currentUser?._id)) {
			toast.error('You cannot disable your own administrator account.', {
				description: 'Security policy prevents self-disabling to avoid lockouts.',
			});
			return;
		}
		if (user.isActive) {
			setUserToToggle(user);
		} else {
			updateUser({ id: user._id!, body: { isActive: true } });
		}
	};

	const confirmToggleActive = () => {
		if (userToToggle) {
			updateUser(
				{ id: userToToggle._id!, body: { isActive: !userToToggle.isActive } },
				{
					onSuccess: () => {
						setUserToToggle(null);
					},
				},
			);
		}
	};

	const handleCreateUser = () => {
		if (newUser.password !== newUser.passwordConfirm) {
			return toast.error('Passwords do not match');
		}
		createUser(newUser as any, {
			onSuccess: () => {
				setIsCreateDialogOpen(false);
				setNewUser({
					name: '',
					email: '',
					password: '',
					passwordConfirm: '',
					role: 'student',
				});
			},
		});
	};

	const handleChangePassword = () => {
		if (passwords.newPassword !== passwords.passwordConfirm) {
			return toast.error('Passwords do not match');
		}
		if (isPasswordDialogOpen) {
			updatePassword(
				{ userId: isPasswordDialogOpen, body: passwords },
				{
					onSuccess: () => {
						setIsPasswordDialogOpen(null);
						setPasswords({ newPassword: '', passwordConfirm: '' });
					},
				},
			);
		}
	};

	const handleUpdateUser = () => {
		if (isEditDialogOpen) {
			updateUser(
				{
					id: isEditDialogOpen._id!,
					body: {
						name: isEditDialogOpen.name,
						role: isEditDialogOpen.role,
					},
				},
				{
					onSuccess: () => {
						setIsEditDialogOpen(null);
					},
				},
			);
		}
	};

	const getUserInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-24'>
				<div className='h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent' />
			</div>
		);
	}

	return (
		<div className='bg-card'>
			{/* Action Toolbar */}
			<div className='p-3 flex items-center justify-between gap-4 border-b border-border/50'>
				<div className='relative w-full max-w-sm group'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors' />
					<Input
						placeholder='Search users...'
						className='pl-9 h-9 bg-background border-border rounded-lg text-sm transition-all focus-visible:ring-1 focus-visible:ring-primary'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Button
					onClick={() => setIsCreateDialogOpen(true)}
					size='sm'
					className='rounded-lg gap-2 h-9 px-4 bg-primary text-primary-foreground shadow-sm hover:shadow transition-all active:scale-95'
				>
					<UserPlus className='h-3.5 w-3.5' />
					<span className='text-xs font-medium'>Add User</span>
				</Button>
			</div>

			{/* Users Table */}
			<div className='p-6 space-y-12'>
				{/* Section 1: Regular Users (Now First) */}
				<section className='space-y-4'>
					<div className='flex items-center gap-2 px-1'>
						<div className='flex items-center justify-center w-5 h-5 rounded bg-muted/50'>
							<Search className='h-3 w-3 text-muted-foreground' />
						</div>
						<h3 className='text-sm font-bold text-foreground tracking-tight'>
							Users & Roles
						</h3>
						<Badge
							variant='outline'
							className='ml-auto bg-muted/50 text-muted-foreground border-border font-bold'
						>
							{regularUsers.length} Total
						</Badge>
					</div>
					<div className='rounded-xl border border-border/60 overflow-hidden shadow-sm'>
						<Table>
							<TableHeader className='bg-muted/30'>
								<TableRow className='hover:bg-transparent border-border/50'>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-4'>
										User Info
									</TableHead>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
										Role
									</TableHead>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
										Status
									</TableHead>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right pr-4'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedUsers.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={4}
											className='text-center py-12 text-muted-foreground text-sm'
										>
											No regular users found.
										</TableCell>
									</TableRow>
								) : (
									paginatedUsers.map((user) => (
										<TableRow
											key={user._id}
											className='group border-border/40 hover:bg-muted/20 transition-colors'
										>
											<TableCell className='py-2.5 pl-4'>
												<div className='flex items-center gap-3'>
													<Avatar className='h-8 w-8 border border-border/60'>
														<AvatarImage src={user.photo} />
														<AvatarFallback className='bg-primary/5 text-[9px] font-bold text-primary'>
															{getUserInitials(user.name)}
														</AvatarFallback>
													</Avatar>
													<div className='flex flex-col'>
														<span className='text-sm font-semibold text-foreground tracking-tight leading-tight'>
															{user.name}
														</span>
														<span className='text-[11px] text-muted-foreground leading-none'>
															{user.email}
														</span>
													</div>
												</div>
											</TableCell>
											<TableCell className='py-2.5'>
												<Badge
													variant='secondary'
													className={`capitalize font-bold text-[9px] px-2 py-0 h-5 border-transparent tracking-wide ${
														user.role === 'teacher'
															? 'bg-emerald-500/10 text-emerald-600'
															: 'bg-amber-500/10 text-amber-600'
													}`}
												>
													{user.role}
												</Badge>
											</TableCell>
											<TableCell className='py-2.5'>
												<Badge
													variant='outline'
													className={`px-2 py-0 h-5 text-[9px] font-bold uppercase tracking-tight ${
														user.isActive
															? 'bg-green-500/10 text-green-600 border-green-500/20'
															: 'bg-red-500/10 text-red-600 border-red-500/20'
													}`}
												>
													{user.isActive ? 'Active' : 'Disabled'}
												</Badge>
											</TableCell>
											<TableCell className='py-2.5 text-right pr-4'>
												<div className='flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
													<Button
														variant='ghost'
														size='icon'
														className='h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all rounded-md'
														onClick={() => setIsEditDialogOpen(user)}
														title='Edit User'
													>
														<Edit className='h-3.5 w-3.5' />
													</Button>
													<Button
														variant='ghost'
														size='icon'
														className='h-8 w-8 text-muted-foreground hover:text-amber-600 hover:bg-amber-50 transition-all rounded-md'
														onClick={() => setIsPasswordDialogOpen(user._id || null)}
														title='Reset Password'
													>
														<Key className='h-3.5 w-3.5' />
													</Button>
													<Button
														variant='ghost'
														size='icon'
														disabled={String(user._id) === String(currentUser?._id)}
														className={`h-8 w-8 transition-all rounded-md ${
															user.isActive
																? 'text-muted-foreground hover:text-red-600 hover:bg-red-50'
																: 'text-muted-foreground hover:text-green-600 hover:bg-green-50'
														} ${String(user._id) === String(currentUser?._id) ? 'opacity-20 cursor-not-allowed' : ''}`}
														onClick={() => handleToggleActive(user)}
														title={
															String(user._id) === String(currentUser?._id)
																? 'Cannot disable self'
																: user.isActive
																	? 'Disable User'
																	: 'Enable User'
														}
													>
														{user.isActive ? (
															<UserMinus className='h-3.5 w-3.5' />
														) : (
															<UserCheck className='h-3.5 w-3.5' />
														)}
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination for Regular Users */}
					{regularUsers.length > itemsPerPage && (
						<div className='flex items-center justify-end gap-2 px-1 pt-2'>
							<span className='text-[10px] font-medium text-muted-foreground mr-2'>
								Page {userPage} of {Math.ceil(regularUsers.length / itemsPerPage)}
							</span>
							<Button
								variant='outline'
								size='icon'
								className='h-7 w-7 rounded-md border-border/60 hover:bg-muted'
								onClick={() => setUserPage((p) => Math.max(1, p - 1))}
								disabled={userPage === 1}
							>
								<ChevronLeft className='h-3.5 w-3.5' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								className='h-7 w-7 rounded-md border-border/60 hover:bg-muted'
								onClick={() =>
									setUserPage((p) =>
										Math.min(Math.ceil(regularUsers.length / itemsPerPage), p + 1),
									)
								}
								disabled={
									userPage === Math.ceil(regularUsers.length / itemsPerPage)
								}
							>
								<ChevronRight className='h-3.5 w-3.5' />
							</Button>
						</div>
					)}
				</section>

				{/* Section 2: Super Admins (Now Second) */}
				<section className='space-y-4'>
					<div className='flex items-center gap-2 px-1'>
						<ShieldCheck className='h-5 w-5 text-indigo-600' />
						<h3 className='text-sm font-bold text-foreground tracking-tight'>
							Platform Administrators
						</h3>
						<Badge
							variant='outline'
							className='ml-auto bg-indigo-50 text-indigo-600 border-indigo-100 font-bold'
						>
							{adminUsers.length} Total
						</Badge>
					</div>
					<div className='rounded-xl border border-border/60 overflow-hidden shadow-sm'>
						<Table>
							<TableHeader className='bg-muted/30'>
								<TableRow className='hover:bg-transparent border-border/50'>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-4'>
										Admin Info
									</TableHead>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
										Status
									</TableHead>
									<TableHead className='h-10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right pr-4'>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedAdmins.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={3}
											className='text-center py-8 text-muted-foreground text-xs italic'
										>
											No administrators found.
										</TableCell>
									</TableRow>
								) : (
									paginatedAdmins.map((user) => (
										<TableRow
											key={user._id}
											className='group border-border/40 hover:bg-muted/20 transition-colors'
										>
											<TableCell className='py-3 pl-4'>
												<div className='flex items-center gap-3'>
													<Avatar className='h-9 w-9 border border-border/60 shadow-sm'>
														<AvatarImage src={user.photo} />
														<AvatarFallback className='bg-indigo-50 text-[10px] font-bold text-indigo-600'>
															{getUserInitials(user.name)}
														</AvatarFallback>
													</Avatar>
													<div className='flex flex-col'>
														<div className='flex items-center gap-1.5'>
															<span className='text-sm font-bold text-foreground tracking-tight'>
																{user.name}
															</span>
															<ShieldCheck className='h-3 w-3 text-indigo-500' />
														</div>
														<span className='text-[11px] text-muted-foreground leading-none'>
															{user.email}
														</span>
													</div>
												</div>
											</TableCell>
											<TableCell className='py-3'>
												<Badge
													variant='outline'
													className={`px-2 py-0 h-5 text-[9px] font-bold uppercase tracking-tight ${
														user.isActive
															? 'bg-green-500/10 text-green-600 border-green-500/20'
															: 'bg-red-500/10 text-red-600 border-red-500/20'
													}`}
												>
													{user.isActive ? 'Active' : 'Disabled'}
												</Badge>
											</TableCell>
											<TableCell className='py-3 text-right pr-4'>
												<div className='flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
													<Button
														variant='ghost'
														size='icon'
														className='h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all'
														onClick={() => setIsEditDialogOpen(user)}
														title='Edit'
													>
														<Edit className='h-3.5 w-3.5' />
													</Button>
													<Button
														variant='ghost'
														size='icon'
														className='h-8 w-8 text-muted-foreground hover:text-amber-600 hover:bg-amber-50 transition-all'
														onClick={() => setIsPasswordDialogOpen(user._id || null)}
														title='Reset Password'
													>
														<Key className='h-3.5 w-3.5' />
													</Button>
													<Button
														variant='ghost'
														size='icon'
														disabled={String(user._id) === String(currentUser?._id)}
														className={`h-8 w-8 transition-all ${
															user.isActive
																? 'hover:text-red-600 hover:bg-red-50'
																: 'hover:text-green-600 hover:bg-green-50'
														} ${String(user._id) === String(currentUser?._id) ? 'opacity-20 cursor-not-allowed' : ''}`}
														onClick={() => handleToggleActive(user)}
														title={
															String(user._id) === String(currentUser?._id)
																? 'Cannot disable self'
																: user.isActive
																	? 'Disable'
																	: 'Enable'
														}
													>
														{user.isActive ? (
															<UserMinus className='h-3.5 w-3.5' />
														) : (
															<UserCheck className='h-3.5 w-3.5' />
														)}
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination for Admins */}
					{adminUsers.length > itemsPerPage && (
						<div className='flex items-center justify-end gap-2 px-1 pt-2'>
							<span className='text-[10px] font-medium text-muted-foreground mr-2'>
								Page {adminPage} of {Math.ceil(adminUsers.length / itemsPerPage)}
							</span>
							<Button
								variant='outline'
								size='icon'
								className='h-7 w-7 rounded-md border-border/60 hover:bg-muted'
								onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
								disabled={adminPage === 1}
							>
								<ChevronLeft className='h-3.5 w-3.5' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								className='h-7 w-7 rounded-md border-border/60 hover:bg-muted'
								onClick={() =>
									setAdminPage((p) =>
										Math.min(Math.ceil(adminUsers.length / itemsPerPage), p + 1),
									)
								}
								disabled={
									adminPage === Math.ceil(adminUsers.length / itemsPerPage)
								}
							>
								<ChevronRight className='h-3.5 w-3.5' />
							</Button>
						</div>
					)}
				</section>
			</div>

			{/* Dialogs - Shared Styling */}

			{/* Create User Dialog */}
			<Dialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
			>
				<DialogContent className='sm:max-w-[400px] rounded-xl border-border bg-card'>
					<DialogHeader>
						<DialogTitle className='text-lg font-bold tracking-tight'>
							Create User
						</DialogTitle>
						<DialogDescription className='text-xs'>
							Add a new account to the system.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-3 py-2'>
						<div className='grid gap-1.5'>
							<Label
								className='text-[11px] font-bold uppercase text-muted-foreground'
								htmlFor='name'
							>
								Full Name
							</Label>
							<Input
								id='name'
								className='h-9 text-sm rounded-lg'
								value={newUser.name}
								onChange={(e) =>
									setNewUser({ ...newUser, name: e.target.value })
								}
								placeholder='Jane Doe'
							/>
						</div>
						<div className='grid gap-1.5'>
							<Label
								className='text-[11px] font-bold uppercase text-muted-foreground'
								htmlFor='email'
							>
								Email Address
							</Label>
							<Input
								id='email'
								type='email'
								className='h-9 text-sm rounded-lg'
								value={newUser.email}
								onChange={(e) =>
									setNewUser({ ...newUser, email: e.target.value })
								}
								placeholder='jane@example.com'
							/>
						</div>
						<div className='grid gap-1.5'>
							<Label className='text-[11px] font-bold uppercase text-muted-foreground'>
								Role
							</Label>
							<Select
								value={newUser.role}
								onChange={(val) => setNewUser({ ...newUser, role: val })}
								options={[
									{ label: 'Student', value: 'student' },
									{ label: 'Teacher', value: 'teacher' },
									{ label: 'Super Admin', value: 'superadmin' },
								]}
							/>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<div className='grid gap-1.5'>
								<Label
									className='text-[11px] font-bold uppercase text-muted-foreground'
									htmlFor='password'
								>
									Password
								</Label>
								<Input
									id='password'
									type='password'
									className='h-9 text-sm rounded-lg'
									value={newUser.password}
									onChange={(e) =>
										setNewUser({ ...newUser, password: e.target.value })
									}
									placeholder='••••••••'
								/>
							</div>
							<div className='grid gap-1.5'>
								<Label
									className='text-[11px] font-bold uppercase text-muted-foreground'
									htmlFor='passwordConfirm'
								>
									Confirm
								</Label>
								<Input
									id='passwordConfirm'
									type='password'
									className='h-9 text-sm rounded-lg'
									value={newUser.passwordConfirm}
									onChange={(e) =>
										setNewUser({ ...newUser, passwordConfirm: e.target.value })
									}
									placeholder='••••••••'
								/>
							</div>
						</div>
					</div>
					<DialogFooter className='mt-2'>
						<Button
							variant='ghost'
							size='sm'
							className='text-xs rounded-lg h-9'
							onClick={() => setIsCreateDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button
							size='sm'
							className='text-xs rounded-lg h-9 px-6'
							onClick={handleCreateUser}
						>
							Create Account
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Change Password Dialog */}
			<Dialog
				open={!!isPasswordDialogOpen}
				onOpenChange={() => setIsPasswordDialogOpen(null)}
			>
				<DialogContent className='sm:max-w-[400px] rounded-xl border-border bg-card'>
					<DialogHeader>
						<DialogTitle className='text-lg font-bold tracking-tight'>
							Change Password
						</DialogTitle>
						<DialogDescription className='text-xs'>
							Update authentication credentials for this user.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-3 py-2'>
						<div className='grid gap-1.5'>
							<Label
								className='text-[11px] font-bold uppercase text-muted-foreground'
								htmlFor='newPassword'
							>
								New Password
							</Label>
							<Input
								id='newPassword'
								type='password'
								className='h-9 text-sm rounded-lg'
								value={passwords.newPassword}
								onChange={(e) =>
									setPasswords({ ...passwords, newPassword: e.target.value })
								}
								placeholder='••••••••'
							/>
						</div>
						<div className='grid gap-1.5'>
							<Label
								className='text-[11px] font-bold uppercase text-muted-foreground'
								htmlFor='passConfirm'
							>
								Confirm New Password
							</Label>
							<Input
								id='passConfirm'
								type='password'
								className='h-9 text-sm rounded-lg'
								value={passwords.passwordConfirm}
								onChange={(e) =>
									setPasswords({
										...passwords,
										passwordConfirm: e.target.value,
									})
								}
								placeholder='••••••••'
							/>
						</div>
					</div>
					<DialogFooter className='mt-2'>
						<Button
							variant='ghost'
							size='sm'
							className='text-xs rounded-lg h-9'
							onClick={() => setIsPasswordDialogOpen(null)}
						>
							Cancel
						</Button>
						<Button
							size='sm'
							className='text-xs rounded-lg h-9 px-6'
							onClick={handleChangePassword}
						>
							Update Password
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit User Dialog */}
			<Dialog
				open={!!isEditDialogOpen}
				onOpenChange={() => setIsEditDialogOpen(null)}
			>
				<DialogContent className='sm:max-w-[400px] rounded-xl border-border bg-card'>
					<DialogHeader>
						<DialogTitle className='text-lg font-bold tracking-tight'>
							Edit Profile
						</DialogTitle>
						<DialogDescription className='text-xs'>
							Modify user identity and system permissions.
						</DialogDescription>
					</DialogHeader>
					{isEditDialogOpen && (
						<div className='grid gap-3 py-2'>
							<div className='grid gap-1.5'>
								<Label
									className='text-[11px] font-bold uppercase text-muted-foreground'
									htmlFor='edit-name'
								>
									Full Name
								</Label>
								<Input
									id='edit-name'
									className='h-9 text-sm rounded-lg'
									value={isEditDialogOpen.name}
									onChange={(e) =>
										setIsEditDialogOpen({
											...isEditDialogOpen,
											name: e.target.value,
										})
									}
								/>
							</div>
							<div className='grid gap-1.5'>
								<Label className='text-[11px] font-bold uppercase text-muted-foreground'>
									Role
								</Label>
								<Select
									value={isEditDialogOpen.role}
									onChange={(val) =>
										setIsEditDialogOpen({
											...isEditDialogOpen,
											role: val as any,
										})
									}
									options={[
										{ label: 'Student', value: 'student' },
										{ label: 'Teacher', value: 'teacher' },
										{ label: 'Super Admin', value: 'superadmin' },
									]}
								/>
							</div>
						</div>
					)}
					<DialogFooter className='mt-2'>
						<Button
							variant='ghost'
							size='sm'
							className='text-xs rounded-lg h-9'
							onClick={() => setIsEditDialogOpen(null)}
						>
							Cancel
						</Button>
						<Button
							size='sm'
							className='text-xs rounded-lg h-9 px-6'
							onClick={handleUpdateUser}
						>
							Save Changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Disable Confirmation Dialog */}
			<Dialog
				open={!!userToToggle}
				onOpenChange={(open) => !open && setUserToToggle(null)}
			>
				<DialogContent className='sm:max-w-[400px] rounded-xl border-border bg-card'>
					<DialogHeader>
						<div className='flex items-center gap-2 mb-1'>
							<div className='p-2 rounded-full bg-red-100 text-red-600'>
								<AlertTriangle className='h-5 w-5' />
							</div>
							<DialogTitle className='text-lg font-bold tracking-tight'>
								Disable User Account?
							</DialogTitle>
						</div>
						<DialogDescription className='text-xs'>
							Are you sure you want to disable <strong>{userToToggle?.name}</strong>? 
							This user will be unable to log in or access their data until reactivated.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='mt-4 flex gap-2'>
						<Button
							variant='ghost'
							size='sm'
							className='text-xs rounded-lg h-9 flex-1'
							onClick={() => setUserToToggle(null)}
						>
							Cancel
						</Button>
						<Button
							size='sm'
							variant='destructive'
							className='text-xs rounded-lg h-9 flex-1 bg-red-600 hover:bg-red-700'
							onClick={confirmToggleActive}
						>
							Confirm Disable
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UserManagement;
