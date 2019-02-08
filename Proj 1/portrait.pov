  #include "colors.inc"
  #include "shapes.inc"
  #include "textures.inc"
  #include "colors.inc"    // The include files contain
  #include "stones.inc"    // pre-defined scene elements
  #include "textures.inc"    // pre-defined scene elements
  #include "shapes.inc"
  #include "glass.inc"
  #include "metals.inc"
  #include "woods.inc"
  background { color Cyan }
  cone {
    <0, .25, -6>, 0.05
    <0, 1.75, -6>, 0.45
    pigment {Col_Glass_Ruby}
    finish {
        ambient .2
        diffuse .6
        specular .75
        roughness .001
        reflection {
           .5
        }
      
    }
    }
    
   #declare Half_Circle = difference {
    sphere {
        <0, 1, 0>, 1
        material{
            texture{
            pigment{ Red }
            finish{
            conserve_energy
            diffuse 0.6
            ambient 0
            specular 0.5
            roughness 0.05
            reflection{0 1 fresnel on metallic 0}
            }
        }
        interior{ior 1.16}
        }
    }
    box {
        <2,-1,2>, <-2,1,-2>
    }
  }
    
   
   object {
      Half_Circle
      translate <3,2,0>
    }
    
    object {
      Half_Circle
      translate <-3,2,0>
    }
  
  cylinder {
    <-.5, .5, -8>, <.5, .5, -8>, .1
    pigment { White } 
    finish { reflection {.6} ambient 0 diffuse 0 }
  }
  
  #declare Half_Torus = difference {
    torus {
      .6,.2
      sturm
      rotate x*-90  // so we can see it from the top
      pigment {Gray}
      finish {
      ambient .1
      diffuse .4
      reflection .25
      specular 1
      metallic
    }
    }
    box { <-5, -5, -1>, <5, .2, 1> }
  }
  
  object {
    Half_Torus
    translate <3,4.5,0>
  }
  
  object {
    Half_Torus
    translate <-3,4.5,0>
  }
     
    
    
  plane {
    y, -1.0
    pigment {
      checker color DarkGreen  color Green
    }
  }
  
  light_source {
    <-2, 3, 0>
    color White
    jitter
  }
  
  light_source {
    <2, 3, 0>
    color White
    jitter
  }
  
  camera {
    location <0.0, 1.0, -10.0>
    look_at  <0.0, 1.0,  0.0>
  //  focal_point <-6, 1, 30>    // blue cylinder in focus
  //  focal_point < 0, 1,  0>    // green box in focus
    focal_point < 1, 1, -7>    // pink sphere in focus
    aperture .075     // a nice compromise
  //  aperture 0.05    // almost everything is in focus
  //  aperture 1.5     // much blurring
  //  blur_samples 4       // fewer samples, faster to render
    blur_samples 100      // more samples, higher quality image
  }