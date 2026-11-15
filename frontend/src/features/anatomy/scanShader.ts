import * as THREE from 'three';

export function createScanRevealMaterial(baseColor: string, isWireframe = false) {
  const color = new THREE.Color(baseColor);
  
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: color },
      uScanHeight: { value: 3.0 }, // sweeps from +2.5 to -2.5
      uBeamWidth: { value: 0.15 },
      uBeamColor: { value: new THREE.Color('#377DFF') },
      uGlowColor: { value: new THREE.Color('#13A6A6') },
      uScanActive: { value: 1.0 }, // 1.0 = scanning active, 0.0 = fully revealed
      uOpacity: { value: 1.0 },
      uHovered: { value: 0.0 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uScanHeight;
      uniform float uBeamWidth;
      uniform vec3 uBeamColor;
      uniform vec3 uGlowColor;
      uniform float uScanActive;
      uniform float uOpacity;
      uniform float uHovered;

      varying vec3 vWorldPosition;
      varying vec3 vNormal;

      void main() {
        // If scan active: vertices below scan height are progressively revealed
        float distFromBeam = abs(vWorldPosition.y - uScanHeight);
        
        float revealed = 1.0;
        if (uScanActive > 0.5) {
          if (vWorldPosition.y < uScanHeight - uBeamWidth) {
            // Not yet scanned - faint preview
            revealed = 0.08;
          } else if (vWorldPosition.y > uScanHeight + uBeamWidth) {
            // Already scanned - fully visible
            revealed = 0.95;
          } else {
            // Inside the scanning beam transition
            revealed = 0.5 + 0.5 * smoothstep(uScanHeight - uBeamWidth, uScanHeight + uBeamWidth, vWorldPosition.y);
          }
        }

        // Diffuse lighting
        vec3 lightDir = normalize(vec3(0.5, 1.0, 1.5));
        float diff = max(dot(vNormal, lightDir), 0.25);
        vec3 litColor = uColor * (diff * 0.75 + 0.35);

        // Beam glow emission
        if (uScanActive > 0.5 && distFromBeam < uBeamWidth * 2.0) {
          float glow = 1.0 - smoothstep(0.0, uBeamWidth * 2.0, distFromBeam);
          litColor += mix(uGlowColor, uBeamColor, 0.5) * glow * 1.5;
        }

        // Hover highlight
        if (uHovered > 0.5) {
          litColor += vec3(0.15, 0.3, 0.5);
        }

        gl_FragColor = vec4(litColor, revealed * uOpacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    wireframe: isWireframe
  });
}
