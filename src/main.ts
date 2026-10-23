// @deno-types="./asset-url.d.ts"
import eyeUrl from "./assets/eye.png?no-inline";

// @deno-types="./asset-url.d.ts"
import mouthUrl from "./assets/mouth.png?no-inline";

const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A face with illustrated eye and mouth images");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

// Image: Eye
/*source:
 File Name: Higher quality transparent just an eye png
 Url: https://www.deviantart.com/klaptohasdeviantart/art/Higher-quality-transparent-just-an-eye-png-990783679
 Creator: KLAPTOHASDEVIANTART
 License: Free License
*/
const eyeImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
eyeImage.setAttribute("href", eyeUrl);
eyeImage.setAttribute("x", "35");
eyeImage.setAttribute("y", "65");
eyeImage.setAttribute("width", "50");
eyeImage.setAttribute("height", "50");
face.append(eyeImage);

const secondEyeImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
secondEyeImage.setAttribute("href", eyeUrl);
secondEyeImage.setAttribute("x", "115");
secondEyeImage.setAttribute("y", "65");
secondEyeImage.setAttribute("width", "50");
secondEyeImage.setAttribute("height", "50");
face.append(secondEyeImage);

// Image: Mouth
/*source:
 File Name: Smiling Mouth With A Teeth Illustration Of Happy Free PNG and Clipart
 Url: https://pngtree.com/freepng/smiling-mouth-with-a-teeth-illustration-of-happy_20316534.html
 Creator: Shihab shahrirar
 License: Free License
*/
const mouthImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
mouthImage.setAttribute("href", mouthUrl);
mouthImage.setAttribute("x", "75");
mouthImage.setAttribute("y", "125");
mouthImage.setAttribute("width", "50");
mouthImage.setAttribute("height", "50");
face.append(mouthImage);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
