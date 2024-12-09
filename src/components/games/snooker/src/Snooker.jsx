// import './App.css'
import { useEffect, useState } from 'react';

import socket from './socket'

// import socket from "../socket";

import './script/Global.js';
import Overhead from './Overhead';

// import './script/system/Keys.js';

// let Keys = {
//     none: 0,
//     back: 8,
//     tab: 9,
//     enter: 13,
//     pause: 19,
//     escape: 27,

//     space: 32,

//     pageUp: 33,
//     pageDown: 34,
//     end: 35,
//     home: 36,
//     left: 37,
//     up: 38,
//     right: 39,
//     down: 40,

//     insert: 45,
//     del: 46,

//     d0: 48,
//     d1: 49,
//     d2: 50,
//     d3: 51,
//     d4: 52,
//     d5: 53,
//     d6: 54,
//     d7: 55,
//     d8: 56,
//     d9: 57,

//     A: 65,     B: 66,      C: 67,      D: 68,       E: 69,      F: 70,
//     G: 71,     H: 72,      I: 73,      J: 74,       K: 75,      L: 76,
//     M: 77,     N: 78,      O: 79,      P: 80,       Q: 81,      R: 82,
//     S: 83,     T: 84,      U: 85,      V: 86,       W: 87,      X: 88,
//     Y: 89,     Z: 90,

//     multiply: 42,
//     add: 43,
//     subtract: 45,
//     decimal: 46,
//     divide: 47
// };

// window.Keys = Keys;

// // import './script/system/Color.js';
// let Color = {
//     "0": "0",
//     "1": "1",
//     "2": "2",
//     "3": "3",
//     "4": "4",
//     "5": "5",
//     "7": "7",
//     "8": "8",
//     "9": "9",
//     "10": "10",
//     "11": "11",
//     "12": "12",
//     "13": "13",
//     "14": "14",
//     "15": "15",
//     aliceBlue: "#F0F8FF",
//     antiqueWhite: "#FAEBD7",
//     aqua: "#00FFFF",
//     aquamarine: "#7FFFD4",
//     azure: "#F0FFFF",
//     beige: "#F5F5DC",
//     bisque: "#FFE4C4",
//     black: "#000000",
//     blanchedAlmond: "#FFEBCD",
//     blue: "#0000FF",
//     blueViolet: "#8A2BE2",
//     brown: "#A52A2A",
//     burlyWood: "#DEB887",
//     cadetBlue: "#5F9EA0",
//     chartreuse: "#7FFF00",
//     chocolate: "#D2691E",
//     coral: "#FF7F50",
//     cornflowerBlue: "#6495ED",
//     cornsilk: "#FFF8DC",
//     crimson: "#DC143C",
//     cyan: "#00FFFF",
//     darkBlue: "#00008B",
//     darkCyan: "#008B8B",
//     darkGoldenrod: "#B8860B",
//     darkGray: "#A9A9A9",
//     darkGreen: "#006400",
//     darkKhaki: "#BDB76B",
//     darkMagenta: "#8B008B",
//     darkOliveGreen: "#556B2F",
//     darkOrange: "#FF8C00",
//     darkOrchid: "#9932CC",
//     darkRed: "#8B0000",
//     darkSalmon: "#E9967A",
//     darkSeaGreen: "#8FBC8B",
//     darkSlateBlue: "#483D8B",
//     darkSlateGray: "#2F4F4F",
//     darkTurquoise: "#00CED1",
//     darkViolet: "#9400D3",
//     deepPink: "#FF1493",
//     deepSkyBlue: "#00BFFF",
//     dimGray: "#696969",
//     dodgerBlue: "#1E90FF",
//     firebrick: "#B22222",
//     floralWhite: "#FFFAF0",
//     forestGreen: "#228B22",
//     fuchsia: "#FF00FF",
//     gainsboro: "#DCDCDC",
//     ghostWhite: "#F8F8FF",
//     gold: "#FFD700",
//     goldenrod: "#DAA520",
//     gray: "#808080",
//     green: "#008000",
//     greenYellow: "#ADFF2F",
//     honeydew: "#F0FFF0",
//     hotPink: "#FF69B4",
//     indianRed: "#CD5C5C",
//     indigo: "#4B0082",
//     ivory: "#FFFFF0",
//     khaki: "#F0E68C",
//     lavender: "#E6E6FA",
//     lavenderBlush: "#FFF0F5",
//     lawnGreen: "#7CFC00",
//     lemonChiffon: "#FFFACD",
//     lightBlue: "#ADD8E6",
//     lightCoral: "#F080FF",
//     lightCyan: "#E0FFFF",
//     lightGoldenrodYellow: "#FAFAD2",
//     lightGray: "#D3D3D3",
//     lightGreen: "#90EE90",
//     lightPink: "#FFB6C1",
//     lightSalmon: "#FFA07A",
//     lightSeaGreen: "#20B2AA",
//     lightSkyBlue: "#87CEFA",
//     lightSlateGray: "#778899",
//     lightSteelBlue: "#B0C4DE",
//     lightYellow: "#FFFFE0",
//     lime: "#00FF00",
//     limeGreen: "#32CD32",
//     linen: "#FAF0E6",
//     magenta: "#FF00FF",
//     maroon: "#800000",
//     mediumAquamarine: "#66CDAA",
//     mediumBlue: "#0000CD",
//     mediumOrchid: "#BA55D3",
//     mediumPurple: "#9370DB",
//     mediumSeaGreen: "#3CB371",
//     mediumSlateBlue: "#7B68EE",
//     mediumSpringGreen: "#00FA9A",
//     mediumTurquoise: "#48D1CC",
//     mediumVioletRed: "#C71585",
//     midnightBlue: "#191970",
//     mintCream: "#F5FFFA",
//     mistyRose: "#FFE4E1",
//     moccasin: "#FFE4B5",
//     navajoWhite: "#FFDEAD",
//     navy: "#000080",
//     oldLace: "#FDF5E6",
//     olive: "#808000",
//     oliveDrab: "#6B8E23",
//     orange: "#FFA500",
//     orangeRed: "#FF4500",
//     orchid: "#DA70D6",
//     paleGoldenrod: "#EEE8AA",
//     paleGreen: "#98FB98",
//     paleTurquoise: "#AFEEEE",
//     paleVioletRed: "#DB7093",
//     papayaWhip: "#FFEFD5",
//     peachPuff: "#FFDAB9",
//     peru: "#CD853F",
//     pink: "#FFC0CB",
//     plum: "#DDA0DD",
//     powderBlue: "#B0E0E6",
//     purple: "#800080",
//     red: "#FF0000",
//     rosyBrown: "#BC8F8F",
//     royalBlue: "#4169E1",
//     saddleBrown: "#8B4513",
//     salmon: "#FA8072",
//     sandyBrown: "#F4A460",
//     seaGreen: "#2E8B57",
//     seaShell: "#FFF5EE",
//     sienna: "#A0522D",
//     silver: "#C0C0C0",
//     skyBlue: "#87CEEB",
//     slateBlue: "#6A5ACD",
//     slateGray: "#708090",
//     snow: "#FFFAFA",
//     springGreen: "#00FF7F",
//     steelBlue: "#4682B4",
//     tan: "#D2B48C",
//     teal: "#008080",
//     thistle: "#D8BFD8",
//     tomato: "#FF6347",
//     turquoise: "#40E0D0",
//     violet: "#EE82EE",
//     wheat: "#F5DEB3",
//     white: "#FFFFFF",
//     whiteSmoke: "#F5F5F5",
//     yellow: "#FFFF00",
//     yellowGreen: "#9ACD32"
// }; 

// // export default Color;
// window.Color = Color;

// // import './script/geom/Vector2.js';

// function Vector2(x, y) {
//     this.x = typeof x !== 'undefined' ? x : 0;
//     this.y = typeof y !== 'undefined' ? y : 0;
// }

// Object.defineProperty(Vector2, "zero",
//     {
//         get: function () {
//             return new Vector2();
//         }
//     });

// Object.defineProperty(Vector2.prototype, "isZero",
//     {
//         get: function () {
//             return this.x === 0 && this.y === 0;
//         }
//     });

// Object.defineProperty(Vector2.prototype, "length",
//     {
//         get: function () {
//             return Math.sqrt(this.x * this.x + this.y * this.y);
//         }
//     });

// Vector2.prototype.addTo = function (v) {
//     if (v.constructor === Vector2) {
//         this.x += v.x;
//         this.y += v.y;
//     }
//     else if (v.constructor === Number) {
//         this.x += v;
//         this.y += v;
//     }
//     return this;
// };

// Vector2.prototype.add = function (v) {
//     let result = this.copy();
//     return result.addTo(v);
// };

// Vector2.prototype.subtractFrom = function (v) {
//     if (v.constructor === Vector2) {
//         this.x -= v.x;
//         this.y -= v.y;
//     }
//     else if (v.constructor === Number) {
//         this.x -= v;
//         this.y -= v;
//     }
//     return this;
// };

// Vector2.prototype.subtract = function (v) {
//     let result = this.copy();
//     return result.subtractFrom(v);
// };

// Vector2.prototype.divideBy = function (v) {
//     if (v.constructor === Vector2) {
//         this.x /= v.x;
//         this.y /= v.y;
//     }
//     else if (v.constructor === Number) {
//         this.x /= v;
//         this.y /= v;
//     }
//     return this;
// };

// Vector2.prototype.divide = function (v) {
//     let result = this.copy();
//     return result.divideBy(v);
// };

// Vector2.prototype.multiplyWith = function (v) {
//     if (v.constructor === Vector2) {
//         this.x *= v.x;
//         this.y *= v.y;
//     }
//     else if (v.constructor === Number) {
//         this.x *= v;
//         this.y *= v;
//     }
//     return this;
// };

// Vector2.prototype.multiply = function (v) {
//     let result = this.copy();
//     return result.multiplyWith(v);
// };

// Vector2.prototype.toString = function () {
//     return "(" + this.x + ", " + this.y + ")";
// };

// Vector2.prototype.normalize = function () {
//     let length = this.length;
//     if (length === 0)
//         return;
//     this.divideBy(length);
// };

// Vector2.prototype.copy = function () {
//     return new Vector2(this.x, this.y);
// };

// Vector2.prototype.equals = function (obj) {
//     return this.x === obj.x && this.y === obj.y;
// };

// Vector2.prototype.distanceFrom = function(obj){
//     return Math.sqrt((this.x-obj.x)*(this.x-obj.x) + (this.y-obj.y)*(this.y-obj.y));
// }

// // export default Vector2;
// window.Vector2 = Vector2;

// // import './script/input/ButtonState.js';
// function ButtonState() {
//     this.down = false;
//     this.pressed = false;
// }

// // export default ButtonState;
// window.ButtonState = ButtonState;

// // import './script/input/Keyboard.js';
// window.notStarted = true;

// // import window.Game from "../window.Game.js";
// // import ButtonState from "../input/ButtonState.js"

// function handleKeyDown(evt) {
//     if(window.notStarted) return

//     if(window.Game.policy.turn == window.Game.playerNumber) {
//         let code = evt.keyCode;
//         if (code < 0 || code > 255)
//             return;
//         if (!Keyboard._keyStates[code].down)
//             Keyboard._keyStates[code].pressed = true;
//         Keyboard._keyStates[code].down = true;
//     }
// }

// function handleKeyUp(evt) {
//     if(window.notStarted) return
    
//     if(window.Game.policy.turn == window.Game.playerNumber) {
//         let code = evt.keyCode;
//         if (code < 0 || code > 255)
//             return;
//         Keyboard._keyStates[code].down = false;
//     }
// }

// function Keyboard_Singleton() {
//     // console.log("YH", Keys)
//     this._keyStates = [];
//     for (let i = 0; i < 256; ++i)
//         this._keyStates.push(new ButtonState());
//     document.onkeydown = handleKeyDown;
//     document.onkeyup = handleKeyUp;
// }

// Keyboard_Singleton.prototype.reset = function () {
//     for (let i = 0; i < 256; ++i)
//         this._keyStates[i].pressed = false;
// };

// Keyboard_Singleton.prototype.pressed = function (key) {
//     return this._keyStates[key].pressed;
// };

// Keyboard_Singleton.prototype.down = function (key) {
//     return this._keyStates[key].down;
// };

// let Keyboard = new Keyboard_Singleton();

// // export default Keyboard;
// window.Keyboard = Keyboard;

// // import './script/input/Mouse.js';
// function handleMouseMove(evt) {
//     if(window.notStarted) return

//     if(window.Game.policy.turn == window.Game.playerNumber) {
//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//         if(isMobile) {
//           let canvasScale = Canvas2D.scale;
//           const widthToUse = Canvas2D._div.getBoundingClientRect().width;
//           const heightToUse = Canvas2D._div.getBoundingClientRect().height;

//           const cWidthToUse = Canvas2D._canvas.getBoundingClientRect().width;
//           const cHeightToUse = Canvas2D._canvas.getBoundingClientRect().height;

//           const parentX = (widthToUse / 2) - (cWidthToUse / 2);
//           const parentY = (heightToUse / 2) - (cHeightToUse / 2);

//         //   console.log(evt.pageX - parentX);
//         //   console.log((evt.pageY - parentY));
      
//           // console.log(parentX, parentY);
//           // console.log(parentY);
//           // console.log(Canvas2D._canvas.clientWidth);
//           let canvasOffset = Canvas2D.offset;
//           // let mx = ((evt.pageX - parentY) / canvasScale.x) - Canvas2D._canvas.clientHeight;
//           // let my = (evt.pageY - parentX) / canvasScale.y;
//           // let mx = (evt.pageY - parentX) / canvasScale.y;
//           // let my = ((evt.pageX - parentY) / canvasScale.x) - Canvas2D._canvas.clientHeight;
//           let mx = (evt.pageY - parentY) / canvasScale.y;
//           let my = (((evt.pageX - parentX) - cWidthToUse) / canvasScale.x);
//           Mouse._position = new window.Vector2(Math.abs(mx), Math.abs(my));

//         //   console.log(mx, evt.pageX - parentX, canvasScale.x, canvasScale.y);
//         //   console.log(mx, my);
//         }
//         else {
//           let canvasScale = Canvas2D.scale;
//           let canvasOffset = Canvas2D.offset;
//           let mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
//           let my = (evt.pageY - canvasOffset.y) / canvasScale.y;
//           Mouse._position = new window.Vector2(mx, my);
//         }
//     }
// }

// function handleMouseDown(evt) {
//     if(window.notStarted) return

//     if(window.Game.policy.turn == window.Game.playerNumber) {
//         handleMouseMove(evt);
    
//         if (evt.which === 1) {
//             if (!Mouse._left.down)
//                 Mouse._left.pressed = true;
//             Mouse._left.down = true;
//         } else if (evt.which === 2) {
//             if (!Mouse._middle.down)
//                 Mouse._middle.pressed = true;
//             Mouse._middle.down = true;
//         } else if (evt.which === 3) {
//             if (!Mouse._right.down)
//                 Mouse._right.pressed = true;
//             Mouse._right.down = true;
//         }
//     }
// }

// function handleMouseUp(evt) {
//     if(window.notStarted) return
    
//     if(window.Game.policy.turn == window.Game.playerNumber) {
//         handleMouseMove(evt);
    
//         if (evt.which === 1)
//             Mouse._left.down = false;
//         else if (evt.which === 2)
//             Mouse._middle.down = false;
//         else if (evt.which === 3)
//             Mouse._right.down = false;
//     }
// }

// function Mouse_Singleton() {
//     this._position = window.Vector2.zero;
//     this._left = new ButtonState();
//     this._middle = new ButtonState();
//     this._right = new ButtonState();
//     document.onmousemove = handleMouseMove;
//     document.onmousedown = handleMouseDown;
//     document.onmouseup = handleMouseUp;
// }

// Object.defineProperty(Mouse_Singleton.prototype, "left",
//     {
//         get: function () {
//             return this._left;
//         }
//     });

// Object.defineProperty(Mouse_Singleton.prototype, "middle",
//     {
//         get: function () {
//             return this._middle;
//         }
//     });

// Object.defineProperty(Mouse_Singleton.prototype, "right",
//     {
//         get: function () {
//             return this._right;
//         }
//     });

// Object.defineProperty(Mouse_Singleton.prototype, "position",
//     {
//         get: function () {
//             return this._position;
//         }
//     });

// Mouse_Singleton.prototype.reset = function () {
//     this._left.pressed = false;
//     this._middle.pressed = false;
//     this._right.pressed = false;
// };

// Mouse_Singleton.prototype.containsMouseDown = function (rect) {
//     return this._left.down && rect.contains(this._position);
// };

// Mouse_Singleton.prototype.containsMousePress = function (rect) {
//     return this._left.pressed && rect.contains(this._position);
// };

// let Mouse = new Mouse_Singleton();

// // export default Mouse;
// window.Mouse = Mouse;

// // import './script/input/JoyStick.js';
// let JOYSTICK_DIV = null;

// function __init_joystick_div()
// {
// 	JOYSTICK_DIV = document.createElement('div');
// 	let div_style = JOYSTICK_DIV.style;
// 	div_style.background = 'rgba(255,255,255,0)';
// 	div_style.position = 'absolute';
// 	div_style.top = '0px';
// 	div_style.bottom = '0px';
// 	div_style.left = '0px';
// 	div_style.right = '0px';
// 	div_style.margin = '0px';
// 	div_style.padding = '0px';
// 	div_style.borderWidth = '0px';
// 	div_style.position = 'absolute';
// 	div_style.overflow = 'hidden';
// 	div_style.zIndex = '10000';
// 	document.body.appendChild( JOYSTICK_DIV );
// }
// let JoyStick = function( attrs ) {
// 	this.radius = attrs.radius || 50;
// 	this.inner_radius = attrs.inner_radius || this.radius / 2;
// 	this.x = attrs.x || 0;
// 	this.y = attrs.y || 0;
// 	this.mouse_support = attrs.mouse_support || true;

// 	if ( attrs.visible === undefined )
// 	{
// 		attrs.visible = true;
// 	}

// 	if ( attrs.visible )
// 	{
// 		this.__create_fullscreen_div();
// 	}
// };

// JoyStick.prototype.left = false;
// JoyStick.prototype.right = false;
// JoyStick.prototype.up = false;
// JoyStick.prototype.down = false;

// JoyStick.prototype.__is_up = function ( dx, dy )
// {
// 	if( dy >= 0 )
// 	{
// 		return false;
// 	}
// 	if( Math.abs(dx) > 2*Math.abs(dy) )
// 	{
// 		return false;
// 	}
// 	return true;
// };

// JoyStick.prototype.__is_down = function down( dx, dy )
// {
// 	if( dy <= 0 )
// 	{
// 		return false;
// 	}
// 	if( Math.abs(dx) > 2*Math.abs(dy) )
// 	{
// 		return false;
// 	}
// 	return true;	
// };

// JoyStick.prototype.__is_left = function( dx, dy )
// {
// 	if( dx >= 0 )
// 	{
// 		return false;
// 	}
// 	if( Math.abs(dy) > 2*Math.abs(dx) )
// 	{
// 		return false;
// 	}
// 	return true;	
// };

// JoyStick.prototype.__is_right = function( dx, dy )
// {
// 	if( dx <= 0 )
// 	{
// 		return false;
// 	}
// 	if( Math.abs(dy) > 2*Math.abs(dx) )
// 	{
// 		return false;
// 	}
// 	return true;	
// };

// JoyStick.prototype.__create_fullscreen_div = function()
// {
// 	if ( JOYSTICK_DIV === null )
// 	{
// 		__init_joystick_div();
// 	}
// 	this.div = JOYSTICK_DIV;
// 	///////////////////////////////////////////
// 	this.base = document.createElement('span');
// 	let div_style = this.base.style;
// 	div_style.width = this.radius * 2 + 'px';
// 	div_style.height = this.radius * 2 + 'px';
// 	div_style.position = 'absolute';
// 	div_style.top = this.y - this.radius + 'px';
// 	div_style.left = this.x - this.radius + 'px';
// 	div_style.borderRadius = '50%';
// 	div_style.borderColor = 'rgba(200,200,200,0.5)';
// 	div_style.borderWidth = '1px';
// 	div_style.borderStyle = 'solid';
// 	this.div.appendChild( this.base );
// 	///////////////////////////////////////////
// 	this.control = document.createElement('span');
// 	div_style = this.control.style;
// 	div_style.width = this.inner_radius * 2 + 'px';
// 	div_style.height = this.inner_radius * 2 + 'px';
// 	div_style.position = 'absolute';
// 	div_style.top = this.y - this.inner_radius + 'px';
// 	div_style.left = this.x - this.inner_radius + 'px';
// 	div_style.borderRadius = '50%';
// 	div_style.backgroundColor = 'rgba(200,200,200,0.3)';
// 	div_style.borderWidth = '1px';
// 	div_style.borderColor = 'rgba(200,200,200,0.8)';
// 	div_style.borderStyle = 'solid';
// 	this.div.appendChild( this.control );
// 	///////////////////////////////////////////
// 	let self = this;
// 	// the event is binded in all the screen
// 	// to captures fast movements
// 	function touch_hander( evt )
// 	{
// 		let touch_obj = evt.changedTouches ? evt.changedTouches[0] : evt;
// 		// if ( self.mouse_support && !(touch_obj.buttons === 1) )
// 		// {
// 		// 	return;
// 		// }
// 		self.control.style.left = touch_obj.clientX - self.inner_radius + 'px';
// 		self.control.style.top = touch_obj.clientY - self.inner_radius + 'px';

// 		let dx = touch_obj.clientX - self.x;
// 		let dy = touch_obj.clientY - self.y;
// 		self.up = self.__is_up( dx, dy );
// 		self.down = self.__is_down( dx, dy );
// 		self.left = self.__is_left( dx, dy );
// 		self.right = self.__is_right( dx, dy );
// 	}
// 	function clear_flags()
// 	{
// 		self.left = false;
// 		self.right = false;
// 		self.up = false;
// 		self.down = false;

// 		self.control.style.top = self.y - self.inner_radius + 'px';
// 		self.control.style.left = self.x - self.inner_radius + 'px';
// 	}
// 	this.bind( 'touchmove', touch_hander );
// 	this.bind( 'touchstart', touch_hander );
// 	this.bind( 'touchend', clear_flags );
// 	if ( this.mouse_support )
// 	{
// 		this.bind( 'mousedown', touch_hander );
// 		this.bind( 'mousemove', touch_hander );
// 		this.bind( 'mouseup', clear_flags );
// 	}
// };
// JoyStick.prototype.bind = function( evt, func )
// {
// 	this.base.addEventListener( evt, func );
// 	this.control.addEventListener( evt, func );
// };

// /**
//   attributes:
// 	x, y, func, mouse_support
//   @param {{x, y, func, mouse_support}} attrs - attributes
// */
// let JoyStickButton = function( attrs )
// {
// 	this.radius = attrs.radius || 50;
// 	this.x = attrs.x || 0;
// 	this.y = attrs.y || 0;
// 	this.text = attrs.text||'';
// 	this.mouse_support = attrs.mouse_support||false;
// 	if ( JOYSTICK_DIV === null )
// 	{
// 		__init_joystick_div();
// 	}
// 	this.base = document.createElement('span');
// 	this.base.innerHTML = this.text;
// 	let div_style = this.base.style;
// 	div_style.width = this.radius * 2 + 'px';
// 	div_style.height = this.radius * 2 + 'px';
// 	div_style.position = 'absolute';
// 	div_style.top = this.y - this.radius + 'px';
// 	div_style.left = this.x - this.radius + 'px';
// 	div_style.borderRadius = '50%';
// 	div_style.backgroundColor = 'rgba(255,255,255,0.1)';
// 	div_style.borderWidth = '1px';
// 	div_style.borderColor = 'rgba(255,255,255,0.8)';
// 	div_style.borderStyle = 'solid';
// 	JOYSTICK_DIV.appendChild( this.base );

// 	if ( attrs.func )
// 	{
// 		if ( this.mouse_support )
// 		{
// 			this.bind( 'mousedown', attrs.func );
// 		}
// 		this.bind( 'touchstart', attrs.func );
// 	}

// 	let self = this;
// 	function __over()
// 	{
// 		div_style.backgroundColor = 'rgba(255,255,255,0.3)';
// 	}
// 	function __leave()
// 	{
// 		div_style.backgroundColor = 'rgba(255,255,255,0.1)';
// 	}
// 	self.bind( 'touchstart', __over );
// 	self.bind( 'touchend', __leave );
// 	if ( this.mouse_support )
// 	{
// 		self.bind( 'mousedown', __over );
// 		self.bind( 'mouseup', __leave );
// 	}
// };
// JoyStickButton.prototype.bind = function( evt, func )
// {
// 	this.base.addEventListener( evt, func );
// };

// // export {JoyStick, JoyStickButton}
// window.JoyStick = JoyStick;
// window.JoyStickButton = JoyStickButton;

// let MyJoyStick = function() {
//     this.x = 0;
//     this.y = 0;
//     this.moveX = 0;
//     this.moveY = 0;
//     this.prevMoveX = 0;
//     this.prevMoveY = 0;
//     this.deg = 0;
//     this.active = false;
//   };
  
//   MyJoyStick.prototype.handleStart = function(e) {
//     if(!window.Game.isTurn()) return;
  
//     console.log("touch start");
    
//     this.x = e.touches[0].pageX;
//     this.y = e.touches[0].pageY;
//   }
  
//   /**
//    * @param {{ initPos,position, origin, velocity, color, moving, visible, inHole}} whiteBall
//    */
  
//   MyJoyStick.prototype.handleMove = function(e, whiteBall) {
//       if(!window.Game.isTurn()) return;
//     let canvasScale = Canvas2D.scale;
//     const widthToUse = Canvas2D._div.getBoundingClientRect().width;
//     const heightToUse = Canvas2D._div.getBoundingClientRect().height;
  
//     const cWidthToUse = Canvas2D._canvas.getBoundingClientRect().width;
//     const cHeightToUse = Canvas2D._canvas.getBoundingClientRect().height;
  
//     const parentX = (widthToUse / 2) - (cWidthToUse / 2);
//     const parentY = (heightToUse / 2) - (cHeightToUse / 2);
  
//     let mx = (e.touches[0].pageY - parentY) / canvasScale.y;
//     let my = (((e.touches[0].pageX - parentX) - cWidthToUse) / canvasScale.x)
  
//   //   console.log(mx, my);
  
//     const p1 = {
//       x: Math.abs(whiteBall.position.x),
//       y: Math.abs(whiteBall.position.y)
//     }
  
//     const p2 = {
//       x: Math.abs(mx),
//       y: Math.abs(my)
//     }
  
  
//     // const angleDEG = (Math.atan2(p2.y - p1.y, p2.x - p1.x)) * 180 / Math.PI;
//     const angleRAD = (Math.atan2(p2.y - p1.y, p2.x - p1.x));
  
//     // console.log(angleRAD);
//     // console.log(angleDEG);
  
//     this.deg = angleRAD;
  
//     this.active = true
  
//     // this.moveX = (this.x - e.touches[0].pageX);
//     // this.moveY = (this.y - e.touches[0].pageY);
  
//     // let rads = Math.atan2(this.moveY, this.moveX);
    
//     // const deg = rads * 180 / Math.PI;
    
//     // this.deg = deg;
  
//     // console.log(Mouse._position.x, Mouse._position.y);
//     // console.log(e.touches[0].pageX, e.touches[0].pageY);
//     // console.log(Math.abs(mx), Math.abs(my));
  
//     // console.log(moveX, moveY);
//     // console.log("moving");
  
//     // this.x = e.touches[0].pageX
//     // this.y = e.touches[0].pageY
//     this.x = e.touches[0].pageX
//     this.y = e.touches[0].pageY
//   }
  
//   // /**
//   //  * @param {{ initPos,position, origin, velocity, color, moving, visible, inHole}} whiteBall
//   //  */
  
//   MyJoyStick.prototype.update = function(whiteBall) {
  
//     // console.log(whiteBall.position.x, whiteBall.position.y, Mouse.position.x, Mouse.position.y);
//     // this.active = true
  
//     // console.log(this.moveX, this.prevMoveX);
//     // if(this.moveX == this.prevMoveX) {
//     //   this.deg = 0;
//     // }
  
    
//     // this.deg = deg;
  
//     // this.x = e.touches[0].pageX
//     // this.y = e.touches[0].pageY
  
//     // this.prevMoveX = this.moveX;
//     // this.prevMoveY = this.moveY;
//   }
  
//   MyJoyStick.prototype.addListeners = function() {
//     const element = document.querySelector('canvas');
  
//     // console.log("add listeners");
//     document.body.addEventListener("contextmenu", (e) => e.preventDefault())
  
//     window.addEventListener("contextmenu", (e) => e.preventDefault())
  
//     element.addEventListener("touchstart", (e) => {
//       if(!window.Game.isTurn()) return;
//       e.stopPropagation();
  
//       this.handleStart(e);
//     }, false);
//     element.addEventListener("touchmove", (e) => {
//       if(!window.Game.isTurn()) return;
//       e.stopPropagation();
  
//       this.handleMove(e, window.Game.gameWorld.whiteBall);
//     }, false);
//     element.addEventListener("touchend", (e) => {
//       if(!window.Game.isTurn()) return;
//       this.active = false;
//     }, false);
    
  
//     // element.addEventListener("tou")
//   }
  
//   MyJoyStick.prototype.handleInput = function() {
    
//   }
  

// // import './script/Global.js';
// // import './script/Canvas2D.js';
// function Canvas2D_Singleton() {
//     this._canvas = null;
//     this._canvasContext = null;
//     this._canvasOffset = window.Vector2.zero;
// }

// Object.defineProperty(Canvas2D_Singleton.prototype, "offset",
//     {
//         get: function () {
//             return this._canvasOffset;
//         }
//     });

