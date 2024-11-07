<script lang="ts">
	import { run, self } from 'svelte/legacy';

	import Input from './components/Input.svelte';
	import DropDown from './components/DropDown.svelte';
	import ColorSelector from './components/ColorSelector.svelte';
	import { onMount, onDestroy, tick } from 'svelte';
	import { Editor, Extension } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import TextStyle from './extensions/TextStyle';
	import FontFamily from '@tiptap/extension-font-family';
	import Color from '@tiptap/extension-color';

	import TextAlign from '@tiptap/extension-text-align';
	import type { ComponentProps } from 'svelte';
	import ImageResize from './extensions/ImageResize';
	// import FileInput from './components/FileInput.svelte';
	import { storage_data, createRandomID, debounce } from './utils';
	import { language, inputError } from '@src/store.svelte';
	import ImageDescription from './components/ImageDescription.svelte';
	import type { Transaction } from '@tiptap/pm/state';

	let element = $state() as HTMLDivElement;
	let editor = $state() as Editor;
	let images: { [key: string]: any } = $state({});
	let active_dropDown = $state('');

	let {
		value = { content: {}, header: {} },
		getData = $bindable()
	}: {
		value?: any;
		getData?: () => Promise<{ images: { [key: string]: any }; data: any }>;
	} = $props();
	getData = async () => ({ images, data: _data });
	let _data: any = $state(value ? value : { content: {}, header: {} });
	let imageInput = $state() as HTMLInputElement;
	let previous_language = language.value;
	language.subscribe(async (val) => {
		await tick();
		editor && editor.commands.setContent(_data.content[val] || '');
	});
	let deb = debounce(200);
	onMount(() => {
		editor = new Editor({
			parseOptions: { preserveWhitespace: 'full' },
			element: element,
			extensions: [
				StarterKit,
				Link,
				TextStyle,
				FontFamily,
				Color,
				ImageResize,
				TextAlign.configure({
					types: ['heading', 'paragraph', 'image']
				}),

				Extension.create({
					name: 'Tab',
					addKeyboardShortcuts() {
						return {
							Tab: () => {
								return this.editor.commands.insertContent('\t');
							}
						};
					}
				})
			],

			content:
				Object.keys(_data.content).length > 0
					? _data.content[language.value]
					: value.content[language.value] || '',

			onTransaction: ({ transaction }) => {
				// force re-render so `editor.isActive` works as expected
				active_dropDown = '';
				if (previous_language == language.value) {
					handleImageDeletes(transaction);
				}
				previous_language = language.value;
				let _editor = editor;
				editor = null as any;
				editor = _editor;
				deb(() => {
					let content = editor.getHTML();
					content == '<p></p>' && (content = '');
					_data.content[language.value] = content;
				});
			}
		});
		tick().then(() => {
			editor.commands.focus('start');
		});
	});
	function handleImageDeletes(transaction: Transaction) {
		const getImageIds = (fragment: Transaction['doc']['content']) => {
			let srcs = new Set<string>();
			let obj = new Map<string, { id: string; src: string }>();
			fragment.forEach((node) => {
				if (node.type.name === 'image') {
					srcs.add(node.attrs.storage_image);
					obj.set(node.attrs.id, { id: node.attrs.id, src: node.attrs.src });
				}
			});
			return { srcs, obj };
		};
		let current = getImageIds(transaction.doc.content);
		let previous = getImageIds(transaction.before.content);
		// Determine which images were deleted
		let deletedImageSrcs = [...previous.srcs].filter(
			(src) => src && !current.srcs.has(src)
		) as string[];
		for (let obj of previous.obj) {
			if (!current.obj.has(obj[0])) {
				images[obj[0]] && delete images[obj[0]];
			}
		}

		//for ctrl - Z
		for (let obj of current.obj) {
			if (!previous.obj.has(obj[0])) {
				fetch(obj[1].src).then(async (res) => {
					const blob = await res.blob();
					images[obj[0]] = blob;
				});
			}
		}

		if (deletedImageSrcs.length > 0) {
			storage_data.add('storage_images_remove', deletedImageSrcs);
		}
	}
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
		inputError.value.clear();
	});
	let textTypes: ComponentProps<typeof DropDown>['items'] = $derived([
		{
			name: 'paragraph',
			icon: 'icomoon-free:section',
			active: () => editor.isActive('paragraph'),
			onClick: () => editor.chain().focus().setParagraph().run()
		},
		{
			name: 'Heading',
			icon: 'ci:heading-h1',
			active: () => editor.isActive('heading', { level: 1 }),
			onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
		},
		{
			name: 'Heading',
			icon: 'ci:heading-h2',
			active: () => editor.isActive('heading', { level: 2 }),
			onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
		}
	]);
	let fonts: ComponentProps<typeof DropDown>['items'] = $derived([
		{
			name: 'Arial',
			active: () => editor.isActive('textStyle', { fontFamily: 'Arial' }),
			onClick: () => editor.chain().focus().setFontFamily('Arial').run()
		},
		{
			name: 'Verdana',
			active: () => editor.isActive('textStyle', { fontFamily: 'Verdana' }),
			onClick: () => editor.chain().focus().setFontFamily('Verdana').run()
		},
		{
			name: 'Tahoma',
			active: () => editor.isActive('textStyle', { fontFamily: 'Tahoma' }),
			onClick: () => editor.chain().focus().setFontFamily('Tahoma').run()
		},

		{
			name: 'Times New Roman',
			active: () => editor.isActive('textStyle', { fontFamily: 'Times New Roman' }),
			onClick: () => editor.chain().focus().setFontFamily('Times New Roman').run()
		},
		{
			name: 'Georgia',
			active: () => editor.isActive('textStyle', { fontFamily: 'Georgia' }),
			onClick: () => editor.chain().focus().setFontFamily('Georgia').run()
		},
		{
			name: 'Garamond',
			active: () => editor.isActive('textStyle', { fontFamily: 'Garamond' }),
			onClick: () => editor.chain().focus().setFontFamily('Garamond').run()
		}
	]);
	let alignText: ComponentProps<typeof DropDown>['items'] = $derived([
		{
			name: 'left',
			icon: 'fa6-solid:align-left',
			active: () => editor.isActive({ textAlign: 'left' }),
			onClick: () => editor.chain().focus().setTextAlign('left').run()
		},
		{
			name: 'right',
			icon: 'fa6-solid:align-right',
			active: () => editor.isActive({ textAlign: 'right' }),
			onClick: () => editor.commands.setTextAlign('right')
		},
		{
			name: 'center',
			icon: 'fa6-solid:align-center',
			active: () => editor.isActive({ textAlign: 'center' }),
			onClick: () => editor.chain().focus().setTextAlign('center').run()
		},
		{
			name: 'justify',
			icon: 'fa6-solid:align-justify',
			active: () => editor.isActive({ textAlign: 'justify' }),
			onClick: () => editor.chain().focus().setTextAlign('justify').run()
		}
	]);
	let inserts: ComponentProps<typeof DropDown>['items'] = $derived([
		{
			name: 'image',
			icon: 'fa6-solid:image',
			onClick: () => {
				imageInput.click();
			},
			active: () => editor.isActive('image')
		}
	]);

	let floats = $derived([
		{
			name: 'wrap left',
			icon: 'teenyicons:align-left-solid',
			onClick: () => editor.chain().focus().setImageFloat('left').run(),
			active: () => false
		},
		{
			name: 'wrap right',
			icon: 'teenyicons:align-right-solid',
			onClick: () => editor.chain().focus().setImageFloat('right').run(),
			active: () => false
		},
		{
			name: 'unwrap',
			icon: 'mdi:filter-remove',
			onClick: () => editor.chain().focus().setImageFloat('unset').run(),
			active: () => false
		}
	]);
	let fontSize = $state(16);
	run(() => {
		editor &&
			(fontSize =
				editor.getAttributes('textStyle').fontSize ||
				window
					.getComputedStyle(
						window.getSelection()?.focusNode?.parentElement || (element as HTMLElement)
					)
					.fontSize.replace('px', ''));
	});
	let show = $state(
		(
			button:
				| 'textType'
				| 'font'
				| 'align'
				| 'insert'
				| 'float'
				| 'color'
				| 'bold'
				| 'italic'
				| 'strike'
				| 'link'
				| 'fontSize'
				| 'description'
		) => {
			if (editor?.isActive('image')) {
				return ['float', 'align', 'description'].includes(button);
			}
			if (['description', 'float'].includes(button)) {
				return false;
			}
			return true;
		}
	);
	run(() => {
		show = show;
		editor;
	});
	run(() => {
		if (_data?.header?.[language.value]?.includes('_')) {
			inputError.value.set({ message: '_ is not allowed in title', type: 'error' });
		} else {
			inputError.value.clear();
		}
	});
