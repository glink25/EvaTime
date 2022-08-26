import { cloneDeep, cloneDeepWith, defaultsDeep } from 'lodash-es';
import { Point } from './draw';

type Size = {
  width: number;
  height: number;
};

type OriginType = Point;
type AnchorType = Point;
type ScaleType = Point;
type SkewType = Point;
type Position = Point;

export type ComponentArg = {
  transform?: {
    size?: Size;
    position?: Position;
    scale?: ScaleType;
    zIndex?: number;
    origin?: OriginType;
    rotate?: number;
    alpha?: number;
    skew?: SkewType;
  };
};
const defaultComponentArg = {
  name: '',
  transform: {
    size: { width: 0, height: 0 },
    position: { x: 0, y: 0 },
    scale: {
      x: 1,
      y: 1,
    },
    zIndex: 0,
    origin: {
      x: 0.5,
      y: 0.5,
    },
    skew: {
      x: 0,
      y: 0,
    },
    rotate: 0,
    alpha: 1,
  },
};

export type DeepRequied<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]-?: DeepRequied<T[P]> }
  : T;

export class Component {
  transform: DeepRequied<ComponentArg>['transform'];

  constructor({ transform }: ComponentArg) {
    const selfTransform = defaultsDeep(
      defaultComponentArg.transform,
      transform
    );
    this.transform = cloneDeep(selfTransform);
  }

  /** @internal */
  setContext(ctx: CanvasRenderingContext2D) {
    const { scale, size, origin, rotate, position, alpha, skew } =
      this.transform;
    const x = size.width * origin.x;
    const y = size.height * origin.y;
    const ox = x + position.x;
    const oy = y + position.y;

    ctx.translate(x, y);
    ctx.translate(ox, oy);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(scale.x, scale.y);
    ctx.transform(1, skew.x, skew.y, 1, 0, 0);

    ctx.translate(-x, -y);
    ctx.globalAlpha = alpha;
  }

  render(_ctx: CanvasRenderingContext2D) {}
}

export const renderer = (
  ctx: CanvasRenderingContext2D,
  size: Size,
  comps: Component[]
) => {
  const { scale, origin, rotate, position, alpha, skew } = defaultsDeep(
    defaultComponentArg.transform,
    { size }
  );
  const x = size.width * origin.x;
  const y = size.height * origin.y;
  const ox = x + position.x;
  const oy = y + position.y;
  ctx.save();
  ctx.translate(x, y);
  ctx.translate(ox, oy);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.scale(scale.x, scale.y);
  ctx.transform(1, skew.x, skew.y, 1, 0, 0);
  ctx.translate(-x, -y);
  comps.forEach((comp) => {
    ctx.save();
    comp.setContext(ctx);
    comp.render(ctx);
    ctx.restore();
  });
  ctx.restore();
};
