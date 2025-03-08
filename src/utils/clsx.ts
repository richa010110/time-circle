function clsx(
	...args: (string | number | boolean | undefined | null | string[])[]
): string {
	return args.flat().filter(Boolean).join(' ');
}

export default clsx;
