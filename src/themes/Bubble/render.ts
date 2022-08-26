import { ThingConfig } from '@/type/thing';
import { Component, ComponentArg, renderer } from '@/utils/canvas';
import { drawquadraticBezierCicle, Point } from '@/utils/draw';

enum Place {
  tl,
  tr,
  br,
  bl,
}

type Corner = {
  ox: number;
  oy: number;
  r: number;
  speed: number;
  clockwise: boolean;
  angle: number;
};

class Bubble extends Component {
  corners: Corner[];
  constructor({ transform }: ComponentArg) {
    super({ transform });
    const { size, origin } = this.transform;
    const ox = size.width + origin.x;
    const oy = size.height + origin.y;
    this.corners = [
      {
        ox: ox - 150,
        oy: oy - 150,
        r: 100,
        speed: 1,
        clockwise: false,
        angle: 0,
      },
      {
        ox: ox + 150,
        oy: oy - 150,
        r: 50,
        speed: 2,
        clockwise: true,
        angle: 0,
      },
      {
        ox: ox + 150,
        oy: oy + 150,
        r: 150,
        speed: 1,
        clockwise: false,
        angle: 0,
      },
      {
        ox: ox - 150,
        oy: oy + 150,
        r: 50,
        speed: 1,
        clockwise: true,
        angle: 0,
      },
    ];
  }
  getCornerPosition = (corner: Corner, index: number): Point => {
    const { ox, oy, r, clockwise, angle: _angle, speed } = corner;
    const angle = _angle;
    corner.angle = angle + speed * (clockwise ? 1 : -1);
    this.corners[index].angle = angle + speed * (clockwise ? 1 : -1);
    return {
      x: ox + Math.cos((angle * Math.PI) / 180) * r,
      y: oy + Math.sin((angle * Math.PI) / 180) * r,
    };
  };

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    const points = this.corners.map((c, i) => this.getCornerPosition(c, i));
    drawquadraticBezierCicle(ctx, ...[...points, points[0]]);
    ctx.fill();
  }
}

export const render = (() => {
  let angle = 0;
  const bubble = new Bubble({ transform: { position: { x: 300, y: 300 } } });
  return (
    ctx: CanvasRenderingContext2D,
    { width, height }: { width: number; height: number; config: ThingConfig }
  ) => {
    ctx.clearRect(0, 0, width, height);
    bubble.transform.rotate = angle;
    // bubble.transform.size = { width: 100, height: 100 };
    renderer(ctx, { width, height }, [bubble]);
    angle += 0.1;
  };
})();
