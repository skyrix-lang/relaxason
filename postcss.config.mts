// postcss.config.mts
import mantinePostcss from "postcss-preset-mantine";
import postcssSimpleVars from "postcss-simple-vars";
import postcssPurgecss from "@fullhuman/postcss-purgecss";

const isProd = process.env.NODE_ENV === 'production';

// Define plugins array
const plugins = [
	// Your existing Mantine plugins
	mantinePostcss(),
	postcssSimpleVars({
		variables: {
			'mantine-breakpoint-xs': '36em',
			'mantine-breakpoint-sm': '48em',
			'mantine-breakpoint-md': '62em',
			'mantine-breakpoint-lg': '75em',
			'mantine-breakpoint-xl': '88em',
		},
	})
];

// Only add PurgeCSS in production
if (isProd) {
	plugins.push(
		postcssPurgecss({
			content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
			safelist: {
				standard: [
					/^fadeInSection/,
					/^visible/,
					/^ctaButton/,
					/^sectionTitle/,
					/^titleUnderline/,
					/^mantine-/,
					/^m-/
				],
				deep: [/tabler/], // Tabler icons classes
				greedy: [
					/fade/,
					/^mt/,
					/^mb/,
					/^flex/,
					/^grid/,
					/global\./  // Your global module references
				]
			}
		})
	);
}

// Export the configuration
export default { plugins }; 
