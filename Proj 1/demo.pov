  #include "colors.inc"    // The include files contain
  #include "stones.inc"    // pre-defined scene elements
  #include "textures.inc"    // pre-defined scene elements
  #include "shapes.inc"
  #include "glass.inc"
  #include "metals.inc"
  #include "woods.inc"        
  
  background { color Cyan }
  camera {
    location <0, 2, -3>
    look_at  <0, 1,  2>
  }
  sphere {
    <0, 1, 2>, 2
    texture { PinkAlabaster }
    finish { Shiny }
  }
  light_source { <2, 4, -3> color White}                                                                             