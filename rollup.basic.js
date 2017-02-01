import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	dest: 'dist/altspace.js',
	format: 'iife',
	moduleName: 'altspace',
	sourceMap: true,
	sourceMapFile: 'dist/maps/altspace.js.map',
	plugins: [buble()]
};
