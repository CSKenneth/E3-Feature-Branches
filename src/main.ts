const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

function buildFace(): SVGSVGElement {
  // The prototype grew inline. Keep it this way until the refactoring checkpoint.
  const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  face.setAttribute("viewBox", "0 0 200 200");
  face.setAttribute("role", "img");
  face.setAttribute(
    "aria-label",
    "A face with freckles, decorative spikes, and a halo",
  );

  // Decorative triangular spikes around the head.
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const spike = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    const tipX = 100 + 94 * Math.cos(angle);
    const tipY = 100 + 103 * Math.sin(angle);
    const leftX = 100 + 78 * Math.cos(angle - 0.06);
    const leftY = 100 + 86 * Math.sin(angle - 0.06);
    const rightX = 100 + 78 * Math.cos(angle + 0.06);
    const rightY = 100 + 86 * Math.sin(angle + 0.06);
    spike.setAttribute(
      "points",
      `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`,
    );
    spike.setAttribute("fill", i % 2 === 0 ? "#e7a84e" : "#bd8052");
    spike.setAttribute("stroke", "#302c29");
    spike.setAttribute("stroke-width", "1.5");
    face.append(spike);
  }

  // Circular halo surrounding the head.
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const halo = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    halo.setAttribute("cx", String(100 + 82 * Math.cos(angle)));
    halo.setAttribute("cy", String(100 + 90 * Math.sin(angle)));
    halo.setAttribute("r", i % 2 === 0 ? "4" : "3");
    halo.setAttribute("fill", i % 2 === 0 ? "#e7a84e" : "#bd8052");
    face.append(halo);
  }

  const head = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse",
  );
  head.setAttribute("cx", "100");
  head.setAttribute("cy", "100");
  head.setAttribute("rx", "78");
  head.setAttribute("ry", "86");
  head.setAttribute("fill", "#f3cf87");
  head.setAttribute("stroke", "#302c29");
  head.setAttribute("stroke-width", "4");
  face.append(head);

  // Freckles scattered across both cheeks.
  for (const side of [-1, 1]) {
    for (let i = 0; i < 60; i++) {
      const col = i % 8;
      const row = Math.floor(i / 8);
      const x = 100 + side * (24 + col * 4.5 + Math.sin(i * 2.1) * 2);
      const y = 94 + row * 4.8 + Math.sin(i * 1.7) * 2;
      const insideHead = ((x - 100) / 78) ** 2 + ((y - 100) / 86) ** 2;
      if (insideHead > 0.85) continue;
      if (x > 87 && x < 113 && y > 90) continue;

      const freckle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      freckle.setAttribute("cx", String(x));
      freckle.setAttribute("cy", String(y));
      freckle.setAttribute("r", String(1.5 + (i % 3) * 0.5));
      freckle.setAttribute("fill", i % 2 === 0 ? "#bd8052" : "#d69b61");
      face.append(freckle);
    }
  }

  const leftEye = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse",
  );
  leftEye.setAttribute("cx", "72");
  leftEye.setAttribute("cy", "82");
  leftEye.setAttribute("rx", "6");
  leftEye.setAttribute("ry", "9");
  leftEye.setAttribute("fill", "#302c29");
  face.append(leftEye);

  const rightEye = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse",
  );
  rightEye.setAttribute("cx", "128");
  rightEye.setAttribute("cy", "82");
  rightEye.setAttribute("rx", "6");
  rightEye.setAttribute("ry", "9");
  rightEye.setAttribute("fill", "#302c29");
  face.append(rightEye);

  const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
  nose.setAttribute("x1", "100");
  nose.setAttribute("y1", "96");
  nose.setAttribute("x2", "96");
  nose.setAttribute("y2", "112");
  nose.setAttribute("stroke", "#302c29");
  nose.setAttribute("stroke-width", "4");
  nose.setAttribute("stroke-linecap", "round");
  face.append(nose);

  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
  mouth.setAttribute("x1", "75");
  mouth.setAttribute("y1", "137");
  mouth.setAttribute("x2", "125");
  mouth.setAttribute("y2", "137");
  mouth.setAttribute("stroke", "#302c29");
  mouth.setAttribute("stroke-width", "4");
  mouth.setAttribute("stroke-linecap", "round");
  face.append(mouth);

  return face;
}

const face = buildFace();
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
