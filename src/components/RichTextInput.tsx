import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import FontFamily from '@tiptap/extension-font-family';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useState, useCallback, useEffect } from 'react';
import '@/assets/tiptap-styles.css';
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Link as LinkIcon,
	List,
	ListOrdered,
	RotateCcw,
	ChevronDown,
	Palette,
	CaseSensitive,
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────

const FONTS = [
	{ label: 'Default', value: 'inherit' },
	{ label: 'Georgia', value: 'Georgia, serif' },
	{ label: 'Times New Roman', value: "'Times New Roman', serif" },
	{ label: 'Courier New', value: "'Courier New', monospace" },
	{ label: 'Trebuchet MS', value: "'Trebuchet MS', sans-serif" },
	{ label: 'Verdana', value: 'Verdana, sans-serif' },
	{ label: 'Impact', value: 'Impact, sans-serif' },
	{ label: 'Comic Sans MS', value: "'Comic Sans MS', cursive" },
];

const COLORS = [
	'#111827',
	'#374151',
	'#6b7280',
	'#d1d5db',
	'#ef4444',
	'#f97316',
	'#eab308',
	'#22c55e',
	'#3b82f6',
	'#6366f1',
	'#8b5cf6',
	'#ec4899',
	'#ffffff',
	'#fef9c3',
	'#dbeafe',
	'#fce7f3',
];