</script>

<Input
	type="text"
	bind:value={_data.header[language.value]}
	placeholder="Title"
	inputClass="!w-full mt-2"
/>
<div class="editor">
	{#if editor}
		<div class="z-10 w-full translate-x-0">
			<div class="buttons">
				<DropDown
					show={show('textType')}
					items={textTypes}
					label="Text"
					bind:active={active_dropDown}
					key="textType"
				/>
				<DropDown
					key="font"
					show={show('font')}
					items={fonts}
					icon="file-icons:font"
					label="Font"
					bind:active={active_dropDown}
				/>
				<ColorSelector
					key="color"
					bind:active={active_dropDown}
					show={show('color')}
					color={editor.getAttributes('textStyle').color || '#000000'}
					onchange={(color) => editor.chain().focus().setColor(color).run()}
				/>

				<div class="flex items-center" class:hidden={!show('fontSize')}>
					<button
						onclick={() => {
							fontSize--;
							editor.chain().focus().setFontSize(fontSize).run();
						}}
					>
						<iconify-icon icon="ic:twotone-minus" width="20"></iconify-icon>
					</button>
					<input type="text" class="w-[30px] text-center outline-none" bind:value={fontSize} />
					<button
						onclick={() => {
							fontSize++;
							editor.chain().focus().setFontSize(fontSize).run();
						}}
					>
						<iconify-icon icon="ph:plus-bold" width="20"></iconify-icon>
					</button>
				</div>
				<button
					class:hidden={!show('bold')}
					onclick={() => editor.chain().focus().toggleBold().run()}
					class:active={editor.isActive('bold')}
				>
					<iconify-icon icon="bi:type-bold" width="20"></iconify-icon>
				</button>
				<button
					class:hidden={!show('italic')}
					onclick={() => editor.chain().focus().toggleItalic().run()}
					class:active={editor.isActive('italic')}
				>
					<iconify-icon icon="lucide:italic" width="20"></iconify-icon>
				</button>
				<button
					class:hidden={!show('strike')}
					onclick={() => editor.chain().focus().toggleStrike().run()}
					class:active={editor.isActive('strike')}
				>
					<iconify-icon icon="majesticons:strike-through-line" width="20"></iconify-icon>
				</button>
				<button
					class:hidden={!show('link')}
					onclick={() => editor.chain().focus().toggleLink({ href: 'https://google.com' }).run()}
					class:active={editor.isActive('link')}
				>
					<iconify-icon icon="pajamas:link" width="20"></iconify-icon>
				</button>
				<DropDown
					key="align"
					show={show('align')}
					items={alignText}
					label="Align"
					bind:active={active_dropDown}
				/>
				<DropDown
					key="insert"
					show={show('insert')}
					items={inserts}
					icon="typcn:plus"
					label="Insert"
					bind:active={active_dropDown}
				/>
				<DropDown
					key="float"
					show={show('float')}
					items={floats}
					icon="grommet-icons:text-wrap"
					label="Text Wrap"
					bind:active={active_dropDown}
				/>
				<ImageDescription
					bind:active={active_dropDown}
					key="description"
					show={show('description')}
					value={editor.getAttributes('image').description}
					onsubmit={(description) => {
						editor.chain().focus().setImageDescription(description).run();
					}}
				/>
				<input
					onchange={() => {
						let data = imageInput?.files?.[0];
						if (data instanceof File) {
							let url = URL.createObjectURL(data);
							let image_id = createRandomID().toString();
							images[image_id] = data;
							editor.chain().focus().setImage({ src: url, id: image_id }).run();
						}
						imageInput.value = '';
					}}
					type="file"
					name="image"
					bind:this={imageInput}
					class="hidden"
				/>
			</div>
		</div>
	{/if}
	<div
		onpointerdown={self(() => editor.commands.focus('end'))}
		class="text_Area RichText"
		bind:this={element}
	></div>
</div>

<style>
	@import 'RichText.css';
	.buttons {
		overflow-x: auto;

		display: flex;
		gap: 10px;
		box-shadow: 0px 3px 5px 0px #b0b0b0b3;
		width: 100%;

		align-items: center;
		padding: 10px;
		position: sticky;
		top: 0;
		z-index: 10;
		max-width: 100%;
	}
	.buttons::before,
	.buttons::after {
		content: '';
		margin: auto;
	}
	button {
		height: 20px;
	}
	button.active {
		color: aqua;
	}
	:global(.tiptap) {
		outline: none;
	}
	.editor {
		display: flex;

		margin: auto;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		box-shadow: 4px 4px 16px 1px #b0b0b0b3;
		border-radius: 8px;
		min-height: 600px;
		max-width: 100%;
		width: 100vw;
	}
	.text_Area {
		width: 100%;
		flex-grow: 1;
		padding: 10px;
		cursor: text;
		overflow: auto;
		max-height: calc(100vh - 200px);
	}
	:global(.ProseMirror-selectednode img) {
		box-shadow: 0px 0px 3px 2px #00ffff99;
	}
</style>
