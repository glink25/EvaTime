export type Point = {
  x: number;
  y: number;
};

const { sqrt } = Math;
const getControllPoints = (p0: Point, p1: Point, p2: Point, p3: Point) => {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const { x: x0, y: y0 } = p0;
  const { x: x3, y: y3 } = p3;

  const xc1 = (x0 + x1) / 2;
  const yc1 = (y0 + y1) / 2;
  const xc2 = (x1 + x2) / 2;
  const yc2 = (y1 + y2) / 2;
  const xc3 = (x2 + x3) / 2;
  const yc3 = (y2 + y3) / 2;

  const len1 = sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
  const len2 = sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  const len3 = sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));

  const k1 = len1 / (len1 + len2);
  const k2 = len2 / (len2 + len3);

  const xm1 = xc1 + (xc2 - xc1) * k1;
  const ym1 = yc1 + (yc2 - yc1) * k1;

  const xm2 = xc2 + (xc3 - xc2) * k2;
  const ym2 = yc2 + (yc3 - yc2) * k2;

  const smooth_value = 1;
  const ctrl1_x = xm1 + (xc2 - xm1) * smooth_value + x1 - xm1;
  const ctrl1_y = ym1 + (yc2 - ym1) * smooth_value + y1 - ym1;

  const ctrl2_x = xm2 + (xc2 - xm2) * smooth_value + x2 - xm2;
  const ctrl2_y = ym2 + (yc2 - ym2) * smooth_value + y2 - ym2;
  return {
    c1: { x: ctrl1_x, y: ctrl1_y },
    c2: { x: ctrl2_x, y: ctrl2_y },
  };
  // double xc1 = (x0 + x1) / 2.0;
  //   double yc1 = (y0 + y1) / 2.0;
  //   double xc2 = (x1 + x2) / 2.0;
  //   double yc2 = (y1 + y2) / 2.0;
  //   double xc3 = (x2 + x3) / 2.0;
  //   double yc3 = (y2 + y3) / 2.0;

  //   double len1 = sqrt((x1-x0) * (x1-x0) + (y1-y0) * (y1-y0));
  //   double len2 = sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
  //   double len3 = sqrt((x3-x2) * (x3-x2) + (y3-y2) * (y3-y2));

  //   double k1 = len1 / (len1 + len2);
  //   double k2 = len2 / (len2 + len3);

  //   double xm1 = xc1 + (xc2 - xc1) * k1;
  //   double ym1 = yc1 + (yc2 - yc1) * k1;

  //   double xm2 = xc2 + (xc3 - xc2) * k2;
  //   double ym2 = yc2 + (yc3 - yc2) * k2;

  //   // Resulting control points. Here smooth_value is mentioned
  //   // above coefficient K whose value should be in range [0...1].
  //   ctrl1_x = xm1 + (xc2 - xm1) * smooth_value + x1 - xm1;
  //   ctrl1_y = ym1 + (yc2 - ym1) * smooth_value + y1 - ym1;

  //   ctrl2_x = xm2 + (xc2 - xm2) * smooth_value + x2 - xm2;
  //   ctrl2_y = ym2 + (yc2 - ym2) * smooth_value + y2 - ym2;
};

const NUM_STEPS = 20;

const curve4 = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number, //Anchor1
  x2: number,
  y2: number, //Control1
  x3: number,
  y3: number, //Control2
  x4: number,
  y4: number // Anchor2
) => {
  // const dx1 = x2 - x1;
  // const dy1 = y2 - y1;
  // const dx2 = x3 - x2;
  // const dy2 = y3 - y2;
  // const dx3 = x4 - x3;
  // const dy3 = y4 - y3;

  const subdiv_step = 1.0 / (NUM_STEPS + 1);
  const subdiv_step2 = subdiv_step * subdiv_step;
  const subdiv_step3 = subdiv_step * subdiv_step * subdiv_step;

  const pre1 = 3.0 * subdiv_step;
  const pre2 = 3.0 * subdiv_step2;
  const pre4 = 6.0 * subdiv_step2;
  const pre5 = 6.0 * subdiv_step3;

  const tmp1x = x1 - x2 * 2.0 + x3;
  const tmp1y = y1 - y2 * 2.0 + y3;

  const tmp2x = (x2 - x3) * 3.0 - x1 + x4;
  const tmp2y = (y2 - y3) * 3.0 - y1 + y4;

  let fx = x1;
  let fy = y1;

  let dfx = (x2 - x1) * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
  let dfy = (y2 - y1) * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;

  let ddfx = tmp1x * pre4 + tmp2x * pre5;
  let ddfy = tmp1y * pre4 + tmp2y * pre5;

  const dddfx = tmp2x * pre5;
  const dddfy = tmp2y * pre5;

  let step = NUM_STEPS;

  // Suppose, we have some abstract object Polygon which
  // has method AddVertex(x, y), similar to LineTo in
  // many graphical APIs.
  // Note, that the loop has only operation add!
  while (step--) {
    fx += dfx;
    fy += dfy;
    dfx += ddfx;
    dfy += ddfy;
    ddfx += dddfx;
    ddfy += dddfy;
    ctx.lineTo(fx, fy);
  }
  ctx.lineTo(x4, y4); // Last step must go exactly to x4, y4
};

const findNearArrayItem = <T>(arr: T[], index: number) => {
  return [
    arr.at(index - 1),
    arr.at(index),
    arr.at(index + 1) ?? arr.at(1),
    arr.at(index + 2) ?? (index === arr.length - 1 ? arr.at(2) : arr.at(1)),
  ] as unknown as [Point, Point, Point, Point];
};

export const drawquadraticBezierCicle = (
  ctx: CanvasRenderingContext2D,
  ...points: Point[]
) => {
  // ctx.save();
  // ctx.beginPath();
  // ctx.strokeStyle = 'red';
  // points.forEach((point, index) => {
  //   ctx.lineTo(point.x, point.y);
  // });
  // ctx.stroke();
  // ctx.restore();
  points.forEach((point, index) => {
    const [pre, p1, p2, nxt] = findNearArrayItem(points, index);
    const { c1, c2 } = getControllPoints(pre, p1, p2, nxt);
    // ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, point.x, point.y);
    curve4(ctx, p1.x, p1.y, c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
  });
};
