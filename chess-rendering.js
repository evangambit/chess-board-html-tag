{

let svg = {
  svg: (width, height, attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    rtn.setAttribute("viewBox", "0 0 " + width + " " + height);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  g: (attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "g");
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },

  // Shapes
  rect: (x, y, width, height, attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rtn.setAttribute("x", x);
    rtn.setAttribute("y", y);
    rtn.setAttribute("width", width);
    rtn.setAttribute("height", height);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  circle: (cx, cy, r, attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rtn.setAttribute("cx", cx);
    rtn.setAttribute("cy", cy);
    rtn.setAttribute("r", r);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  ellipse: (cx, cy, rx, ry, attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    rtn.setAttribute("cx", cx);
    rtn.setAttribute("cy", cy);
    rtn.setAttribute("rx", rx);
    rtn.setAttribute("ry", ry);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  polygon: (xs, ys, attrs={}) => {
    if (xs.length != ys.length) return undefined;
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    let pointString = "";
    for (let i = 0; i < xs.length; ++i) {
      if (i != 0) pointString += " ";
      pointString += xs[i] + "," + ys[i];
    }
    rtn.setAttribute("points", pointString);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },

  // Paths
  line: (x1, y1, x2, y2, attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "line");
    rtn.setAttribute("x1", x1);
    rtn.setAttribute("y1", y1);
    rtn.setAttribute("x2", x2);
    rtn.setAttribute("y2", y2);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  path: (attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let _append = (pathElement, moveType, newValues=undefined) => {
      let value = pathElement.getAttribute("d");
      if (value) {
        value += " "
      } else {
        value = "";
      }
      value += moveType;
      if (newValues) {
        value += " ";
        value += newValues.join(",");
      }
      rtn.setAttribute("d", value);
    }
    rtn.moveTo = (x, y) => {                                                _append(rtn, "M", [x, y]);                                                 };
    rtn.lineTo = (x, y) => {                                                _append(rtn, "L", [x, y]);                                                 };
    rtn.curveTo = (x1, y1, x2, y2, x3, y4) => {                             _append(rtn, "L", [x1, y1, x2, y2, x3, y3]);                               };
    rtn.smoothCurveTo = (x1, y1, x2, y2) => {                               _append(rtn, "S", [x1, y1, x2, y2]);                                       };
    rtn.quadraticTo = (x1, y1, x2, y2) => {                                 _append(rtn, "Q", [x1, y1, x2, y2]);                                       };
    rtn.smoothQuadraticTo = (x, y) => {                                     _append(rtn, "T", [x, y]);                                                 };
    rtn.arcTo = (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) => { _append(rtn, "A", [rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y]); };
    rtn.close = () => {                                                     _append(rtn, "Z");                                                         };
    rtn.setAttribute("fill", "none");
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  polyline: (xs, ys, attrs={}) => {
    if (xs.length != ys.length) return undefined;
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    let pointString = "";
    for (let i = 0; i < xs.length; ++i) {
      if (i != 0) pointString += " ";
      pointString += xs[i] + "," + ys[i];
    }
    rtn.setAttribute("points", pointString);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },

  // Other
  linearGradient: (attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    rtn.addStop = (offset, color, opacity=1, attrs={}) => {
      let rtn = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      rtn.setAttribute("offset", offset);
      rtn.setAttribute("color", color);
      rtn.setAttribute("opacity", opacity);
      for (key in attrs) rtn.setAttribute(key, attrs[key]);
      return rtn;
    };
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  radientGradient: (attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "radientGradient");
    rtn.addStop = (offset, color, opacity=1, attrs={}) => {
      let rtn = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      rtn.setAttribute("offset", offset);
      rtn.setAttribute("color", color);
      rtn.setAttribute("opacity", opacity);
      for (key in attrs) rtn.setAttribute(key, attrs[key]);
      return rtn;
    };
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  text: (str, x, y, attrs={}) => {
    // Useful Attributes:
    //   text-anchor = "start", "middle", "end"
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "text");
    rtn.setAttribute("x", x);
    rtn.setAttribute("y", y);
    rtn.innerHTML = str;
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  },
  image: (src, x, y, attrs={}) => {
    let rtn = document.createElementNS("http://www.w3.org/2000/svg", "image");
    rtn.setAttributeNS('http://www.w3.org/1999/xlink','href', src);
    rtn.setAttribute("x", x);
    rtn.setAttribute("y", y);
    for (key in attrs) rtn.setAttribute(key, attrs[key]);
    return rtn;
  }
};

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  flip() {
    return new Vec2(7 - this.x, 7 - this.y);
  }
}

function arrow(from, to, thickness, color) {
  let g = svg.g();
  from = {
    x: from.x + 0.5,
    y: from.y + 0.5,
  };
  to = {
    x: to.x + 0.5,
    y: to.y + 0.5,
  };

  let length = Math.sqrt((from.x - to.x) * (from.x - to.x) + (from.y - to.y) * (from.y - to.y));
  const pad1 = 0.2;
  length -= pad1 / 2;
  const arrowHeight = thickness;

  let points = [
    [pad1, thickness * 0.5],
    [length - arrowHeight, thickness * 0.5],
    [length - arrowHeight, thickness],
    [length, 0],
    [length - arrowHeight, -thickness],
    [length - arrowHeight, -thickness * 0.5],
    [pad1, -thickness * 0.5],
  ];

  let theta = Math.atan2(to.y - from.y, to.x - from.x);
  points = points.map(p => [
    Math.cos(theta) * p[0] + Math.sin(theta) * p[1],
    Math.sin(theta) * p[0] - Math.cos(theta) * p[1],
  ]);

  points = points.map(p => [p[0] + from.x, p[1] + from.y]);

  let polygon = svg.polygon(points.map(x => x[0]), points.map(x => x[1]));
  polygon.setAttribute('fill', color);
  polygon.setAttribute('fill-opacity', 0.7);
  g.innerHTML = '';
  g.appendChild(polygon);
  return g;
}

function black_king() {
	return `
    <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:black; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path d="M 22.5,11.63 L 22.5,6" style="fill:none; stroke:black; stroke-linejoin:miter;" id="path6570"/>
    <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" style="fill:black;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;"/>
    <path d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" style="fill:black; stroke:black;"/>
    <path d="M 20,8 L 25,8" style="fill:none; stroke:black; stroke-linejoin:miter;"/>
    <path d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5" style="fill:none; stroke:white;"/>
    <path d="M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37" style="fill:none; stroke:white;"/>
  </g>`;
}

function black_bishop(x, y) {
	return `
    <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:black; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <g style="fill:black; stroke:black; stroke-linecap:butt;">
      <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"/>
      <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/>
      <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"/>
    </g>
    <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill:none; stroke:white; stroke-linejoin:miter;"/>
  </g>`;
}

function white_bishop() {
	return `
    <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:black; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <g style="fill:white; stroke:black; stroke-linecap:butt;">
      <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"/>
      <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/>
      <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"/>
    </g>
    <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill:none; stroke:black; stroke-linejoin:miter;"/>
  </g>`;
}

function white_king() {
	return `
    <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:black; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path d="M 22.5,11.63 L 22.5,6" style="fill:none; stroke:black; stroke-linejoin:miter;"/>
    <path d="M 20,8 L 25,8" style="fill:none; stroke:black; stroke-linejoin:miter;"/>
    <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" style="fill:white; stroke:black; stroke-linecap:butt; stroke-linejoin:miter;"/>
    <path d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" style="fill:white; stroke:black;"/>
    <path d="M 12.5,30 C 18,27 27,27 32.5,30" style="fill:none; stroke:black;"/>
    <path d="M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5" style="fill:none; stroke:black;"/>
    <path d="M 12.5,37 C 18,34 27,34 32.5,37" style="fill:none; stroke:black;"/>
  </g>`;
}

function black_knight() {
	return `
    <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:black; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path
      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
      style="fill:black; stroke:black;" />
    <path
      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
      style="fill:black; stroke:black;" />
    <path
      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
      style="fill:white; stroke:white;" />
    <path
      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
      style="fill:white; stroke:white;" />
    <path
      d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
      style="fill:white; stroke:none;" />
  </g>`;
}

function white_knight() {
	return `
    <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:black; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path
      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
      style="fill:white; stroke:black;" />
    <path
      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
      style="fill:white; stroke:black;" />
    <path
      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
      style="fill:black; stroke:black;" />
    <path
      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
      style="fill:black; stroke:black;" />
  </g>`;
}

function black_pawn() {
	return `
	<path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" style="opacity:1; fill:black; fill-opacity:1; fill-rule:nonzero; stroke:black; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"/>`;
}

function white_pawn() {
	return `
	<path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" style="opacity:1; fill:white; fill-opacity:1; fill-rule:nonzero; stroke:black; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"/>`;
}

function black_queen() {
	return `
	<g style="fill:black;stroke:black;stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round">

    <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
    style="stroke-linecap:butt;fill:black" />
    <path d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" />
    <path d="M 11.5,30 C 15,29 30,29 33.5,30" />
    <path d="m 12,33.5 c 6,-1 15,-1 21,0" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="14" cy="9" r="2" />
    <circle cx="22.5" cy="8" r="2" />
    <circle cx="31" cy="9" r="2" />
    <circle cx="39" cy="12" r="2" />
    <path d="M 11,38.5 A 35,35 1 0 0 34,38.5"
    style="fill:none; stroke:black;stroke-linecap:butt;" />
    <g style="fill:none; stroke:white;">
      <path d="M 11,29 A 35,35 1 0 1 34,29" />
      <path d="M 12.5,31.5 L 32.5,31.5" />
      <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" />
      <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" />
    </g>
  </g>`;
}

function white_queen() {
	return `
	<g style="fill:white;stroke:black;stroke-width:1.5;stroke-linejoin:round">
    <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/>
    <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/>
    <path d="M 11.5,30 C 15,29 30,29 33.5,30" style="fill:none"/>
    <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style="fill:none"/>
    <circle cx="6" cy="12" r="2" />
    <circle cx="14" cy="9" r="2" />
    <circle cx="22.5" cy="8" r="2" />
    <circle cx="31" cy="9" r="2" />
    <circle cx="39" cy="12" r="2" />
  </g>`;
}

function black_rook() {
	return `
	<g style="opacity:1; fill:black; fill-opacity:1; fill-rule:evenodd; stroke:black; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path
      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
      style="stroke-linecap:butt;stroke-linejoin:miter;" />
    <path
      d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12,35.5 L 33,35.5 L 33,35.5"
      style="fill:none; stroke:white; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 13,31.5 L 32,31.5"
      style="fill:none; stroke:white; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 14,29.5 L 31,29.5"
      style="fill:none; stroke:white; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 14,16.5 L 31,16.5"
      style="fill:none; stroke:white; stroke-width:1; stroke-linejoin:miter;" />
    <path
      d="M 11,14 L 34,14"
      style="fill:none; stroke:white; stroke-width:1; stroke-linejoin:miter;" />
  </g>`;
}

function white_rook() {
	return `
<g style="opacity:1; fill:white; fill-opacity:1; fill-rule:evenodd; stroke:black; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
    <path
      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
      style="stroke-linecap:butt;" />
    <path
      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
      style="stroke-linecap:butt;" />
    <path
      d="M 34,14 L 31,17 L 14,17 L 11,14" />
    <path
      d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
      style="stroke-linecap:butt; stroke-linejoin:miter;" />
    <path
      d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
    <path
      d="M 11,14 L 34,14"
      style="fill:none; stroke:black; stroke-linejoin:miter;" />
  </g>`;
}

function draw_piece(p, x, y) {
	let r = svg.g();
	r.setAttribute('transform', `
		translate(${x - 0.02}, ${y - 0.03})
		scale(0.023)
	`);
	if (p === 'b') {
		r.innerHTML = black_bishop();
	} else if (p === 'B') {
		r.innerHTML = white_bishop();
	} else if (p === 'k') {
		r.innerHTML = black_king();
	} else if (p === 'K') {
		r.innerHTML = white_king();
	} else if (p === 'p') {
		r.innerHTML = black_pawn();
	} else if (p === 'P') {
		r.innerHTML = white_pawn();
	} else if (p === 'n') {
		r.innerHTML = black_knight();
	} else if (p === 'N') {
		r.innerHTML = white_knight();
	} else if (p === 'q') {
		r.innerHTML = black_queen();
	} else if (p === 'Q') {
		r.innerHTML = white_queen();
	} else if (p === 'r') {
		r.innerHTML = black_rook();
	} else if (p === 'R') {
		r.innerHTML = white_rook();
	}
	return r;
}

function chess_board_from_fen(fen, isWhite, arrows, highlightedTiles) {
	let rows = fen.split(' ')[0].split('/');
	let tiles = [];
	for (let row of rows) {
		for (let c of row) {
			if (c.match(/\d/)) {
				for (let i = 0; i < parseInt(c); ++i) {
					tiles.push(null);
				}
			} else {
				tiles.push(c);
			}
		}
	}

	let r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	r.setAttribute('viewBox', '0 0 8 8');

  let light = 'rgb(240, 217, 182)';
  let dark = 'rgb(181, 136, 100)';
  for (let y = 0; y < 8; ++y) {
    for (let x = 0; x < 8; ++x) {
      let color = ((x + y) % 2) ? dark : light;
      r.appendChild(
        svg.rect(
          x, y, 1, 1, {
            "fill": color,
          }
        )
      );
    }
  }

  for (let tileData of highlightedTiles) {
    let loc = tileData.loc;
    if (isWhite) {
      loc.y = 7 - loc.y;
    } else {
      loc.x = 7 - loc.x;
    }
    let g = svg.g();
    g.setAttribute('transform', `translate(${loc.x}, ${loc.y})`)
    g.appendChild(svg.rect(0, 0, 1, 1, {
      "fill": tileData.color,
      "fill-opacity": tileData.fillOpacity,
    }));
    if (tileData.type === 'x-tiles') {
      let s = 0.2;
      let x = 0.25;
      let color = 'rgb(48,48,48)';
      g.appendChild(svg.line(x, x, 1 - x, 1 - x, {
        "stroke": color, "stroke-width": s, "stroke-linecap": "round",
      }));
      g.appendChild(svg.line(1 - x, x, x, 1 - x, {
        "stroke": color, "stroke-width": s, "stroke-linecap": "round",
      }));
    }
    r.appendChild(g);
  }

  for (let i = 0; i < 8; ++i) {
    r.appendChild(
      svg.text(
        isWhite ? 8 - i : i + 1, 7.9, i + 0.3, {
          "font-size": "0.3",
          "text-anchor": "end",
          "fill": (i % 2 ? dark : light),
        }
      )
    );
    r.appendChild(
      svg.text(
        "abcdefgh"[isWhite ? i : 7 - i], i + 0.05, 7.9, {
          "font-size": "0.3",
          "text-anchor": "start",
          "fill": (i % 2 ? dark : light),
        }
      )
    );
  }

	for (let y = 0; y < 8; ++y) {
	  for (let x = 0; x < 8; ++x) {
	    let p = tiles[y*8+x];
	    if (p) {
		    r.appendChild(draw_piece(p, isWhite ? x : 7 - x, isWhite ? y : 7 - y));
	    }
	  }
	}

  for (let arrowData of arrows) {
    if (isWhite) {
      arrowData.from.y = 7 - arrowData.from.y;
      arrowData.to.y = 7 - arrowData.to.y;
    } else {
      arrowData.from.x = 7 - arrowData.from.x;
      arrowData.to.x = 7 - arrowData.to.x;
    }
    r.appendChild(arrow(arrowData.from, arrowData.to, arrowData.thickness, arrowData.color));
  }

	return r;
}

function svg2img(svgNode) {
  svgNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  let img = document.createElement('img');
  img.setAttribute('src', 'data:image/svg+xml;utf8,' + svgNode.outerHTML)
  return img;
}

class ChessBoard extends HTMLElement {
  constructor() {
    super();
  }
  tile2vec(tile) {
    return new Vec2(
      'abcdefgh'.indexOf(tile[0]),
      '12345678'.indexOf(tile[1]),
    );
  }
  connectedCallback() {
    let fen = this.getAttribute('fen');
    if (!fen) {
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    }
    let isWhite = (!this.getAttribute('black')) || (this.getAttribute('black') === '0');

    let arrows = [];
    for (let attrType of ['red-arrows', 'green-arrows']) {
      let color = {
        "red-arrows": "rgb(208, 81, 81)",
        "green-arrows": "rgb(129, 208, 81)",
      }[attrType];
      let attrVal = this.getAttribute(attrType);
      if (!attrVal) {
        continue;
      }
      for (let arrow of attrVal.split(' ')) {
        if (arrow.length === 0) {
          continue;
        }
        arrows.push({
          "from": this.tile2vec(arrow.slice(0, 2)),
          "to": this.tile2vec(arrow.slice(2, 4)),
          "thickness": 0.25,
          "color": color,
        })
      }
    }

    let tiles = [];
    for (let attrType of ['red-tiles', 'green-tiles', 'x-tiles', 'blue-tiles']) {
      let color = {
        "red-tiles": "rgb(208, 81, 81)",
        "green-tiles": "rgb(129, 208, 81)",
        "x-tiles": "rgb(128, 128, 128)",
        "blue-tiles": "rgb(64, 64, 128)",
      }[attrType];
      let fillOpacity = {
        "red-tiles": 0.6,
        "green-tiles": 0.6,
        "x-tiles": 0.0,
        "blue-tiles": 0.6,
      }[attrType];
      let attrVal = this.getAttribute(attrType);
      if (!attrVal) {
        continue;
      }
      for (let tile of attrVal.split(' ')) {
        if (tile.length === 0) {
          continue;
        }
        tiles.push({
          "loc": this.tile2vec(tile),
          "color": color,
          "fillOpacity": fillOpacity,
          "type": attrType,
        })
      }
    }

    this.innerHTML = '';
    let svg = chess_board_from_fen(
      fen,
      isWhite,
      arrows,
      tiles,
    );

    setTimeout(() => {
      let child = svg;
      let shouldBeImage = (!this.getAttribute('svg') || this.getAttribute('svg') === '0');
      if (shouldBeImage) {
        child = svg2img(child);
        let possibleImageAttributes = [
          'alt',
          'height',
          'ismap',
          'longdesc',
          'usemap',
          'width',
          'title',
        ];
        for (let attrName of possibleImageAttributes) {
          let attrVal = this.getAttribute(attrName);
          if (attrVal !== null) {
            child.setAttribute(attrName, attrVal);
          }
        }
      }
      for (let k in this.style) {
        child.style.setProperty(k, this.style.getPropertyValue(k), this.style.getPropertyPriority(k));
      }
      child.setAttribute('class', 'chess-board');
      this.parentNode.insertBefore(child, this);
      this.parentNode.removeChild(this);
    });
  }
}
customElements.define('chess-board', ChessBoard);

}