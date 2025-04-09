import * as THREE from "three";

// Export a function to create the starfield
export default function getStarfield({numStars = 500} = {}) {  
  const verts = []; // Vertices of stars
  const colors = []; // Star colors

  // Create a background sphere to map the Milky Way texture
  const starBgGeometry = new THREE.SphereGeometry(100, 64, 64);  // Large sphere for the background
  const starBgMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/8k_stars_milky_way.jpg'),
    side: THREE.BackSide, // Render the inside of the sphere
    transparent: true,     // Enable transparency
    opacity: 0.25           // Set opacity (0.0 is fully transparent, 1.0 is fully opaque)
  });
  const starBackground = new THREE.Mesh(starBgGeometry, starBgMaterial);

  function randomSpherePoint() {
    const radius = Math.random() * 85 + 85;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.5,
      minDist: radius,
    };
  }

  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    const col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    map: new THREE.TextureLoader().load("/circle.png"),
  });

  const starfield = new THREE.Points(geo, mat);

  // Return both the starfield and the background
  return { starfield, starBackground };
}

let twinkleTime = 0; // Global variable to track time for twinkle speed

export function twinkleStars(geo, twinkleSpeed = 0.03) {
  const colorAttribute = geo.getAttribute("color");

  twinkleTime += twinkleSpeed;  // Increment twinkle time by the speed

  for (let i = 0; i < colorAttribute.count; i++) {
    // Use sin for smooth twinkling and adjust with twinkleTime for speed
    let lightness = 0.7 + 0.7 * Math.sin(twinkleTime + i); // Smooth transition using sin
    const hslColor = new THREE.Color().setHSL(0.6, 0.2, lightness);
    colorAttribute.setXYZ(i, hslColor.r, hslColor.g, hslColor.b);
  }

  colorAttribute.needsUpdate = true;
}
