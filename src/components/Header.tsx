import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueryAuth } from '@/queries/auth.query';
import { useNavigate } from 'react-router-dom';

function Header() {
	const { data } = useQuery(userQueryAuth());
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const user = data?.user;

	const getUserInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const handleLogOut = function () {
		localStorage.removeItem('USER_TOKEN');
		queryClient.invalidateQueries({ queryKey: ['auth_user'] });
		navigate('/auth');
	};

	if (!user) return null;

	return (
		<div>
			<div className='bg-gray-800 border-b border-border/60 top-0 z-10 sticky'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
					<div
						className='flex items-center gap-4 cursor-pointer'
						onClick={() => navigate('/')}
					>
						<Avatar className='h-10 w-10 border-2 border-primary/10 bg-white'>
							<AvatarImage
								src={user.photo}
								alt={user.name}
							/>
							<AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
						</Avatar>
						<div>
							<h1 className='text-base font-semibold text-primary leading-none'>
								{user.name}
							</h1>
							<p className='text-xs text-secondary-foreground mt-1'>
								{user.email}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<Badge
							variant='outline'
							className='hidden sm:inline-flex bg-muted/50'
						>
							{user.role}
						</Badge>
						<Button
							variant='ghost'
							size='sm'
							onClick={handleLogOut}
							className='text-destructive hover:bg-destructive/20'
						>
							<LogOut className='h-4 w-4' />
							<span>Logout</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
