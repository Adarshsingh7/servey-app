import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Height of the fixed public navbar, so anchored sections are not hidden under it.
const NAV_OFFSET = 88;

/**
 * Scrolls to the section named by the URL hash (`/#features`), or back to the
 * top when there is none. The target may not be mounted on the first frame
 * after a route change, so we retry for a few frames before giving up.
 */
export default function RootLayout() {
	const { pathname, hash, key } = useLocation();

	useEffect(() => {
		if (!hash) {
			window.scrollTo({ top: 0 });
			return;
		}

		const id = decodeURIComponent(hash.slice(1));
		let frame = 0;
		let attempts = 0;

		const scrollToTarget = () => {
			const el = document.getElementById(id);
			if (el) {
				const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
				window.scrollTo({ top, behavior: 'smooth' });
				return;
			}
			if (attempts++ < 30) frame = requestAnimationFrame(scrollToTarget);
		};

		frame = requestAnimationFrame(scrollToTarget);
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash, key]);

	return <Outlet />;
}
