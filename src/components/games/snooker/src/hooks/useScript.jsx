// import { useEffect } from 'react';

// const useScript = url => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     const script2 = document.createElement('script');

//     const css = document.createElement('link');

//     css.rel = "stylesheet"
//     css.href = "../src/components/games/snooker/css/game-layout.css"

//     document.head.appendChild(css);

//     script2.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";
//     script2.integrity = "sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO"
//     script2.crossOrigin = "anonymous"

//     document.head.appendChild(script2)

//     // document.body.appendChild(script2)

//     // script2.onload = () => console.log("omo")

//     script.src = url;
//     script.async = true;

//     document.head.appendChild(script);

//     script.onload = () => {
//         console.log(script);
//         $LAB
//                 .script('../src/components/games/snooker/script/system/Keys.js').wait()
//                 .script('../src/components/games/snooker/script/system/Color.js').wait()
//                 .script('../src/components/games/snooker/script/geom/Vector2.js').wait()
//                 .script('../src/components/games/snooker/script/input/ButtonState.js').wait()
//                 .script('../src/components/games/snooker/script/input/Keyboard.js').wait()
//                 .script('../src/components/games/snooker/script/input/Mouse.js').wait()
//                 .script('../src/components/games/snooker/script/input/JoyStick.js').wait()
//                 .script('../src/components/games/snooker/script/input/MyJoyStick.js').wait()
//                 .script('../src/components/games/snooker/script/Global.js').wait()
//                 .script('../src/components/games/snooker/script/Canvas2D.js').wait()
//                 .script('../src/components/games/snooker/script/game_objects/Score.js').wait()
//                 .script('../src/components/games/snooker/script/game_objects/Ball.js').wait()
//                 .script('../src/components/games/snooker/script/game_objects/Stick.js').wait()
//                 .script('../src/components/games/snooker/script/game_objects/RayCaster.js').wait()
//                 .script('../src/components/games/snooker/script/menu/Label.js').wait()
//                 .script('../src/components/games/snooker/script/menu/Button.js').wait()
//                 .script('../src/components/games/snooker/script/menu/Menu.js').wait()
//                 .script('../src/components/games/snooker/script/menu/MainMenu.js').wait()
//                 .script('../src/components/games/snooker/script/AI/Opponent.js').wait()
//                 .script('../src/components/games/snooker/script/AI/AIPolicy.js').wait()
//                 .script('../src/components/games/snooker/script/AI/AITrainer.js').wait()
//                 .script('../src/components/games/snooker/script/game_objects/Player.js').wait()
//                 .script('../src/components/games/snooker/script/GamePolicy.js').wait()
//                 .script('../src/components/games/snooker/script/GameWorld.js').wait()
//                 .script('../src/components/games/snooker/script/Game.js').wait()
//                 .script('../src/components/games/snooker/script/MobileDragStick.js').wait()
//                 .script('../src/components/games/snooker/script/Assets.js').wait(function () {
//                   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//                   console.log(isMobile);
//                   if(isMobile) {
//                     console.log("yh");
//                     const _canvas = document.getElementById("screen");
//                     const _div = document.getElementById("gameArea");


//                     _div.style.rotate = "90deg";

//                     _canvas.style.position = "relative";
//                     _canvas.style.left = "50%";
//                     _canvas.style.top = "50%";
//                     _canvas.style.translate = "-50% -50%";
//                     // _canvas.style.position = "relative"
//                     // _canvas = document.getElementById(canvasName);
//                     // _div = document.getElementById(divName);

//                     // _div.style.rotate = "90deg";
//                     // Game.start('gameArea','screen', window.innerWidth, 1000);
//                     // Game.start('gameArea','screen', 1500 * 0.5, 825 * 0.5);
//                     // Game.start('gameArea','screen', window.innerHeight + 300, window.innerWidth);
//                     Game.start('gameArea','screen', 1500, 825);
//                   }
//                   else {
//                     Game.start('gameArea','screen', 1500, 825);
//                   }
//                 });
//     };

//     return () => {
//       document.head.removeChild(script2);
//       document.head.removeChild(script);
//       document.head.removeChild(css);
//     }
//   }, [url]);
// };

// export default useScript;