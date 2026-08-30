/**
 * The hero animation, editable by hand.
 *
 * Each frame is a text grid — one character per pixel. The `palette` maps
 * each character to a pixel color (games mode, drawn on a canvas) and a
 * display character (AI mode, rendered as ASCII). Spaces are transparent.
 * Edit or add frames below; repeat a frame in `frames` to hold it longer.
 */

export const fps = 5;

export const palette: Record<string, { color: string; ch: string }> = {
  "#": { color: "#008751", ch: "#" }, // dark green — outline
  "=": { color: "#00e436", ch: "=" }, // light green — body
  "o": { color: "#fff1e8", ch: "o" }, // white — eye
  "@": { color: "#1d2b53", ch: "@" }, // dark blue — pupil
  "-": { color: "#008751", ch: "-" }, // closed eye
};

const IDLE = `
   ##          ##
  #oo#        #oo#
  #o@#        #o@#
  ##=##########=##
 #================#
#==================#
#==================#
 #==##########==#
  #=#        #=#
  ###        ###
`;

const BLINK = `
   ##          ##
  #--#        #--#
  #--#        #--#
  ##=##########=##
 #================#
#==================#
#==================#
 #==##########==#
  #=#        #=#
  ###        ###
`;

const SQUASH = `


   ##          ##
  #oo##########oo#
  #o@============@#
 #==================#
#====================#
#====================#
 ##================##
   ####        ####
`;

const HOP = `
   ##          ##
  #oo#        #oo#
  #o@#        #o@#
  ##=##########=##
 #================#
#==================#
 #==============#
  ##==========##
   #=#      #=#

`;

/** Playback order — repeat entries to hold a pose. */
export const frames = [IDLE, IDLE, IDLE, IDLE, BLINK, IDLE, IDLE, SQUASH, HOP, SQUASH];
