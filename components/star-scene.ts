import {
  ACESFilmicToneMapping,
  DirectionalLight,
  ExtrudeGeometry,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  Scene,
  Shape,
  WebGPURenderer,
} from "three/webgpu";
import { starPoints } from "@/data/starShape";

export interface StarScene {
  aim: (x: number, y: number) => void;
  turn: () => void;
  resize: () => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
}

/** Loaded only when the hero is visible and motion is permitted. */
export async function createStarScene(
  canvas: HTMLCanvasElement,
  onFailure: () => void,
): Promise<StarScene> {
  const renderer = new WebGPURenderer({ canvas, alpha: true, antialias: true });
  const shape = new Shape();
  starPoints.forEach(([x, y], index) => {
    const point = [(x - 50) / 40, (50 - y) / 40] as const;
    if (index === 0) shape.moveTo(...point);
    else shape.lineTo(...point);
  });
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    bevelSegments: 3,
    steps: 1,
    curveSegments: 1,
  });
  geometry.center();
  const face = new MeshStandardMaterial({
    color: "#d9f76b",
    roughness: 0.48,
    metalness: 0.04,
  });
  const edge = new MeshStandardMaterial({ color: "#677c2d", roughness: 0.58 });
  const star = new Mesh(geometry, [face, edge]);
  const scene = new Scene();
  scene.add(star, new HemisphereLight(0xfffef9, 0x8b8d72, 2.5));
  const key = new DirectionalLight(0xfff8de, 3.2);
  key.position.set(-3, 4, 6);
  const rim = new DirectionalLight(0xf5ffd9, 1.4);
  rim.position.set(4, -1, -3);
  scene.add(key, rim);
  const camera = new OrthographicCamera(-1.8, 1.8, 1.8, -1.8, 0.1, 20);
  camera.position.z = 7;
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;

  let disposed = false;
  let initialized = false;
  let rendererInitialized = false;
  let visible = true;
  let frame = 0;
  let lastTime = 0;
  let pointerX = 0;
  let pointerY = 0;
  let spin = 0;
  star.rotation.set(0.45, -0.7, -0.2);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    window.cancelAnimationFrame(frame);
    canvas.removeEventListener("webglcontextlost", fail);
    geometry.dispose();
    face.dispose();
    edge.dispose();
    // Three's dispose() calls init() if initialization failed; avoid retrying it.
    if (rendererInitialized) renderer.dispose();
    delete canvas.dataset.renderer;
  };
  const fail = () => {
    if (disposed) return;
    dispose();
    onFailure();
  };
  renderer.onDeviceLost = fail;
  canvas.addEventListener("webglcontextlost", fail);

  const draw = (now: number) => {
    frame = 0;
    if (disposed || !visible) return;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
    lastTime = now;
    const ease = 1 - Math.exp(-9 * delta);
    const x = 0.22 + pointerY * 0.25;
    const y = -0.4 + pointerX * 0.4 + spin;
    star.rotation.x += (x - star.rotation.x) * ease;
    star.rotation.y += (y - star.rotation.y) * ease;
    star.rotation.z += (-0.16 - star.rotation.z) * ease;
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
      return;
    }
    if (Math.abs(x - star.rotation.x) + Math.abs(y - star.rotation.y) > 0.002) {
      frame = window.requestAnimationFrame(draw);
    } else {
      star.rotation.y -= spin;
      spin = 0;
      lastTime = 0;
    }
  };
  const requestDraw = () => {
    if (!disposed && initialized && visible && !frame)
      frame = window.requestAnimationFrame(draw);
  };
  const resize = () => {
    if (disposed) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2),
    );
    renderer.setSize(width, height, false);
    camera.left = (-1.8 * width) / height;
    camera.right = (1.8 * width) / height;
    camera.updateProjectionMatrix();
    requestDraw();
  };

  try {
    await renderer.init();
    rendererInitialized = true;
    if (disposed) throw new Error("Graphics device unavailable");
    resize();
    await renderer.compileAsync(scene, camera);
    if (disposed) throw new Error("Graphics device unavailable");
    renderer.render(scene, camera);
    canvas.dataset.renderer =
      "isWebGPUBackend" in renderer.backend ? "webgpu" : "webgl2";
    initialized = true;
    requestDraw();
  } catch (error) {
    dispose();
    throw error;
  }

  return {
    aim(x, y) {
      pointerX = Math.max(-1, Math.min(1, x));
      pointerY = Math.max(-1, Math.min(1, y));
      requestDraw();
    },
    turn() {
      if (spin !== 0) return;
      spin = Math.PI * 2;
      requestDraw();
    },
    resize,
    setVisible(value) {
      visible = value;
      if (value) requestDraw();
      else {
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      }
    },
    dispose,
  };
}
