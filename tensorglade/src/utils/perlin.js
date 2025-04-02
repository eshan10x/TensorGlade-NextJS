// Noise implementation based on the improved noise algorithm by Ken Perlin
export const noise = {
    grad3: [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ],
    p: [],
    perm: new Array(512),
    
    seed(seed) {
      if (seed > 0 && seed < 1) {
        seed *= 65536;
      }
  
      seed = Math.floor(seed);
      if (seed < 256) {
        seed |= seed << 8;
      }
  
      const p = this.p;
      for (let i = 0; i < 256; i++) {
        let v;
        if (i & 1) {
          v = p[i] ^ (seed & 255);
        } else {
          v = p[i] ^ ((seed >> 8) & 255);
        }
        this.perm[i] = this.perm[i + 256] = v;
      }
    },
  
    simplex3(xin, yin, zin) {
      let n0 = 0, n1 = 0, n2 = 0, n3 = 0; // Noise contributions from the four corners
  
      // Skew the input space to determine which simplex cell we're in
      const s = (xin + yin + zin) * (1.0 / 3.0); // Very nice and simple skew factor
      const i = Math.floor(xin + s);
      const j = Math.floor(yin + s);
      const k = Math.floor(zin + s);
  
      const t = (i + j + k) * (1.0 / 6.0);
      const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
      const Y0 = j - t;
      const Z0 = k - t;
      const x0 = xin - X0; // The x,y,z distances from the cell origin
      const y0 = yin - Y0;
      const z0 = zin - Z0;
  
      // For the 3D case, the simplex shape is a tetrahedron.
      // Determine which simplex we are in.
      let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
      let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
  
      if (x0 >= y0) {
        if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; } // X Y Z order
        else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; } // X Z Y order
        else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; } // Z X Y order
      } else { // x0<y0
        if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; } // Z Y X order
        else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; } // Y Z X order
        else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; } // Y X Z order
      }
  
      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where c = 1/6.
      const x1 = x0 - i1 + (1.0 / 6.0); // Offsets for second corner in (x,y,z) coords
      const y1 = y0 - j1 + (1.0 / 6.0);
      const z1 = z0 - k1 + (1.0 / 6.0);
      const x2 = x0 - i2 + (2.0 / 6.0); // Offsets for third corner in (x,y,z) coords
      const y2 = y0 - j2 + (2.0 / 6.0);
      const z2 = z0 - k2 + (2.0 / 6.0);
      const x3 = x0 - 1.0 + (3.0 / 6.0); // Offsets for last corner in (x,y,z) coords
      const y3 = y0 - 1.0 + (3.0 / 6.0);
      const z3 = z0 - 1.0 + (3.0 / 6.0);
  
      // Work out the hashed gradient indices of the four simplex corners
      const ii = i & 255;
      const jj = j & 255;
      const kk = k & 255;
      const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
      const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
      const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
      const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
  
      // Calculate the contribution from the four corners
      let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) {
        n0 = 0.0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
      }
  
      let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) {
        n1 = 0.0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
      }
  
      let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) {
        n2 = 0.0;
      } else {
        t2 *= t2;
        n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
      }
  
      let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) {
        n3 = 0.0;
      } else {
        t3 *= t3;
        n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
      }
  
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to stay just inside [-1,1]
      return 32.0 * (n0 + n1 + n2 + n3);
    },
  
    dot(g, x, y, z) {
      return g[0] * x + g[1] * y + g[2] * z;
    }
  };
  
  // Initialize the permutation table with values 0-255
  for (let i = 0; i < 256; i++) {
    noise.p[i] = Math.floor(Math.random() * 256);
  }
  // To remove the need for index wrapping, double the permutation table length
  for (let i = 0; i < 512; i++) {
    noise.perm[i] = noise.p[i & 255];
  }