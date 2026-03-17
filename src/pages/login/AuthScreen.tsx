import React, { useEffect, useRef, useState } from 'react';
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
import { googleAuth, login, signup } from '@/utils/user.feature';
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
	const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
	const signInGoogleRef = useRef<HTMLDivElement | null>(null);
	const signUpGoogleRef = useRef<HTMLDivElement | null>(null);
	const googleInitializedRef = useRef(false);
	const activeTabRef = useRef<'signin' | 'signup'>('signin');
	const signUpRoleRef = useRef<SignUpFormData['role']>('student');

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

	const handleGoogleAuth = async (response: GoogleCredentialResponse) => {
		const role =
			activeTabRef.current === 'signup' ? signUpRoleRef.current : undefined;
		const { data, success, error } = await googleAuth({
			credential: response.credential,
			role,
		});

		if (success && data) {
			localStorage.setItem('USER_TOKEN', data.token);
			queryClient.invalidateQueries({ queryKey: ['auth_user'] });
			toast.success('User authenticated successfully');
			return;
		}

		if (error) toast.error(error.message);
	};

	const handleIfnossSignIn = () => {
		console.log('IFNOSS Sign In');
		toast.info('comming soon');
	};

	useEffect(() => {
		if (authUser?.user) navigate('/profile');
		else localStorage.removeItem('USER_TOKEN');
	}, [authUser, navigate]);

	useEffect(() => {
		activeTabRef.current = activeTab;
		signUpRoleRef.current = signUpData.role;
	}, [activeTab, signUpData.role]);

	useEffect(() => {
		const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

		if (!clientId) {
			return;
		}

		const renderGoogleButton = (
			container: HTMLDivElement | null,
			text: 'signin_with' | 'signup_with',
		) => {
			if (!container || !window.google?.accounts.id) {
				return;
			}

			container.innerHTML = '';
			window.google.accounts.id.renderButton(container, {
				theme: 'outline',
				size: 'large',
				text,
				shape: 'rectangular',
				width: 320,
				logo_alignment: 'left',
			});
		};

		const initializeGoogle = () => {
			if (!window.google?.accounts.id || googleInitializedRef.current) {
				return;
			}

			window.google.accounts.id.initialize({
				client_id: clientId,
				callback: handleGoogleAuth,
			});
			googleInitializedRef.current = true;
		};

		const renderGoogleButtonForActiveTab = () => {
			if (!window.google?.accounts.id) {
				return;
			}

			initializeGoogle();

			requestAnimationFrame(() => {
				if (activeTab === 'signin') {
					renderGoogleButton(signInGoogleRef.current, 'signin_with');
					return;
				}

				renderGoogleButton(signUpGoogleRef.current, 'signup_with');
			});
		};

		const existingScript = document.querySelector<HTMLScriptElement>(
			'script[src="https://accounts.google.com/gsi/client"]',
		);

		if (existingScript) {
			if (window.google?.accounts.id) {
				renderGoogleButtonForActiveTab();
			} else {
				existingScript.addEventListener('load', renderGoogleButtonForActiveTab, {
					once: true,
				});
			}

			return;
		}

		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		script.addEventListener('load', renderGoogleButtonForActiveTab, { once: true });
		document.head.appendChild(script);
	}, [activeTab, signUpData.role]);

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
						value={activeTab}
						onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')}
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

								{import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
									<div
										ref={signInGoogleRef}
										className='flex justify-center'
									/>
								) : (
									<Button
										type='button'
										variant='outline'
										className='w-full hover:bg-accent'
										disabled
									>
										Google sign-in not configured
									</Button>
								)}

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

								{import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
									<div
										ref={signUpGoogleRef}
										className='flex justify-center'
									/>
								) : (
									<Button
										type='button'
										variant='outline'
										className='w-full hover:bg-accent'
										disabled
									>
										Google sign-in not configured
									</Button>
								)}
							</form>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};

export default AuthComponent;
