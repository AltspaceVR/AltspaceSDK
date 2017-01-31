import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	dest: 'dist/aframe-altspace-component.js',
	format: 'iife',
	moduleName: 'ALTSPACE',
	sourceMap: true,
	plugins: [buble()]
};