// Object.defineProperty(Canvas2D_Singleton.prototype, "scale",
//     {
//         get: function () {
//             const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//             // 3000 1418
//             if(isMobile) {
//               // console.log(window.Game.size.y, this._canvas.height);
//               // return new window.Vector2(this._canvas.height / window.Game.size.y, this._canvas.width / window.Game.size.x);
//               return new window.Vector2(this._canvas.width / window.Game.size.x,
//                   this._canvas.height / window.Game.size.y);
//               // return new window.Vector2(this._canvas.height / window.Game.size.x,
//               //     this._canvas.width / window.Game.size.y);
//             }
//             else {
//               return new window.Vector2(this._canvas.width / window.Game.size.x,
//                   this._canvas.height / window.Game.size.y);
//             }
//         }
//     });

// Canvas2D_Singleton.prototype.initialize = function (divName, canvasName) {
//     this._canvas = document.getElementById(canvasName);
//     this._div = document.getElementById(divName);

//     if (this._canvas.getContext)
//         this._canvasContext = this._canvas.getContext('2d');
//     else {
//         alert('Your browser is not HTML5 compatible.!');
//         return;
//     }
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     if(isMobile) {
//       window.onresize = Canvas2D_Singleton.prototype.resizeMobile;
//       this.resizeMobile();
//       // window.onresize = Canvas2D_Singleton.prototype.resize;
//       // this.resize();
//     }
//     else {
//       window.onresize = Canvas2D_Singleton.prototype.resize;
//       this.resize();
//     }
// };

// Canvas2D_Singleton.prototype.clear = function () {
//     this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
// };

// Canvas2D_Singleton.prototype.resize = function () {
//     let gameCanvas = Canvas2D._canvas;
//     let gameArea = Canvas2D._div;
//     let widthToHeight = window.Game.size.x / window.Game.size.y;
//     let newWidth = window.innerWidth;
//     let newHeight = window.innerHeight;
//     let newWidthToHeight = newWidth / newHeight;

//     // console.log(newWidth);

//     if (newWidthToHeight > widthToHeight) {
//         newWidth = newHeight * widthToHeight;
//     } else {
//         newHeight = newWidth / widthToHeight;
//     }
//     gameArea.style.width = newWidth + 'px';
//     gameArea.style.height = newHeight + 'px';

//     gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
//     gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
//     gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
//     gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

//     gameCanvas.width = newWidth;
//     gameCanvas.height = newHeight;

//     let offset = window.Vector2.zero;
//     if (gameCanvas.offsetParent) {
//         do {
//             offset.x += gameCanvas.offsetLeft;
//             offset.y += gameCanvas.offsetTop;
//         } while ((gameCanvas = gameCanvas.offsetParent));
//     }
//     Canvas2D._canvasOffset = offset;
// };

// Canvas2D_Singleton.prototype.resizeMobile = function () {
//     let gameCanvas = Canvas2D._canvas;
//     let gameArea = Canvas2D._div;
//     let widthToHeight = window.Game.size.x / window.Game.size.y;
//     // let newWidth = window.Game.gameWorld == undefined ? window.innerWidth : window.innerWidth - 300;
//     let newWidth = window.innerHeight;
//     let newHeight = window.innerWidth;
//     let newWidthToHeight = newWidth / newHeight;

//     if (newWidthToHeight > widthToHeight) {
//         newWidth = newHeight * widthToHeight;
//     } else {
//         newHeight = newWidth / widthToHeight;
//     }
//     gameArea.style.width = newWidth + 'px';
//     gameArea.style.height = newHeight + 'px';

//     gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
//     gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
//     gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
//     gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

//     gameCanvas.width = newWidth * 0.8;
//     gameCanvas.height = newHeight * 0.8;

//     let offset = window.Vector2.zero;
//     if (gameCanvas.offsetParent) {
//         do {
//             offset.x += gameCanvas.offsetLeft;
//             offset.y += gameCanvas.offsetTop;
//         } while ((gameCanvas = gameCanvas.offsetParent));
//     }
//     Canvas2D._canvasOffset = offset;
// };

// Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
//     let canvasScale = this.scale;

//     position = typeof position !== 'undefined' ? position : window.Vector2.zero;
//     rotation = typeof rotation !== 'undefined' ? rotation : 0;
//     scale = typeof scale !== 'undefined' ? scale : 1;
//     origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;

//     this._canvasContext.save();
//     this._canvasContext.scale(canvasScale.x, canvasScale.y);
//     this._canvasContext.translate(position.x, position.y);
//     this._canvasContext.rotate(rotation);
//     this._canvasContext.drawImage(sprite, 0, 0,
//         sprite.width, sprite.height,
//         -origin.x * scale, -origin.y * scale,
//         sprite.width * scale, sprite.height * scale);
//     this._canvasContext.restore();
// };

// Canvas2D_Singleton.prototype.drawRect = function (width, height, position, rotation, scale, origin) {
//     let canvasScale = this.scale;

//     position = typeof position !== 'undefined' ? position : window.Vector2.zero;
//     rotation = typeof rotation !== 'undefined' ? rotation : 0;
//     scale = typeof scale !== 'undefined' ? scale : 1;
//     origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;

//     this._canvasContext.save();
//     this._canvasContext.scale(canvasScale.x, canvasScale.y);
//     this._canvasContext.translate(position.x, position.y);
//     this._canvasContext.rotate(rotation);
//     this._canvasContext.fillRect(-origin.x, -origin.y, width, height);
//     this._canvasContext.restore();
// };

// Canvas2D_Singleton.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
//     let canvasScale = this.scale;

//     position = typeof position !== 'undefined' ? position : window.Vector2.zero;
//     origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;
//     color = typeof color !== 'undefined' ? color : Color.black;
//     textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
//     fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
//     fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

//     this._canvasContext.save();
//     this._canvasContext.scale(canvasScale.x, canvasScale.y);
//     this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
//     this._canvasContext.textBaseline = 'top';
//     this._canvasContext.font = fontsize + " " + fontname;
//     this._canvasContext.fillStyle = color.toString();
//     this._canvasContext.textAlign = textAlign;
//     this._canvasContext.fillText(text, 0, 0);
//     this._canvasContext.restore();
// };

// let Canvas2D = new Canvas2D_Singleton();

// // export default Canvas2D;
// window.Canvas2D = Canvas2D;

// // import './script/game_objects/Score.js';
// function Score(position){
//     this.position = position;
//     this.origin = new window.Vector2(47,82);
//     this.value = 0;
// }

// Score.prototype.reset = function(){
//     // this.position = position;
//     this.origin = new window.Vector2(30,0);
//     this.value = 0;
// };

// Score.prototype.draw = function () {
//   Canvas2D.drawText(
//       this.value, 
//       this.position, 
//       this.origin, 
//       "#096834", 
//       "top", 
//       "Impact", 
//       "200px"
//     );
// };

// Score.prototype.drawLines = function (color) {
    
//     for(let i=0; i<this.value; i++){

//         let pos = this.position.add(new window.Vector2(i*15,0));

//         Canvas2D.drawText(
//             "I", 
//             pos, 
//             this.origin, 
//             color, 
//             "top", 
//             "Arial", 
//             "20px"
//         );

//     }
//   };

// Score.prototype.increment = function(){
//     this.value++;
// };

// // export default Score;
// window.Score = Score;

// // import './script/game_objects/Ball.js';
// function Ball(initPos,color){
// 	this.initPos = initPos;
//     this.position = initPos.copy();
//     this.origin = new window.Vector2(25,25);
//     this.velocity = window.Vector2.zero;
//     this.color = color; 
//     this.moving = false;
//     this.visible = true;
//     this.inHole = false;
// }

// Object.defineProperty(Ball.prototype, "color",
//     {
//     	get: function(){
//     		if(this.sprite == sprites.redBall){
//     			return Color.red;
//     		}
//     		else if(this.sprite == sprites.yellowBall){
//     			return Color.yellow;
//     		}
// 			  else if(this.sprite == sprites.blackBall){
//     			return Color.black;
//     		}
// 			  else if(this.sprite == sprites.ball0) {return Color["0"]}
// 			  else if(this.sprite == sprites.ball1) {return Color["1"]}
// 			  else if(this.sprite == sprites.ball2) {return Color["2"]}
// 			  else if(this.sprite == sprites.ball3) {return Color["3"]}
// 			  else if(this.sprite == sprites.ball4) {return Color["4"]}
// 			  else if(this.sprite == sprites.ball5) {return Color["5"]}
// 			  else if(this.sprite == sprites.ball7) {return Color["7"]}
// 			  else if(this.sprite == sprites.ball8) {return Color["8"]}
// 			  else if(this.sprite == sprites.ball9) {return Color["9"]}
// 			  else if(this.sprite == sprites.ball10) {return Color["10"]}
// 			  else if(this.sprite == sprites.ball11) {return Color["11"]}
// 			  else if(this.sprite == sprites.ball12) {return Color["12"]}
// 			  else if(this.sprite == sprites.ball13) {return Color["13"]}
// 			  else if(this.sprite == sprites.ball14) {return Color["14"]}
// 			  // else if(this.sprite == sprites.ball15) {return Color["15"]}
//     		else{
//     			return Color.white;
//     		}
//     	},
//         set: function (value) {
//             if (value === Color.red){
//                 this.sprite = sprites.redBall;
//             }
//             else if(value == Color.yellow){
//             	this.sprite = sprites.yellowBall;
//             }
//             else if(value == Color["0"]) {
//               this.sprite = sprites.ball0;
//             }
//             else if(value == Color["2"]) this.sprite = sprites.ball2;
//             else if(value == Color["4"]) this.sprite = sprites.ball4;
//             else if(value == Color["8"]) this.sprite = sprites.ball8;
//             else if(value == Color["10"]) this.sprite = sprites.ball10;
//             else if(value == Color["12"]) this.sprite = sprites.ball12;
//             else if(value == Color["14"]) this.sprite = sprites.ball14;

// 			      else if(value == Color.black){
//             	this.sprite = sprites.blackBall;
//             }
//             else if(value == Color["1"]) this.sprite = sprites.ball1;
//             else if(value == Color["3"]) this.sprite = sprites.ball3;
//             else if(value == Color["5"]) this.sprite = sprites.ball5;
//             else if(value == Color["7"]) this.sprite = sprites.ball7;
//             else if(value == Color["9"]) this.sprite = sprites.ball9;
//             else if(value == Color["11"]) this.sprite = sprites.ball11;
//             else if(value == Color["13"]) this.sprite = sprites.ball13;
//             else{
//             	this.sprite = sprites.ball;
//             }
//         }
//     });

// Ball.prototype.shoot = function(power, angle){
//     if(power <= 0)
//         return;

//     this.moving = true;

//     this.velocity = calculateBallVelocity(power,angle);
// }

// let calculateBallVelocity = function(power, angle){

//     return new window.Vector2(100*Math.cos(angle)*power,100*Math.sin(angle)*power);
// }

// Ball.prototype.update = function(delta){

//     this.updatePosition(delta);

//     this.velocity.multiplyWith(0.98);

// 	if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1){
//         this.stop();
//     }
// }

// Ball.prototype.updatePosition = function(delta){

//     if(!this.moving || this.inHole)
//         return;
//     let ball = this;
//     let newPos = this.position.add(this.velocity.multiply(delta));


// 	if(window.Game.policy.isInsideHole(newPos)){
//     // console.log("in hole");
//         if(window.Game.sound && window.SOUND_ON){
//             let holeSound = sounds.hole.cloneNode(true);
//             holeSound.volume = 0.5;
//             holeSound.play();
//         }
// 		this.position = newPos;
//         this.inHole = true;
//         setTimeout(function(){ball.visible=false;ball.velocity = window.Vector2.zero;}, 100);
//         window.Game.policy.handleBallInHole(this);
// 		return;
// 	}

//     let collision = this.handleCollision(newPos);

//     if(collision){
// 		this.velocity.multiplyWith(0.95);
//     }else{
//     	this.position = newPos;
//     }
// }

// Ball.prototype.handleCollision = function(newPos){

// 	let collision = false;

// 	if(window.Game.policy.isXOutsideLeftBorder(newPos, this.origin)){
//         this.velocity.x = -this.velocity.x;
//         this.position.x = window.Game.policy.leftBorderX + this.origin.x;
//         collision = true;
//     }
//     else if(window.Game.policy.isXOutsideRightBorder(newPos, this.origin)){
//         this.velocity.x = -this.velocity.x;
//         this.position.x = window.Game.policy.rightBorderX - this.origin.x;
//         collision = true;
//     }

//     if(window.Game.policy.isYOutsideTopBorder(newPos, this.origin)){
//         this.velocity.y = -this.velocity.y;
//         this.position.y = window.Game.policy.topBorderY + this.origin.y;
//         collision = true;
//     }
//     else if(window.Game.policy.isYOutsideBottomBorder(newPos, this.origin)){
//         this.velocity.y = -this.velocity.y;
//         this.position.y = window.Game.policy.bottomBorderY - this.origin.y;
//         collision = true;
//     }

//     return collision;
// }

// Ball.prototype.stop = function(){

//     this.moving = false;
//     this.velocity = window.Vector2.zero;
// }

// Ball.prototype.reset = function(){
// 	this.inHole = false;
// 	this.moving = false;
// 	this.velocity = window.Vector2.zero;
// 	this.position = this.initPos;
// 	this.visible = true;
// }

// Ball.prototype.out = function(){

// 	this.position = new window.Vector2(0, 900);
// 	this.visible = false;
// 	this.inHole = true;

// }

// Ball.prototype.draw = function () {
//     if(!this.visible) return;

//     if(!isNaN(this.color)) {
//       // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new window.Vector2(20, 20));
//       Canvas2D.drawImage(this.sprite, this.position, 0, 1, new window.Vector2(20, 20));

//       Canvas2D._canvasContext.fillStyle = "blue";
//       Canvas2D.drawRect(2, 2, this.position, 0, 1, new window.Vector2(1, 1));
//     }
//     else {
//       // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new window.Vector2(25, 25));
//       Canvas2D.drawImage(this.sprite, this.position, 0, 1, new window.Vector2(25, 25));
//     }

//         // Canvas2D._canvasContext.fillStyle = "red";
//   // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new window.Vector2(25, 25))
//   // Canvas2D._canvasContext.save();
//   // Canvas2D._canvasContext.scale(0.6533333333333333, 0.6533333333333333);
//   // Canvas2D._canvasContext.translate(this.position.x, this.position.y);
//   // Canvas2D._canvasContext.rotate(0);
//   // Canvas2D._canvasContext.fillRect(-25, -25, this.sprite.width, this.sprite.height);
//   // // Canvas2D._canvasContext.drawImage(sprite, 0, 0,
//   // //     sprite.width, sprite.height,
//   // //     -origin.x * scale, -origin.y * scale,
//   // //     sprite.width * scale, sprite.height * scale);
//   // Canvas2D._canvasContext.restore();
// };

// // export default Ball;
// window.Ball = Ball;

// const joyStick = new MyJoyStick();

// function Stick(position){
//     this.position = position;
//     this.origin = new window.Vector2(970,11);
//     this.shotOrigin = new window.Vector2(950,11);
//     this.shooting = false;
//     this.visible = true;
//     this.rotation = 0 + (0 * (Math.PI / 180));
//     this.power = 0;
//     this.trackMouse = true;
//     this.useJoystick = false;
//     this.caster = new RayCaster(this.position, this.rotation)
// }

// Stick.prototype.chooseControl = function() {
//   if(this.useJoystick) {
//     joyStick.addListeners();
//   }
// }

// Stick.prototype.stickUp = function() {
//     if(this.power < 75){
//         this.origin.x+=2;
//         this.power+=1.2;
//     }
// }

// Stick.prototype.stickDown = function() {
//     if(this.power>0){
//         this.origin.x-=2;
//         this.power-=1.2;
//     }
// }


// Stick.prototype.handleStrike = function() {
//     if(window.Game.isTurn()) {
//         if(window.Game.playerNumber == 1) {
//             // console.log(this.power, Mouse.left.down, Keyboard.down(Keys.space));
//         }
//         if(this.power>0 && Mouse.left.down || this.power>0 && Keyboard.down(Keys.space)){
//             this.stickStrike();
//         }
//     }
//     else {
//         if(this.useJoystick) {
//             this.power = window.Game.packetData.mobilePower;

//             if(this.power > 0) {
//                 console.log("gotten mobile power", this.power);
//                 this.stickStrike()
//                 window.Game.packetData.mobilePower = 0;
//             };
//         }
//         else if(window.Game.packetData.power>0 && window.Game.packetData.leftDown || window.Game.packetData.power>0 && window.Game.packetData.space){
//             this.stickStrike();
//         }
//     }

//     window.Game.socket.emit('stick_strike', window.Game.roomID, this.power, Mouse.left.down, Keyboard.down(Keys.space))
// }

// Stick.prototype.stickStrike = function() {
//     let strike = sounds.strike.cloneNode(true);
//     strike.volume = (this.power/(10))<1?(this.power/(10)):1;
//     strike.play();
//     window.Game.policy.turnPlayed = true;
//     this.shooting = true;
//     this.origin = this.shotOrigin.copy();

//     window.Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
//     let stick = this;
//     setTimeout(function(){stick.visible = false;}, 500);
// }

// Stick.prototype.stickRotateMain = function() {
//     if(window.Game.isTurn()) {
//         let opposite = Mouse.position.y - this.position.y;
//         let adjacent = Mouse.position.x - this.position.x;
//         this.rotation = Math.atan2(opposite, adjacent);

//         window.Game.socket.emit('stick_rotate', window.Game.roomID, this.rotation)
//     }
//     else {
//         this.rotation = window.Game.packetData.rotation;
//         // window.Game.socket.on('stick_rotate', (rotation) => {
//         //     this.rotation = rotation;
//         // })
//     }
// }

// Stick.prototype.stickRotateMobile = function() {
//     // console.log("running rotate, is it my turn", window.Game.isTurn());
//     if(window.Game.isTurn()) {
//         this.rotation = joyStick.deg;
//         window.Game.socket.emit('stick_rotate', window.Game.roomID, this.rotation)
//         // console.log("emitting rotate", this.rotation);
//     }
//     else {
//         // console.log("getting mobile rotation data");
//         // this.rotation = window.Game.packetData.rotation;
//     }
// }

// Stick.prototype.handleMovementInput = function(w, s, keyInput) {
//     // console.log("move input");

//     if(this.useJoystick) {
//         this.origin.x = window.Game.packetData.originX;
//     }
//     else {
//         if(w && keyInput) {
//             this.stickUp();
//         }
//         else if(s && keyInput) {
//             this.stickDown();
//         }
//     }
// }

// Stick.prototype.movementInput = function() {
//     if(window.Game.isTurn()) {
//         if(Keyboard.down(Keys.W) && window.KEYBOARD_INPUT_ON){
//           this.stickUp();
//         }
//         else if(Keyboard.down(Keys.S) && window.KEYBOARD_INPUT_ON){
//           this.stickDown();
//         }

//         window.Game.socket.emit('movement_input', window.Game.roomID, Keyboard.down(Keys.W), Keyboard.down(Keys.S), window.KEYBOARD_INPUT_ON);
//     }
//     else {
//         this.handleMovementInput(window.Game.packetData.w, window.Game.packetData.s, window.Game.packetData.keyInput);
//         // window.Game.socket.on('movement_input', this.handleMovementInput.bind(this));
//     }
// }

// Stick.prototype.mainInput = function() {
//     if(this.trackMouse){
//         this.stickRotateMain();
//     }
//     else if(this.useJoystick /* && joyStick.active */) {
//         this.stickRotateMobile();
//     }
// }

// Stick.prototype.handleInput = function (delta) {
//     if(window.AI_ON && window.Game.policy.turn === window.AI_PLAYER_NUM) return;

//     if(window.Game.policy.turnPlayed) return;

//     this.movementInput();

//     this.handleStrike();
    
//     this.mainInput();

//     // const trackMouse = this.trackMouse;
//     // if(trackMouse) {
//     //     let opposite = Mouse.position.y - this.position.y;
//     //     let adjacent = Mouse.position.x - this.position.x;
//     //     const rotation = Math.atan2(opposite, adjacent);
    
//     //     const w = Keyboard.down(Keys.W);
//     //     const s = Keyboard.down(Keys.S);
//     //     const space = Keyboard.down(Keys.space);
//     //     window.Game.socket.emit('joystick_update', window.Game.roomID, w, s, space, Mouse.left.down, Mouse.position.y, Mouse.position.x);
//     // }
//     // else if(this.useJoystick && joyStick.active) {
//     //     // window.Game.socket.emit('joystick_mobile_update', window.Game.roomID, w, s, space, Mouse.left.down, rotation)
//     // }


//     // if(window.AI_ON && window.Game.policy.turn === window.AI_PLAYER_NUM)
//     //   return;

//     // if(window.Game.policy.turnPlayed)
//     //   return;

//     // if(Keyboard.down(Keys.W) && window.KEYBOARD_INPUT_ON){
//     //   if(this.power < 75){
//     //     this.origin.x+=2;
//     //     this.power+=1.2;
//     //   }
//     // }

//     // if(Keyboard.down(Keys.S) && window.KEYBOARD_INPUT_ON){
//     //   if(this.power>0){
//     //     this.origin.x-=2;
//     //     this.power-=1.2;
//     //   }
//     // }

//     // else if (this.power>0 && Mouse.left.down || this.power>0 && Keyboard.down(Keys.space)){
//     //   // console.log("strike");
//     //   let strike = sounds.strike.cloneNode(true);
//     //   strike.volume = (this.power/(10))<1?(this.power/(10)):1;
//     //   strike.play();
//     //   window.Game.policy.turnPlayed = true;
//     //   this.shooting = true;
//     //   this.origin = this.shotOrigin.copy();

//     //   window.Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
//     //   let stick = this;
//     //   setTimeout(function(){stick.visible = false;}, 500);
//     // }
//     // else if(this.trackMouse){
//     //   let opposite = Mouse.position.y - this.position.y;
//     //   let adjacent = Mouse.position.x - this.position.x;
//     //   this.rotation = Math.atan2(opposite, adjacent);
//     // }
//     // else if(this.useJoystick && joyStick.active) {
//     //   // joyStick.update(window.Game.gameWorld.whiteBall);

//     //   this.rotation = joyStick.deg;

//     //   // console.log(joyStick.deg);
//     //   // const a = joyStick.x - this.origin.x
//     //   // const b = joyStick.y - this.origin.y

//     //   // const dist = Math.hypot(a, b)

//     //   // console.log(dist);
//     //   // console.log(joyStick.deg, this.position);
//     //   // if(joyStick.deg > 0) {
//     //   //   this.rotation += 0.01
//     //   // }
//     //   // else if(joyStick.deg < 0) {
//     //   //   this.rotation -= 0.01;
//     //   // }
//     //   // else {
//     //   //   joyStick.deg > 0 ? this.rotation += 0.01 : 
//     //   // }
//     // }
// };

// Stick.prototype.shoot = function(power, rotation){
//   // if(window.Game.policy.firstPlay) window.Game.policy.firstPlay = false;
//   this.power = power;
//   this.rotation = rotation;

//   if(window.Game.sound && window.SOUND_ON){
//     let strike = sounds.strike.cloneNode(true);
//     strike.volume = (this.power/(10))<1?(this.power/(10)):1;
//     strike.play();
//   }
//   window.Game.policy.turnPlayed = true;
//   this.shooting = true;
//   this.origin = this.shotOrigin.copy();

//   window.Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
//   let stick = this;
//   setTimeout(function(){stick.visible = false;}, 500);
// }

// Stick.prototype.update = function(){
//     // console.log("updating joystick");
//     // console.log(this.useJoystick, window.Game.isTurn());
//     if(this.useJoystick && !window.Game.isTurn()) {
//         // console.log("setting rotation", window.Game.packetData.rotation);
//         this.rotation = window.Game.packetData.rotation;
//     }
//   if(this.shooting && !window.Game.gameWorld.whiteBall.moving)
//     this.reset();
// };

// Stick.prototype.reset = function(){
//   this.position.x = window.Game.gameWorld.whiteBall.position.x;
//   this.position.y = window.Game.gameWorld.whiteBall.position.y;
// 	this.origin = new window.Vector2(970,11);
//     window.Game.packetData.originX = 970;
//   this.shooting = false;
//   this.visible = true;
// 	this.power = 0;
// };

// Stick.prototype.draw = function () {
//   if(!this.visible) return;
  
//   this.caster.update(this.position, this.rotation);

//   Canvas2D.drawImage(sprites.stick, this.position,this.rotation, 1, this.origin);

//   this.caster.draw();
//   // Canvas2D._canvasContext.fillStyle = "#cbcbcb"
//   // Canvas2D.drawRect(1500, 5, this.position, this.rotation, 1, new window.Vector2(0, 3));

//   // Canvas2D._canvasContext.save()
//   // // Canvas2D._canvasContext.rotate(this.rotation)
//   // const ballPosX = window.Game.gameWorld.whiteBall.position.x;
//   // const ballPosY = window.Game.gameWorld.whiteBall.position.y;

//   // console.log(ballPosX, ballPosY);
//   // Canvas2D._canvasContext.fillRect(ballPosX, ballPosY, sprites.ball.width, sprites.ball.height);
//   // Canvas2D._canvasContext.restore()
// };

// // export default Stick;
// window.Stick = Stick;

// function RayCaster(position, rotation){
//     this.width = 1500;
//     // this.height = 5;
//     this.height = 1;
//     this.position = position;
//     // this.origin = new window.Vector2(0, 3);
//     this.origin = new window.Vector2(0, 0);
//     this.visible = true;
//     this.rotation = rotation;
//     this.collided = false;

//     this.projection = {
//       // width: 5,
//       // height: 5,
//       width: 1,
//       height: 1,
//       position: {
//         x: 0,
//         y: 0,
//       },
//       rotation: 0,
//       origin: new window.Vector2(0, 0)
//       // origin: new window.Vector2(20, 0)
//     }

//     this.result = {
//       // width: 5,
//       // height: 5,
//       width: 1,
//       height: 1,
//       position: {
//         x: 0,
//         y: 0,
//       },
//       rotation: 0,
//       origin: new window.Vector2(0, 0)
//     }
// }

// RayCaster.prototype.draw = function() {
//   Canvas2D._canvasContext.fillStyle = "#cbcbcb"
//   // Canvas2D._canvasContext.fillStyle = "blue"
//   Canvas2D.drawRect(this.width, this.height, this.position, this.rotation, 1, this.origin);

//   Canvas2D._canvasContext.fillStyle = "red"
//   Canvas2D.drawRect(this.projection.width, this.projection.height, this.projection.position, this.projection.rotation, 1, this.projection.origin);

//   Canvas2D._canvasContext.fillStyle = "#cbcbcb"
//   const newO = new window.Vector2(0, 0);
//   // Canvas2D._canvasContext.fillStyle = "blue"
// //   Canvas2D.drawRect(this.result.width, this.result.height, this.result.position, this.result.rotation, 1, this.origin);
//   Canvas2D.drawRect(this.result.width, this.result.height, this.result.position, this.result.rotation, 1, newO);

//   this.collided = false;
// }

// RayCaster.prototype.update = function(position, rotation) {
//   this.position = position;
//   this.rotation = rotation;
//   if(this.collided == false) {
//     this.width = 1500;
//     this.projection.position.x = 0;
//     this.projection.position.y = 0;
//     this.result.position.x = 0;
//     this.result.position.y = 0;
//   }
// }

// // export default RayCaster;
// window.RayCaster = RayCaster;

// function Label(text, position, origin, color, textAlign, fontname, fontsize){

//     this.text = typeof text !== 'undefined' ? text : '';
//     this.position = typeof position !== 'undefined' ? position : window.Vector2.zero;
//     this.origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;
//     this.color = typeof color !== 'undefined' ? color : Color.black;
//     this.textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
//     this.fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
//     this.fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
// }

// Label.prototype.draw = function(){

//     Canvas2D.drawText(
//         this.text, 
//         this.position,
//         this.origin,
//         this.color,
//         this.textAlign,
//         this.fontname,
//         this.fontsize
//     );

// }

// // export default Label;
// window.Label = Label;


// function Button(sprite, position, callback, hoverSprite){

//     this.sprite = sprite;
//     this.hoverSprite = hoverSprite ? hoverSprite : sprite;
//     this.position = position;
//     this.callback = callback;
// }

// Button.prototype.draw = function(){

//     if(this.mouseInsideBorders()){
//         Canvas2D.drawImage(this.hoverSprite, this.position, 0, 1);
//         Canvas2D._canvas.style.cursor = "pointer";
//     }
//     else{
//         Canvas2D.drawImage(this.sprite, this.position, 0, 0.98);
//     }
// }

// Button.prototype.handleInput = function(){
//     if(Mouse.left.pressed) {
//         // console.log("mouse", this.position.x, this.position.y);
//     }
//     if(Mouse.left.pressed && this.mouseInsideBorders()){
//         this.callback();
//     }
// }

// Button.prototype.mouseInsideBorders = function(){

//   let mousePos = Mouse.position;

//   const offsetX = 1743 * 0.8 / 2;
//   const offsetY = 825 * 0.8 / 2;

//   // console.log(offsetX);

//   // console.log(mousePos.x);
//   // console.log(mousePos.x, mousePos.y);

//   // console.log(mousePos.x + offsetX);
  
//   // console.log(mousePos.x + offsetY, mousePos.y + offsetX);
//   // console.log(Math.abs(mousePos.x), Math.abs(mousePos.y));
//   // console.log(mousePos.x, mousePos.y);
//   // console.log(this.position);

//     if(Math.abs(mousePos.x) > this.position.x 
//         &&
//         Math.abs(mousePos.x) < this.position.x + this.sprite.width
//         &&
//         Math.abs(mousePos.y) > this.position.y
//         &&
//         Math.abs(mousePos.y) < this.position.y + this.sprite.height
//     ){
//         return true;
//     }

//     return false;
// }

// // export default Button;
// window.Button = Button;



// function Menu(){
    
// }

// Menu.prototype.init = function
// (
//     backgroundSprite,
//     labels,
//     buttons,
//     sound
// ){  
//     this.background = backgroundSprite;
//     this.labels = labels || [];
//     this.buttons = buttons || [];
//     this.sound = sound ? sound : undefined;

//     this.active = false;
// }

// Menu.prototype.load = function(){
//     this.sound.currentTime = 0;
//     this.active = true;

//     requestAnimationFrame(this.menuLoop.bind(this));
//     if(window.SOUND_ON){
//         this.sound.volume = 0.8;
//     }

//     // this.sound.play();
// }

// Menu.prototype.draw = function(){

//     Canvas2D._canvas.style.cursor = "auto"; 

//     Canvas2D.drawImage(
//         this.background, 
//         window.Vector2.zero, 
//         0, 
//         1, 
//         window.Vector2.zero
//     );


//     for(let i = 0 ; i < this.labels.length ; i++){
//         this.labels[i].draw();
//     }

//     for(let i = 0 ; i < this.buttons.length ; i++){
//         this.buttons[i].draw();
//     }
// }

// Menu.prototype.handleInput = function(){

//     for(let i = 0 ; i < this.buttons.length ; i++){
//         this.buttons[i].handleInput();
//     }
// }

// Menu.prototype.menuLoop = function(){

//     if(this.active){
//         this.handleInput();
//         Canvas2D.clear();
//         this.draw();
//         Mouse.reset();
//         requestAnimationFrame(this.menuLoop.bind(this));
//     }

// }

// // export default Menu;
// window.Menu = Menu;


// function generateMainMenuLabels(headerText){

//     let labels = [

//         new Label(
//             headerText, 
//             new window.Vector2(100,0),
//             window.Vector2.zero,
//             "white",
//             "left",
//             "Bookman",
//             "100px"
//         ),
//         new Label(
//             "© 2018 Chen Shmilovich", 
//             new window.Vector2(1250,700),
//             window.Vector2.zero,
//             "white",
//             "left",
//             "Bookman",
//             "20px"
//         )
//     ];


//     return labels;
// }


// function generateMainMenuButtons(inGame){



//     let buttons = [];

//     let dev = 0;

//     if(inGame){
//         dev = 200;
//         buttons.push(
//             new Button
//                 (
//                     // CONTINUE BUTTON
//                     sprites.continueButton, 
//                     new window.Vector2(200,200),
//                     function(){
//                         window.Game.mainMenu.active = false;
//                         window.GAME_STOPPED = false;
//                         setTimeout(window.Game.continueGame,200);
//                         sounds.fadeOut(window.Game.mainMenu.sound);
//                     },
//                     sprites.continueButtonHover
//                 )
//         )
//     }

//     let muteSprite = sprites.muteButton;
//     let muteSpriteHover = sprites.muteButtonHover;

//     if(window.Game.mainMenu.sound && window.Game.mainMenu.sound.volume === 0){
//         muteSprite = sprites.muteButtonPressed;
//         muteSpriteHover = sprites.muteButtonPressedHover;
//     }


//     let muteButton = new Button
//     (
//         // MUTE BUTTON
//         muteSprite, 
//         new window.Vector2(1430,10),
//         function(){
//             if(window.Game.mainMenu.sound.volume == 0){
//                 window.SOUND_ON = true;
//                 window.Game.mainMenu.sound.volume = 0.8;
//                 this.sprite = sprites.muteButton;
//                 this.hoverSprite = sprites.muteButtonHover;
//             }
//             else{
//                 window.SOUND_ON = false;
//                 window.Game.mainMenu.sound.volume = 0.0;
//                 this.sprite = sprites.muteButtonPressed;
//                 this.hoverSprite = sprites.muteButtonPressedHover;
//             }
//         },
//         muteSpriteHover
//     );

//     let backButton = new Button
//     (
//         //BACK
//         sprites.backButton, 
//         new window.Vector2(100,150),
//         function(){
//             window.Game.mainMenu.labels = generateMainMenuLabels("Classic 8-Ball");
//             window.Game.mainMenu.buttons = generateMainMenuButtons(inGame);
//         },
//         sprites.backButtonHover
//     );

//     buttons = buttons.concat([
//         new Button
//         (
//             // PLAYER vs PLAYER
//             sprites.twoPlayersButton, 
//             new window.Vector2(200,dev+200),
//             function(){
//                 window.AI_ON = false;
//                 window.Game.mainMenu.active = false;
//                 window.GAME_STOPPED = false;
//                 setTimeout(window.Game.startNewGame,200);
//                 sounds.fadeOut(window.Game.mainMenu.sound);
//             },
//             sprites.twoPlayersButtonHover
//         ),
//         new Button
//         (
//             // PLAYER vs COMPUTER
//             sprites.onePlayersButton, 
//             new window.Vector2(200,dev+400),
//             function(){
//                 window.Game.mainMenu.labels = generateMainMenuLabels("Choose Difficulty");

//                 Mouse.reset();
//                 window.Game.mainMenu.buttons = [
//                     new Button
//                     (
//                         //EASY
//                         sprites.easyButton, 
//                         new window.Vector2(200,150),
//                         function(){
//                             window.AI_PLAYER_NUM = 1;
//                             window.AI_ON = true;
//                             window.TRAIN_ITER = 30;
//                             window.Game.mainMenu.active = false;
//                             window.GAME_STOPPED = false;
//                             setTimeout(window.Game.startNewGame,200);
//                             sounds.fadeOut(window.Game.mainMenu.sound);
//                         },
//                         sprites.easyButtonHover
//                     ),
//                     new Button
//                     (
//                         //MEDIUM
//                         sprites.mediumButton, 
//                         new window.Vector2(200,300),
//                         function(){
//                             window.AI_PLAYER_NUM = 1;
//                             window.AI_ON = true;
//                             window.TRAIN_ITER = 50;
//                             window.Game.mainMenu.active = false;
//                             window.GAME_STOPPED = false;
//                             setTimeout(window.Game.startNewGame,200);
//                             sounds.fadeOut(window.Game.mainMenu.sound);
//                         },
//                         sprites.mediumButtonHover
//                     ),
//                     new Button
//                     (
//                         //HARD
//                         sprites.hardButton, 
//                         new window.Vector2(200,450),
//                         function(){
//                             window.AI_PLAYER_NUM = 1;
//                             window.AI_ON = true;
//                             window.TRAIN_ITER = 100;
//                             window.Game.mainMenu.active = false;
//                             window.GAME_STOPPED = false;
//                             setTimeout(window.Game.startNewGame,200);
//                             sounds.fadeOut(window.Game.mainMenu.sound);
//                         },
//                         sprites.hardButtonHover
//                     ),
//                     new Button
//                     (
//                         //INSANE
//                         sprites.insaneButton, 
//                         new window.Vector2(200,600),
//                         function(){
//                             window.AI_PLAYER_NUM = 0;
//                             window.AI_ON = true;
//                             window.TRAIN_ITER = 700;
//                             window.Game.mainMenu.active = false;
//                             window.GAME_STOPPED = false;
//                             setTimeout(window.Game.startNewGame,200);
//                             sounds.fadeOut(window.Game.mainMenu.sound);
//                         },
//                         sprites.insaneButtonHover
//                     ),
//                     muteButton,
//                     backButton

//                 ];
//             },
//             sprites.onePlayersButtonHover
//         ),
//         muteButton
//     ]);

//     return buttons;
// }

// // export {generateMainMenuLabels, generateMainMenuButtons}
// window.generateMainMenuButtons = generateMainMenuButtons;
// window.generateMainMenuLabels = generateMainMenuLabels;


// function Opponent(power, rotation){
//     this.power = power || (Math.random() * 75 + 1);
//     this.rotation = rotation || (Math.random()*6.283)-3.141;
//     this.evaluation = 0;
// }

// // export default Opponent;
// window.Opponent = Opponent;


// function AIPolicy(){
    
// }

// AIPolicy.prototype.evaluate = function(state, gamePolicy){

//     let evaluation = 1;

//     for (let i = 0 ; i < state.balls.length; i++){
//         for(let j = i + 1 ; j < state.balls.length ; j++){

//             let firstBall = state.balls[i];
//             let secondBall = state.balls[j];

//             if(firstBall === state.whiteBall || secondBall === state.whiteBall 
//                 || 
//                 firstBall.inHole || secondBall.inHole){
//                 continue;
//             }
//             evaluation += firstBall.position.distanceFrom(secondBall.position);
//         }
//     }

//     evaluation = evaluation/5800;

//     if(!gamePolicy.firstCollision){
//         evaluation+= 100;
//     }

//     evaluation += 2000 * gamePolicy.validBallsInsertedOnTurn;

//     gamePolicy.updateTurnOutcome();


//     if(gamePolicy.won){
//         if(!gamePolicy.foul){
//             evaluation += 10000;
//         }
//         else{
//             evaluation -= 10000;
//         }
//     }

//     if(gamePolicy.foul){
//         evaluation = evaluation - 3000;
//     }

//     return evaluation;
// }

// window.AIPolicy = AIPolicy;

// // export default AIPolicy;


// function AITrainer(){

//     this.AIPolicy = new AIPolicy();

// }

// AITrainer.prototype.init = function(state, gamePolicy){

//     AI.opponents = [];
//     AI.currentOpponent = new Opponent();
//     AI.finishedSession = true;
//     AI.iteration = 0;

//     AI.bestOpponentIndex = 0;
//     AI.bestOpponentEval = 0;

//     if(gamePolicy.foul){
//         //TO DO: Pick best position for the white ball.
//         state.whiteBall.position.x = 413;
//         state.whiteBall.position.y = 413;
//         state.whiteBall.inHole = false;
//         gamePolicy.foul = false;
//     }
//     AI.initialState = JSON.parse(JSON.stringify(state));
//     AI.initialGamePolicyState = JSON.parse(JSON.stringify(gamePolicy));

//     AI.state = state;
//     AI.gamePolicy = gamePolicy;

// }

// AITrainer.prototype.train = function(){

//     if(AI.iteration === window.TRAIN_ITER){
//         AI.finishedSession = true;
//         AI.playTurn();
//         return;
//     }

//     let ballsMoving = AI.state.ballsMoving();

//     if(!ballsMoving){

//         if(AI.iteration !== 0){
//             AI.currentOpponent.evaluation = AI.AIPolicy.evaluate(this.state, this.gamePolicy);

//             AI.opponents.push(JSON.parse(JSON.stringify(AI.currentOpponent)));

//             if(AI.currentOpponent.evaluation > AI.bestOpponentEval){
//                 AI.bestOpponentEval = AI.currentOpponent.evaluation;
//                 AI.bestOpponentIndex =  AI.opponents.length - 1;
//             }

//             if(window.LOG){
//                 console.log('-------------'+new Number(AI.iteration+1)+'--------------------');
//                 console.log('Current evaluation: ' + AI.currentOpponent.evaluation);
//                 console.log('Current power: ' + AI.currentOpponent.power);
//                 console.log('Current rotation: ' + AI.currentOpponent.rotation);
//                 console.log('---------------------------------');
//             }
//         }

//         AI.state.initiateState(AI.initialState.balls);
//         AI.gamePolicy.initiateState(AI.initialGamePolicyState);
//         AI.buildNewOpponent();
//         AI.simulate();
//     }

// }

// AITrainer.prototype.buildNewOpponent = function(){

//     if(AI.iteration % 10 === 0){
//         AI.currentOpponent = new Opponent();
//         AI.iteration++;
//         return;
//     }

//     let bestOpponent = AI.opponents[AI.bestOpponentIndex];

//     let newPower = bestOpponent.power;
//     newPower += + ((Math.random() * 30) - 15);
//     newPower = newPower < 20 ? 20 : newPower;
//     newPower = newPower > 75 ? 75 : newPower;

//     let newRotation = bestOpponent.rotation;

//     if(bestOpponent.evaluation > 0){
//         newRotation += (1/bestOpponent.evaluation)*(Math.random() * 2 * Math.PI - Math.PI)
//     }
//     else{
//         newRotation = (Math.random() * 2 * Math.PI - Math.PI);
//     }

//     AI.currentOpponent = new Opponent(newPower,newRotation);

//     AI.iteration++;

// }

// AITrainer.prototype.simulate = function(){
//     AI.state.stick.shoot(AI.currentOpponent.power, AI.currentOpponent.rotation);
// }

// AITrainer.prototype.playTurn = function(){

//     let bestOpponent = AI.opponents[AI.bestOpponentIndex];
//     window.Game.gameWorld.stick.rotation = bestOpponent.rotation;
//     window.Game.gameWorld.stick.trackMouse = false;

//     setTimeout(() => {

//         window.Game.gameWorld.stick.visible = true;
//         Canvas2D.clear();
//         window.Game.gameWorld.draw();

//         window.Game.sound = true;
//         window.Game.gameWorld.initiateState(AI.initialState.balls);
//         window.Game.policy.initiateState(AI.initialGamePolicyState);

//         window.DISPLAY = true;
        
//         requestAnimationFrame(window.Game.mainLoop);

//         window.Game.gameWorld.stick
//         .shoot(
//             bestOpponent.power, 
//             bestOpponent.rotation
//         );
//         window.Game.gameWorld.stick.trackMouse = true;

//     }, 1000);
// }

// AITrainer.prototype.opponentTrainingLoop = function(){

//     window.Game.sound = false;
//     window.DISPLAY = false;

//     if(window.DISPLAY_TRAINING){
//         if(!AI.finishedSession){
//             AI.train();
//             window.Game.gameWorld.handleInput(window.DELTA);
//             window.Game.gameWorld.update(window.DELTA);
//             Canvas2D.clear();
//             window.Game.gameWorld.draw();
//             Mouse.reset();
//             setTimeout(AI.opponentTrainingLoop,0.00000000001);
//         }
//     }
//     else{
//         while(!AI.finishedSession){
//             AI.train();
//             window.Game.gameWorld.handleInput(window.DELTA);
//             window.Game.gameWorld.update(window.DELTA);
//             Mouse.reset();
//         }
//     }

// }

// AITrainer.prototype.startSession = function(){
//         setTimeout(
//             ()=>{
//                 window.Game.gameWorld.stick.visible = false;
//                 Canvas2D.clear();
//                 window.Game.gameWorld.draw();

//                 AI.init(window.Game.gameWorld, window.Game.policy);
//                 AI.finishedSession = false;
//                 AI.opponentTrainingLoop();
//             },
//             1000
//         );
// }

// const AI = new AITrainer();

// window.AI = AI;

// // export default AI;



// function Player(matchScore, totalScore){
//     this.color = undefined;
//     this.matchScore = matchScore;
//     this.totalScore = totalScore;
// }

// // export default Player;
// window.Player = Player;


// function GamePolicy(){
//     this.firstPlay = true;
//     this.turn = 0;
//     this.firstCollision = true;
//     let player1TotalScore = new Score(new window.Vector2(window.Game.size.x/2 - 75,window.Game.size.y/2 - 45));
//     let player2TotalScore = new Score(new window.Vector2(window.Game.size.x/2 + 75,window.Game.size.y/2 - 45));

//     let player1MatchScore = new Score(new window.Vector2(window.Game.size.x/2 - 280,108));
//     let player2MatchScore = new Score(new window.Vector2(window.Game.size.x/2 + 230,108));

//     this.players = [new Player(player1MatchScore,player1TotalScore), new Player(player2MatchScore,player2TotalScore)];
//     this.foul = false;
//     this.scored = false;
//     this.won = false;
//     this.turnPlayed = false;
//     this.validBallsInsertedOnTurn = 0;

//     this.leftBorderX = window.BORDER_SIZE;
//     this.rightBorderX = window.Game.size.x - window.BORDER_SIZE;
//     this.topBorderY = window.BORDER_SIZE;
//     this.bottomBorderY = window.Game.size.y - window.BORDER_SIZE;

//     this.topCenterHolePos = new window.Vector2(750,32);
//     this.bottomCenterHolePos = new window.Vector2(750,794);
//     this.topLeftHolePos = new window.Vector2(62,62);
//     this.topRightHolePos = new window.Vector2(1435,62);
//     this.bottomLeftHolePos = new window.Vector2(62,762)
//     this.bottomRightHolePos = new window.Vector2(1435,762);
// }

// GamePolicy.prototype.reset = function(){
//     this.turn = 0;
//     this.players[0].matchScore.value = 0;
//     this.players[0].color = undefined;
//     this.players[1].matchScore.value = 0;
//     this.players[1].color = undefined;
//     this.foul = false;
//     this.firstPlay = true;
//     this.scored = false;
//     this.turnPlayed = false;
//     this.won = false;
//     this.firstCollision = true;
//     this.validBallsInsertedOnTurn = 0;
// }
// GamePolicy.prototype.drawScores = function(){
//     Canvas2D.drawText("PLAYER " + (this.turn+1), new window.Vector2(window.Game.size.x/2 + 40,200), new window.Vector2(150,0), "#096834", "top", "Impact", "70px");
//     this.players[0].totalScore.draw();
//     this.players[1].totalScore.draw();

//     this.players[0].matchScore.drawLines(this.players[0].color);
//     this.players[1].matchScore.drawLines(this.players[1].color);
// }

// // checks for validity
// GamePolicy.prototype.checkColisionValidity = function(ball1,ball2){
//   // console.log("is checking validity");

//     let currentPlayerColor = this.players[this.turn].color;

//     if(this.players[this.turn].matchScore.value == 7 &&
//        (ball1.color == Color.black || ball2.color == Color.black)){
//         this.firstCollision = false;
//         return;
//        }

//     if(!this.firstCollision)
//         return;

//     if(currentPlayerColor == undefined){
//       // console.log("if player not undef");
//         this.firstCollision = false;
//         return;
//     }

//     if(ball1.color == Color.white){
//       if(!check(currentPlayerColor, Number(ball2.color))){
//         // console.log("if player hit other ball");
//         // console.log(currentPlayerColor, ball1.color, ball2.color);
//           this.foul = true;
//         }
//         this.firstCollision = false;
//     }

//     if(ball2.color == Color.white){
//       if(!check(currentPlayerColor, Number(ball1.color))){
//         // console.log("if player hit other ball");
//         // console.log(currentPlayerColor, ball1.color, ball2.color);
//             this.foul = true;
//         }
//         this.firstCollision = false;
//     }
//     // if(ball1.color == Color.white){
//     //     if(ball2.color != currentPlayerColor){
//     //         this.foul = true;
//     //     }
//     //     this.firstCollision = false;
//     // }

//     // if(ball2.color == Color.white){
//     //     if(ball1.color != currentPlayerColor){
//     //         this.foul = true;
//     //     }
//     //     this.firstCollision = false;
//     // }
// }
// function check(type, value) {
//   if(type == "even" && value % 2 == 0) {
//     return true;
//   }
//   if(type == "even" && value % 2 != 0) {
//     return false;
//   }
//   if(type == "odd" && value % 2 != 0) {
//     return true;
//   }
//   if(type == "odd" && value % 2 == 0) {
//     return false;
//   }

// }
// GamePolicy.prototype.handleBallInHole = function(ball){

//     setTimeout(function(){ball.out();}, 100);

//     let currentPlayer = this.players[this.turn];
//     let secondPlayer = this.players[(this.turn+1)%2];

//     if(currentPlayer.color == undefined){
//       // console.log("ball pocket though undefined");
//         if(Number(ball.color) % 2 == 0){
//             currentPlayer.color = "even";
//             secondPlayer.color = "odd";
//         }
//         else if(!isNaN(ball.color) && Number(ball.color) % 2 != 0){
//             currentPlayer.color = "odd";
//             secondPlayer.color = "even";
//         }
//         else if(ball.color === Color.black){
//             this.won = true; 
//             this.foul = true;
//         }
//         else if(ball.color === Color.white){
//             this.foul = true;
//         }
//         // if(ball.color === Color.red){
//         //     currentPlayer.color = Color.red;
//         //     secondPlayer.color = Color.yellow;
//         // }
//         // else if(ball.color === Color.yellow){
//         //     currentPlayer.color = Color.yellow;
//         //     secondPlayer.color = Color.red;
//         // }
//         // else if(ball.color === Color.black){
//         //     this.won = true; 
//         //     this.foul = true;
//         // }
//         // else if(ball.color === Color.white){
//         //     this.foul = true;
//         // }
//     }

//     // if(currentPlayer.color === ball.color){
//     //     currentPlayer.matchScore.increment();
//     //     this.scored = true;
//     //     this.validBallsInsertedOnTurn++;
//     // }
//     // console.log(currentPlayer.color, Number(ball.color));
//     if(!isNaN(ball.color) && check(currentPlayer.color, Number(ball.color))){
//         // console.log();
//         currentPlayer.matchScore.increment();
//         this.scored = true;
//         this.validBallsInsertedOnTurn++;
//     }
//     else if(ball.color === Color.white){
//       // console.log('pocket white ball');

//         if(currentPlayer.color != undefined){
//             this.foul = true;
//             // console.log('pocket white ball');

//             // let ballsSet = window.Game.gameWorld.getBallsSetByColor(currentPlayer.color);

//             // let allBallsInHole = true;

//             // for (let i = 0 ; i < ballsSet.length; i++){
//             //     if(!ballsSet[i].inHole){
//             //         allBallsInHole = false;
//             //     }
//             // }

//             // if(allBallsInHole){
//             //     this.won = true;
//             // }
//         }
//     }
//     else if(ball.color === Color.black){

//         if(currentPlayer.color != undefined){
//             let ballsSet = window.Game.gameWorld.getBallsSetByColor(currentPlayer.color);

//             for (let i = 0 ; i < ballsSet.length; i++){
//                 if(!ballsSet[i].inHole){
//                     this.foul = true;
//                 }
//             }
            
//             this.won = true;
//         }
//     }
//     else{
//         secondPlayer.matchScore.increment();
//         // this.foul = true;
//     }
// }

// GamePolicy.prototype.switchTurns = function(){
//     console.log("called switch turns");
//     this.turn++;
//     this.turn%=2;
// }

// // main loop for policy
// GamePolicy.prototype.updateTurnOutcome = function(){
//   // console.log("up");
//   // console.log("is foul?", this.foul);
//     // console.log("is updating outcome, turn played?: ", this.turnPlayed);
    
//     if(!this.turnPlayed){
//         return;
//     }

//     if(this.firstCollision == true){
//       // console.log("first collision");
//         this.foul = true;
//     }

//     if(this.won){
//         let winner = undefined;

//         window.Game.socket.emit('winner', window.Game.roomID, this.turn);

//         // console.log('won', this.turn, this.foul, window.Game.playerNumber);
        
//         if(!this.foul){
//             this.players[this.turn].totalScore.increment();
//             winner = this.turn

//             // console.log(winner);
//             if(AI.finishedSession){
//                 this.reset()
//                 setTimeout(function(){window.Game.gameWorld.reset();
//                 }, 1000);
//             }
//         }
//         else{
//             this.players[(this.turn+1)%2].totalScore.increment();
//             winner = (this.turn+1)%2;

//             // console.log(winner);
//             if(AI.finishedSession){
//                 this.reset();
//                 setTimeout(function(){window.Game.gameWorld.reset();
//                 }, 1000);
//             }
//         }

//         window.Game.socket.emit('winner', window.Game.roomID, winner);

//         // window.Game.socket.emit('winner', window.Game.roomID, winner);

//         return;
//     }

//     if(!this.scored || this.foul) this.switchTurns();

//     this.scored = false;
//     this.turnPlayed = false;
//     this.firstCollision = true;
//     this.validBallsInsertedOnTurn = 0;

//     // console.log("updated turn session", this.foul);

//     setTimeout(function(){window.Game.gameWorld.whiteBall.visible=true;}, 200);

//     if(window.AI_ON && this.turn === window.AI_PLAYER_NUM && AI.finishedSession){
//         AI.startSession();
//     }
// }

// GamePolicy.prototype.handleFoul = function(){

//     if(!Mouse.left.down){
//         window.Game.gameWorld.whiteBall.position = Mouse.position;
//     }

// }
// GamePolicy.prototype.isXOutsideLeftBorder = function(pos, origin){
//     return (pos.x - origin.x) < this.leftBorderX;
// }
// GamePolicy.prototype.isXOutsideRightBorder = function(pos, origin){
//     return (pos.x + origin.x) > this.rightBorderX;
// }
// GamePolicy.prototype.isYOutsideTopBorder = function(pos, origin){
//     return (pos.y - origin.y) < this.topBorderY;
// }
// GamePolicy.prototype.isYOutsideBottomBorder = function(pos , origin){
//     return (pos.y + origin.y) > this.bottomBorderY;
// }

// GamePolicy.prototype.isOutsideBorder = function(pos,origin){
//     return this.isXOutsideLeftBorder(pos,origin) || this.isXOutsideRightBorder(pos,origin) || 
//     this.isYOutsideTopBorder(pos, origin) || this.isYOutsideBottomBorder(pos , origin);
// }

// GamePolicy.prototype.isInsideTopLeftHole = function(pos){
//     return this.topLeftHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
// }

// GamePolicy.prototype.isInsideTopRightHole = function(pos){
//     return this.topRightHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
// }

// GamePolicy.prototype.isInsideBottomLeftHole = function(pos){
//     return this.bottomLeftHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
// }

// GamePolicy.prototype.isInsideBottomRightHole = function(pos){
//     return this.bottomRightHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
// }

// GamePolicy.prototype.isInsideTopCenterHole = function(pos){
//     return this.topCenterHolePos.distanceFrom(pos) < (window.HOLE_RADIUS + 6);
// }

// GamePolicy.prototype.isInsideBottomCenterHole = function(pos){
//     return this.bottomCenterHolePos.distanceFrom(pos) < (window.HOLE_RADIUS + 6);
// }

// GamePolicy.prototype.isInsideHole = function(pos){
//     return this.isInsideTopLeftHole(pos) || this.isInsideTopRightHole(pos) || 
//            this.isInsideBottomLeftHole(pos) || this.isInsideBottomRightHole(pos) ||
//            this.isInsideTopCenterHole(pos) || this.isInsideBottomCenterHole(pos);
// }

// GamePolicy.prototype.initiateState = function(policyState){

//     this.turn = policyState.turn;
//     this.firstCollision = policyState.firstCollision;
//     this.foul = policyState.foul;
//     this.scored = policyState.scored;
//     this.won = policyState.won;
//     this.turnPlayed = policyState.turnPlayed;
//     this.validBallsInsertedOnTurn = policyState.validBallsInsertedOnTurn;

//     this.players[0].totalScore.value = policyState.players[0].totalScore.value;
//     this.players[1].totalScore.value = policyState.players[1].totalScore.value;

//     this.players[0].matchScore.value = policyState.players[0].matchScore.value;
//     this.players[0].color = policyState.players[0].color;
//     this.players[1].matchScore.value = policyState.players[1].matchScore.value;
//     this.players[1].color = policyState.players[1].color;

// }

// // export default GamePolicy;
// window.GamePolicy = GamePolicy;


// function GameWorld() {

//     this.whiteBallStartingPosition = new window.Vector2(413,413);

//     // const offsetX = 0.89830508474576271186440677966102;
//     // const offsetY = 0.89830508474576271186440677966102;
//     const offsetX = 1;
//     const offsetY = 1;

//     this.redBalls = [
//     new Ball(new window.Vector2(1056 * offsetX, 433 * offsetY),Color["0"]),//3
//     new Ball(new window.Vector2(1090 * offsetX, 374 * offsetY),Color["2"]),//4
//     new Ball(new window.Vector2(1126 * offsetX, 393 * offsetY),Color["4"]),//8
//     new Ball(new window.Vector2(1126 * offsetX, 472 * offsetY),Color["8"]),//10;
//     new Ball(new window.Vector2(1162 * offsetX, 335 * offsetY),Color["10"]),//11
//     new Ball(new window.Vector2(1162 * offsetX, 374 * offsetY),Color["12"]),//12
//     new Ball(new window.Vector2(1162 * offsetX, 452 * offsetY),Color["14"])//14
//     // new Ball(new window.Vector2(1056 * offsetX, 433 * offsetY),Color.red),//3
//     // new Ball(new window.Vector2(1090 * offsetX, 374 * offsetY),Color.red),//4
//     // new Ball(new window.Vector2(1126 * offsetX, 393 * offsetY),Color.red),//8
//     // new Ball(new window.Vector2(1126 * offsetX, 472 * offsetY),Color.red),//10;
//     // new Ball(new window.Vector2(1162 * offsetX, 335 * offsetY),Color.red),//11
//     // new Ball(new window.Vector2(1162 * offsetX, 374 * offsetY),Color.red),//12
//     // new Ball(new window.Vector2(1162 * offsetX, 452 * offsetY),Color.red)//14
//     ]

//     this.yellowBalls = [
//     new Ball(new window.Vector2(1022 * offsetX, 413),Color["1"]),//1
//     // new Ball(new window.Vector2(1022 * offsetX, 371),Color["1"]),//1
//     new Ball(new window.Vector2(1056 * offsetX, 393 * offsetY),Color["3"]),//2
//     new Ball(new window.Vector2(1090 * offsetX, 452 * offsetY),Color["5"]),//6
//     new Ball(new window.Vector2(1126 * offsetX, 354 * offsetY),Color["7"]),//7
//     new Ball(new window.Vector2(1126 * offsetX, 433 * offsetY),Color["9"]),//9
//     new Ball(new window.Vector2(1162 * offsetX, 413 * offsetY),Color["11"]),//13
//     new Ball(new window.Vector2(1162 * offsetX, 491 * offsetY),Color["13"])//15
//     // new Ball(new window.Vector2(1022 * offsetX, 413),Color.yellow),//1
//     // // new Ball(new window.Vector2(1022 * offsetX, 371),Color.yellow),//1
//     // new Ball(new window.Vector2(1056 * offsetX, 393 * offsetY),Color.yellow),//2
//     // new Ball(new window.Vector2(1090 * offsetX, 452 * offsetY),Color.yellow),//6
//     // new Ball(new window.Vector2(1126 * offsetX, 354 * offsetY),Color.yellow),//7
//     // new Ball(new window.Vector2(1126 * offsetX, 433 * offsetY),Color.yellow),//9
//     // new Ball(new window.Vector2(1162 * offsetX, 413 * offsetY),Color.yellow),//13
//     // new Ball(new window.Vector2(1162 * offsetX, 491 * offsetY),Color.yellow)//15
//     ];

//     this.whiteBall = new Ball(new window.Vector2(413, 413),Color.white);
//     // this.whiteBall = new Ball(new window.Vector2(720, 513),Color.white);
//     this.blackBall = new Ball(new window.Vector2(1090 * offsetX, 413 * offsetY),Color.black);
//     // this.blackBall = new Ball(new window.Vector2(413 * offsetX, 1090 * offsetY),Color.black);

//     this.balls = [
//     this.yellowBalls[0],
//     this.yellowBalls[1],
//     this.redBalls[0],
//     this.redBalls[1],
//     this.blackBall,
//     this.yellowBalls[2],
//     this.yellowBalls[3],
//     this.redBalls[2],
//     this.yellowBalls[4],
//     this.redBalls[3],
//     this.redBalls[4],
//     this.redBalls[5],
//     this.yellowBalls[5],
//     this.redBalls[6],
//     this.yellowBalls[6],
//     this.whiteBall]

//     this.stick = new Stick({ x : 413, y : 413 });
//     // this.stick = new Stick({ x : 720, y : 513 });

//     this.gameOver = false;
// }

// GameWorld.prototype.getBallsSetByColor = function(color){
//     if(color === Color.red || color == "even"){
//         return this.redBalls;
//     }
//     if(color === Color.yellow || color == "odd"){
//         return this.yellowBalls;
//     }
//     if(color === Color.white){
//         return this.whiteBall;
//     }
//     if(color === Color.black){
//         return this.blackBall;
//     }
// }

// GameWorld.prototype.handleInput = function (delta) {
//     // const isTurn = window.Game.policy.turn == window.Game.playerNumber;

//     this.stick.handleInput(delta);
// };

// GameWorld.prototype.handleCaster = function (ball, delta) {
//   // 1126 354
  
//   const caster = this.stick.caster;

//   const lineStart = {
//     x: caster.position.x,
//     y: caster.position.y,
//   }

//   const x2 = (lineStart.x + caster.width) * Math.cos(caster.rotation);
//   const y2 = (lineStart.y + caster.height) * Math.sin(caster.rotation);
  
//   const lineEnd = {
//     x: x2,
//     y: y2,
//   }

//   const p1 = {
//     x: caster.position.x,
//     y: caster.position.y,
//   }
//   // const p1 = {
//   //   x: caster.position.x - caster.origin.x,
//   //   y: caster.position.y - caster.origin.y,
//   // }

//   const p2 = {
//     x: ball.position.x,
//     y: ball.position.y,
//   }

//   const dx = p2.x - p1.x;
//   const dy = p2.y - p1.y;

//   // 436
//   const distance = Math.hypot(dx, dy);

//   if(distance > caster.width) return;
 
//   const cosAngle = Math.cos(caster.rotation);
//   const sinAngle = Math.sin(caster.rotation);

//   const testX = distance * cosAngle;
//   const testY = distance * sinAngle;

//   const rayCastX = caster.position.x + testX;
//   const rayCastY = caster.position.y + testY;

//   const circlePointDx = rayCastX - p2.x;
//   const circlePointDy = rayCastY - p2.y;

//   const circlePointMag = Math.sqrt(Math.pow(circlePointDx, 2) + Math.pow(circlePointDy, 2))

//   if(circlePointMag < window.BALL_SIZE / 2) {
//     if(!caster.collided) caster.collided = true;

//     const newDx = p2.x - p1.x;
//     const newDy = p2.y - p1.y;

//     const newDistance = Math.hypot(newDx, newDy);

//     const projectionX = newDistance * cosAngle;
//     const projectionY = newDistance * sinAngle;

//     const subFactorX = cosAngle * 45;
//     const subFactorY = sinAngle * 45;

//     const rayCastX = caster.position.x + (projectionX - subFactorX);
//     const rayCastY = caster.position.y + (projectionY - subFactorY);

//     // console.log(newDistance, distance);
    
//     caster.projection.position.x = rayCastX;
//     caster.projection.position.y = rayCastY;

//     caster.width = distance;
//     // caster.width = newDistance;

//     // console.log(p2.x, caster.projection.position.x);

//     /* const adjacent = p2.x - caster.projection.position.x;
//     const opposite = p2.y - caster.projection.position.y; */
//     const adjacent = p2.x - caster.projection.position.x;
//     const opposite = p2.y - caster.projection.position.y;

//     let ballRotation = Math.atan2(opposite, adjacent);

//     // console.log(opposite, adjacent);

//     // console.log(ballRotation * 180 / Math.PI);
//     // console.log(ballRotation * 180 / Math.PI);

//     // console.log(p2.x, p2.y);

//     caster.result.position.x = p2.x;
//     caster.result.position.y = p2.y;
  
//     /* const radFactor = circlePointMag / (window.BALL_SIZE / 2);
    
//     const ballProjectionX = Math.cos(radFactor * ballRotation);
//     const ballProjectionY = Math.sin(radFactor * ballRotation);

//     caster.result.position.x += 30 * ballProjectionX
//     caster.result.position.y += 30 * ballProjectionY */
    
//     caster.result.width = 30;
//     // caster.result.rotation = Math.atan2(p2.y - caster.result.position.y, p2.x - caster.result.position.x);
//     caster.result.rotation = ballRotation;
//   }
//   else {
//     // caster.width = 1500;
//     // console.log("not");
//   }
// }


// GameWorld.prototype.update = function (delta) {
//     this.stick.update(delta);

//     for (let i = 0 ; i < this.balls.length; i++){
//         for(let j = i + 1 ; j < this.balls.length ; j++){
//             this.handleCollision(this.balls[i], this.balls[j], delta);
//         }
//     }

//     for (let i = 0 ; i < this.balls.length; i++) {
//         this.balls[i].update(delta);
//         if(this.balls[i].color != Color.white) this.handleCaster(this.balls[i], delta);
//     }

//     if(!this.ballsMoving() && AI.finishedSession){
//         window.Game.policy.updateTurnOutcome();   
//         if(window.Game.policy.foul || window.Game.policy.firstPlay){
//             this.ballInHand();
//         }
//     }

// };

// GameWorld.prototype.notDown = function() {
//     if(window.Game.policy.firstPlay) {
//         this.whiteBall.position.y = Mouse.position.y;
//         if(Mouse.position.x <= 413 && Mouse.position.x >= 0) {
//             this.whiteBall.position.x = Mouse.position.x;
//         }
//     }
//     else {
//         this.whiteBall.position = Mouse.position;
//     }
// }

// GameWorld.prototype.isDown = function() {
//     let ballsOverlap = this.whiteBallOverlapsBalls();

//     if(!window.Game.policy.isOutsideBorder(Mouse.position,this.whiteBall.origin) &&
//         !window.Game.policy.isInsideHole(Mouse.position) &&
//         !ballsOverlap){
//         window.KEYBOARD_INPUT_ON = true;
//         Keyboard.reset();
//         Mouse.reset();
//         if(window.Game.policy.firstPlay) {
//             window.Game.policy.firstPlay = false;
//             this.whiteBall.position.y = Mouse.position.y;
//         }
//         else {
//             this.whiteBall.position = Mouse.position;
//         }
//         this.whiteBall.inHole = false;
//         window.Game.policy.foul = false;
//         this.stick.position = this.whiteBall.position;
//         this.stick.visible = true;
//     }
// }

// GameWorld.prototype.ballInHand = function(){

//     // const isTurn = window.Game.policy.turn == window.Game.playerNumber;
//   // console.log("in hand");
//   // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     if(window.AI_ON && window.Game.policy.turn === window.AI_PLAYER_NUM){
//         return;
//     }

//     window.KEYBOARD_INPUT_ON = false;
//     this.stick.visible = false;
//     // console.log(Mouse.left.down);

//     // console.log("is My Turn???", window.Game.isTurn(), window.Game.policy.turn, window.Game.playerNumber);

//     if(window.Game.isTurn()) {
//         if(!Mouse.left.down){
//             this.notDown();
//         }
//         else{
//             this.isDown();
//         }

//         const x = this.whiteBall.position.x
//         const y = this.whiteBall.position.y

//         window.Game.socket.emit('first_play', window.Game.roomID, x, y, Mouse.left.down);
//     }
//     else {
//         Mouse.position.x = window.Game.packetData.mouseX;
//         Mouse.position.y = window.Game.packetData.mouseY;
//         Mouse.left.down = window.Game.packetData.mouseLeftDown;

//         // console.log("receiving first play packet", Mouse.left.down);

//         if(!Mouse.left.down){
//             this.notDown();
//         }
//         else {
//             this.isDown();
//         }

//         Mouse.left.down = false;
//     }

// }

// GameWorld.prototype.whiteBallOverlapsBalls = function(){

//     let ballsOverlap = false;
//     for (let i = 0 ; i < this.balls.length; i++) {
//         if(this.whiteBall !== this.balls[i]){
//             if(this.whiteBall.position.distanceFrom(this.balls[i].position)<window.BALL_SIZE){
//                 ballsOverlap = true;
//             }
//         }
//     }

//     return ballsOverlap;
// }

// GameWorld.prototype.ballsMoving = function(){

//     let ballsMoving = false;

//     for (let i = 0 ; i < this.balls.length; i++) {
//         if(this.balls[i].moving){
//             ballsMoving = true;
//         }
//     }

//     return ballsMoving;
// }

// GameWorld.prototype.handleCollision = function(ball1, ball2, delta){

//     if(ball1.inHole || ball2.inHole)
//         return;

//     if(!ball1.moving && !ball2.moving)
//         return;

//     let ball1NewPos = ball1.position.add(ball1.velocity.multiply(delta));
//     let ball2NewPos = ball2.position.add(ball2.velocity.multiply(delta));

//     let dist = ball1NewPos.distanceFrom(ball2NewPos);

//     if(dist<window.BALL_SIZE){
//         window.Game.policy.checkColisionValidity(ball1, ball2);

//         let power = (Math.abs(ball1.velocity.x) + Math.abs(ball1.velocity.y)) + 
//                     (Math.abs(ball2.velocity.x) + Math.abs(ball2.velocity.y));
//         power = power * 0.00482;

//         if(window.Game.sound && window.SOUND_ON){
//             let ballsCollide = sounds.ballsCollide.cloneNode(true);
//             ballsCollide.volume = (power/(20))<1?(power/(20)):1;
//             ballsCollide.play();
//         }

//         let opposite = ball1.position.y - ball2.position.y;
//         let adjacent = ball1.position.x - ball2.position.x;
//         let rotation = Math.atan2(opposite, adjacent);

//         // console.log(rotation);
//         // console.log(opposite, adjacent);

//         // console.log(ball1.position.x, ball2.position.x, ball1.position.y, ball2.position.y);
//         // console.log(this.stick.caster.projection.position.x, this.stick.caster.projection.position.y);
//         // console.log(ball1.color);

//         ball1.moving = true;
//         ball2.moving = true;

//         let velocity2 = new window.Vector2(90*Math.cos(rotation + Math.PI)*power,90*Math.sin(rotation + Math.PI)*power);
//         ball2.velocity = ball2.velocity.addTo(velocity2);
//         // console.log("velocity 2", velocity2);

//         ball2.velocity.multiplyWith(0.97);

//         let velocity1 = new window.Vector2(90*Math.cos(rotation)*power,90*Math.sin(rotation)*power);
//         // console.log("ball 1 initial v", ball1.velocity);
//         ball1.velocity = ball1.velocity.addTo(velocity1);

//         // const vec = velocity1.copy();

//         // vec.normalize();

//         // console.log("velocity 1", vec.x, vec.y);

//         ball1.velocity.multiplyWith(0.97);
//     }
//     else {
//       // if no collision occurs
//       window.Game.policy.firstCollision = false
//     }

// }

// GameWorld.prototype.draw = function () {
//     // Canvas2D.drawImage(sprites.background, new window.Vector2(1490, 0), undefined, 0.9, undefined);
//     // console.log(window.Game.size);
//     const newX = 76.271186440677966101694915254235;
//     const newY = 41.949152542372881355932203389829;

//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     let rotation = isMobile ? 90 * Math.PI / 180 : undefined;
//     let scale = isMobile ? 1.2 : 1;

//     // 1500 x 825

//     // Canvas2D.drawImage(sprites.background, new window.Vector2((1500 / 2) + 500, newY), rotation, scale, new window.Vector2(0, 0));
//     if(isMobile) {
//       // Canvas2D.drawImage(sprites.background, new window.Vector2((window.Game.size.x / 2) + (sprites.background.height / 2), 0), rotation, 1, new window.Vector2(0, 0));
//       Canvas2D.drawImage(sprites.background, undefined, undefined, 1, undefined);
//     }
//     else {
//       Canvas2D.drawImage(sprites.background, undefined, undefined, 1, undefined);
//     }
//     window.Game.policy.drawScores();

//     for (let i = 0; i < this.balls.length; i++) {
//         this.balls[i].draw();
//     }

//     this.stick.draw();
// };

// GameWorld.prototype.reset = function () {
//     this.gameOver = false;

//     for (let i = 0; i < this.balls.length; i++) {
//         this.balls[i].reset();
//     }

//     this.stick.reset();

//     if(window.AI_ON && window.AI_PLAYER_NUM === 0){
//         AI.startSession();
//     }
// };

// GameWorld.prototype.initiateState = function(balls){
    
//     for (let i = 0; i < this.balls.length; i++) {
//         this.balls[i].position.x = balls[i].position.x;
//         this.balls[i].position.y = balls[i].position.y;
//         this.balls[i].visible = balls[i].visible;
//         this.balls[i].inHole = balls[i].inHole;
//     }

//     this.stick.position = this.whiteBall.position;
// }

// // export default GameWorld;
// window.GameWorld = GameWorld;



// // import socket from "../socket";

// let sprites = {};
// let sounds = {};

// const stillLoading = document.createElement('div');

// stillLoading.innerHTML = `
//     <h2>Loading Assets</h2>
// `;

// stillLoading.style.position = "absolute"
// stillLoading.style.width = "100vw";
// stillLoading.style.height = "100vh";
// stillLoading.style.backgroundColor = "white";
// stillLoading.style.top = "0";
// stillLoading.style.color = "black";
// stillLoading.style.zIndex = "100";

// let requestAnimationFrame = (function () {
//     return  window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         function (callback) {
//             window.setTimeout(callback, 1000 / 60);
//         };
// })();

// function Game_Singleton() {
//     this.size = undefined;
//     this.spritesStillLoading = 0;
//     this.gameWorld = undefined;
//     this.sound = true;
//     this.playerNumber = 0;
//     this.mainMenu = new Menu();
//     this.roomID = '';

//     // this.dev = 'http://localhost:3000/snooker';
//     // // this.dev = 'http://127.0.0.1:3000/snooker';
//     // // this.dev = 'http://192.168.8.100:3000/snooker';
//     // this.prod = 'https://new-server-ozkr.onrender.com/snooker';

//     // this.url = this.dev
//     // this.url = this.prod

//     // this.socket = io(this.url, {
//     //     autoConnect: false
//     // })

//     this.username = '';
//     this.avatar = '';

//     this.socket = socket

//     this.packetData = {
//         rotation: 0,
//         w: false,
//         s: false,
//         keyInput: false,
//         power: 0,
//         leftDown: false,
//         space: false,
//         mouseX: 0,
//         mouseY: 0,
//         mouseLeftDown: false,
//         originX: 970,
//         mobilePower: 0
//     }
// }

// Game_Singleton.prototype.start = function (divName, canvasName, x, y, username, avatar) {
//     this.username = username;
//     this.avatar = avatar
//     this.size = new window.Vector2(x,y);
//     Canvas2D.initialize(divName, canvasName);
//     document.body.appendChild(stillLoading);
//     console.log("appended stillLoading");
//     this.loadAssets();
//     this.assetLoadingLoop();
//     // window.notStarted = false
// };

// Game_Singleton.prototype.initialize = function () {
//     this.gameWorld = new GameWorld();
//     this.policy = new GamePolicy();
    
//     // this.initMenus();

//     AI.init(this.gameWorld, this.policy);

//     window.AI_ON = false;
//     Game.mainMenu.active = false;
//     window.GAME_STOPPED = false;
//     setTimeout(Game.startNewGame,200);
//     // sounds.fadeOut(Game.mainMenu.sound);
// };

// Game_Singleton.prototype.initMenus = function(inGame){

//     let labels = generateMainMenuLabels("Classic 8-Ball");

//     let buttons = generateMainMenuButtons(inGame);

//     this.mainMenu.init
//     (
//         sprites.mainMenuBackground,
//         labels,
//         buttons,
//         sounds.jazzTune
//     );
// }

// Game_Singleton.prototype.loadSprite = function (imageName) {
//     console.log("Loading sprite: " + imageName);
//     let image = new Image();
//     image.onload = function () {
//         console.log("image fully loaded", imageName);
//         Game.spritesStillLoading -= 1;
//     };

//     image.src = imageName;

//     this.spritesStillLoading += 1;
//     return image;
// };

// Game_Singleton.prototype.assetLoadingLoop = function () {
//     // console.log(Game.spritesStillLoading);
//     if (Game.spritesStillLoading > 0) {
//         // console.log("images still loading");
//         requestAnimationFrame(Game.assetLoadingLoop);
//     }
//     else {
//         console.log("images done loading");
//         document.body.removeChild(stillLoading);
//         console.log("remove stillLoading");
//         Game.initialize();
//         // window.notStarted = false
//         // requestAnimationFrame(this.mainMenu.load.bind(this.mainMenu));
//     }
// };

// Game_Singleton.prototype.handleInput = function(){

//     if(Keyboard.down(Keys.escape)){
//         window.GAME_STOPPED = true;
//         Game.initMenus(true);
//         requestAnimationFrame(Game.mainMenu.load.bind(this.mainMenu));
//     }
// }

// function getRoomID() {
//     const url = new URL(window.location)

//     const search = url.hash

//     const searchParams = new URLSearchParams(search)

//     const roomID = Array.from(searchParams.entries())[0][1]

//     console.log(url, Array.from(searchParams.entries()));

//     return roomID;
//     // const url = window.location

//     // const roomID = new URL(url).searchParams.get('id')

//     // return roomID;
// }

// function joinGame(socket, roomID, username, avatar) {
//     socket.emit('join_game', roomID, username, avatar)

//     Game.roomID = roomID;
// }

// // Game_Singleton.prototype.setOpponent = function(){
    
// // }

// // Game_Singleton.prototype.multiplayer.playTurn = function(socket) {
// // }

// Game_Singleton.prototype.startNewGame = function(){
//     Canvas2D._canvas.style.cursor = "auto";

//     Game.gameWorld = new GameWorld();
//     Game.policy = new GamePolicy();

//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     if (isMobile) {
//       Game.gameWorld.stick.trackMouse = false;
//       Game.gameWorld.stick.useJoystick = true;

//       Game.gameWorld.stick.chooseControl();

//       document.querySelector('#power').style.display = "unset";
//       document.querySelector('#base').style.display = "unset";
//     }

//     Canvas2D.clear();
//     // Canvas2D.drawImage(
//     //     sprites.controls, 
//     //     new window.Vector2(Game.size.x/2,Game.size.y/2), 
//     //     0, 
//     //     1, 
//     //     new window.Vector2(sprites.controls.width/2,sprites.controls.height/2)
//     // );

//     setTimeout(()=>{
//         AI.init(Game.gameWorld, Game.policy);

//         if(window.AI_ON && window.AI_PLAYER_NUM == 0){
//             AI.startSession();
//         }

//         // const dev = 'http://localhost:3000/snooker';
//         // const prod = '';

//         // const socket = io(dev, {
//         //     autoConnect: false
//         // })

//         // socket.connect();

//         Game.socket.connect();

//         const roomID = getRoomID();

//         joinGame(Game.socket, roomID, Game.username, Game.avatar);

//         Game.socket.once('joined_game', () => {
//             console.log("you joined game");

//             Game.playerNumber = 1;
//         })

//         Game.socket.once('start_game', (playerOneInfo, playerTwoInfo) => {
//             console.log("start game");
//             Game.mainLoop();
//             window.notStarted = false
//         })

//         Game.socket.on('stick_rotate', (rotation) => {
//             Game.packetData.rotation = rotation;
//         })

//         Game.socket.on('movement_input', (w, s, keyInput) => {
//             Game.packetData.w = w;
//             Game.packetData.s = s;
//             Game.packetData.keyInput = keyInput;
//         });

//         Game.socket.on('mobile_movement_input', (originX) => {
//             Game.packetData.originX = originX;
//         });

//         Game.socket.on('mobile_stick_strike', (power) => {
//             Game.packetData.mobilePower = power;
//         });

//         Game.socket.on('stick_strike', (power, leftDown, space) => {
//             Game.packetData.power = power;
//             Game.packetData.leftDown = leftDown;
//             Game.packetData.space = space;
//         });

//         Game.socket.on('first_play', (x, y, down) => {
//             Game.packetData.mouseX = x;
//             Game.packetData.mouseY = y;

//             Game.packetData.mouseLeftDown = down;
//         })

//         // Game.mainLoop();
//     }, 0);

//     // Game.gameWorld.handleCaster(Game.gameWorld.balls[0]);
// }

// Game_Singleton.prototype.continueGame = function(){
//     Canvas2D._canvas.style.cursor = "auto";

//     requestAnimationFrame(Game.mainLoop);
// }

// Game_Singleton.prototype.mainLoop = function () {
//     // console.log(Game.playerNumber);
    

//     if(window.DISPLAY && !window.GAME_STOPPED){
//         Game.gameWorld.handleInput(window.DELTA);
//         Game.gameWorld.update(window.DELTA);
//         Canvas2D.clear();
//         Game.gameWorld.draw();
//         Mouse.reset();
//         Game.handleInput();
//         requestAnimationFrame(Game.mainLoop);
//     }
// };

// Game_Singleton.prototype.isTurn = function () {
//     return Game.policy.turn == Game.playerNumber
// }

// let Game = new Game_Singleton();

// // export default Game;
// window.Game = Game;

// Game.loadAssets = function () {
//     let loadSprite = function (sprite) {
//         return Game.loadSprite("assets/sprites/" + sprite);
//     };

//      let loadSound = function (sound) {
//         return new Audio("assets/sounds/" + sound);
//     };

//     sprites.ball0 = loadSprite("balls/0.png");
//     sprites.ball1 = loadSprite("balls/1.png");
//     sprites.ball2 = loadSprite("balls/2.png");
//     sprites.ball3 = loadSprite("balls/3.png");
//     sprites.ball4 = loadSprite("balls/4.png");
//     sprites.ball5 = loadSprite("balls/5.png");
//     sprites.ball7 = loadSprite("balls/7.png");
//     sprites.ball8 = loadSprite("balls/8.png");
//     sprites.ball9 = loadSprite("balls/9.png");
//     sprites.ball10 = loadSprite("balls/10.png");
//     sprites.ball11 = loadSprite("balls/11.png");
//     sprites.ball12 = loadSprite("balls/12.png");
//     sprites.ball13 = loadSprite("balls/13.png");
//     sprites.ball14 = loadSprite("balls/14.png");

//     sprites.mainMenuBackground = loadSprite("main_menu_background.png");
//     sprites.background = loadSprite("spr_background4.png");
//     sprites.ball = loadSprite("spr_ball2.png");
//     sprites.redBall = loadSprite("spr_redBall2.png");
//     sprites.yellowBall = loadSprite("spr_yellowBall2.png");
//     sprites.blackBall = loadSprite("spr_blackBall2.png");
//     sprites.stick = loadSprite("spr_stick.png");
//     sprites.twoPlayersButton = loadSprite("2_players_button.png");
//     sprites.twoPlayersButtonHover = loadSprite("2_players_button_hover.png");
//     sprites.onePlayersButton = loadSprite("1_player_button.png");
//     sprites.onePlayersButtonHover = loadSprite("1_player_button_hover.png");
//     sprites.muteButton = loadSprite("mute_button.png");
//     sprites.muteButtonHover = loadSprite("mute_button_hover.png");
//     sprites.muteButtonPressed = loadSprite("mute_button_pressed.png");
//     sprites.muteButtonPressedHover = loadSprite("mute_button_pressed_hover.png");
//     sprites.easyButton = loadSprite("easy_button.png");
//     sprites.easyButtonHover = loadSprite("easy_button_hover.png");
//     sprites.mediumButton = loadSprite("medium_button.png");
//     sprites.mediumButtonHover = loadSprite("medium_button_hover.png");
//     sprites.hardButton = loadSprite("hard_button.png");
//     sprites.hardButtonHover = loadSprite("hard_button_hover.png");
//     sprites.backButton = loadSprite("back_button.png");
//     sprites.backButtonHover = loadSprite("back_button_hover.png");
//     sprites.continueButton = loadSprite("continue_button.png");
//     sprites.continueButtonHover = loadSprite("continue_button_hover.png");
//     sprites.insaneButton = loadSprite("insane_button.png");
//     sprites.insaneButtonHover = loadSprite("insane_button_hover.png");
//     sprites.aboutButton = loadSprite("about_button.png");
//     sprites.aboutButtonHover = loadSprite("about_button_hover.png");
//     sprites.controls = loadSprite("controls.png");

//     sounds.side = loadSound("Side.wav");
//     sounds.ballsCollide = loadSound("BallsCollide.wav");
//     sounds.strike = loadSound("Strike.wav");
//     sounds.hole = loadSound("Hole.wav");
    
//     // Bossa Antigua Kevin MacLeod (incompetech.com)
//     // Licensed under Creative Commons: By Attribution 3.0 License
//     // http://creativecommons.org/licenses/by/3.0/
//     sounds.jazzTune = loadSound("Bossa Antigua.mp3");
// }

// sounds.fadeOut = function(sound) {

//     let fadeAudio = setInterval(function () {

//         if(window.GAME_STOPPED)
//             return;

//         // Only fade if past the fade out point or not at zero already
//         if ((sound.volume >= 0.05)) {
//             sound.volume -= 0.05;
//         }
//         else{
//             sound.pause();
//             clearInterval(fadeAudio);
//         }
//     }, 400);
// }

// // export {sprites, sounds};
// window.sprites = sprites;
// window.sounds = sounds;


// const baseDiv = document.createElement("div");

// baseDiv.id = "base";

// const powerDiv = document.createElement("div");

// powerDiv.id = "power";

// baseDiv.appendChild(powerDiv);

// document.body.appendChild(baseDiv);
// // const powerDiv = document.querySelector("#power");

// // powerDiv.style.width = "700px"
// const maxMovePx = 500;
// const maxPower = 75;
// // const maxOriginX = 123;
// const maxOriginX = 4;
// let originalOriginX = 970;
// let x, y, moveX, moveY, prevMoveX;
// let power = 0;
// let originX = 0;

// window.powerHandleStart = function(e) {
//   if(window.Game.policy.turn != window.Game.playerNumber) return
// //   console.log(window.Game.policy.turn, window.Game.playerNumber);

//   console.log("touch start");
  
//   x = e.touches[0].pageX;
//   y = e.touches[0].pageY;

//   if(window.Game.policy.foul || window.Game.policy.firstPlay) {
//     Mouse.left.down = true;
//   }
// }

// window.powerHandleMove = function(e) {
//   if(window.Game.policy.turn != window.Game.playerNumber) return

//   prevMoveX = moveX;

//   moveX = (x - e.touches[0].pageX);
//   moveY = (y - e.touches[0].pageY);

//   // x = e.touches[0].pageX;
//   // y = e.touches[0].pageY;

//   if(moveX > 0 && moveX <= maxMovePx) {
//     // console.log(prevMoveX, moveX);
//     // console.log(moveX);
//     powerDiv.style.translate = `${moveX * -1}px 0`;

//     if(prevMoveX > moveX) {
//       // console.log("right");
//       window.Game.gameWorld.stick.origin.x -= 2;
//     }
//     else {
//       // console.log("left");
//       window.Game.gameWorld.stick.origin.x += 2;
//     }
//     // console.log(originX);

//     // window.Game.gameWorld.stick.origin.x += originX;
//     // window.Game.gameWorld.stick.origin.x = originX;
//   }
//   else if(moveX <= 0) {
//     moveX = 0;
//     window.Game.gameWorld.stick.origin.x = originalOriginX
//   }

//   window.Game.socket.emit('mobile_movement_input', window.Game.roomID, window.Game.gameWorld.stick.origin.x);

//   // console.log(moveX);


//   // console.log(moveX);
// }

// window.powerHandleEnd = function(e) {
//   // console.log(moveX);
//   if(window.Game.policy.turn != window.Game.playerNumber) return

//   if(moveX > 0) {
//     power = moveX > maxMovePx ? maxPower : (moveX / maxMovePx) * maxPower;
//     // originX = moveX > maxMovePx ? maxOriginX : (moveX / maxMovePx) * maxOriginX;

//     window.Game.gameWorld.stick.power = power;
//     // window.Game.gameWorld.stick.origin.x = originX;
//     // handleMouseDown({which: 1})
//     // handleMouseUp({which: 1})
//     // console.log(window.Game.gameWorld.stick);
//     // console.log(power, originX);
//     let mousedownEvent = new MouseEvent('mousedown', {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//         which: 1
//     });

//     document.dispatchEvent(mousedownEvent);

//     let mouseupEvent = new MouseEvent('mouseup', {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//         which: 1
//     });

//     setTimeout(() => {
//       document.dispatchEvent(mouseupEvent);
//     }, 1000)

//     window.Game.socket.emit('mobile_stick_strike', window.Game.roomID, power)
//   }

//   x = 0;
//   y = 0;

//   powerDiv.style.translate = `${x}px 0`;
// }

// powerDiv.addEventListener("touchstart", (e) => {
//   window.powerHandleStart(e);
// })

// powerDiv.addEventListener("touchmove", (e) => {
//   window.powerHandleMove(e);
// })

// powerDiv.addEventListener("touchend", (e) => {
//   window.powerHandleEnd(e);
// })

// window.JoyStick = JoyStick;


// import './script/Assets.js'

function Snooker(props) {

    const [playerInfo, setPlayerInfo] = useState({
        playerOneInfo: {
            username: '',
            socketID: '',
            avatar: ''
        },
        playerTwoInfo: {
            username: '',
            socketID: '',
            avatar: ''
        }
    })
    const [playerTurn, setPlayerTurn] = useState(0);

    // console.log(Game);
    // useScript('../src/components/games/snooker/script/lib/LAB.min.js');

    console.log("YH");

    // console.log($LAB);
    useEffect(() => {
        let Keys = {
            none: 0,
            back: 8,
            tab: 9,
            enter: 13,
            pause: 19,
            escape: 27,
        
            space: 32,
        
            pageUp: 33,
            pageDown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
        
            insert: 45,
            del: 46,
        
            d0: 48,
            d1: 49,
            d2: 50,
            d3: 51,
            d4: 52,
            d5: 53,
            d6: 54,
            d7: 55,
            d8: 56,
            d9: 57,
        
            A: 65,     B: 66,      C: 67,      D: 68,       E: 69,      F: 70,
            G: 71,     H: 72,      I: 73,      J: 74,       K: 75,      L: 76,
            M: 77,     N: 78,      O: 79,      P: 80,       Q: 81,      R: 82,
            S: 83,     T: 84,      U: 85,      V: 86,       W: 87,      X: 88,
            Y: 89,     Z: 90,
        
            multiply: 42,
            add: 43,
            subtract: 45,
            decimal: 46,
            divide: 47
        };
        
        window.Keys = Keys;
        
        // import './script/system/Color.js';
        let Color = {
            "0": "0",
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "14": "14",
            "15": "15",
            aliceBlue: "#F0F8FF",
            antiqueWhite: "#FAEBD7",
            aqua: "#00FFFF",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedAlmond: "#FFEBCD",
            blue: "#0000FF",
            blueViolet: "#8A2BE2",
            brown: "#A52A2A",
            burlyWood: "#DEB887",
            cadetBlue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerBlue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkBlue: "#00008B",
            darkCyan: "#008B8B",
            darkGoldenrod: "#B8860B",
            darkGray: "#A9A9A9",
            darkGreen: "#006400",
            darkKhaki: "#BDB76B",
            darkMagenta: "#8B008B",
            darkOliveGreen: "#556B2F",
            darkOrange: "#FF8C00",
            darkOrchid: "#9932CC",
            darkRed: "#8B0000",
            darkSalmon: "#E9967A",
            darkSeaGreen: "#8FBC8B",
            darkSlateBlue: "#483D8B",
            darkSlateGray: "#2F4F4F",
            darkTurquoise: "#00CED1",
            darkViolet: "#9400D3",
            deepPink: "#FF1493",
            deepSkyBlue: "#00BFFF",
            dimGray: "#696969",
            dodgerBlue: "#1E90FF",
            firebrick: "#B22222",
            floralWhite: "#FFFAF0",
            forestGreen: "#228B22",
            fuchsia: "#FF00FF",
            gainsboro: "#DCDCDC",
            ghostWhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            gray: "#808080",
            green: "#008000",
            greenYellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotPink: "#FF69B4",
            indianRed: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderBlush: "#FFF0F5",
            lawnGreen: "#7CFC00",
            lemonChiffon: "#FFFACD",
            lightBlue: "#ADD8E6",
            lightCoral: "#F080FF",
            lightCyan: "#E0FFFF",
            lightGoldenrodYellow: "#FAFAD2",
            lightGray: "#D3D3D3",
            lightGreen: "#90EE90",
            lightPink: "#FFB6C1",
            lightSalmon: "#FFA07A",
            lightSeaGreen: "#20B2AA",
            lightSkyBlue: "#87CEFA",
            lightSlateGray: "#778899",
            lightSteelBlue: "#B0C4DE",
            lightYellow: "#FFFFE0",
            lime: "#00FF00",
            limeGreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            maroon: "#800000",
            mediumAquamarine: "#66CDAA",
            mediumBlue: "#0000CD",
            mediumOrchid: "#BA55D3",
            mediumPurple: "#9370DB",
            mediumSeaGreen: "#3CB371",
            mediumSlateBlue: "#7B68EE",
            mediumSpringGreen: "#00FA9A",
            mediumTurquoise: "#48D1CC",
            mediumVioletRed: "#C71585",
            midnightBlue: "#191970",
            mintCream: "#F5FFFA",
            mistyRose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajoWhite: "#FFDEAD",
            navy: "#000080",
            oldLace: "#FDF5E6",
            olive: "#808000",
            oliveDrab: "#6B8E23",
            orange: "#FFA500",
            orangeRed: "#FF4500",
            orchid: "#DA70D6",
            paleGoldenrod: "#EEE8AA",
            paleGreen: "#98FB98",
            paleTurquoise: "#AFEEEE",
            paleVioletRed: "#DB7093",
            papayaWhip: "#FFEFD5",
            peachPuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderBlue: "#B0E0E6",
            purple: "#800080",
            red: "#FF0000",
            rosyBrown: "#BC8F8F",
            royalBlue: "#4169E1",
            saddleBrown: "#8B4513",
            salmon: "#FA8072",
            sandyBrown: "#F4A460",
            seaGreen: "#2E8B57",
            seaShell: "#FFF5EE",
            sienna: "#A0522D",
            silver: "#C0C0C0",
            skyBlue: "#87CEEB",
            slateBlue: "#6A5ACD",
            slateGray: "#708090",
            snow: "#FFFAFA",
            springGreen: "#00FF7F",
            steelBlue: "#4682B4",
            tan: "#D2B48C",
            teal: "#008080",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            white: "#FFFFFF",
            whiteSmoke: "#F5F5F5",
            yellow: "#FFFF00",
            yellowGreen: "#9ACD32"
        }; 
        
        // export default Color;
        window.Color = Color;
        
        // import './script/geom/Vector2.js';
        
        function Vector2(x, y) {
            this.x = typeof x !== 'undefined' ? x : 0;
            this.y = typeof y !== 'undefined' ? y : 0;
        }
        
        Object.defineProperty(Vector2, "zero",
            {
                get: function () {
                    return new Vector2();
                }
            });
        
        Object.defineProperty(Vector2.prototype, "isZero",
            {
                get: function () {
                    return this.x === 0 && this.y === 0;
                }
            });
        
        Object.defineProperty(Vector2.prototype, "length",
            {
                get: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }
            });
        
        Vector2.prototype.addTo = function (v) {
            if (v.constructor === Vector2) {
                this.x += v.x;
                this.y += v.y;
            }
            else if (v.constructor === Number) {
                this.x += v;
                this.y += v;
            }
            return this;
        };
        
        Vector2.prototype.add = function (v) {
            let result = this.copy();
            return result.addTo(v);
        };
        
        Vector2.prototype.subtractFrom = function (v) {
            if (v.constructor === Vector2) {
                this.x -= v.x;
                this.y -= v.y;
            }
            else if (v.constructor === Number) {
                this.x -= v;
                this.y -= v;
            }
            return this;
        };
        
        Vector2.prototype.subtract = function (v) {
            let result = this.copy();
            return result.subtractFrom(v);
        };
        
        Vector2.prototype.divideBy = function (v) {
            if (v.constructor === Vector2) {
                this.x /= v.x;
                this.y /= v.y;
            }
            else if (v.constructor === Number) {
                this.x /= v;
                this.y /= v;
            }
            return this;
        };
        
        Vector2.prototype.divide = function (v) {
            let result = this.copy();
            return result.divideBy(v);
        };
        
        Vector2.prototype.multiplyWith = function (v) {
            if (v.constructor === Vector2) {
                this.x *= v.x;
                this.y *= v.y;
            }
            else if (v.constructor === Number) {
                this.x *= v;
                this.y *= v;
            }
            return this;
        };
        
        Vector2.prototype.multiply = function (v) {
            let result = this.copy();
            return result.multiplyWith(v);
        };
        
        Vector2.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ")";
        };
        
        Vector2.prototype.normalize = function () {
            let length = this.length;
            if (length === 0)
                return;
            this.divideBy(length);
        };
        
        Vector2.prototype.copy = function () {
            return new Vector2(this.x, this.y);
        };
        
        Vector2.prototype.equals = function (obj) {
            return this.x === obj.x && this.y === obj.y;
        };
        
        Vector2.prototype.distanceFrom = function(obj){
            return Math.sqrt((this.x-obj.x)*(this.x-obj.x) + (this.y-obj.y)*(this.y-obj.y));
        }
        
        // export default Vector2;
        window.Vector2 = Vector2;
        
        // import './script/input/ButtonState.js';
        function ButtonState() {
            this.down = false;
            this.pressed = false;
        }
        
        // export default ButtonState;
        window.ButtonState = ButtonState;
        
        // import './script/input/Keyboard.js';
        window.notStarted = true;
        
        // import window.Game from "../window.Game.js";
        // import ButtonState from "../input/ButtonState.js"
        
        function handleKeyDown(evt) {
            if(window.notStarted) return
        
            if(window.Game.policy.turn == window.Game.playerNumber) {
                let code = evt.keyCode;
                if (code < 0 || code > 255)
                    return;
                if (!Keyboard._keyStates[code].down)
                    Keyboard._keyStates[code].pressed = true;
                Keyboard._keyStates[code].down = true;
            }
        }
        
        function handleKeyUp(evt) {
            if(window.notStarted) return
            
            if(window.Game.policy.turn == window.Game.playerNumber) {
                let code = evt.keyCode;
                if (code < 0 || code > 255)
                    return;
                Keyboard._keyStates[code].down = false;
            }
        }
        
        function Keyboard_Singleton() {
            // console.log("YH", Keys)
            this._keyStates = [];
            for (let i = 0; i < 256; ++i)
                this._keyStates.push(new ButtonState());
            document.onkeydown = handleKeyDown;
            document.onkeyup = handleKeyUp;
        }
        
        Keyboard_Singleton.prototype.reset = function () {
            for (let i = 0; i < 256; ++i)
                this._keyStates[i].pressed = false;
        };
        
        Keyboard_Singleton.prototype.pressed = function (key) {
            return this._keyStates[key].pressed;
        };
        
        Keyboard_Singleton.prototype.down = function (key) {
            return this._keyStates[key].down;
        };
        
        let Keyboard = new Keyboard_Singleton();
        
        // export default Keyboard;
        window.Keyboard = Keyboard;
        
        // import './script/input/Mouse.js';
        function handleMouseMove(evt) {
            if(window.notStarted) return
        
            if(window.Game.policy.turn == window.Game.playerNumber) {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if(isMobile) {
                  let canvasScale = Canvas2D.scale;
                  const widthToUse = Canvas2D._div.getBoundingClientRect().width;
                  const heightToUse = Canvas2D._div.getBoundingClientRect().height;
        
                  const cWidthToUse = Canvas2D._canvas.getBoundingClientRect().width;
                  const cHeightToUse = Canvas2D._canvas.getBoundingClientRect().height;
        
                  const parentX = (widthToUse / 2) - (cWidthToUse / 2);
                  const parentY = (heightToUse / 2) - (cHeightToUse / 2);
        
                //   console.log(evt.pageX - parentX);
                //   console.log((evt.pageY - parentY));
              
                  // console.log(parentX, parentY);
                  // console.log(parentY);
                  // console.log(Canvas2D._canvas.clientWidth);
                  let canvasOffset = Canvas2D.offset;
                  // let mx = ((evt.pageX - parentY) / canvasScale.x) - Canvas2D._canvas.clientHeight;
                  // let my = (evt.pageY - parentX) / canvasScale.y;
                  // let mx = (evt.pageY - parentX) / canvasScale.y;
                  // let my = ((evt.pageX - parentY) / canvasScale.x) - Canvas2D._canvas.clientHeight;
                  let mx = (evt.pageY - parentY) / canvasScale.y;
                  let my = (((evt.pageX - parentX) - cWidthToUse) / canvasScale.x);
                  Mouse._position = new window.Vector2(Math.abs(mx), Math.abs(my));
        
                //   console.log(mx, evt.pageX - parentX, canvasScale.x, canvasScale.y);
                //   console.log(mx, my);
                }
                else {
                  let canvasScale = Canvas2D.scale;
                  let canvasOffset = Canvas2D.offset;
                  let mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
                  let my = (evt.pageY - canvasOffset.y) / canvasScale.y;
                  Mouse._position = new window.Vector2(mx, my);
                }
            }
        }
        
        function handleMouseDown(evt) {
            if(window.notStarted) return
        
            if(window.Game.policy.turn == window.Game.playerNumber) {
                handleMouseMove(evt);
            
                if (evt.which === 1) {
                    if (!Mouse._left.down)
                        Mouse._left.pressed = true;
                    Mouse._left.down = true;
                } else if (evt.which === 2) {
                    if (!Mouse._middle.down)
                        Mouse._middle.pressed = true;
                    Mouse._middle.down = true;
                } else if (evt.which === 3) {
                    if (!Mouse._right.down)
                        Mouse._right.pressed = true;
                    Mouse._right.down = true;
                }
            }
        }
        
        function handleMouseUp(evt) {
            if(window.notStarted) return
            
            if(window.Game.policy.turn == window.Game.playerNumber) {
                handleMouseMove(evt);
            
                if (evt.which === 1)
                    Mouse._left.down = false;
                else if (evt.which === 2)
                    Mouse._middle.down = false;
                else if (evt.which === 3)
                    Mouse._right.down = false;
            }
        }
        
        function Mouse_Singleton() {
            this._position = window.Vector2.zero;
            this._left = new ButtonState();
            this._middle = new ButtonState();
            this._right = new ButtonState();
            document.onmousemove = handleMouseMove;
            document.onmousedown = handleMouseDown;
            document.onmouseup = handleMouseUp;
        }
        
        Object.defineProperty(Mouse_Singleton.prototype, "left",
            {
                get: function () {
                    return this._left;
                }
            });
        
        Object.defineProperty(Mouse_Singleton.prototype, "middle",
            {
                get: function () {
                    return this._middle;
                }
            });
        
        Object.defineProperty(Mouse_Singleton.prototype, "right",
            {
                get: function () {
                    return this._right;
                }
            });
        
        Object.defineProperty(Mouse_Singleton.prototype, "position",
            {
                get: function () {
                    return this._position;
                }
            });
        
        Mouse_Singleton.prototype.reset = function () {
            this._left.pressed = false;
            this._middle.pressed = false;
            this._right.pressed = false;
        };
        
        Mouse_Singleton.prototype.containsMouseDown = function (rect) {
            return this._left.down && rect.contains(this._position);
        };
        
        Mouse_Singleton.prototype.containsMousePress = function (rect) {
            return this._left.pressed && rect.contains(this._position);
        };
        
        let Mouse = new Mouse_Singleton();
        
        // export default Mouse;
        window.Mouse = Mouse;
        
        // import './script/input/JoyStick.js';
        let JOYSTICK_DIV = null;
        
        function __init_joystick_div()
        {
            JOYSTICK_DIV = document.createElement('div');
            let div_style = JOYSTICK_DIV.style;
            div_style.background = 'rgba(255,255,255,0)';
            div_style.position = 'absolute';
            div_style.top = '0px';
            div_style.bottom = '0px';
            div_style.left = '0px';
            div_style.right = '0px';
            div_style.margin = '0px';
            div_style.padding = '0px';
            div_style.borderWidth = '0px';
            div_style.position = 'absolute';
            div_style.overflow = 'hidden';
            div_style.zIndex = '10000';
            document.body.appendChild( JOYSTICK_DIV );
        }
        let JoyStick = function( attrs ) {
            this.radius = attrs.radius || 50;
            this.inner_radius = attrs.inner_radius || this.radius / 2;
            this.x = attrs.x || 0;
            this.y = attrs.y || 0;
            this.mouse_support = attrs.mouse_support || true;
        
            if ( attrs.visible === undefined )
            {
                attrs.visible = true;
            }
        
            if ( attrs.visible )
            {
                this.__create_fullscreen_div();
            }
        };
        
        JoyStick.prototype.left = false;
        JoyStick.prototype.right = false;
        JoyStick.prototype.up = false;
        JoyStick.prototype.down = false;
        
        JoyStick.prototype.__is_up = function ( dx, dy )
        {
            if( dy >= 0 )
            {
                return false;
            }
            if( Math.abs(dx) > 2*Math.abs(dy) )
            {
                return false;
            }
            return true;
        };
        
        JoyStick.prototype.__is_down = function down( dx, dy )
        {
            if( dy <= 0 )
            {
                return false;
            }
            if( Math.abs(dx) > 2*Math.abs(dy) )
            {
                return false;
            }
            return true;	
        };
        
        JoyStick.prototype.__is_left = function( dx, dy )
        {
            if( dx >= 0 )
            {
                return false;
            }
            if( Math.abs(dy) > 2*Math.abs(dx) )
            {
                return false;
            }
            return true;	
        };
        
        JoyStick.prototype.__is_right = function( dx, dy )
        {
            if( dx <= 0 )
            {
                return false;
            }
            if( Math.abs(dy) > 2*Math.abs(dx) )
            {
                return false;
            }
            return true;	
        };
        
        JoyStick.prototype.__create_fullscreen_div = function()
        {
            if ( JOYSTICK_DIV === null )
            {
                __init_joystick_div();
            }
            this.div = JOYSTICK_DIV;
            ///////////////////////////////////////////
            this.base = document.createElement('span');
            let div_style = this.base.style;
            div_style.width = this.radius * 2 + 'px';
            div_style.height = this.radius * 2 + 'px';
            div_style.position = 'absolute';
            div_style.top = this.y - this.radius + 'px';
            div_style.left = this.x - this.radius + 'px';
            div_style.borderRadius = '50%';
            div_style.borderColor = 'rgba(200,200,200,0.5)';
            div_style.borderWidth = '1px';
            div_style.borderStyle = 'solid';
            this.div.appendChild( this.base );
            ///////////////////////////////////////////
            this.control = document.createElement('span');
            div_style = this.control.style;
            div_style.width = this.inner_radius * 2 + 'px';
            div_style.height = this.inner_radius * 2 + 'px';
            div_style.position = 'absolute';
            div_style.top = this.y - this.inner_radius + 'px';
            div_style.left = this.x - this.inner_radius + 'px';
            div_style.borderRadius = '50%';
            div_style.backgroundColor = 'rgba(200,200,200,0.3)';
            div_style.borderWidth = '1px';
            div_style.borderColor = 'rgba(200,200,200,0.8)';
            div_style.borderStyle = 'solid';
            this.div.appendChild( this.control );
            ///////////////////////////////////////////
            let self = this;
            // the event is binded in all the screen
            // to captures fast movements
            function touch_hander( evt )
            {
                let touch_obj = evt.changedTouches ? evt.changedTouches[0] : evt;
                // if ( self.mouse_support && !(touch_obj.buttons === 1) )
                // {
                // 	return;
                // }
                self.control.style.left = touch_obj.clientX - self.inner_radius + 'px';
                self.control.style.top = touch_obj.clientY - self.inner_radius + 'px';
        
                let dx = touch_obj.clientX - self.x;
                let dy = touch_obj.clientY - self.y;
                self.up = self.__is_up( dx, dy );
                self.down = self.__is_down( dx, dy );
                self.left = self.__is_left( dx, dy );
                self.right = self.__is_right( dx, dy );
            }
            function clear_flags()
            {
                self.left = false;
                self.right = false;
                self.up = false;
                self.down = false;
        
                self.control.style.top = self.y - self.inner_radius + 'px';
                self.control.style.left = self.x - self.inner_radius + 'px';
            }
            this.bind( 'touchmove', touch_hander );
            this.bind( 'touchstart', touch_hander );
            this.bind( 'touchend', clear_flags );
            if ( this.mouse_support )
            {
                this.bind( 'mousedown', touch_hander );
                this.bind( 'mousemove', touch_hander );
                this.bind( 'mouseup', clear_flags );
            }
        };
        JoyStick.prototype.bind = function( evt, func )
        {
            this.base.addEventListener( evt, func );
            this.control.addEventListener( evt, func );
        };
        
        /**
          attributes:
            x, y, func, mouse_support
          @param {{x, y, func, mouse_support}} attrs - attributes
        */
        let JoyStickButton = function( attrs )
        {
            this.radius = attrs.radius || 50;
            this.x = attrs.x || 0;
            this.y = attrs.y || 0;
            this.text = attrs.text||'';
            this.mouse_support = attrs.mouse_support||false;
            if ( JOYSTICK_DIV === null )
            {
                __init_joystick_div();
            }
            this.base = document.createElement('span');
            this.base.innerHTML = this.text;
            let div_style = this.base.style;
            div_style.width = this.radius * 2 + 'px';
            div_style.height = this.radius * 2 + 'px';
            div_style.position = 'absolute';
            div_style.top = this.y - this.radius + 'px';
            div_style.left = this.x - this.radius + 'px';
            div_style.borderRadius = '50%';
            div_style.backgroundColor = 'rgba(255,255,255,0.1)';
            div_style.borderWidth = '1px';
            div_style.borderColor = 'rgba(255,255,255,0.8)';
            div_style.borderStyle = 'solid';
            JOYSTICK_DIV.appendChild( this.base );
        
            if ( attrs.func )
            {
                if ( this.mouse_support )
                {
                    this.bind( 'mousedown', attrs.func );
                }
                this.bind( 'touchstart', attrs.func );
            }
        
            let self = this;
            function __over()
            {
                div_style.backgroundColor = 'rgba(255,255,255,0.3)';
            }
            function __leave()
            {
                div_style.backgroundColor = 'rgba(255,255,255,0.1)';
            }
            self.bind( 'touchstart', __over );
            self.bind( 'touchend', __leave );
            if ( this.mouse_support )
            {
                self.bind( 'mousedown', __over );
                self.bind( 'mouseup', __leave );
            }
        };
        JoyStickButton.prototype.bind = function( evt, func )
        {
            this.base.addEventListener( evt, func );
        };
        
        // export {JoyStick, JoyStickButton}
        window.JoyStick = JoyStick;
        window.JoyStickButton = JoyStickButton;
        
        let MyJoyStick = function() {
            this.x = 0;
            this.y = 0;
            this.moveX = 0;
            this.moveY = 0;
            this.prevMoveX = 0;
            this.prevMoveY = 0;
            this.deg = 0;
            this.active = false;
          };
          
          MyJoyStick.prototype.handleStart = function(e) {
            if(!window.Game.isTurn()) return;
          
            console.log("touch start");
            
            this.x = e.touches[0].pageX;
            this.y = e.touches[0].pageY;
          }
          
          /**
           * @param {{ initPos,position, origin, velocity, color, moving, visible, inHole}} whiteBall
           */
          
          MyJoyStick.prototype.handleMove = function(e, whiteBall) {
              if(!window.Game.isTurn()) return;
            let canvasScale = Canvas2D.scale;
            const widthToUse = Canvas2D._div.getBoundingClientRect().width;
            const heightToUse = Canvas2D._div.getBoundingClientRect().height;
          
            const cWidthToUse = Canvas2D._canvas.getBoundingClientRect().width;
            const cHeightToUse = Canvas2D._canvas.getBoundingClientRect().height;
          
            const parentX = (widthToUse / 2) - (cWidthToUse / 2);
            const parentY = (heightToUse / 2) - (cHeightToUse / 2);
          
            let mx = (e.touches[0].pageY - parentY) / canvasScale.y;
            let my = (((e.touches[0].pageX - parentX) - cWidthToUse) / canvasScale.x)
          
          //   console.log(mx, my);
          
            const p1 = {
              x: Math.abs(whiteBall.position.x),
              y: Math.abs(whiteBall.position.y)
            }
          
            const p2 = {
              x: Math.abs(mx),
              y: Math.abs(my)
            }
          
          
            // const angleDEG = (Math.atan2(p2.y - p1.y, p2.x - p1.x)) * 180 / Math.PI;
            const angleRAD = (Math.atan2(p2.y - p1.y, p2.x - p1.x));
          
            // console.log(angleRAD);
            // console.log(angleDEG);
          
            this.deg = angleRAD;
          
            this.active = true
          
            // this.moveX = (this.x - e.touches[0].pageX);
            // this.moveY = (this.y - e.touches[0].pageY);
          
            // let rads = Math.atan2(this.moveY, this.moveX);
            
            // const deg = rads * 180 / Math.PI;
            
            // this.deg = deg;
          
            // console.log(Mouse._position.x, Mouse._position.y);
            // console.log(e.touches[0].pageX, e.touches[0].pageY);
            // console.log(Math.abs(mx), Math.abs(my));
          
            // console.log(moveX, moveY);
            // console.log("moving");
          
            // this.x = e.touches[0].pageX
            // this.y = e.touches[0].pageY
            this.x = e.touches[0].pageX
            this.y = e.touches[0].pageY
          }
          
          // /**
          //  * @param {{ initPos,position, origin, velocity, color, moving, visible, inHole}} whiteBall
          //  */
          
          MyJoyStick.prototype.update = function(whiteBall) {
          
            // console.log(whiteBall.position.x, whiteBall.position.y, Mouse.position.x, Mouse.position.y);
            // this.active = true
          
            // console.log(this.moveX, this.prevMoveX);
            // if(this.moveX == this.prevMoveX) {
            //   this.deg = 0;
            // }
          
            
            // this.deg = deg;
          
            // this.x = e.touches[0].pageX
            // this.y = e.touches[0].pageY
          
            // this.prevMoveX = this.moveX;
            // this.prevMoveY = this.moveY;
          }
          
          MyJoyStick.prototype.addListeners = function() {
            const element = document.querySelector('canvas');
          
            // console.log("add listeners");
            document.body.addEventListener("contextmenu", (e) => e.preventDefault())
          
            window.addEventListener("contextmenu", (e) => e.preventDefault())
          
            element.addEventListener("touchstart", (e) => {
              if(!window.Game.isTurn()) return;
              e.stopPropagation();
          
              this.handleStart(e);
            }, false);
            element.addEventListener("touchmove", (e) => {
              if(!window.Game.isTurn()) return;
              e.stopPropagation();
          
              this.handleMove(e, window.Game.gameWorld.whiteBall);
            }, false);
            element.addEventListener("touchend", (e) => {
              if(!window.Game.isTurn()) return;
              this.active = false;
            }, false);
            
          
            // element.addEventListener("tou")
          }
          
          MyJoyStick.prototype.handleInput = function() {
            
          }
          
        
        // import './script/Global.js';
        // import './script/Canvas2D.js';
        function Canvas2D_Singleton() {
            this._canvas = null;
            this._canvasContext = null;
            this._canvasOffset = window.Vector2.zero;
        }
        
        Object.defineProperty(Canvas2D_Singleton.prototype, "offset",
            {
                get: function () {
                    return this._canvasOffset;
                }
            });
        
        Object.defineProperty(Canvas2D_Singleton.prototype, "scale",
            {
                get: function () {
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    // 3000 1418
                    if(isMobile) {
                      // console.log(window.Game.size.y, this._canvas.height);
                      // return new window.Vector2(this._canvas.height / window.Game.size.y, this._canvas.width / window.Game.size.x);
                      return new window.Vector2(this._canvas.width / window.Game.size.x,
                          this._canvas.height / window.Game.size.y);
                      // return new window.Vector2(this._canvas.height / window.Game.size.x,
                      //     this._canvas.width / window.Game.size.y);
                    }
                    else {
                      return new window.Vector2(this._canvas.width / window.Game.size.x,
                          this._canvas.height / window.Game.size.y);
                    }
                }
            });
        
        Canvas2D_Singleton.prototype.initialize = function (divName, canvasName) {
            this._canvas = document.getElementById(canvasName);
            this._div = document.getElementById(divName);
        
            if (this._canvas.getContext)
                this._canvasContext = this._canvas.getContext('2d');
            else {
                alert('Your browser is not HTML5 compatible.!');
                return;
            }
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
            if(isMobile) {
              window.onresize = Canvas2D_Singleton.prototype.resizeMobile;
              this.resizeMobile();
              // window.onresize = Canvas2D_Singleton.prototype.resize;
              // this.resize();
            }
            else {
              window.onresize = Canvas2D_Singleton.prototype.resize;
              this.resize();
            }
        };
        
        Canvas2D_Singleton.prototype.clear = function () {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        };
        
        Canvas2D_Singleton.prototype.resize = function () {
            let gameCanvas = Canvas2D._canvas;
            let gameArea = Canvas2D._div;
            let widthToHeight = window.Game.size.x / window.Game.size.y;
            let newWidth = window.innerWidth;
            let newHeight = window.innerHeight;
            let newWidthToHeight = newWidth / newHeight;
        
            // console.log(newWidth);
        
            if (newWidthToHeight > widthToHeight) {
                newWidth = newHeight * widthToHeight;
            } else {
                newHeight = newWidth / widthToHeight;
            }
            gameArea.style.width = newWidth + 'px';
            gameArea.style.height = newHeight + 'px';
        
            gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
            gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
            gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
            gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
        
            gameCanvas.width = newWidth;
            gameCanvas.height = newHeight;
        
            let offset = window.Vector2.zero;
            if (gameCanvas.offsetParent) {
                do {
                    offset.x += gameCanvas.offsetLeft;
                    offset.y += gameCanvas.offsetTop;
                } while ((gameCanvas = gameCanvas.offsetParent));
            }
            Canvas2D._canvasOffset = offset;
        };
        
        Canvas2D_Singleton.prototype.resizeMobile = function () {
            let gameCanvas = Canvas2D._canvas;
            let gameArea = Canvas2D._div;
            let widthToHeight = window.Game.size.x / window.Game.size.y;
            // let newWidth = window.Game.gameWorld == undefined ? window.innerWidth : window.innerWidth - 300;
            let newWidth = window.innerHeight;
            let newHeight = window.innerWidth;
            let newWidthToHeight = newWidth / newHeight;
        
            if (newWidthToHeight > widthToHeight) {
                newWidth = newHeight * widthToHeight;
            } else {
                newHeight = newWidth / widthToHeight;
            }
            gameArea.style.width = newWidth + 'px';
            gameArea.style.height = newHeight + 'px';
        
            gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
            gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
            gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
            gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
        
            gameCanvas.width = newWidth * 0.8;
            gameCanvas.height = newHeight * 0.8;
        
            let offset = window.Vector2.zero;
            if (gameCanvas.offsetParent) {
                do {
                    offset.x += gameCanvas.offsetLeft;
                    offset.y += gameCanvas.offsetTop;
                } while ((gameCanvas = gameCanvas.offsetParent));
            }
            Canvas2D._canvasOffset = offset;
        };
        
        Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
            let canvasScale = this.scale;
        
            position = typeof position !== 'undefined' ? position : window.Vector2.zero;
            rotation = typeof rotation !== 'undefined' ? rotation : 0;
            scale = typeof scale !== 'undefined' ? scale : 1;
            origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;
        
            this._canvasContext.save();
            this._canvasContext.scale(canvasScale.x, canvasScale.y);
            this._canvasContext.translate(position.x, position.y);
            this._canvasContext.rotate(rotation);
            this._canvasContext.drawImage(sprite, 0, 0,
                sprite.width, sprite.height,
                -origin.x * scale, -origin.y * scale,
                sprite.width * scale, sprite.height * scale);
            this._canvasContext.restore();
        };
        
        Canvas2D_Singleton.prototype.drawRect = function (width, height, position, rotation, scale, origin) {
            let canvasScale = this.scale;
        
            position = typeof position !== 'undefined' ? position : window.Vector2.zero;
            rotation = typeof rotation !== 'undefined' ? rotation : 0;
            scale = typeof scale !== 'undefined' ? scale : 1;
            origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;
        
            this._canvasContext.save();
            this._canvasContext.scale(canvasScale.x, canvasScale.y);
            this._canvasContext.translate(position.x, position.y);
            this._canvasContext.rotate(rotation);
            this._canvasContext.fillRect(-origin.x, -origin.y, width, height);
            this._canvasContext.restore();
        };
        
        Canvas2D_Singleton.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
            let canvasScale = this.scale;
        
            position = typeof position !== 'undefined' ? position : window.Vector2.zero;
            origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;
            color = typeof color !== 'undefined' ? color : Color.black;
            textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
            fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
            fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
        
            this._canvasContext.save();
            this._canvasContext.scale(canvasScale.x, canvasScale.y);
            this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
            this._canvasContext.textBaseline = 'top';
            this._canvasContext.font = fontsize + " " + fontname;
            this._canvasContext.fillStyle = color.toString();
            this._canvasContext.textAlign = textAlign;
            this._canvasContext.fillText(text, 0, 0);
            this._canvasContext.restore();
        };
        
        let Canvas2D = new Canvas2D_Singleton();
        
        // export default Canvas2D;
        window.Canvas2D = Canvas2D;
        
        // import './script/game_objects/Score.js';
        function Score(position){
            this.position = position;
            this.origin = new window.Vector2(47,82);
            this.value = 0;
        }
        
        Score.prototype.reset = function(){
            // this.position = position;
            this.origin = new window.Vector2(30,0);
            this.value = 0;
        };
        
        Score.prototype.draw = function () {
          Canvas2D.drawText(
              this.value, 
              this.position, 
              this.origin, 
              "#096834", 
              "top", 
              "Impact", 
              "200px"
            );
        };
        
        Score.prototype.drawLines = function (color) {
            
            for(let i=0; i<this.value; i++){
        
                let pos = this.position.add(new window.Vector2(i*15,0));
        
                Canvas2D.drawText(
                    "I", 
                    pos, 
                    this.origin, 
                    color, 
                    "top", 
                    "Arial", 
                    "20px"
                );
        
            }
          };
        
        Score.prototype.increment = function(){
            this.value++;
        };
        
        // export default Score;
        window.Score = Score;
        
        // import './script/game_objects/Ball.js';
        function Ball(initPos,color){
            this.initPos = initPos;
            this.position = initPos.copy();
            this.origin = new window.Vector2(25,25);
            this.velocity = window.Vector2.zero;
            this.color = color; 
            this.moving = false;
            this.visible = true;
            this.inHole = false;
        }
        
        Object.defineProperty(Ball.prototype, "color",
            {
                get: function(){
                    if(this.sprite == sprites.redBall){
                        return Color.red;
                    }
                    else if(this.sprite == sprites.yellowBall){
                        return Color.yellow;
                    }
                      else if(this.sprite == sprites.blackBall){
                        return Color.black;
                    }
                      else if(this.sprite == sprites.ball0) {return Color["0"]}
                      else if(this.sprite == sprites.ball1) {return Color["1"]}
                      else if(this.sprite == sprites.ball2) {return Color["2"]}
                      else if(this.sprite == sprites.ball3) {return Color["3"]}
                      else if(this.sprite == sprites.ball4) {return Color["4"]}
                      else if(this.sprite == sprites.ball5) {return Color["5"]}
                      else if(this.sprite == sprites.ball7) {return Color["7"]}
                      else if(this.sprite == sprites.ball8) {return Color["8"]}
                      else if(this.sprite == sprites.ball9) {return Color["9"]}
                      else if(this.sprite == sprites.ball10) {return Color["10"]}
                      else if(this.sprite == sprites.ball11) {return Color["11"]}
                      else if(this.sprite == sprites.ball12) {return Color["12"]}
                      else if(this.sprite == sprites.ball13) {return Color["13"]}
                      else if(this.sprite == sprites.ball14) {return Color["14"]}
                      // else if(this.sprite == sprites.ball15) {return Color["15"]}
                    else{
                        return Color.white;
                    }
                },
                set: function (value) {
                    if (value === Color.red){
                        this.sprite = sprites.redBall;
                    }
                    else if(value == Color.yellow){
                        this.sprite = sprites.yellowBall;
                    }
                    else if(value == Color["0"]) {
                      this.sprite = sprites.ball0;
                    }
                    else if(value == Color["2"]) this.sprite = sprites.ball2;
                    else if(value == Color["4"]) this.sprite = sprites.ball4;
                    else if(value == Color["8"]) this.sprite = sprites.ball8;
                    else if(value == Color["10"]) this.sprite = sprites.ball10;
                    else if(value == Color["12"]) this.sprite = sprites.ball12;
                    else if(value == Color["14"]) this.sprite = sprites.ball14;
        
                          else if(value == Color.black){
                        this.sprite = sprites.blackBall;
                    }
                    else if(value == Color["1"]) this.sprite = sprites.ball1;
                    else if(value == Color["3"]) this.sprite = sprites.ball3;
                    else if(value == Color["5"]) this.sprite = sprites.ball5;
                    else if(value == Color["7"]) this.sprite = sprites.ball7;
                    else if(value == Color["9"]) this.sprite = sprites.ball9;
                    else if(value == Color["11"]) this.sprite = sprites.ball11;
                    else if(value == Color["13"]) this.sprite = sprites.ball13;
                    else{
                        this.sprite = sprites.ball;
                    }
                }
            });
        
        Ball.prototype.shoot = function(power, angle){
            if(power <= 0)
                return;
        
            this.moving = true;
        
            this.velocity = calculateBallVelocity(power,angle);
        }
        
        let calculateBallVelocity = function(power, angle){
        
            return new window.Vector2(100*Math.cos(angle)*power,100*Math.sin(angle)*power);
        }
        
        Ball.prototype.update = function(delta){
        
            this.updatePosition(delta);
        
            this.velocity.multiplyWith(0.98);
        
            if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1){
                this.stop();
            }
        }
        
        Ball.prototype.updatePosition = function(delta){
        
            if(!this.moving || this.inHole)
                return;
            let ball = this;
            let newPos = this.position.add(this.velocity.multiply(delta));
        
        
            if(window.Game.policy.isInsideHole(newPos)){
            // console.log("in hole");
                if(window.Game.sound && window.SOUND_ON){
                    let holeSound = sounds.hole.cloneNode(true);
                    holeSound.volume = 0.5;
                    holeSound.play();
                }
                this.position = newPos;
                this.inHole = true;
                setTimeout(function(){ball.visible=false;ball.velocity = window.Vector2.zero;}, 100);
                window.Game.policy.handleBallInHole(this);
                return;
            }
        
            let collision = this.handleCollision(newPos);
        
            if(collision){
                this.velocity.multiplyWith(0.95);
            }else{
                this.position = newPos;
            }
        }
        
        Ball.prototype.handleCollision = function(newPos){
        
            let collision = false;
        
            if(window.Game.policy.isXOutsideLeftBorder(newPos, this.origin)){
                this.velocity.x = -this.velocity.x;
                this.position.x = window.Game.policy.leftBorderX + this.origin.x;
                collision = true;
            }
            else if(window.Game.policy.isXOutsideRightBorder(newPos, this.origin)){
                this.velocity.x = -this.velocity.x;
                this.position.x = window.Game.policy.rightBorderX - this.origin.x;
                collision = true;
            }
        
            if(window.Game.policy.isYOutsideTopBorder(newPos, this.origin)){
                this.velocity.y = -this.velocity.y;
                this.position.y = window.Game.policy.topBorderY + this.origin.y;
                collision = true;
            }
            else if(window.Game.policy.isYOutsideBottomBorder(newPos, this.origin)){
                this.velocity.y = -this.velocity.y;
                this.position.y = window.Game.policy.bottomBorderY - this.origin.y;
                collision = true;
            }
        
            return collision;
        }
        
        Ball.prototype.stop = function(){
        
            this.moving = false;
            this.velocity = window.Vector2.zero;
        }
        
        Ball.prototype.reset = function(){
            this.inHole = false;
            this.moving = false;
            this.velocity = window.Vector2.zero;
            this.position = this.initPos;
            this.visible = true;
        }
        
        Ball.prototype.out = function(){
        
            this.position = new window.Vector2(0, 900);
            this.visible = false;
            this.inHole = true;
        
        }
        
        Ball.prototype.draw = function () {
            if(!this.visible) return;
        
            if(!isNaN(this.color)) {
              // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new window.Vector2(20, 20));
              Canvas2D.drawImage(this.sprite, this.position, 0, 1, new window.Vector2(20, 20));
        
              Canvas2D._canvasContext.fillStyle = "blue";
              Canvas2D.drawRect(2, 2, this.position, 0, 1, new window.Vector2(1, 1));
            }
            else {
              // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new window.Vector2(25, 25));
              Canvas2D.drawImage(this.sprite, this.position, 0, 1, new window.Vector2(25, 25));
            }
        
                // Canvas2D._canvasContext.fillStyle = "red";
          // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new window.Vector2(25, 25))
          // Canvas2D._canvasContext.save();
          // Canvas2D._canvasContext.scale(0.6533333333333333, 0.6533333333333333);
          // Canvas2D._canvasContext.translate(this.position.x, this.position.y);
          // Canvas2D._canvasContext.rotate(0);
          // Canvas2D._canvasContext.fillRect(-25, -25, this.sprite.width, this.sprite.height);
          // // Canvas2D._canvasContext.drawImage(sprite, 0, 0,
          // //     sprite.width, sprite.height,
          // //     -origin.x * scale, -origin.y * scale,
          // //     sprite.width * scale, sprite.height * scale);
          // Canvas2D._canvasContext.restore();
        };
        
        // export default Ball;
        window.Ball = Ball;
        
        const joyStick = new MyJoyStick();
        
        function Stick(position){
            this.position = position;
            this.origin = new window.Vector2(970,11);
            this.shotOrigin = new window.Vector2(950,11);
            this.shooting = false;
            this.visible = true;
            this.rotation = 0 + (0 * (Math.PI / 180));
            this.power = 0;
            this.trackMouse = true;
            this.useJoystick = false;
            this.caster = new RayCaster(this.position, this.rotation)
        }
        
        Stick.prototype.chooseControl = function() {
          if(this.useJoystick) {
            joyStick.addListeners();
          }
        }
        
        Stick.prototype.stickUp = function() {
            if(this.power < 75){
                this.origin.x+=2;
                this.power+=1.2;
            }
        }
        
        Stick.prototype.stickDown = function() {
            if(this.power>0){
                this.origin.x-=2;
                this.power-=1.2;
            }
        }
        
        
        Stick.prototype.handleStrike = function() {
            if(window.Game.isTurn()) {
                if(window.Game.playerNumber == 1) {
                    // console.log(this.power, Mouse.left.down, Keyboard.down(Keys.space));
                }
                if(this.power>0 && Mouse.left.down || this.power>0 && Keyboard.down(Keys.space)){
                    this.stickStrike();
                }
            }
            else {
                if(this.useJoystick) {
                    this.power = window.Game.packetData.mobilePower;
        
                    if(this.power > 0) {
                        console.log("gotten mobile power", this.power);
                        this.stickStrike()
                        window.Game.packetData.mobilePower = 0;
                    };
                }
                else if(window.Game.packetData.power>0 && window.Game.packetData.leftDown || window.Game.packetData.power>0 && window.Game.packetData.space){
                    this.stickStrike();
                }
            }
        
            window.Game.socket.emit('stick_strike', window.Game.roomID, this.power, Mouse.left.down, Keyboard.down(Keys.space))
        }
        
        Stick.prototype.stickStrike = function() {
            let strike = sounds.strike.cloneNode(true);
            strike.volume = (this.power/(10))<1?(this.power/(10)):1;
            strike.play();
            window.Game.policy.turnPlayed = true;
            this.shooting = true;
            this.origin = this.shotOrigin.copy();
        
            window.Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
            let stick = this;
            setTimeout(function(){stick.visible = false;}, 500);
        }
        
        Stick.prototype.stickRotateMain = function() {
            if(window.Game.isTurn()) {
                let opposite = Mouse.position.y - this.position.y;
                let adjacent = Mouse.position.x - this.position.x;
                this.rotation = Math.atan2(opposite, adjacent);
        
                window.Game.socket.emit('stick_rotate', window.Game.roomID, this.rotation)
            }
            else {
                this.rotation = window.Game.packetData.rotation;
                // window.Game.socket.on('stick_rotate', (rotation) => {
                //     this.rotation = rotation;
                // })
            }
        }
        
        Stick.prototype.stickRotateMobile = function() {
            // console.log("running rotate, is it my turn", window.Game.isTurn());
            if(window.Game.isTurn()) {
                this.rotation = joyStick.deg;
                window.Game.socket.emit('stick_rotate', window.Game.roomID, this.rotation)
                // console.log("emitting rotate", this.rotation);
            }
            else {
                // console.log("getting mobile rotation data");
                // this.rotation = window.Game.packetData.rotation;
            }
        }
        
        Stick.prototype.handleMovementInput = function(w, s, keyInput) {
            // console.log("move input");
        
            if(this.useJoystick) {
                this.origin.x = window.Game.packetData.originX;
            }
            else {
                if(w && keyInput) {
                    this.stickUp();
                }
                else if(s && keyInput) {
                    this.stickDown();
                }
            }
        }
        
        Stick.prototype.movementInput = function() {
            if(window.Game.isTurn()) {
                if(Keyboard.down(Keys.W) && window.KEYBOARD_INPUT_ON){
                  this.stickUp();
                }
                else if(Keyboard.down(Keys.S) && window.KEYBOARD_INPUT_ON){
                  this.stickDown();
                }
        
                window.Game.socket.emit('movement_input', window.Game.roomID, Keyboard.down(Keys.W), Keyboard.down(Keys.S), window.KEYBOARD_INPUT_ON);
            }
            else {
                this.handleMovementInput(window.Game.packetData.w, window.Game.packetData.s, window.Game.packetData.keyInput);
                // window.Game.socket.on('movement_input', this.handleMovementInput.bind(this));
            }
        }
        
        Stick.prototype.mainInput = function() {
            if(this.trackMouse){
                this.stickRotateMain();
            }
            else if(this.useJoystick /* && joyStick.active */) {
                this.stickRotateMobile();
            }
        }
        
        Stick.prototype.handleInput = function (delta) {
            if(window.AI_ON && window.Game.policy.turn === window.AI_PLAYER_NUM) return;

            // console.log("error", window.Game, window.Game.policy);
        
            if(window.Game.policy.turnPlayed) return;
        
            this.movementInput();
        
            this.handleStrike();
            
            this.mainInput();
        
            // const trackMouse = this.trackMouse;
            // if(trackMouse) {
            //     let opposite = Mouse.position.y - this.position.y;
            //     let adjacent = Mouse.position.x - this.position.x;
            //     const rotation = Math.atan2(opposite, adjacent);
            
            //     const w = Keyboard.down(Keys.W);
            //     const s = Keyboard.down(Keys.S);
            //     const space = Keyboard.down(Keys.space);
            //     window.Game.socket.emit('joystick_update', window.Game.roomID, w, s, space, Mouse.left.down, Mouse.position.y, Mouse.position.x);
            // }
            // else if(this.useJoystick && joyStick.active) {
            //     // window.Game.socket.emit('joystick_mobile_update', window.Game.roomID, w, s, space, Mouse.left.down, rotation)
            // }
        
        
            // if(window.AI_ON && window.Game.policy.turn === window.AI_PLAYER_NUM)
            //   return;
        
            // if(window.Game.policy.turnPlayed)
            //   return;
        
            // if(Keyboard.down(Keys.W) && window.KEYBOARD_INPUT_ON){
            //   if(this.power < 75){
            //     this.origin.x+=2;
            //     this.power+=1.2;
            //   }
            // }
        
            // if(Keyboard.down(Keys.S) && window.KEYBOARD_INPUT_ON){
            //   if(this.power>0){
            //     this.origin.x-=2;
            //     this.power-=1.2;
            //   }
            // }
        
            // else if (this.power>0 && Mouse.left.down || this.power>0 && Keyboard.down(Keys.space)){
            //   // console.log("strike");
            //   let strike = sounds.strike.cloneNode(true);
            //   strike.volume = (this.power/(10))<1?(this.power/(10)):1;
            //   strike.play();
            //   window.Game.policy.turnPlayed = true;
            //   this.shooting = true;
            //   this.origin = this.shotOrigin.copy();
        
            //   window.Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
            //   let stick = this;
            //   setTimeout(function(){stick.visible = false;}, 500);
            // }
            // else if(this.trackMouse){
            //   let opposite = Mouse.position.y - this.position.y;
            //   let adjacent = Mouse.position.x - this.position.x;
            //   this.rotation = Math.atan2(opposite, adjacent);
            // }
            // else if(this.useJoystick && joyStick.active) {
            //   // joyStick.update(window.Game.gameWorld.whiteBall);
        
            //   this.rotation = joyStick.deg;
        
            //   // console.log(joyStick.deg);
            //   // const a = joyStick.x - this.origin.x
            //   // const b = joyStick.y - this.origin.y
        
            //   // const dist = Math.hypot(a, b)
        
            //   // console.log(dist);
            //   // console.log(joyStick.deg, this.position);
            //   // if(joyStick.deg > 0) {
            //   //   this.rotation += 0.01
            //   // }
            //   // else if(joyStick.deg < 0) {
            //   //   this.rotation -= 0.01;
            //   // }
            //   // else {
            //   //   joyStick.deg > 0 ? this.rotation += 0.01 : 
            //   // }
            // }
        };
        
        Stick.prototype.shoot = function(power, rotation){
          // if(window.Game.policy.firstPlay) window.Game.policy.firstPlay = false;
          this.power = power;
          this.rotation = rotation;
        
          if(window.Game.sound && window.SOUND_ON){
            let strike = sounds.strike.cloneNode(true);
            strike.volume = (this.power/(10))<1?(this.power/(10)):1;
            strike.play();
          }
          window.Game.policy.turnPlayed = true;
          this.shooting = true;
          this.origin = this.shotOrigin.copy();
        
          window.Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
          let stick = this;
          setTimeout(function(){stick.visible = false;}, 500);
        }
        
        Stick.prototype.update = function(){
            // console.log("updating joystick");
            // console.log(this.useJoystick, window.Game.isTurn());
            if(this.useJoystick && !window.Game.isTurn()) {
                // console.log("setting rotation", window.Game.packetData.rotation);
                this.rotation = window.Game.packetData.rotation;
            }
          if(this.shooting && !window.Game.gameWorld.whiteBall.moving)
            this.reset();
        };
        
        Stick.prototype.reset = function(){
          this.position.x = window.Game.gameWorld.whiteBall.position.x;
          this.position.y = window.Game.gameWorld.whiteBall.position.y;
            this.origin = new window.Vector2(970,11);
            window.Game.packetData.originX = 970;
          this.shooting = false;
          this.visible = true;
            this.power = 0;
        };
        
        Stick.prototype.draw = function () {
          if(!this.visible) return;
          
          this.caster.update(this.position, this.rotation);
        
          Canvas2D.drawImage(sprites.stick, this.position,this.rotation, 1, this.origin);
        
          this.caster.draw();
          // Canvas2D._canvasContext.fillStyle = "#cbcbcb"
          // Canvas2D.drawRect(1500, 5, this.position, this.rotation, 1, new window.Vector2(0, 3));
        
          // Canvas2D._canvasContext.save()
          // // Canvas2D._canvasContext.rotate(this.rotation)
          // const ballPosX = window.Game.gameWorld.whiteBall.position.x;
          // const ballPosY = window.Game.gameWorld.whiteBall.position.y;
        
          // console.log(ballPosX, ballPosY);
          // Canvas2D._canvasContext.fillRect(ballPosX, ballPosY, sprites.ball.width, sprites.ball.height);
          // Canvas2D._canvasContext.restore()
        };
        
        // export default Stick;
        window.Stick = Stick;
        
        function RayCaster(position, rotation){
            this.width = 1500;
            // this.height = 5;
            this.height = 1;
            this.position = position;
            // this.origin = new window.Vector2(0, 3);
            this.origin = new window.Vector2(0, 0);
            this.visible = true;
            this.rotation = rotation;
            this.collided = false;
        
            this.projection = {
              // width: 5,
              // height: 5,
              width: 1,
              height: 1,
              position: {
                x: 0,
                y: 0,
              },
              rotation: 0,
              origin: new window.Vector2(0, 0)
              // origin: new window.Vector2(20, 0)
            }
        
            this.result = {
              // width: 5,
              // height: 5,
              width: 1,
              height: 1,
              position: {
                x: 0,
                y: 0,
              },
              rotation: 0,
              origin: new window.Vector2(0, 0)
            }
        }
        
        RayCaster.prototype.draw = function() {
          Canvas2D._canvasContext.fillStyle = "#cbcbcb"
          // Canvas2D._canvasContext.fillStyle = "blue"
          Canvas2D.drawRect(this.width, this.height, this.position, this.rotation, 1, this.origin);
        
          Canvas2D._canvasContext.fillStyle = "red"
          Canvas2D.drawRect(this.projection.width, this.projection.height, this.projection.position, this.projection.rotation, 1, this.projection.origin);
        
          Canvas2D._canvasContext.fillStyle = "#cbcbcb"
          const newO = new window.Vector2(0, 0);
          // Canvas2D._canvasContext.fillStyle = "blue"
        //   Canvas2D.drawRect(this.result.width, this.result.height, this.result.position, this.result.rotation, 1, this.origin);
          Canvas2D.drawRect(this.result.width, this.result.height, this.result.position, this.result.rotation, 1, newO);
        
          this.collided = false;
        }
        
        RayCaster.prototype.update = function(position, rotation) {
          this.position = position;
          this.rotation = rotation;
          if(this.collided == false) {
            this.width = 1500;
            this.projection.position.x = 0;
            this.projection.position.y = 0;
            this.result.position.x = 0;
            this.result.position.y = 0;
          }
        }
        
        // export default RayCaster;
        window.RayCaster = RayCaster;
        
        function Label(text, position, origin, color, textAlign, fontname, fontsize){
        
            this.text = typeof text !== 'undefined' ? text : '';
            this.position = typeof position !== 'undefined' ? position : window.Vector2.zero;
            this.origin = typeof origin !== 'undefined' ? origin : window.Vector2.zero;
            this.color = typeof color !== 'undefined' ? color : Color.black;
            this.textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
            this.fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
            this.fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
        }
        
        Label.prototype.draw = function(){
        
            Canvas2D.drawText(
                this.text, 
                this.position,
                this.origin,
                this.color,
                this.textAlign,
                this.fontname,
                this.fontsize
            );
        
        }
        
        // export default Label;
        window.Label = Label;
        
        
        function Button(sprite, position, callback, hoverSprite){
        
            this.sprite = sprite;
            this.hoverSprite = hoverSprite ? hoverSprite : sprite;
            this.position = position;
            this.callback = callback;
        }
        
        Button.prototype.draw = function(){
        
            if(this.mouseInsideBorders()){
                Canvas2D.drawImage(this.hoverSprite, this.position, 0, 1);
                Canvas2D._canvas.style.cursor = "pointer";
            }
            else{
                Canvas2D.drawImage(this.sprite, this.position, 0, 0.98);
            }
        }
        
        Button.prototype.handleInput = function(){
            if(Mouse.left.pressed) {
                // console.log("mouse", this.position.x, this.position.y);
            }
            if(Mouse.left.pressed && this.mouseInsideBorders()){
                this.callback();
            }
        }
        
        Button.prototype.mouseInsideBorders = function(){
        
          let mousePos = Mouse.position;
        
          const offsetX = 1743 * 0.8 / 2;
          const offsetY = 825 * 0.8 / 2;
        
          // console.log(offsetX);
        
          // console.log(mousePos.x);
          // console.log(mousePos.x, mousePos.y);
        
          // console.log(mousePos.x + offsetX);
          
          // console.log(mousePos.x + offsetY, mousePos.y + offsetX);
          // console.log(Math.abs(mousePos.x), Math.abs(mousePos.y));
          // console.log(mousePos.x, mousePos.y);
          // console.log(this.position);
        
            if(Math.abs(mousePos.x) > this.position.x 
                &&
                Math.abs(mousePos.x) < this.position.x + this.sprite.width
                &&
                Math.abs(mousePos.y) > this.position.y
                &&
                Math.abs(mousePos.y) < this.position.y + this.sprite.height
            ){
                return true;
            }
        
            return false;
        }
        
        // export default Button;
        window.Button = Button;
        
        
        
        function Menu(){
            
        }
        
        Menu.prototype.init = function
        (
            backgroundSprite,
            labels,
            buttons,
            sound
        ){  
            this.background = backgroundSprite;
            this.labels = labels || [];
            this.buttons = buttons || [];
            this.sound = sound ? sound : undefined;
        
            this.active = false;
        }
        
        Menu.prototype.load = function(){
            this.sound.currentTime = 0;
            this.active = true;
        
            requestAnimationFrame(this.menuLoop.bind(this));
            if(window.SOUND_ON){
                this.sound.volume = 0.8;
            }
        
            // this.sound.play();
        }
        
        Menu.prototype.draw = function(){
        
            Canvas2D._canvas.style.cursor = "auto"; 
        
            Canvas2D.drawImage(
                this.background, 
                window.Vector2.zero, 
                0, 
                1, 
                window.Vector2.zero
            );
        
        
            for(let i = 0 ; i < this.labels.length ; i++){
                this.labels[i].draw();
            }
        
            for(let i = 0 ; i < this.buttons.length ; i++){
                this.buttons[i].draw();
            }
        }
        
        Menu.prototype.handleInput = function(){
        
            for(let i = 0 ; i < this.buttons.length ; i++){
                this.buttons[i].handleInput();
            }
        }
        
        Menu.prototype.menuLoop = function(){
        
            if(this.active){
                this.handleInput();
                Canvas2D.clear();
                this.draw();
                Mouse.reset();
                requestAnimationFrame(this.menuLoop.bind(this));
            }
        
        }
        
        // export default Menu;
        window.Menu = Menu;
        
        
        function generateMainMenuLabels(headerText){
        
            let labels = [
        
                new Label(
                    headerText, 
                    new window.Vector2(100,0),
                    window.Vector2.zero,
                    "white",
                    "left",
                    "Bookman",
                    "100px"
                ),
                new Label(
                    "© 2018 Chen Shmilovich", 
                    new window.Vector2(1250,700),
                    window.Vector2.zero,
                    "white",
                    "left",
                    "Bookman",
                    "20px"
                )
            ];
        
        
            return labels;
        }
        
        
        function generateMainMenuButtons(inGame){
        
        
        
            let buttons = [];
        
            let dev = 0;
        
            if(inGame){
                dev = 200;
                buttons.push(
                    new Button
                        (
                            // CONTINUE BUTTON
                            sprites.continueButton, 
                            new window.Vector2(200,200),
                            function(){
                                window.Game.mainMenu.active = false;
                                window.GAME_STOPPED = false;
                                setTimeout(window.Game.continueGame,200);
                                sounds.fadeOut(window.Game.mainMenu.sound);
                            },
                            sprites.continueButtonHover
                        )
                )
            }
        
            let muteSprite = sprites.muteButton;
            let muteSpriteHover = sprites.muteButtonHover;
        
            if(window.Game.mainMenu.sound && window.Game.mainMenu.sound.volume === 0){
                muteSprite = sprites.muteButtonPressed;
                muteSpriteHover = sprites.muteButtonPressedHover;
            }
        
        
            let muteButton = new Button
            (
                // MUTE BUTTON
                muteSprite, 
                new window.Vector2(1430,10),
                function(){
                    if(window.Game.mainMenu.sound.volume == 0){
                        window.SOUND_ON = true;
                        window.Game.mainMenu.sound.volume = 0.8;
                        this.sprite = sprites.muteButton;
                        this.hoverSprite = sprites.muteButtonHover;
                    }
                    else{
                        window.SOUND_ON = false;
                        window.Game.mainMenu.sound.volume = 0.0;
                        this.sprite = sprites.muteButtonPressed;
                        this.hoverSprite = sprites.muteButtonPressedHover;
                    }
                },
                muteSpriteHover
            );
        
            let backButton = new Button
            (
                //BACK
                sprites.backButton, 
                new window.Vector2(100,150),
                function(){
                    window.Game.mainMenu.labels = generateMainMenuLabels("Classic 8-Ball");
                    window.Game.mainMenu.buttons = generateMainMenuButtons(inGame);
                },
                sprites.backButtonHover
            );
        
            buttons = buttons.concat([
                new Button
                (
                    // PLAYER vs PLAYER
                    sprites.twoPlayersButton, 
                    new window.Vector2(200,dev+200),
                    function(){
                        window.AI_ON = false;
                        window.Game.mainMenu.active = false;
                        window.GAME_STOPPED = false;
                        setTimeout(window.Game.startNewGame,200);
                        sounds.fadeOut(window.Game.mainMenu.sound);
                    },
                    sprites.twoPlayersButtonHover
                ),
                new Button
                (
                    // PLAYER vs COMPUTER
                    sprites.onePlayersButton, 
                    new window.Vector2(200,dev+400),
                    function(){
                        window.Game.mainMenu.labels = generateMainMenuLabels("Choose Difficulty");
        
                        Mouse.reset();
                        window.Game.mainMenu.buttons = [
                            new Button
                            (
                                //EASY
                                sprites.easyButton, 
                                new window.Vector2(200,150),
                                function(){
                                    window.AI_PLAYER_NUM = 1;
                                    window.AI_ON = true;
                                    window.TRAIN_ITER = 30;
                                    window.Game.mainMenu.active = false;
                                    window.GAME_STOPPED = false;
                                    setTimeout(window.Game.startNewGame,200);
                                    sounds.fadeOut(window.Game.mainMenu.sound);
                                },
                                sprites.easyButtonHover
                            ),
                            new Button
                            (
                                //MEDIUM
                                sprites.mediumButton, 
                                new window.Vector2(200,300),
                                function(){
                                    window.AI_PLAYER_NUM = 1;
                                    window.AI_ON = true;
                                    window.TRAIN_ITER = 50;
                                    window.Game.mainMenu.active = false;
                                    window.GAME_STOPPED = false;
                                    setTimeout(window.Game.startNewGame,200);
                                    sounds.fadeOut(window.Game.mainMenu.sound);
                                },
                                sprites.mediumButtonHover
                            ),
                            new Button
                            (
                                //HARD
                                sprites.hardButton, 
                                new window.Vector2(200,450),
                                function(){
                                    window.AI_PLAYER_NUM = 1;
                                    window.AI_ON = true;
                                    window.TRAIN_ITER = 100;
                                    window.Game.mainMenu.active = false;
                                    window.GAME_STOPPED = false;
                                    setTimeout(window.Game.startNewGame,200);
                                    sounds.fadeOut(window.Game.mainMenu.sound);
                                },
                                sprites.hardButtonHover
                            ),
                            new Button
                            (
                                //INSANE
                                sprites.insaneButton, 
                                new window.Vector2(200,600),
                                function(){
                                    window.AI_PLAYER_NUM = 0;
                                    window.AI_ON = true;
                                    window.TRAIN_ITER = 700;
                                    window.Game.mainMenu.active = false;
                                    window.GAME_STOPPED = false;
                                    setTimeout(window.Game.startNewGame,200);
                                    sounds.fadeOut(window.Game.mainMenu.sound);
                                },
                                sprites.insaneButtonHover
                            ),
                            muteButton,
                            backButton
        
                        ];
                    },
                    sprites.onePlayersButtonHover
                ),
                muteButton
            ]);
        
            return buttons;
        }
        
        // export {generateMainMenuLabels, generateMainMenuButtons}
        window.generateMainMenuButtons = generateMainMenuButtons;
        window.generateMainMenuLabels = generateMainMenuLabels;
        
        
        function Opponent(power, rotation){
            this.power = power || (Math.random() * 75 + 1);
            this.rotation = rotation || (Math.random()*6.283)-3.141;
            this.evaluation = 0;
        }
        
        // export default Opponent;
        window.Opponent = Opponent;
        
        
        function AIPolicy(){
            
        }
        
        AIPolicy.prototype.evaluate = function(state, gamePolicy){
        
            let evaluation = 1;
        
            for (let i = 0 ; i < state.balls.length; i++){
                for(let j = i + 1 ; j < state.balls.length ; j++){
        
                    let firstBall = state.balls[i];
                    let secondBall = state.balls[j];
        
                    if(firstBall === state.whiteBall || secondBall === state.whiteBall 
                        || 
                        firstBall.inHole || secondBall.inHole){
                        continue;
                    }
                    evaluation += firstBall.position.distanceFrom(secondBall.position);
                }
            }
        
            evaluation = evaluation/5800;
        
            if(!gamePolicy.firstCollision){
                evaluation+= 100;
            }
        
            evaluation += 2000 * gamePolicy.validBallsInsertedOnTurn;
        
            gamePolicy.updateTurnOutcome();
        
        
            if(gamePolicy.won){
                if(!gamePolicy.foul){
                    evaluation += 10000;
                }
                else{
                    evaluation -= 10000;
                }
            }
        
            if(gamePolicy.foul){
                evaluation = evaluation - 3000;
            }
        
            return evaluation;
        }
        
        window.AIPolicy = AIPolicy;
        
        // export default AIPolicy;
        
        
        function AITrainer(){
        
            this.AIPolicy = new AIPolicy();
        
        }
        
        AITrainer.prototype.init = function(state, gamePolicy){
        
            AI.opponents = [];
            AI.currentOpponent = new Opponent();
            AI.finishedSession = true;
            AI.iteration = 0;
        
            AI.bestOpponentIndex = 0;
            AI.bestOpponentEval = 0;
        
            if(gamePolicy.foul){
                //TO DO: Pick best position for the white ball.
                state.whiteBall.position.x = 413;
                state.whiteBall.position.y = 413;
                state.whiteBall.inHole = false;
                gamePolicy.foul = false;
            }
            AI.initialState = JSON.parse(JSON.stringify(state));
            AI.initialGamePolicyState = JSON.parse(JSON.stringify(gamePolicy));
        
            AI.state = state;
            AI.gamePolicy = gamePolicy;
        
        }
        
        AITrainer.prototype.train = function(){
        
            if(AI.iteration === window.TRAIN_ITER){
                AI.finishedSession = true;
                AI.playTurn();
                return;
            }
        
            let ballsMoving = AI.state.ballsMoving();
        
            if(!ballsMoving){
        
                if(AI.iteration !== 0){
                    AI.currentOpponent.evaluation = AI.AIPolicy.evaluate(this.state, this.gamePolicy);
        
                    AI.opponents.push(JSON.parse(JSON.stringify(AI.currentOpponent)));
        
                    if(AI.currentOpponent.evaluation > AI.bestOpponentEval){
                        AI.bestOpponentEval = AI.currentOpponent.evaluation;
                        AI.bestOpponentIndex =  AI.opponents.length - 1;
                    }
        
                    if(window.LOG){
                        console.log('-------------'+new Number(AI.iteration+1)+'--------------------');
                        console.log('Current evaluation: ' + AI.currentOpponent.evaluation);
                        console.log('Current power: ' + AI.currentOpponent.power);
                        console.log('Current rotation: ' + AI.currentOpponent.rotation);
                        console.log('---------------------------------');
                    }
                }
        
                AI.state.initiateState(AI.initialState.balls);
                AI.gamePolicy.initiateState(AI.initialGamePolicyState);
                AI.buildNewOpponent();
                AI.simulate();
            }
        
        }
        
        AITrainer.prototype.buildNewOpponent = function(){
        
            if(AI.iteration % 10 === 0){
                AI.currentOpponent = new Opponent();
                AI.iteration++;
                return;
            }
        
            let bestOpponent = AI.opponents[AI.bestOpponentIndex];
        
            let newPower = bestOpponent.power;
            newPower += + ((Math.random() * 30) - 15);
            newPower = newPower < 20 ? 20 : newPower;
            newPower = newPower > 75 ? 75 : newPower;
        
            let newRotation = bestOpponent.rotation;
        
            if(bestOpponent.evaluation > 0){
                newRotation += (1/bestOpponent.evaluation)*(Math.random() * 2 * Math.PI - Math.PI)
            }
            else{
                newRotation = (Math.random() * 2 * Math.PI - Math.PI);
            }
        
            AI.currentOpponent = new Opponent(newPower,newRotation);
        
            AI.iteration++;
        
        }
        
        AITrainer.prototype.simulate = function(){
            AI.state.stick.shoot(AI.currentOpponent.power, AI.currentOpponent.rotation);
        }
        
        AITrainer.prototype.playTurn = function(){
        
            let bestOpponent = AI.opponents[AI.bestOpponentIndex];
            window.Game.gameWorld.stick.rotation = bestOpponent.rotation;
            window.Game.gameWorld.stick.trackMouse = false;
        
            setTimeout(() => {
        
                window.Game.gameWorld.stick.visible = true;
                Canvas2D.clear();
                window.Game.gameWorld.draw();
        
                window.Game.sound = true;
                window.Game.gameWorld.initiateState(AI.initialState.balls);
                window.Game.policy.initiateState(AI.initialGamePolicyState);
        
                window.DISPLAY = true;
                
                requestAnimationFrame(window.Game.mainLoop);
        
                window.Game.gameWorld.stick
                .shoot(
                    bestOpponent.power, 
                    bestOpponent.rotation
                );
                window.Game.gameWorld.stick.trackMouse = true;
        
            }, 1000);
        }
        
        AITrainer.prototype.opponentTrainingLoop = function(){
        
            window.Game.sound = false;
            window.DISPLAY = false;
        
            if(window.DISPLAY_TRAINING){
                if(!AI.finishedSession){
                    AI.train();
                    window.Game.gameWorld.handleInput(window.DELTA);
                    window.Game.gameWorld.update(window.DELTA);
                    Canvas2D.clear();
                    window.Game.gameWorld.draw();
                    Mouse.reset();
                    setTimeout(AI.opponentTrainingLoop,0.00000000001);
                }
            }
            else{
                while(!AI.finishedSession){
                    AI.train();
                    window.Game.gameWorld.handleInput(window.DELTA);
                    window.Game.gameWorld.update(window.DELTA);
                    Mouse.reset();
                }
            }
        
        }
        
        AITrainer.prototype.startSession = function(){
                setTimeout(
                    ()=>{
                        window.Game.gameWorld.stick.visible = false;
                        Canvas2D.clear();
                        window.Game.gameWorld.draw();
        
                        AI.init(window.Game.gameWorld, window.Game.policy);
                        AI.finishedSession = false;
                        AI.opponentTrainingLoop();
                    },
                    1000
                );
        }
        
        const AI = new AITrainer();
        
        window.AI = AI;
        
        // export default AI;
        
        
        
        function Player(matchScore, totalScore){
            this.color = undefined;
            this.matchScore = matchScore;
            this.totalScore = totalScore;
        }
        
        // export default Player;
        window.Player = Player;
        
        
        function GamePolicy(){
            this.firstPlay = true;
            this.turn = 0;
            this.firstCollision = true;
            let player1TotalScore = new Score(new window.Vector2(window.Game.size.x/2 - 75,window.Game.size.y/2 - 45));
            let player2TotalScore = new Score(new window.Vector2(window.Game.size.x/2 + 75,window.Game.size.y/2 - 45));
        
            let player1MatchScore = new Score(new window.Vector2(window.Game.size.x/2 - 280,108));
            let player2MatchScore = new Score(new window.Vector2(window.Game.size.x/2 + 230,108));
        
            this.players = [new Player(player1MatchScore,player1TotalScore), new Player(player2MatchScore,player2TotalScore)];
            this.foul = false;
            this.scored = false;
            this.won = false;
            this.turnPlayed = false;
            this.validBallsInsertedOnTurn = 0;
        
            this.leftBorderX = window.BORDER_SIZE;
            this.rightBorderX = window.Game.size.x - window.BORDER_SIZE;
            this.topBorderY = window.BORDER_SIZE;
            this.bottomBorderY = window.Game.size.y - window.BORDER_SIZE;
        
            this.topCenterHolePos = new window.Vector2(750,32);
            this.bottomCenterHolePos = new window.Vector2(750,794);
            this.topLeftHolePos = new window.Vector2(62,62);
            this.topRightHolePos = new window.Vector2(1435,62);
            this.bottomLeftHolePos = new window.Vector2(62,762)
            this.bottomRightHolePos = new window.Vector2(1435,762);
        }
        
        GamePolicy.prototype.reset = function(){
            this.turn = 0;
            this.players[0].matchScore.value = 0;
            this.players[0].color = undefined;
            this.players[1].matchScore.value = 0;
            this.players[1].color = undefined;
            this.foul = false;
            this.firstPlay = true;
            this.scored = false;
            this.turnPlayed = false;
            this.won = false;
            this.firstCollision = true;
            this.validBallsInsertedOnTurn = 0;
        }
        GamePolicy.prototype.drawScores = function(){
            Canvas2D.drawText("PLAYER " + (this.turn+1), new window.Vector2(window.Game.size.x/2 + 40,200), new window.Vector2(150,0), "#096834", "top", "Impact", "70px");
            this.players[0].totalScore.draw();
            this.players[1].totalScore.draw();
        
            this.players[0].matchScore.drawLines(this.players[0].color);
            this.players[1].matchScore.drawLines(this.players[1].color);
        }
        
        // checks for validity
        GamePolicy.prototype.checkColisionValidity = function(ball1,ball2){
          // console.log("is checking validity");
        
            let currentPlayerColor = this.players[this.turn].color;
        
            if(this.players[this.turn].matchScore.value == 7 &&
               (ball1.color == Color.black || ball2.color == Color.black)){
                this.firstCollision = false;
                return;
               }
        
            if(!this.firstCollision)
                return;
        
            if(currentPlayerColor == undefined){
              // console.log("if player not undef");
                this.firstCollision = false;
                return;
            }
        
            if(ball1.color == Color.white){
              if(!check(currentPlayerColor, Number(ball2.color))){
                // console.log("if player hit other ball");
                // console.log(currentPlayerColor, ball1.color, ball2.color);
                  this.foul = true;
                }
                this.firstCollision = false;
            }
        
            if(ball2.color == Color.white){
              if(!check(currentPlayerColor, Number(ball1.color))){
                // console.log("if player hit other ball");
                // console.log(currentPlayerColor, ball1.color, ball2.color);
                    this.foul = true;
                }
                this.firstCollision = false;
            }
            // if(ball1.color == Color.white){
            //     if(ball2.color != currentPlayerColor){
            //         this.foul = true;
            //     }
            //     this.firstCollision = false;
            // }
        
            // if(ball2.color == Color.white){
            //     if(ball1.color != currentPlayerColor){
            //         this.foul = true;
            //     }
            //     this.firstCollision = false;
            // }
        }
        function check(type, value) {
          if(type == "even" && value % 2 == 0) {
            return true;
          }
          if(type == "even" && value % 2 != 0) {
            return false;
          }
          if(type == "odd" && value % 2 != 0) {
            return true;
          }
          if(type == "odd" && value % 2 == 0) {
            return false;
          }
        
        }
        GamePolicy.prototype.handleBallInHole = function(ball){
        
            setTimeout(function(){ball.out();}, 100);
        
            let currentPlayer = this.players[this.turn];
            let secondPlayer = this.players[(this.turn+1)%2];
        
            if(currentPlayer.color == undefined){
              // console.log("ball pocket though undefined");
                if(Number(ball.color) % 2 == 0){
                    currentPlayer.color = "even";
                    secondPlayer.color = "odd";
                }
                else if(!isNaN(ball.color) && Number(ball.color) % 2 != 0){
                    currentPlayer.color = "odd";
                    secondPlayer.color = "even";
                }
                else if(ball.color === Color.black){
                    this.won = true; 
                    this.foul = true;
                }
                else if(ball.color === Color.white){
                    this.foul = true;
                }
                // if(ball.color === Color.red){
                //     currentPlayer.color = Color.red;
                //     secondPlayer.color = Color.yellow;
                // }
                // else if(ball.color === Color.yellow){
                //     currentPlayer.color = Color.yellow;
                //     secondPlayer.color = Color.red;
                // }
                // else if(ball.color === Color.black){
                //     this.won = true; 
                //     this.foul = true;
                // }
                // else if(ball.color === Color.white){
                //     this.foul = true;
                // }
            }
        
            // if(currentPlayer.color === ball.color){
            //     currentPlayer.matchScore.increment();
            //     this.scored = true;
            //     this.validBallsInsertedOnTurn++;
            // }
            // console.log(currentPlayer.color, Number(ball.color));
            if(!isNaN(ball.color) && check(currentPlayer.color, Number(ball.color))){
                // console.log();
                currentPlayer.matchScore.increment();
                this.scored = true;
                this.validBallsInsertedOnTurn++;
            }
            else if(ball.color === Color.white){
              // console.log('pocket white ball');
        
                if(currentPlayer.color != undefined){
                    this.foul = true;
                    // console.log('pocket white ball');
        
                    // let ballsSet = window.Game.gameWorld.getBallsSetByColor(currentPlayer.color);
        
                    // let allBallsInHole = true;
        
                    // for (let i = 0 ; i < ballsSet.length; i++){
                    //     if(!ballsSet[i].inHole){
                    //         allBallsInHole = false;
                    //     }
                    // }
        
                    // if(allBallsInHole){
                    //     this.won = true;
                    // }
                }
            }
            else if(ball.color === Color.black){
        
                if(currentPlayer.color != undefined){
                    let ballsSet = window.Game.gameWorld.getBallsSetByColor(currentPlayer.color);
        
                    for (let i = 0 ; i < ballsSet.length; i++){
                        if(!ballsSet[i].inHole){
                            this.foul = true;
                        }
                    }
                    
                    this.won = true;
                }
            }
            else{
                secondPlayer.matchScore.increment();
                // this.foul = true;
            }
        }
        
        GamePolicy.prototype.switchTurns = function(){
            console.log("called switch turns");
            this.turn++;
            this.turn%=2;
            setPlayerTurn(this.turn)
        }
        
        // main loop for policy
        GamePolicy.prototype.updateTurnOutcome = function(){
          // console.log("up");
          // console.log("is foul?", this.foul);
            // console.log("is updating outcome, turn played?: ", this.turnPlayed);
            
            if(!this.turnPlayed){
                return;
            }
        
            if(this.firstCollision == true){
              // console.log("first collision");
                this.foul = true;
            }
        
            if(this.won){
                let winner = undefined;
        
                window.Game.socket.emit('winner', window.Game.roomID, this.turn);
        
                // console.log('won', this.turn, this.foul, window.Game.playerNumber);
                
                if(!this.foul){
                    this.players[this.turn].totalScore.increment();
                    winner = this.turn
        
                    // console.log(winner);
                    if(AI.finishedSession){
                        this.reset()
                        setTimeout(function(){window.Game.gameWorld.reset();
                        }, 1000);
                    }
                }
                else{
                    this.players[(this.turn+1)%2].totalScore.increment();
                    winner = (this.turn+1)%2;
        
                    // console.log(winner);
                    if(AI.finishedSession){
                        this.reset();
                        setTimeout(function(){window.Game.gameWorld.reset();
                        }, 1000);
                    }
                }
        
                window.Game.socket.emit('winner', window.Game.roomID, winner);
        
                // window.Game.socket.emit('winner', window.Game.roomID, winner);
        
                return;
            }
        
            if(!this.scored || this.foul) this.switchTurns();
        
            this.scored = false;
            this.turnPlayed = false;
            this.firstCollision = true;
            this.validBallsInsertedOnTurn = 0;
        
            // console.log("updated turn session", this.foul);
        
            setTimeout(function(){window.Game.gameWorld.whiteBall.visible=true;}, 200);
        
            if(window.AI_ON && this.turn === window.AI_PLAYER_NUM && AI.finishedSession){
                AI.startSession();
            }
        }
        
        GamePolicy.prototype.handleFoul = function(){
        
            if(!Mouse.left.down){
                window.Game.gameWorld.whiteBall.position = Mouse.position;
            }
        
        }
        GamePolicy.prototype.isXOutsideLeftBorder = function(pos, origin){
            return (pos.x - origin.x) < this.leftBorderX;
        }
        GamePolicy.prototype.isXOutsideRightBorder = function(pos, origin){
            return (pos.x + origin.x) > this.rightBorderX;
        }
        GamePolicy.prototype.isYOutsideTopBorder = function(pos, origin){
            return (pos.y - origin.y) < this.topBorderY;
        }
        GamePolicy.prototype.isYOutsideBottomBorder = function(pos , origin){
            return (pos.y + origin.y) > this.bottomBorderY;
        }
        
        GamePolicy.prototype.isOutsideBorder = function(pos,origin){
            return this.isXOutsideLeftBorder(pos,origin) || this.isXOutsideRightBorder(pos,origin) || 
            this.isYOutsideTopBorder(pos, origin) || this.isYOutsideBottomBorder(pos , origin);
        }
        
        GamePolicy.prototype.isInsideTopLeftHole = function(pos){
            return this.topLeftHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
        }
        
        GamePolicy.prototype.isInsideTopRightHole = function(pos){
            return this.topRightHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
        }
        
        GamePolicy.prototype.isInsideBottomLeftHole = function(pos){
            return this.bottomLeftHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
        }
        
        GamePolicy.prototype.isInsideBottomRightHole = function(pos){
            return this.bottomRightHolePos.distanceFrom(pos) < window.HOLE_RADIUS;
        }
        
        GamePolicy.prototype.isInsideTopCenterHole = function(pos){
            return this.topCenterHolePos.distanceFrom(pos) < (window.HOLE_RADIUS + 6);
        }
        
        GamePolicy.prototype.isInsideBottomCenterHole = function(pos){
            return this.bottomCenterHolePos.distanceFrom(pos) < (window.HOLE_RADIUS + 6);
        }
        
        GamePolicy.prototype.isInsideHole = function(pos){
            return this.isInsideTopLeftHole(pos) || this.isInsideTopRightHole(pos) || 
                   this.isInsideBottomLeftHole(pos) || this.isInsideBottomRightHole(pos) ||
                   this.isInsideTopCenterHole(pos) || this.isInsideBottomCenterHole(pos);
        }
        
        GamePolicy.prototype.initiateState = function(policyState){
        
            this.turn = policyState.turn;
            this.firstCollision = policyState.firstCollision;
            this.foul = policyState.foul;
            this.scored = policyState.scored;
            this.won = policyState.won;
            this.turnPlayed = policyState.turnPlayed;
            this.validBallsInsertedOnTurn = policyState.validBallsInsertedOnTurn;
        
            this.players[0].totalScore.value = policyState.players[0].totalScore.value;
            this.players[1].totalScore.value = policyState.players[1].totalScore.value;
        
            this.players[0].matchScore.value = policyState.players[0].matchScore.value;
            this.players[0].color = policyState.players[0].color;
            this.players[1].matchScore.value = policyState.players[1].matchScore.value;
            this.players[1].color = policyState.players[1].color;
        
        }
        
        // export default GamePolicy;
        window.GamePolicy = GamePolicy;
        
        
        function GameWorld() {
        
            this.whiteBallStartingPosition = new window.Vector2(413,413);
        
            // const offsetX = 0.89830508474576271186440677966102;
            // const offsetY = 0.89830508474576271186440677966102;
            const offsetX = 1;
            const offsetY = 1;
        
            this.redBalls = [
            new Ball(new window.Vector2(1056 * offsetX, 433 * offsetY),Color["0"]),//3
            new Ball(new window.Vector2(1090 * offsetX, 374 * offsetY),Color["2"]),//4
            new Ball(new window.Vector2(1126 * offsetX, 393 * offsetY),Color["4"]),//8
            new Ball(new window.Vector2(1126 * offsetX, 472 * offsetY),Color["8"]),//10;
            new Ball(new window.Vector2(1162 * offsetX, 335 * offsetY),Color["10"]),//11
            new Ball(new window.Vector2(1162 * offsetX, 374 * offsetY),Color["12"]),//12
            new Ball(new window.Vector2(1162 * offsetX, 452 * offsetY),Color["14"])//14
            // new Ball(new window.Vector2(1056 * offsetX, 433 * offsetY),Color.red),//3
            // new Ball(new window.Vector2(1090 * offsetX, 374 * offsetY),Color.red),//4
            // new Ball(new window.Vector2(1126 * offsetX, 393 * offsetY),Color.red),//8
            // new Ball(new window.Vector2(1126 * offsetX, 472 * offsetY),Color.red),//10;
            // new Ball(new window.Vector2(1162 * offsetX, 335 * offsetY),Color.red),//11
            // new Ball(new window.Vector2(1162 * offsetX, 374 * offsetY),Color.red),//12
            // new Ball(new window.Vector2(1162 * offsetX, 452 * offsetY),Color.red)//14
            ]
        
            this.yellowBalls = [
            new Ball(new window.Vector2(1022 * offsetX, 413),Color["1"]),//1
            // new Ball(new window.Vector2(1022 * offsetX, 371),Color["1"]),//1
            new Ball(new window.Vector2(1056 * offsetX, 393 * offsetY),Color["3"]),//2
            new Ball(new window.Vector2(1090 * offsetX, 452 * offsetY),Color["5"]),//6
            new Ball(new window.Vector2(1126 * offsetX, 354 * offsetY),Color["7"]),//7
            new Ball(new window.Vector2(1126 * offsetX, 433 * offsetY),Color["9"]),//9
            new Ball(new window.Vector2(1162 * offsetX, 413 * offsetY),Color["11"]),//13
            new Ball(new window.Vector2(1162 * offsetX, 491 * offsetY),Color["13"])//15
            // new Ball(new window.Vector2(1022 * offsetX, 413),Color.yellow),//1
            // // new Ball(new window.Vector2(1022 * offsetX, 371),Color.yellow),//1
            // new Ball(new window.Vector2(1056 * offsetX, 393 * offsetY),Color.yellow),//2
            // new Ball(new window.Vector2(1090 * offsetX, 452 * offsetY),Color.yellow),//6
            // new Ball(new window.Vector2(1126 * offsetX, 354 * offsetY),Color.yellow),//7
            // new Ball(new window.Vector2(1126 * offsetX, 433 * offsetY),Color.yellow),//9
            // new Ball(new window.Vector2(1162 * offsetX, 413 * offsetY),Color.yellow),//13
            // new Ball(new window.Vector2(1162 * offsetX, 491 * offsetY),Color.yellow)//15
            ];
        
            this.whiteBall = new Ball(new window.Vector2(413, 413),Color.white);
            // this.whiteBall = new Ball(new window.Vector2(720, 513),Color.white);
            this.blackBall = new Ball(new window.Vector2(1090 * offsetX, 413 * offsetY),Color.black);
            // this.blackBall = new Ball(new window.Vector2(413 * offsetX, 1090 * offsetY),Color.black);
        
            this.balls = [
            this.yellowBalls[0],
            this.yellowBalls[1],
            this.redBalls[0],
            this.redBalls[1],
            this.blackBall,
            this.yellowBalls[2],
            this.yellowBalls[3],
            this.redBalls[2],
            this.yellowBalls[4],
            this.redBalls[3],
            this.redBalls[4],
            this.redBalls[5],
            this.yellowBalls[5],
            this.redBalls[6],
            this.yellowBalls[6],
            this.whiteBall]
        
            this.stick = new Stick({ x : 413, y : 413 });
            // this.stick = new Stick({ x : 720, y : 513 });
        
            this.gameOver = false;
        }
        
        GameWorld.prototype.getBallsSetByColor = function(color){
            if(color === Color.red || color == "even"){
                return this.redBalls;
            }
            if(color === Color.yellow || color == "odd"){
                return this.yellowBalls;
            }
            if(color === Color.white){
                return this.whiteBall;
            }
            if(color === Color.black){
                return this.blackBall;
            }
        }
        
        GameWorld.prototype.handleInput = function (delta) {
            // const isTurn = window.Game.policy.turn == window.Game.playerNumber;
        
            this.stick.handleInput(delta);
        };
        
        GameWorld.prototype.handleCaster = function (ball, delta) {
          // 1126 354
          
          const caster = this.stick.caster;
        
          const lineStart = {
            x: caster.position.x,
            y: caster.position.y,
          }
        
          const x2 = (lineStart.x + caster.width) * Math.cos(caster.rotation);
          const y2 = (lineStart.y + caster.height) * Math.sin(caster.rotation);
          
          const lineEnd = {
            x: x2,
            y: y2,
          }
        
          const p1 = {
            x: caster.position.x,
            y: caster.position.y,
          }
          // const p1 = {
          //   x: caster.position.x - caster.origin.x,
          //   y: caster.position.y - caster.origin.y,
          // }
        
          const p2 = {
            x: ball.position.x,
            y: ball.position.y,
          }
        
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
        
          // 436
          const distance = Math.hypot(dx, dy);
        
          if(distance > caster.width) return;
         
          const cosAngle = Math.cos(caster.rotation);
          const sinAngle = Math.sin(caster.rotation);
        
          const testX = distance * cosAngle;
          const testY = distance * sinAngle;
        
          const rayCastX = caster.position.x + testX;
          const rayCastY = caster.position.y + testY;
        
          const circlePointDx = rayCastX - p2.x;
          const circlePointDy = rayCastY - p2.y;
        
          const circlePointMag = Math.sqrt(Math.pow(circlePointDx, 2) + Math.pow(circlePointDy, 2))
        
          if(circlePointMag < window.BALL_SIZE / 2) {
            if(!caster.collided) caster.collided = true;
        
            const newDx = p2.x - p1.x;
            const newDy = p2.y - p1.y;
        
            const newDistance = Math.hypot(newDx, newDy);
        
            const projectionX = newDistance * cosAngle;
            const projectionY = newDistance * sinAngle;
        
            const subFactorX = cosAngle * 45;
            const subFactorY = sinAngle * 45;
        
            const rayCastX = caster.position.x + (projectionX - subFactorX);
            const rayCastY = caster.position.y + (projectionY - subFactorY);
        
            // console.log(newDistance, distance);
            
            caster.projection.position.x = rayCastX;
            caster.projection.position.y = rayCastY;
        
            caster.width = distance;
            // caster.width = newDistance;
        
            // console.log(p2.x, caster.projection.position.x);
        
            /* const adjacent = p2.x - caster.projection.position.x;
            const opposite = p2.y - caster.projection.position.y; */
            const adjacent = p2.x - caster.projection.position.x;
            const opposite = p2.y - caster.projection.position.y;
        
            let ballRotation = Math.atan2(opposite, adjacent);
        
            // console.log(opposite, adjacent);
        
            // console.log(ballRotation * 180 / Math.PI);
            // console.log(ballRotation * 180 / Math.PI);
        
            // console.log(p2.x, p2.y);
        
            caster.result.position.x = p2.x;
            caster.result.position.y = p2.y;
          
            /* const radFactor = circlePointMag / (window.BALL_SIZE / 2);
            
            const ballProjectionX = Math.cos(radFactor * ballRotation);
            const ballProjectionY = Math.sin(radFactor * ballRotation);
        
            caster.result.position.x += 30 * ballProjectionX
            caster.result.position.y += 30 * ballProjectionY */
            
            caster.result.width = 30;
            // caster.result.rotation = Math.atan2(p2.y - caster.result.position.y, p2.x - caster.result.position.x);
            caster.result.rotation = ballRotation;
          }
          else {
            // caster.width = 1500;
            // console.log("not");
          }
        }
        
        
        GameWorld.prototype.update = function (delta) {
            this.stick.update(delta);
        
            for (let i = 0 ; i < this.balls.length; i++){
                for(let j = i + 1 ; j < this.balls.length ; j++){
                    this.handleCollision(this.balls[i], this.balls[j], delta);
                }
            }
        
            for (let i = 0 ; i < this.balls.length; i++) {
                this.balls[i].update(delta);
                if(this.balls[i].color != Color.white) this.handleCaster(this.balls[i], delta);
            }
        
            if(!this.ballsMoving() && AI.finishedSession){
                window.Game.policy.updateTurnOutcome();   
                if(window.Game.policy.foul || window.Game.policy.firstPlay){
                    this.ballInHand();
                }
            }
        
        };
        
        GameWorld.prototype.notDown = function() {
            if(window.Game.policy.firstPlay) {
                this.whiteBall.position.y = Mouse.position.y;
                if(Mouse.position.x <= 413 && Mouse.position.x >= 0) {
                    this.whiteBall.position.x = Mouse.position.x;
                }
            }
            else {
                this.whiteBall.position = Mouse.position;
            }
        }
        
        GameWorld.prototype.isDown = function() {
            let ballsOverlap = this.whiteBallOverlapsBalls();
        
            if(!window.Game.policy.isOutsideBorder(Mouse.position,this.whiteBall.origin) &&
                !window.Game.policy.isInsideHole(Mouse.position) &&
                !ballsOverlap){
                window.KEYBOARD_INPUT_ON = true;
                Keyboard.reset();
                Mouse.reset();
                if(window.Game.policy.firstPlay) {
                    window.Game.policy.firstPlay = false;
                    this.whiteBall.position.y = Mouse.position.y;
                }
                else {
                    this.whiteBall.position = Mouse.position;
                }
                this.whiteBall.inHole = false;
                window.Game.policy.foul = false;
                this.stick.position = this.whiteBall.position;
                this.stick.visible = true;
            }
        }
        
        GameWorld.prototype.ballInHand = function(){
        
            // const isTurn = window.Game.policy.turn == window.Game.playerNumber;
          // console.log("in hand");
          // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
            if(window.AI_ON && window.Game.policy.turn === window.AI_PLAYER_NUM){
                return;
            }
        
            window.KEYBOARD_INPUT_ON = false;
            this.stick.visible = false;
            // console.log(Mouse.left.down);
        
            // console.log("is My Turn???", window.Game.isTurn(), window.Game.policy.turn, window.Game.playerNumber);
        
            if(window.Game.isTurn()) {
                if(!Mouse.left.down){
                    this.notDown();
                }
                else{
                    this.isDown();
                }
        
                const x = this.whiteBall.position.x
                const y = this.whiteBall.position.y
        
                window.Game.socket.emit('first_play', window.Game.roomID, x, y, Mouse.left.down);
            }
            else {
                Mouse.position.x = window.Game.packetData.mouseX;
                Mouse.position.y = window.Game.packetData.mouseY;
                Mouse.left.down = window.Game.packetData.mouseLeftDown;
        
                // console.log("receiving first play packet", Mouse.left.down);
        
                if(!Mouse.left.down){
                    this.notDown();
                }
                else {
                    this.isDown();
                }
        
                Mouse.left.down = false;
            }
        
        }
        
        GameWorld.prototype.whiteBallOverlapsBalls = function(){
        
            let ballsOverlap = false;
            for (let i = 0 ; i < this.balls.length; i++) {
                if(this.whiteBall !== this.balls[i]){
                    if(this.whiteBall.position.distanceFrom(this.balls[i].position)<window.BALL_SIZE){
                        ballsOverlap = true;
                    }
                }
            }
        
            return ballsOverlap;
        }
        
        GameWorld.prototype.ballsMoving = function(){
        
            let ballsMoving = false;
        
            for (let i = 0 ; i < this.balls.length; i++) {
                if(this.balls[i].moving){
                    ballsMoving = true;
                }
            }
        
            return ballsMoving;
        }
        
        GameWorld.prototype.handleCollision = function(ball1, ball2, delta){
        
            if(ball1.inHole || ball2.inHole)
                return;
        
            if(!ball1.moving && !ball2.moving)
                return;
        
            let ball1NewPos = ball1.position.add(ball1.velocity.multiply(delta));
            let ball2NewPos = ball2.position.add(ball2.velocity.multiply(delta));
        
            let dist = ball1NewPos.distanceFrom(ball2NewPos);
        
            if(dist<window.BALL_SIZE){
                window.Game.policy.checkColisionValidity(ball1, ball2);
        
                let power = (Math.abs(ball1.velocity.x) + Math.abs(ball1.velocity.y)) + 
                            (Math.abs(ball2.velocity.x) + Math.abs(ball2.velocity.y));
                power = power * 0.00482;
        
                if(window.Game.sound && window.SOUND_ON){
                    let ballsCollide = sounds.ballsCollide.cloneNode(true);
                    ballsCollide.volume = (power/(20))<1?(power/(20)):1;
                    ballsCollide.play();
                }
        
                let opposite = ball1.position.y - ball2.position.y;
                let adjacent = ball1.position.x - ball2.position.x;
                let rotation = Math.atan2(opposite, adjacent);
        
                // console.log(rotation);
                // console.log(opposite, adjacent);
        
                // console.log(ball1.position.x, ball2.position.x, ball1.position.y, ball2.position.y);
                // console.log(this.stick.caster.projection.position.x, this.stick.caster.projection.position.y);
                // console.log(ball1.color);
        
                ball1.moving = true;
                ball2.moving = true;
        
                let velocity2 = new window.Vector2(90*Math.cos(rotation + Math.PI)*power,90*Math.sin(rotation + Math.PI)*power);
                ball2.velocity = ball2.velocity.addTo(velocity2);
                // console.log("velocity 2", velocity2);
        
                ball2.velocity.multiplyWith(0.97);
        
                let velocity1 = new window.Vector2(90*Math.cos(rotation)*power,90*Math.sin(rotation)*power);
                // console.log("ball 1 initial v", ball1.velocity);
                ball1.velocity = ball1.velocity.addTo(velocity1);
        
                // const vec = velocity1.copy();
        
                // vec.normalize();
        
                // console.log("velocity 1", vec.x, vec.y);
        
                ball1.velocity.multiplyWith(0.97);
            }
            else {
              // if no collision occurs
              window.Game.policy.firstCollision = false
            }
        
        }
        
        GameWorld.prototype.draw = function () {
            // Canvas2D.drawImage(sprites.background, new window.Vector2(1490, 0), undefined, 0.9, undefined);
            // console.log(window.Game.size);
            const newX = 76.271186440677966101694915254235;
            const newY = 41.949152542372881355932203389829;
        
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
            let rotation = isMobile ? 90 * Math.PI / 180 : undefined;
            let scale = isMobile ? 1.2 : 1;
        
            // 1500 x 825
        
            // Canvas2D.drawImage(sprites.background, new window.Vector2((1500 / 2) + 500, newY), rotation, scale, new window.Vector2(0, 0));
            if(isMobile) {
              // Canvas2D.drawImage(sprites.background, new window.Vector2((window.Game.size.x / 2) + (sprites.background.height / 2), 0), rotation, 1, new window.Vector2(0, 0));
              Canvas2D.drawImage(sprites.background, undefined, undefined, 1, undefined);
            }
            else {
              Canvas2D.drawImage(sprites.background, undefined, undefined, 1, undefined);
            }
            window.Game.policy.drawScores();
        
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].draw();
            }
        
            this.stick.draw();
        };
        
        GameWorld.prototype.reset = function () {
            this.gameOver = false;
        
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].reset();
            }
        
            this.stick.reset();
        
            if(window.AI_ON && window.AI_PLAYER_NUM === 0){
                AI.startSession();
            }
        };
        
        GameWorld.prototype.initiateState = function(balls){
            
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].position.x = balls[i].position.x;
                this.balls[i].position.y = balls[i].position.y;
                this.balls[i].visible = balls[i].visible;
                this.balls[i].inHole = balls[i].inHole;
            }
        
            this.stick.position = this.whiteBall.position;
        }
        
        // export default GameWorld;
        window.GameWorld = GameWorld;
        
        
        
        // import socket from "../socket";
        
        let sprites = {};
        let sounds = {};
        
        const stillLoading = document.createElement('div');
        
        stillLoading.innerHTML = `
            <h2>Loading Assets</h2>
        `;
        
        stillLoading.style.position = "absolute"
        stillLoading.style.width = "100vw";
        stillLoading.style.height = "100vh";
        stillLoading.style.backgroundColor = "white";
        stillLoading.style.top = "0";
        stillLoading.style.color = "black";
        stillLoading.style.zIndex = "100";

        const waiting = document.createElement('div');
        
        waiting.innerHTML = `
            <h2>Waiting</h2>
        `;
        
        waiting.style.position = "absolute"
        waiting.style.width = "100vw";
        waiting.style.height = "100vh";
        waiting.style.backgroundColor = "white";
        waiting.style.top = "0";
        waiting.style.color = "black";
        waiting.style.zIndex = "100";
        
        let requestAnimationFrame = (function () {
            return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        
        function Game_Singleton() {
            this.size = undefined;
            this.spritesStillLoading = 0;
            this.gameWorld = undefined;
            this.sound = true;
            this.playerNumber = 0;
            this.mainMenu = new Menu();
            this.roomID = '';
        
            // this.dev = 'http://localhost:3000/snooker';
            // // this.dev = 'http://127.0.0.1:3000/snooker';
            // // this.dev = 'http://192.168.8.100:3000/snooker';
            // this.prod = 'https://new-server-ozkr.onrender.com/snooker';
        
            // this.url = this.dev
            // this.url = this.prod
        
            // this.socket = io(this.url, {
            //     autoConnect: false
            // })
        
            this.username = '';
            this.avatar = '';
        
            this.socket = socket
        
            this.packetData = {
                rotation: 0,
                w: false,
                s: false,
                keyInput: false,
                power: 0,
                leftDown: false,
                space: false,
                mouseX: 0,
                mouseY: 0,
                mouseLeftDown: false,
                originX: 970,
                mobilePower: 0
            }
        }
        
        Game_Singleton.prototype.start = function (divName, canvasName, x, y, username, avatar) {
            this.username = username;
            this.avatar = avatar
            this.size = new window.Vector2(x,y);
            Canvas2D.initialize(divName, canvasName);
            document.body.appendChild(stillLoading);
            console.log("appended stillLoading");
            this.loadAssets();
            this.assetLoadingLoop();
            // window.notStarted = false
        };
        
        Game_Singleton.prototype.initialize = function () {
            console.log("initializing");
            this.gameWorld = new GameWorld();
            this.policy = new GamePolicy();
            
            // this.initMenus();
        
            AI.init(this.gameWorld, this.policy);
        
            window.AI_ON = false;
            Game.mainMenu.active = false;
            window.GAME_STOPPED = false;
            setTimeout(Game.startNewGame,200);
            // sounds.fadeOut(Game.mainMenu.sound);
        };
        
        Game_Singleton.prototype.initMenus = function(inGame){
        
            let labels = generateMainMenuLabels("Classic 8-Ball");
        
            let buttons = generateMainMenuButtons(inGame);
        
            this.mainMenu.init
            (
                sprites.mainMenuBackground,
                labels,
                buttons,
                sounds.jazzTune
            );
        }
        
        Game_Singleton.prototype.loadSprite = function (imageName) {
            console.log("Loading sprite: " + imageName);
            let image = new Image();
            image.onload = function () {
                console.log("image fully loaded", imageName);
                Game.spritesStillLoading -= 1;
            };
        
            image.src = imageName;
        
            this.spritesStillLoading += 1;
            return image;
        };
        
        Game_Singleton.prototype.assetLoadingLoop = function () {
            // console.log(Game.spritesStillLoading);
            if (Game.spritesStillLoading > 0) {
                // console.log("images still loading");
                requestAnimationFrame(Game.assetLoadingLoop);
            }
            else {
                console.log("images done loading");
                document.body.removeChild(stillLoading);
                console.log("remove stillLoading");
                document.body.appendChild(waiting);
                Game.initialize();
                // window.notStarted = false
                // requestAnimationFrame(this.mainMenu.load.bind(this.mainMenu));
            }
        };
        
        Game_Singleton.prototype.handleInput = function(){
        
            if(Keyboard.down(Keys.escape)){
                window.GAME_STOPPED = true;
                Game.initMenus(true);
                requestAnimationFrame(Game.mainMenu.load.bind(this.mainMenu));
            }
        }
        
        function getRoomID() {
            const url = new URL(window.location)
        
            const search = url.hash
        
            const searchParams = new URLSearchParams(search)
        
            const roomID = Array.from(searchParams.entries())[0][1]
        
            console.log(url, Array.from(searchParams.entries()));
        
            return roomID;
            // const url = window.location
        
            // const roomID = new URL(url).searchParams.get('id')
        
            // return roomID;
        }
        
        function joinGame(socket, roomID, username, avatar) {
            socket.emit('join_game', roomID, username, avatar)
        
            Game.roomID = roomID;
        }
        
        // Game_Singleton.prototype.setOpponent = function(){
            
        // }
        
        // Game_Singleton.prototype.multiplayer.playTurn = function(socket) {
        // }
        
        Game_Singleton.prototype.startNewGame = function(){
            console.log("starting");
            Canvas2D._canvas.style.cursor = "auto";
        
            Game.gameWorld = new GameWorld();
            Game.policy = new GamePolicy();
        
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              Game.gameWorld.stick.trackMouse = false;
              Game.gameWorld.stick.useJoystick = true;
        
              Game.gameWorld.stick.chooseControl();
        
              document.querySelector('#power').style.display = "unset";
              document.querySelector('#base').style.display = "unset";
            }
        
            Canvas2D.clear();
            // Canvas2D.drawImage(
            //     sprites.controls, 
            //     new window.Vector2(Game.size.x/2,Game.size.y/2), 
            //     0, 
            //     1, 
            //     new window.Vector2(sprites.controls.width/2,sprites.controls.height/2)
            // );
        
            setTimeout(()=>{
                AI.init(Game.gameWorld, Game.policy);
        
                if(window.AI_ON && window.AI_PLAYER_NUM == 0){
                    AI.startSession();
                }
        
                // const dev = 'http://localhost:3000/snooker';
                // const prod = '';
        
                // const socket = io(dev, {
                //     autoConnect: false
                // })
        
                // socket.connect();
        
                Game.socket.connect();
        
                const roomID = getRoomID();
        
                joinGame(Game.socket, roomID, Game.username, Game.avatar);
        
                Game.socket.once('joined_game', () => {
                    console.log("you joined game");
        
                    Game.playerNumber = 1;
                })
        
                Game.socket.once('start_game', (playerOneInfo, playerTwoInfo) => {
                    setPlayerInfo({
                        playerOneInfo: playerOneInfo,
                        playerTwoInfo: playerTwoInfo
                    })
                    console.log("start game");
                    document.body.removeChild(waiting);
                    Game.mainLoop();
                    window.notStarted = false
                })
        
                Game.socket.on('stick_rotate', (rotation) => {
                    Game.packetData.rotation = rotation;
                })
        
                Game.socket.on('movement_input', (w, s, keyInput) => {
                    Game.packetData.w = w;
                    Game.packetData.s = s;
                    Game.packetData.keyInput = keyInput;
                });
        
                Game.socket.on('mobile_movement_input', (originX) => {
                    Game.packetData.originX = originX;
                });
        
                Game.socket.on('mobile_stick_strike', (power) => {
                    Game.packetData.mobilePower = power;
                });
        
                Game.socket.on('stick_strike', (power, leftDown, space) => {
                    Game.packetData.power = power;
                    Game.packetData.leftDown = leftDown;
                    Game.packetData.space = space;
                });
        
                Game.socket.on('first_play', (x, y, down) => {
                    Game.packetData.mouseX = x;
                    Game.packetData.mouseY = y;
        
                    Game.packetData.mouseLeftDown = down;
                })
        
                // Game.mainLoop();
            }, 0);
        
            // Game.gameWorld.handleCaster(Game.gameWorld.balls[0]);
        }
        
        Game_Singleton.prototype.continueGame = function(){
            Canvas2D._canvas.style.cursor = "auto";
        
            requestAnimationFrame(Game.mainLoop);
        }
        
        Game_Singleton.prototype.mainLoop = function () {
            // console.log(Game.playerNumber);
            // console.log("loop running");
            
        
            if(window.DISPLAY && !window.GAME_STOPPED){
                Game.gameWorld.handleInput(window.DELTA);
                Game.gameWorld.update(window.DELTA);
                Canvas2D.clear();
                Game.gameWorld.draw();
                Mouse.reset();
                Game.handleInput();
                requestAnimationFrame(Game.mainLoop);
            }
        };
        
        Game_Singleton.prototype.isTurn = function () {
            return Game.policy.turn == Game.playerNumber
        }
        
        let Game = new Game_Singleton();
        
        // export default Game;
        window.Game = Game;
        
        Game.loadAssets = function () {
            let url = process.env.NODE_ENV == "development" ? "" : "/user_dashboard";

            let loadSprite = function (sprite) {
                return Game.loadSprite(url + "/assets/sprites/" + sprite);
            };
        
             let loadSound = function (sound) {
                return new Audio(url + "/assets/sounds/" + sound);
            };
        
            sprites.ball0 = loadSprite("balls/0.png");
            sprites.ball1 = loadSprite("balls/1.png");
            sprites.ball2 = loadSprite("balls/2.png");
            sprites.ball3 = loadSprite("balls/3.png");
            sprites.ball4 = loadSprite("balls/4.png");
            sprites.ball5 = loadSprite("balls/5.png");
            sprites.ball7 = loadSprite("balls/7.png");
            sprites.ball8 = loadSprite("balls/8.png");
            sprites.ball9 = loadSprite("balls/9.png");
            sprites.ball10 = loadSprite("balls/10.png");
            sprites.ball11 = loadSprite("balls/11.png");
            sprites.ball12 = loadSprite("balls/12.png");
            sprites.ball13 = loadSprite("balls/13.png");
            sprites.ball14 = loadSprite("balls/14.png");
        
            sprites.mainMenuBackground = loadSprite("main_menu_background.png");
            sprites.background = loadSprite("spr_background4.png");
            sprites.ball = loadSprite("spr_ball2.png");
            sprites.redBall = loadSprite("spr_redBall2.png");
            sprites.yellowBall = loadSprite("spr_yellowBall2.png");
            sprites.blackBall = loadSprite("spr_blackBall2.png");
            sprites.stick = loadSprite("spr_stick.png");
            sprites.twoPlayersButton = loadSprite("2_players_button.png");
            sprites.twoPlayersButtonHover = loadSprite("2_players_button_hover.png");
            sprites.onePlayersButton = loadSprite("1_player_button.png");
            sprites.onePlayersButtonHover = loadSprite("1_player_button_hover.png");
            sprites.muteButton = loadSprite("mute_button.png");
            sprites.muteButtonHover = loadSprite("mute_button_hover.png");
            sprites.muteButtonPressed = loadSprite("mute_button_pressed.png");
            sprites.muteButtonPressedHover = loadSprite("mute_button_pressed_hover.png");
            sprites.easyButton = loadSprite("easy_button.png");
            sprites.easyButtonHover = loadSprite("easy_button_hover.png");
            sprites.mediumButton = loadSprite("medium_button.png");
            sprites.mediumButtonHover = loadSprite("medium_button_hover.png");
            sprites.hardButton = loadSprite("hard_button.png");
            sprites.hardButtonHover = loadSprite("hard_button_hover.png");
            sprites.backButton = loadSprite("back_button.png");
            sprites.backButtonHover = loadSprite("back_button_hover.png");
            sprites.continueButton = loadSprite("continue_button.png");
            sprites.continueButtonHover = loadSprite("continue_button_hover.png");
            sprites.insaneButton = loadSprite("insane_button.png");
            sprites.insaneButtonHover = loadSprite("insane_button_hover.png");
            sprites.aboutButton = loadSprite("about_button.png");
            sprites.aboutButtonHover = loadSprite("about_button_hover.png");
            sprites.controls = loadSprite("controls.png");
        
            sounds.side = loadSound("Side.wav");
            sounds.ballsCollide = loadSound("BallsCollide.wav");
            sounds.strike = loadSound("Strike.wav");
            sounds.hole = loadSound("Hole.wav");
            
            // Bossa Antigua Kevin MacLeod (incompetech.com)
            // Licensed under Creative Commons: By Attribution 3.0 License
            // http://creativecommons.org/licenses/by/3.0/
            sounds.jazzTune = loadSound("Bossa Antigua.mp3");
        }
        
        sounds.fadeOut = function(sound) {
        
            let fadeAudio = setInterval(function () {
        
                if(window.GAME_STOPPED)
                    return;
        
                // Only fade if past the fade out point or not at zero already
                if ((sound.volume >= 0.05)) {
                    sound.volume -= 0.05;
                }
                else{
                    sound.pause();
                    clearInterval(fadeAudio);
                }
            }, 400);
        }
        
        // export {sprites, sounds};
        window.sprites = sprites;
        window.sounds = sounds;
        
        
        const baseDiv = document.createElement("div");
        
        baseDiv.id = "base";
        
        const powerDiv = document.createElement("div");
        
        powerDiv.id = "power";
        
        baseDiv.appendChild(powerDiv);
        
        document.body.appendChild(baseDiv);
        // const powerDiv = document.querySelector("#power");
        
        // powerDiv.style.width = "700px"
        const maxMovePx = 500;
        const maxPower = 75;
        // const maxOriginX = 123;
        const maxOriginX = 4;
        let originalOriginX = 970;
        let x, y, moveX, moveY, prevMoveX;
        let power = 0;
        let originX = 0;
        
        window.powerHandleStart = function(e) {
          if(window.Game.policy.turn != window.Game.playerNumber) return
        //   console.log(window.Game.policy.turn, window.Game.playerNumber);
        
          console.log("touch start");
          
          x = e.touches[0].pageX;
          y = e.touches[0].pageY;
        
          if(window.Game.policy.foul || window.Game.policy.firstPlay) {
            Mouse.left.down = true;
          }
        }
        
        window.powerHandleMove = function(e) {
          if(window.Game.policy.turn != window.Game.playerNumber) return
        
          prevMoveX = moveX;
        
          moveX = (x - e.touches[0].pageX);
          moveY = (y - e.touches[0].pageY);
        
          // x = e.touches[0].pageX;
          // y = e.touches[0].pageY;
        
          if(moveX > 0 && moveX <= maxMovePx) {
            // console.log(prevMoveX, moveX);
            // console.log(moveX);
            powerDiv.style.translate = `${moveX * -1}px 0`;
        
            if(prevMoveX > moveX) {
              // console.log("right");
              window.Game.gameWorld.stick.origin.x -= 2;
            }
            else {
              // console.log("left");
              window.Game.gameWorld.stick.origin.x += 2;
            }
            // console.log(originX);
        
            // window.Game.gameWorld.stick.origin.x += originX;
            // window.Game.gameWorld.stick.origin.x = originX;
          }
          else if(moveX <= 0) {
            moveX = 0;
            window.Game.gameWorld.stick.origin.x = originalOriginX
          }
        
          window.Game.socket.emit('mobile_movement_input', window.Game.roomID, window.Game.gameWorld.stick.origin.x);
        
          // console.log(moveX);
        
        
          // console.log(moveX);
        }
        
        window.powerHandleEnd = function(e) {
          // console.log(moveX);
          if(window.Game.policy.turn != window.Game.playerNumber) return
        
          if(moveX > 0) {
            power = moveX > maxMovePx ? maxPower : (moveX / maxMovePx) * maxPower;
            // originX = moveX > maxMovePx ? maxOriginX : (moveX / maxMovePx) * maxOriginX;
        
            window.Game.gameWorld.stick.power = power;
            // window.Game.gameWorld.stick.origin.x = originX;
            // handleMouseDown({which: 1})
            // handleMouseUp({which: 1})
            // console.log(window.Game.gameWorld.stick);
            // console.log(power, originX);
            let mousedownEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window,
                which: 1
            });
        
            document.dispatchEvent(mousedownEvent);
        
            let mouseupEvent = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window,
                which: 1
            });
        
            setTimeout(() => {
              document.dispatchEvent(mouseupEvent);
            }, 1000)
        
            window.Game.socket.emit('mobile_stick_strike', window.Game.roomID, power)
          }
        
          x = 0;
          y = 0;
        
          powerDiv.style.translate = `${x}px 0`;
        }
        
        powerDiv.addEventListener("touchstart", (e) => {
          window.powerHandleStart(e);
        })
        
        powerDiv.addEventListener("touchmove", (e) => {
          window.powerHandleMove(e);
        })
        
        powerDiv.addEventListener("touchend", (e) => {
          window.powerHandleEnd(e);
        })
        // const vpTag = document.querySelector('meta[name="viewport"]');

        // vpTag.remove();

        // // console.log(vpTag);

        // // document.removeChild(vpTag);

        const css = document.createElement('link');

        css.rel = "stylesheet"
        css.href = process.env.NODE_ENV == "development" ? "/css/game-layout.css" : "/user_dashboard/css/game-layout.css"

        document.head.appendChild(css);

        css.onload = () => {
            setTimeout(() => {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                console.log(isMobile);
                const username = props.user.username;
                const avatar = props.user.avatar;

                if(isMobile) {
                    console.log("yh");
                    const _canvas = document.getElementById("screen");
                    const _div = document.getElementById("gameArea");
        
        
                    _div.style.rotate = "90deg";
        
                    _canvas.style.position = "relative";
                    _canvas.style.left = "50%";
                    _canvas.style.top = "50%";
                    _canvas.style.translate = "-50% -50%";
                    // _canvas.style.position = "relative"
                    // _canvas = document.getElementById(canvasName);
                    // _div = document.getElementById(divName);
        
                    // _div.style.rotate = "90deg";
        
                    // Game.start('gameArea','screen', window.innerWidth, 1000);
                    // Game.start('gameArea','screen', 1500 * 0.5, 825 * 0.5);
                    // Game.start('gameArea','screen', window.innerHeight + 300, window.innerWidth);
                    // Game.socket = socket;
                    window.Game.start('gameArea','screen', 1500, 825, username, avatar);
                }
                else {
                    window.Game.start('gameArea','screen', 1500, 825, username, avatar);
                }
        
                document.getElementById('gameArea').style.backgroundColor = "black";
            }, 500)
        }


        return () => {
            document.head.removeChild(css);
            socket.disconnect();
            window.notStarted = true;
            window.GAME_STOPPED = true;
            
            // const meta = document.createElement('meta');

            // // <meta name="viewport" content="width=device-width, initial-scale=1" />

            // meta.name = "viewport";
            // meta.content = "width=device-width, initial-scale=1";

            // document.head.appendChild(meta);
        }
    }, [])

    return (
        <>  
            <Overhead /*Game={Game}*/ playerOneInfo={playerInfo.playerOneInfo} playerTwoInfo={playerInfo.playerTwoInfo} turn={playerTurn} />
            <div id="gameArea">
                <canvas id="screen" width="2000" height="1000" onContextMenu={() => false}></canvas>
            </div>  
        </>
    )
}

export default Snooker
