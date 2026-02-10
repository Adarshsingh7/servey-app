import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueryAuth } from '@/queries/auth.query';
import { login, signup } from '@/utils/user.feature';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SignUpFormData {
	name: string;
	phone: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: 'student' | 'teacher';
}

interface SignInFormData {
	email: string;
	password: string;
}

const AuthComponent: React.FC = () => {
	const [signUpData, setSignUpData] = useState<SignUpFormData>({
		name: '',
		phone: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: 'student',
	});

	const [signInData, setSignInData] = useState<SignInFormData>({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const { data: authUser } = useQuery(userQueryAuth());

	const queryClient = useQueryClient();

	const handleSignUpChange = (field: keyof SignUpFormData, value: string) => {
		setSignUpData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSignInChange = (field: keyof SignInFormData, value: string) => {
		setSignInData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSignUpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data, error } = await signup(signUpData);
		if (error) toast.error(error.message);
		if (data) {
			localStorage.setItem('USER_TOKEN', data.token);
			queryClient.invalidateQueries({ queryKey: ['auth_user'] });
			toast.success('User Authenticated Successfully');
		}
	};

	const handleSignInSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data, success, error } = await login(signInData);
		if (success && data) {
			localStorage.setItem('USER_TOKEN', data.token);
			queryClient.invalidateQueries({ queryKey: ['auth_user'] });
			toast.success('User Authenticated Successfully');
		} else if (error) {
			toast.error(error.message);
		}
	};

	const handleGoogleAuth = () => {
		console.log('Google Authentication');
		toast.info('comming soon');
	};

	const handleIfnossSignIn = () => {
		console.log('IFNOSS Sign In');
		toast.info('comming soon');
	};

	useEffect(() => {
		if (authUser?.user) navigate('/profile');
		else localStorage.removeItem('USER_TOKEN');
	});

	return (
		<div className='min-h-screen flex items-center justify-center bg-background p-4'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader className='space-y-1 pb-6'>
					<CardTitle className='text-3xl font-bold text-center text-primary'>
						Welcome
					</CardTitle>
					<CardDescription className='text-center'>
						Sign in to your account or create a new one
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						defaultValue='signin'
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-2 mb-6'>
							<TabsTrigger
								value='signin'
								className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
							>
								Sign In
							</TabsTrigger>
							<TabsTrigger
								value='signup'
								className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
							>
								Sign Up
							</TabsTrigger>
						</TabsList>

						{/* Sign In Tab */}
						<TabsContent value='signin'>
							<form
								onSubmit={handleSignInSubmit}
								className='space-y-4'
							>
								<div className='space-y-2'>
									<Label
										htmlFor='signin-email'
										className='text-foreground'
									>
										Email
									</Label>
									<div className='relative'>
										<Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signin-email'
											type='email'
											placeholder='your.email@example.com'
											value={signInData.email}
											onChange={(e) =>
												handleSignInChange('email', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='signin-password'
										className='text-foreground'
									>
										Password
									</Label>
									<div className='relative'>
										<Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signin-password'
											type='password'
											placeholder='••••••••'
											value={signInData.password}
											onChange={(e) =>
												handleSignInChange('password', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<Button
									type='submit'
									className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
								>
									Sign In
								</Button>

								<div className='relative my-6'>
									<div className='absolute inset-0 flex items-center'>
										<span className='w-full border-t border-border' />
									</div>
									<div className='relative flex justify-center text-xs uppercase'>
										<span className='bg-card px-2 text-muted-foreground'>
											Or continue with
										</span>
									</div>
								</div>

								<Button
									type='button'
									variant='outline'
									className='w-full hover:bg-accent'
									onClick={handleGoogleAuth}
								>
									<svg
										className='mr-2 h-4 w-4'
										viewBox='0 0 24 24'
									>
										<path
											d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
											fill='#4285F4'
										/>
										<path
											d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
											fill='#34A853'
										/>
										<path
											d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
											fill='#FBBC05'
										/>
										<path
											d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
											fill='#EA4335'
										/>
									</svg>
									Sign in with Google
								</Button>

								<Button
									type='button'
									variant='outline'
									className='w-full hover:bg-accent'
									onClick={handleIfnossSignIn}
								>
									<Building2 className='mr-2 h-4 w-4' />
									Sign in with IFNOSS
								</Button>
							</form>
						</TabsContent>

						{/* Sign Up Tab */}
						<TabsContent value='signup'>
							<form
								onSubmit={handleSignUpSubmit}
								className='space-y-4'
							>
								<div className='space-y-2'>
									<Label
										htmlFor='signup-name'
										className='text-foreground'
									>
										Full Name
									</Label>
									<div className='relative'>
										<User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signup-name'
											type='text'
											placeholder='John Doe'
											value={signUpData.name}
											onChange={(e) =>
												handleSignUpChange('name', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='signup-phone'
										className='text-foreground'
									>
										Phone Number
									</Label>
									<div className='relative'>
										<Phone className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signup-phone'
											type='tel'
											placeholder='1234567890'
											value={signUpData.phone}
											onChange={(e) =>
												handleSignUpChange('phone', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='signup-email'
										className='text-foreground'
									>
										Email
									</Label>
									<div className='relative'>
										<Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signup-email'
											type='email'
											placeholder='your.email@example.com'
											value={signUpData.email}
											onChange={(e) =>
												handleSignUpChange('email', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='signup-password'
										className='text-foreground'
									>
										Password
									</Label>
									<div className='relative'>
										<Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signup-password'
											type='password'
											placeholder='••••••••'
											value={signUpData.password}
											onChange={(e) =>
												handleSignUpChange('password', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='signup-password-confirm'
										className='text-foreground'
									>
										Confirm Password
									</Label>
									<div className='relative'>
										<Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='signup-password-confirm'
											type='password'
											placeholder='••••••••'
											value={signUpData.passwordConfirm}
											onChange={(e) =>
												handleSignUpChange('passwordConfirm', e.target.value)
											}
											className='pl-10'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label className='text-foreground'>I am a</Label>
									<RadioGroup
										value={signUpData.role}
										onValueChange={(value) => handleSignUpChange('role', value)}
										className='flex gap-4'
									>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem
												value='student'
												id='student'
											/>
											<Label
												htmlFor='student'
												className='font-normal cursor-pointer'
											>
												Student
											</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem
												value='teacher'
												id='teacher'
											/>
											<Label
												htmlFor='teacher'
												className='font-normal cursor-pointer'
											>
												Teacher
											</Label>
										</div>
									</RadioGroup>
								</div>

								<Button
									type='submit'
									className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
								>
									Create Account
								</Button>

								<div className='relative my-6'>
									<div className='absolute inset-0 flex items-center'>
										<span className='w-full border-t border-border' />
									</div>
									<div className='relative flex justify-center text-xs uppercase'>
										<span className='bg-card px-2 text-muted-foreground'>
											Or continue with
										</span>
									</div>
								</div>

								<Button
									type='button'
									variant='outline'
									className='w-full hover:bg-accent'
									onClick={handleGoogleAuth}
								>
									<svg
										className='mr-2 h-4 w-4'
										viewBox='0 0 24 24'
									>
										<path
											d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
											fill='#4285F4'
										/>
										<path
											d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
											fill='#34A853'
										/>
										<path
											d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
											fill='#FBBC05'
										/>
										<path
											d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
											fill='#EA4335'
										/>
									</svg>
									Sign up with Google
								</Button>
							</form>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};

export default AuthComponent;
