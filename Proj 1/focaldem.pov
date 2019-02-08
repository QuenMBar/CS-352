  #include "colors.inc"
  #include "shapes.inc"
  #include "textures.inc"
  sphere {
    <1, 0, -6>, 0.5
    finish {
      ambient 0.1
      diffuse 0.6
    }
    pigment { NeonPink }
  }
  box {
    <-1, -1, -1>, < 1,  1,  1>
    rotate <0, -20, 0>
    finish {
      ambient 0.1
      diffuse 0.6
    }
    pigment { Green }
  }
  cylinder {
    <-6, 6, 30>, <-6, -1, 30>, 3
    finish {
      ambient 0.1
      diffuse 0.6
    }
    pigment {NeonBlue}
  }
  plane {
    y, -1.0
    pigment {
      checker color Gray65 color Gray30
    }
  }
  light_source { <5, 30, -30> color White }
  light_source { <-5, 30, -30> color White }
  
  camera {
    location <0.0, 1.0, -10.0>
    look_at  <0.0, 1.0,  0.0>
  //  focal_point <-6, 1, 30>    // blue cylinder in focus
  //  focal_point < 0, 1,  0>    // green box in focus
    focal_point < 1, 1, -6>    // pink sphere in focus
    aperture 0.4     // a nice compromise
  //  aperture 0.05    // almost everything is in focus
  //  aperture 1.5     // much blurring
  //  blur_samples 4       // fewer samples, faster to render
    blur_samples 20      // more samples, higher quality image
  }