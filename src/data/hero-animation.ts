/**
 * The hero animation, editable by hand.
 *
 * Each frame is a text grid - one character per pixel, spaces transparent.
 * The palette maps each character to a pixel color (games mode, drawn on a
 * canvas) and a display character (AI mode, rendered as ASCII in square
 * character cells - 1 char = 1 pixel). Blank leading lines in a frame are
 * meaningful - they keep frames vertically aligned.
 * Edit or add frames below; repeat a frame in the list to hold it longer.
 *
 * Current art: hands-up.png, 8 frames of 16x16.
 */

export const fps = 8;

export const palette: Record<string, { color: string; ch: string }> = {
  "#": { color: "#ffffff", ch: "#" },
  "*": { color: "#ffffff", ch: "*" },
  "\\": { color: "#ffffff", ch: "\\" },
  "/": { color: "#ffffff", ch: "/" },
  "‾": { color: "#ffffff", ch: "‾" },
  "_": { color: "#ffffff", ch: "_" },
  ",": { color: "#ffffff", ch: "," },
  "'": { color: "#ffffff", ch: "'" },
  "—": { color: "#ffffff", ch: "—" },
  "\"": { color: "#ffffff", ch: "\"" },
};

/** Playback order - repeat entries to hold a pose. */
export const frames = [
String.raw`

  #
  #   #####
  # ##     #  #
  # #       # #
  # # *     # #
  # #     * ###
   ## \ /   ##
    #  —    #
    #       #
     #######
     #    #
     #    #
     #    #
     #    #
     #    #
`,
String.raw`



      #####
 #  ###   ##
 #  #      ##
 #  # *     # #
 #  #     * # #
  # # \ /   # #
  # #  —    # #
   ###      # #
    ##########
     #    ##
     #    #
     #    #
     #    #
`,
String.raw`




      #####
    ###   ##
    #      ##
    # *     #
 #  #     * #
 #  # \ /   #  #
 #  #  —    #  #
 #  ##      #  #
  #  ######## #
   ###    ####
     #    #
     #    #
`,
String.raw`



      ####
     #   ##  #
    # .    # #
 #  # "  . # #
 #  #    " # #
  # #      ##
   ## \_ / #
     #  — #
     ######
     #    #
     #    #
     #    #
     #    #
`,
String.raw`

             #
     #####   #
 #  ##   ### #
 # ##      # #
 # #     * # #
 ### *     # #
  ##   \ / ##
  ##    —  ##
   #      ##
   ########
    ##    #
     #    #
     #    #
     #    #
     #    #
`,
String.raw`



     #####
    ##   ###  #
   ##      #  #
 # #     * #  #
 # # *     #  #
 # #   \ / # #
 # #    —  # #
 # #      ###
  ##########
    ##    #
     #    #
     #    #
     #    #
`,
String.raw`




     #####
    ##   ###
   ##      #
   #     * #
   # *     #  #
#  #   \ / #  #
#  #    —  #  #
#  #      ##  #
 # ########  #
  ####    ###
     #    #
     #    #
`,
String.raw`



      ####
  #  ##   #
  # #    , #
  # # ,  " #  #
  # # "    #  #
   ##      # #
    # \ _/ ##
     # —  #
     ######
     #    #
     #    #
     #    #
     #    #
`,
];
