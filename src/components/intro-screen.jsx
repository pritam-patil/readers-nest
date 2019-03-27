import React from 'react';
import './styles.css';

const Tiles = () => (
		<ul className="tiles">
		<li></li>
		<li></li>
		<li></li>			
		</ul>
)

const Introduction = () => (
		<div class="container">
			<ul className="intro">
				<li>
				<i class="fab fa-stumbleupon"></i>
				<span>Reader's Digest</span>
				</li>
				<ul className="align-end">
					<li>Posts for our time</li>
					<li>Personized for any interest</li>
				</ul>
				<li class="button"> Get started </li>
			</ul>
			<svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
    		<path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none', fill:'red'}}></path>
  		</svg>
		</div>
);

export { Introduction as IntroScreen };