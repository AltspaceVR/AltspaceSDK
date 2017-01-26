import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	dest: 'dist/aframe-altspace-component.js',
	format: 'iife',
	moduleName: 'altspace',
	sourceMap: true,
	plugins: [buble()]
};
