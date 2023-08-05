import { FolderKanban, HomeIcon } from 'lucide-svelte';

export const routes = [
	{
		title: 'Home',
		icon: HomeIcon,
		path: '/'
	},
	{
		title: 'Projects',
		icon: FolderKanban,
		path: '/projects'
	}
];
