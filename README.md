# 🌐 LKDPSY

**LKDPSY** is the landing page for showcasing my live tech stack — a dynamic globe visual built with **Three.js**, representing the health and availability of my deployed applications and services. It acts as both a portfolio and an infrastructure overview.

---

## 🔭 Why Three.js?

Three.js was chosen to render the 3D Earth because:
- It's lightweight and well-optimized for browser-based 3D.
- It supports advanced visual effects like Fresnel shaders, starfields, and layered materials.
- It allows full control over lighting, blending, and animation with minimal performance overhead.
- It's highly extensible — perfect for building immersive UIs.

---

## 🚀 Getting Started

This project uses [Vite](https://vitejs.dev/) for blazing-fast development and bundling.

### 🔧 To run locally:

```bash
npm install
npx vite

Then visit: http://localhost:5173
```
## 📂 Project Structure Overview

### main.js

This is the core file where:
 - A 3D Earth is created using an IcosahedronGeometry with multiple layered textures:
     - Day map for lighting
     - Night map with additive blending
     - Clouds with transparency and blending
 - A Fresnel shader is applied to create a subtle atmospheric glow.
 - A starfield and background are generated for space ambience.
 - The scene uses an animated rotation for realism and includes camera orbit controls.

### getStarfield.js

Generates two things:
 - A 3D scatter of stars (randomly distributed points with twinkling behavior).
 - A spherical skybox textured with the Milky Way, giving the space backdrop.

 Includes a twinkleStars() function that dynamically updates star brightness to simulate a twinkle effect using sine waves.

### fresnelShader.js

Creates a custom Fresnel material using GLSL shaders. This adds a subtle glowing rim around the globe, simulating atmospheric light scattering when viewed at an angle.

You can customize:
 - Rim color
 - Inner facing color
 - Strength and falloff of the glow

## 🔍 Vision for LKDPSY
 This project will evolve into a real-time operational dashboard that reflects the health and status of all my running services and deployments.

### Planned integrations:

 - ✅ Grafana (live system metrics + service health)
 - ✅ Reverse proxies and Docker-based app stack
 - ✅ React.js frontends (e.g., Stemster)
 - 🧠 Integrated chatbot for navigation or FAQ
 - ❤️ Fitbit API integration (display live heart rate on globe)

## 📊 Live Visuals Coming Soon
Each major app (like Stemster, MindGrid, etc.) will be represented on the globe with visual overlays, color-coded status indicators, and real-time traffic/load data pulled via APIs and Grafana.

## 👨‍💻 Author
@quazatic — builder, explorer, cloud tinkerer.

## 📎 License
MIT — do what you want with it.