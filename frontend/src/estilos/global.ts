import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	html {
		--headerBackground: #3F51B5;
		--toolbarBackground: #3F51B5;
		--toolbarColor: #FFF;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: 0;
	}

	body {
		background: #E5E5FE;
		color: #000000;
		-webkit-font-smoothing: antialiased;
	}

	body, input, button {
		font-family: 'Roboto Slab', serif;
	}

	h1, h2, h3, h4, h5, h6, strong {
		font-weight: 500;
	}

	button: {
		cursor: pointer;
	}

	@keyframes blink {
	    /**
	     * At the start of the animation the dot
	     * has an opacity of .2
	     */
	    0% {
	      opacity: .2;
	    }
	    /**
	     * At 20% the dot is fully visible and
	     * then fades out slowly
	     */
	    20% {
	      opacity: 1;
	    }
	    /**
	     * Until it reaches an opacity of .2 and
	     * the animation can start again
	     */
	    100% {
	      opacity: .2;
	    }
	}

	.running span {
	    /**
	     * Use the blink animation, which is defined above
	     */
	    animation-name: blink;
	    /**
	     * The animation should take 1.4 seconds
	     */
	    animation-duration: 1.4s;
	    /**
	     * It will repeat itself forever
	     */
	    animation-iteration-count: infinite;
	    /**
	     * This makes sure that the starting style (opacity: .2)
	     * of the animation is applied before the animation starts.
	     * Otherwise we would see a short flash or would have
	     * to set the default styling of the dots to the same
	     * as the animation. Same applies for the ending styles.
	     */
	    animation-fill-mode: both;
	}

	.running span:nth-child(2) {
	    /**
	     * Starts the animation of the third dot
	     * with a delay of .2s, otherwise all dots
	     * would animate at the same time
	     */
	    animation-delay: .2s;
	}

	.running span:nth-child(3) {
	    /**
	     * Starts the animation of the third dot
	     * with a delay of .4s, otherwise all dots
	     * would animate at the same time
	     */
	    animation-delay: .4s;
	}
`;
