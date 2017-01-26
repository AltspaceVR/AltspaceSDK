'use strict';

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

import AltspaceCursorCollider from './AltspaceCursorCollider';
(new AltspaceCursorCollider()).register('altspace-cursor-collider');

export {AltspaceCursorCollider};