// ── Toolbar ───────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
	const [openMenu, setOpenMenu] = useState<'font' | 'color' | 'link' | null>(
		null,
	);
	const [linkInput, setLinkInput] = useState('');
	const [customColor, setCustomColor] = useState('#000000');

	const toggle = (menu: typeof openMenu) =>
		setOpenMenu((prev) => (prev === menu ? null : menu));

	const applyLink = useCallback(() => {
		if (!linkInput) return;
		const url = linkInput.startsWith('http')
			? linkInput
			: `https://${linkInput}`;
		editor.chain().focus().setLink({ href: url }).run();
		setLinkInput('');
		setOpenMenu(null);
	}, [editor, linkInput]);

	const btn = (active: boolean): React.CSSProperties => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 30,
		height: 30,
		border: 'none',
		borderRadius: 6,
		cursor: 'pointer',
		background: active ? '#e0e7ff' : 'transparent',
		color: active ? '#4338ca' : '#4b5563',
		transition: 'background 0.15s',
		flexShrink: 0,
	});

	const dropBtn = (active: boolean): React.CSSProperties => ({
		display: 'flex',
		alignItems: 'center',
		gap: 4,
		height: 30,
		padding: '0 8px',
		border: '1px solid #e5e7eb',
		borderRadius: 6,
		cursor: 'pointer',
		background: active ? '#e0e7ff' : '#fafafa',
		color: active ? '#4338ca' : '#4b5563',
		fontSize: 11,
		fontWeight: 500,
		transition: 'all 0.15s',
		whiteSpace: 'nowrap',
	});

	const panel: React.CSSProperties = {
		position: 'absolute',
		top: 'calc(100% + 6px)',
		left: 0,
		zIndex: 99,
		background: '#fff',
		border: '1px solid #e5e7eb',
		borderRadius: 10,
		boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
		overflow: 'hidden',
		animation: 'popIn 0.15s ease',
	};

	const menuItem: React.CSSProperties = {
		display: 'block',
		width: '100%',
		padding: '7px 14px',
		border: 'none',
		background: 'transparent',
		textAlign: 'left',
		cursor: 'pointer',
		fontSize: 13,
		color: '#374151',
		transition: 'background 0.1s',
	};

	const sep = (
		<div
			style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }}
		/>
	);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				flexWrap: 'wrap',
				padding: '6px 10px',
				borderBottom: '1px solid #f3f4f6',
				background: '#fafafa',
				borderRadius: '12px 12px 0 0',
			}}
		>
			<style>{`
        .tb-btn:hover { background: #f3f4f6 !important; }
        .tb-item:hover { background: #f0f4ff !important; color: #4338ca !important; }
        .color-dot:hover { transform: scale(1.2); outline: 2px solid #6366f1; }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(4px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

			{/* Bold / Italic / Underline */}
			<button
				className='tb-btn'
				style={btn(editor.isActive('bold'))}
				onMouseDown={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleBold().run();
				}}
			>
				<Bold
					size={14}
					strokeWidth={2.5}
				/>
			</button>
			<button
				className='tb-btn'
				style={btn(editor.isActive('italic'))}
				onMouseDown={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleItalic().run();
				}}
			>
				<Italic
					size={14}
					strokeWidth={2.5}
				/>
			</button>
			<button
				className='tb-btn'
				style={btn(editor.isActive('underline'))}
				onMouseDown={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleUnderline().run();
				}}
			>
				<UnderlineIcon
					size={14}
					strokeWidth={2.5}
				/>
			</button>

			{/* Link */}
			{/* <div style={{ position: 'relative' }}>
				<button
					className='tb-btn'
					style={btn(editor.isActive('link') || openMenu === 'link')}
					onMouseDown={(e) => {
						e.preventDefault();
						toggle('link');
					}}
				>
					<LinkIcon
						size={14}
						strokeWidth={2.5}
					/>
				</button>
				{openMenu === 'link' && (
					<div style={{ ...panel, width: 260, padding: 10 }}>
						<div
							style={{
								fontSize: 10,
								color: '#9ca3af',
								marginBottom: 5,
								fontWeight: 600,
								letterSpacing: '0.05em',
							}}
						>
							INSERT LINK
						</div>
						<input
							autoFocus
							type='text'
							placeholder='https://...'
							value={linkInput}
							onChange={(e) => setLinkInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') applyLink();
								if (e.key === 'Escape') setOpenMenu(null);
							}}
							style={{
								width: '100%',
								padding: '5px 8px',
								border: '1px solid #e5e7eb',
								borderRadius: 6,
								fontSize: 12,
								outline: 'none',
								marginBottom: 6,
							}}
						/>
						<div style={{ display: 'flex', gap: 6 }}>
							<button
								onMouseDown={(e) => {
									e.preventDefault();
									applyLink();
								}}
								style={{
									flex: 1,
									padding: '5px 0',
									background: '#4338ca',
									color: '#fff',
									border: 'none',
									borderRadius: 6,
									fontSize: 11,
									fontWeight: 600,
									cursor: 'pointer',
								}}
							>
								Apply
							</button>
							<button
								onMouseDown={(e) => {
									e.preventDefault();
									editor.chain().focus().unsetLink().run();
									setOpenMenu(null);
								}}
								style={{
									flex: 1,
									padding: '5px 0',
									background: '#f3f4f6',
									color: '#374151',
									border: 'none',
									borderRadius: 6,
									fontSize: 11,
									cursor: 'pointer',
								}}
							>
								Remove
							</button>
						</div>
					</div>
				)}
			</div> */}

			{sep}

			{/* Font Family */}
			<div style={{ position: 'relative' }}>
				<button
					style={dropBtn(openMenu === 'font')}
					onMouseDown={(e) => {
						e.preventDefault();
						toggle('font');
					}}
				>
					<CaseSensitive size={13} />
					<ChevronDown size={10} />
				</button>
				{openMenu === 'font' && (
					<div style={{ ...panel, width: 190 }}>
						{FONTS.map((f) => (
							<button
								key={f.value}
								className='tb-item'
								style={{ ...menuItem, fontFamily: f.value }}
								onMouseDown={(e) => {
									e.preventDefault();
									editor.chain().focus().setFontFamily(f.value).run();
									setOpenMenu(null);
								}}
							>
								{f.label}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Font Color */}
			<div style={{ position: 'relative' }}>
				<button
					style={dropBtn(openMenu === 'color')}
					onMouseDown={(e) => {
						e.preventDefault();
						toggle('color');
					}}
				>
					<Palette size={13} />
					<ChevronDown size={10} />
				</button>
				{openMenu === 'color' && (
					<div style={{ ...panel, padding: 10, width: 196 }}>
						<div
							style={{
								fontSize: 10,
								color: '#9ca3af',
								marginBottom: 6,
								fontWeight: 600,
								letterSpacing: '0.05em',
							}}
						>
							PRESETS
						</div>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)',
								gap: 5,
								marginBottom: 10,
							}}
						>
							{COLORS.map((c) => (
								<button
									key={c}
									className='color-dot'
									onMouseDown={(e) => {
										e.preventDefault();
										editor.chain().focus().setColor(c).run();
										setOpenMenu(null);
									}}
									style={{
										width: 32,
										height: 32,
										borderRadius: 7,
										background: c,
										border: '1px solid #e5e7eb',
										cursor: 'pointer',
										padding: 0,
										transition: 'all 0.15s',
									}}
								/>
							))}
						</div>
						<div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 8 }}>
							<div
								style={{
									fontSize: 10,
									color: '#9ca3af',
									marginBottom: 5,
									fontWeight: 600,
									letterSpacing: '0.05em',
								}}
							>
								CUSTOM
							</div>
							<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
								<input
									type='color'
									value={customColor}
									onChange={(e) => setCustomColor(e.target.value)}
									style={{
										width: 30,
										height: 30,
										padding: 0,
										border: '1px solid #e5e7eb',
										borderRadius: 6,
										cursor: 'pointer',
									}}
								/>
								<input
									type='text'
									value={customColor}
									maxLength={7}
									onChange={(e) => setCustomColor(e.target.value)}
									style={{
										flex: 1,
										padding: '4px 7px',
										border: '1px solid #e5e7eb',
										borderRadius: 6,
										fontSize: 12,
										fontFamily: 'monospace',
										outline: 'none',
									}}
								/>
								<button
									onMouseDown={(e) => {
										e.preventDefault();
										editor.chain().focus().setColor(customColor).run();
										setOpenMenu(null);
									}}
									style={{
										padding: '4px 10px',
										background: '#4338ca',
										color: '#fff',
										border: 'none',
										borderRadius: 6,
										fontSize: 11,
										fontWeight: 600,
										cursor: 'pointer',
									}}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{sep}

			{/* Lists */}
			<button
				className='tb-btn'
				style={btn(editor.isActive('bulletList'))}
				onMouseDown={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleBulletList().run();
				}}
			>
				<List
					size={14}
					strokeWidth={2.5}
				/>
			</button>
			<button
				className='tb-btn'
				style={btn(editor.isActive('orderedList'))}
				onMouseDown={(e) => {
					e.preventDefault();
					editor.chain().focus().toggleOrderedList().run();
				}}
			>
				<ListOrdered
					size={14}
					strokeWidth={2.5}
				/>
			</button>

			{sep}

			{/* Clear */}
			<button
				onMouseDown={(e) => {
					e.preventDefault();
					editor.chain().focus().clearContent().unsetAllMarks().run();
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 4,
					height: 30,
					padding: '0 10px',
					border: '1px solid #fee2e2',
					borderRadius: 6,
					background: '#fff5f5',
					color: '#ef4444',
					cursor: 'pointer',
					fontSize: 11,
					fontWeight: 600,
				}}
			>
				<RotateCcw size={11} /> Clear
			</button>
		</div>
	);
}

// ── Root component ────────────────────────────────────────────────────────────

export default function RichTextInput({
	initialContent,
	onChange,
	placeholder = 'Start typing...',
}: {
	initialContent?: string;
	onChange: (html: string) => void;
	placeholder?: string;
}) {
	const [showToolbar, setShowToolbar] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextStyle,
			Color,
			FontFamily,
			Link.configure({ openOnClick: false }),
		],
		content: initialContent ?? '',

		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange(html === '<p></p>' ? '' : html);
		},

		editorProps: {
			attributes: {
				'class': 'tiptap-editor tiptap-content',
				'data-placeholder': placeholder,
			},
		},
	});

	// Sync if initialContent loads async (e.g. after DB fetch)
	useEffect(() => {
		if (!editor || !initialContent) return;
		if (editor.getHTML() !== initialContent) {
			editor.commands.setContent(initialContent);
		}
	}, [initialContent, editor]);

	if (!editor) return null;

	return (
		<div style={{ fontFamily: "'DM Sans', sans-serif" }}>
			<div className='w-full flex-1 text-sm bg-transparent outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1 border'>
				{showToolbar && <Toolbar editor={editor} />}
				<EditorContent
					editor={editor}
					onFocus={() => setShowToolbar(true)}
					onBlur={() => setShowToolbar(false)}
				/>
			</div>
		</div>
	);
}

// const [content, setContent] = useState(
// 	'<p>Hello <strong>world</strong> this is <em>static</em> content</p>',
// );

// const save = async () => {
// 	if (!content) return;

// 	console.log(content);
// };

// return (
// 	<div>
// 		<RichTextInput
// 			initialContent={content}
// 			onChange={(html) => setContent(html)}
// 			placeholder='Start typing...'
// 		/>
// 		<Button onClick={save}>log</Button>
// 	</div>
// );
